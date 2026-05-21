from loans.models import LoanScheme
from .ml_model import predict_loan


# 🔥 Score calculation (improved)
def calculate_score(scheme, user_data):
    score = 0

    # ✅ Business Type (30)
    if scheme.business_type == user_data["business_type"]:
        score += 30
    elif scheme.business_type == "All":
        score += 20

    # ✅ Turnover (25)
    if scheme.min_turnover <= user_data["turnover"] <= scheme.max_turnover:
        score += 25

    # ✅ Loan Amount (25)
    if scheme.min_loan_amount <= user_data["loan_amount"] <= scheme.max_loan_amount:
        score += 25

    # ✅ Loan Fit (20)
    ideal = (scheme.min_loan_amount + scheme.max_loan_amount) / 2
    diff = abs(user_data["loan_amount"] - ideal)

    if ideal != 0:
        fit_score = max(0, 20 - (diff / ideal) * 20)
        score += fit_score

    return round(score, 2)


# 🔥 Explanation generator
def generate_reason(scheme, user_data):
    reasons = []

    if user_data["loan_amount"] <= 10:
        reasons.append("Low loan amount suitable for small business schemes")

    if user_data["owner_category"] in ["Women", "SC/ST"]:
        reasons.append("Special category benefits available")

    if user_data["years_in_business"] < 3:
        reasons.append("Startup business eligible for new schemes")

    if scheme.business_type == user_data["business_type"]:
        reasons.append("Matches your business type")

    return ", ".join(reasons) if reasons else "Based on overall eligibility"


def recommend_loans(user_data):
    schemes = LoanScheme.objects.filter(is_active=True)
    results = []

    # 🔥 STEP 1: ML Prediction
    try:
        predicted_scheme = predict_loan(user_data)
        print("ML Output:", predicted_scheme)  # DEBUG
    except Exception:
        predicted_scheme = None

    # 🔥 STEP 2: Map ML → DB names
    ml_scheme_map = {
        "MUDRA": "Mudra Loan",
        "PMEGP": "PMEGP Loan",
        "Stand-Up India": "Stand-Up India Scheme",
        "Startup India": "Startup India Loan"
    }

    predicted_scheme_name = ml_scheme_map.get(predicted_scheme) if predicted_scheme else None
    print("Mapped Scheme:", predicted_scheme_name)  # DEBUG

    ml_added = False

    # 🔥 STEP 3: Score calculation + ML boost
    for scheme in schemes:
        score = calculate_score(scheme, user_data)

        # 🔥 ML BOOST
        ml_match = False
        if predicted_scheme_name and predicted_scheme_name.lower() in scheme.name.lower():
            score += 20
            ml_match = True
            ml_added = True

        # ✅ Filter weak matches
        if score > 30 or ml_match:
            confidence = min(100, round(score, 2))
            reason_text = generate_reason(scheme, user_data)

            results.append({
                "name": scheme.name,
                "business_type": scheme.business_type,
                "interest_rate": float(scheme.interest_rate),
                "loan_range": f"{scheme.min_loan_amount} - {scheme.max_loan_amount}",
                "tenure": scheme.max_tenure_years,
                "eligibility_score": f"{confidence}%",
                "confidence": f"{confidence}%",
                "tag": "ML Recommended" if ml_match else "Best Match",
                "ml_recommended": ml_match,
                "reason": reason_text,
                "description": scheme.description
            })

    # 🔥 STEP 4: Fallback ML if not found
    if predicted_scheme_name and not ml_added:
        results.insert(0, {
            "name": predicted_scheme_name,
            "business_type": user_data["business_type"],
            "interest_rate": 10.0,
            "loan_range": "As per scheme rules",
            "tenure": 5,
            "confidence": "90%",
            "tag": "ML Recommended",
            "ml_recommended": True,
            "reason": "Recommended by ML model based on your profile",
            "description": "AI recommended scheme"
        })

    # 🔥 STEP 5: Sort results
    results.sort(
    key=lambda x: (
        not x["ml_recommended"],  # 🔥 ML first
        -float(x["confidence"].replace("%", ""))  # then by confidence
    )
)

    return results[:3]
