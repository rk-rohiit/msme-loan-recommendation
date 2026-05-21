from loans.models import LoanScheme
from .ml_model import predict_loan


# =========================================
# SCORE CALCULATION
# =========================================

def calculate_score(scheme, user_data):

    score = 0

    # =====================================
    # SPECIAL ELIGIBILITY VALIDATION
    # =====================================

    # Women Entrepreneur Loan
    if (
        scheme.name == "Women Entrepreneur Loan"
        and
        user_data["owner_category"] != "Women"
    ):
        return 0

    # Stand-Up India Scheme
    if (
        scheme.name == "Stand-Up India Scheme"
        and
        user_data["owner_category"]
        not in ["Women", "SC/ST"]
    ):
        return 0

    # Startup India Seed Fund
    if (
        scheme.name == "Startup India Seed Fund"
        and
        user_data["years_in_business"] > 3
    ):
        return 0

    # Export Business Loan
    if (
        scheme.name == "Export Business Loan"
        and
        user_data["business_type"] != "Manufacturing"
    ):
        return 0

    # =====================================
    # BUSINESS TYPE MATCH (30)
    # =====================================

    if scheme.business_type == user_data["business_type"]:

        score += 30

    elif scheme.business_type == "All":

        score += 20

    # =====================================
    # TURNOVER MATCH (25)
    # =====================================

    if (
        scheme.min_turnover
        <= user_data["turnover"]
        <= scheme.max_turnover
    ):

        score += 25

    # =====================================
    # LOAN AMOUNT MATCH (25)
    # =====================================

    if (
        scheme.min_loan_amount
        <= user_data["loan_amount"]
        <= scheme.max_loan_amount
    ):

        score += 25

    # =====================================
    # LOAN FIT SCORE (20)
    # =====================================

    ideal = (
        scheme.min_loan_amount
        + scheme.max_loan_amount
    ) / 2

    diff = abs(
        user_data["loan_amount"] - ideal
    )

    if ideal != 0:

        fit_score = max(
            0,
            20 - ((diff / ideal) * 20)
        )

        score += fit_score

    # =====================================
    # BONUS SCORE
    # =====================================

    # Startup Bonus
    if (
        user_data["years_in_business"] <= 2
        and
        "Startup" in scheme.name
    ):

        score += 10

    # Manufacturing Bonus
    if (
        user_data["business_type"] == "Manufacturing"
        and
        scheme.business_type == "Manufacturing"
    ):

        score += 5

    # Trading Bonus
    if (
        user_data["business_type"] == "Trading"
        and
        scheme.business_type == "Trading"
    ):

        score += 5

    # Service Bonus
    if (
        user_data["business_type"] == "Service"
        and
        scheme.business_type == "Service"
    ):

        score += 5

    # =====================================
    # FINAL SCORE
    # =====================================

    return round(min(score, 100), 2)
# =========================================
# REASON GENERATOR
# =========================================

def generate_reason(scheme, user_data):

    reasons = []

    # Small Loan
    if user_data["loan_amount"] <= 1000000:
        reasons.append(
            "Suitable for small business funding"
        )

    # Women / SC-ST
    if user_data["owner_category"] in [
        "Women",
        "SC/ST"
    ]:
        reasons.append(
            "Special category benefits available"
        )

    # Startup
    if user_data["years_in_business"] <= 2:
        reasons.append(
            "Startup business eligible"
        )

    # Business Match
    if scheme.business_type == user_data["business_type"]:
        reasons.append(
            "Matches your business type"
        )

    return (
        ", ".join(reasons)
        if reasons
        else "Based on your eligibility profile"
    )


# =========================================
# MAIN RECOMMENDATION FUNCTION
# =========================================

def recommend_loans(user_data):

    # Active Loan Schemes
    schemes = LoanScheme.objects.filter(
        is_active=True
    )

    results = []

    # =====================================
    # STEP 1 — ML Prediction
    # =====================================

    try:

        predicted_scheme = predict_loan(
            user_data
        )

        print(
            "ML Output:",
            predicted_scheme
        )

    except Exception as e:

        print("ML Error:", e)

        predicted_scheme = None

    # =====================================
    # STEP 2 — ML Scheme Name
    # =====================================

    predicted_scheme_name = (
        predicted_scheme
    )

    print(
        "Predicted Scheme:",
        predicted_scheme_name
    )

    ml_added = False

    # =====================================
    # STEP 3 — Recommendation Logic
    # =====================================

    for scheme in schemes:

        # Score
        score = calculate_score(
            scheme,
            user_data
        )

        # =================================
        # ML BOOST
        # =================================

        ml_match = False

        if (
            predicted_scheme_name
            and
            predicted_scheme_name.strip().lower()
            ==
            scheme.name.strip().lower()
        ):

            score += 20

            ml_match = True

            ml_added = True

        # =================================
        # FILTER WEAK MATCHES
        # =================================

        if score >= 40 or ml_match:

            confidence = min(
                100,
                round(score, 2)
            )

            reason_text = generate_reason(
                scheme,
                user_data
            )

            approval_chance = min(
                95,
                confidence + 5
            )

            results.append({

                "name":
                    scheme.name,

                "business_type":
                    scheme.business_type,

                "interest_rate":
                    float(scheme.interest_rate),

                "loan_range":
                    f"{scheme.min_loan_amount} - "
                    f"{scheme.max_loan_amount}",

                "tenure":
                    scheme.max_tenure_years,

                "eligibility_score":
                    f"{confidence}%",

                "confidence":
                    f"{confidence}%",

                "approval_chance":
                    f"{approval_chance}%",

                "tag":
                    (
                        "ML Recommended"
                        if ml_match
                        else "Best Match"
                    ),

                "ml_recommended":
                    ml_match,

                "reason":
                    reason_text,

                "description":
                    scheme.description
            })

    # =====================================
    # STEP 4 — FALLBACK ML RESULT
    # =====================================

    if predicted_scheme_name and not ml_added:

        results.insert(0, {

            "name":
                predicted_scheme_name,

            "business_type":
                user_data["business_type"],

            "interest_rate":
                10.0,

            "loan_range":
                "As per scheme rules",

            "tenure":
                5,

            "eligibility_score":
                "90%",

            "confidence":
                "90%",

            "approval_chance":
                "95%",

            "tag":
                "ML Recommended",

            "ml_recommended":
                True,

            "reason":
                "Recommended by ML model "
                "based on your profile",

            "description":
                "AI recommended scheme"
        })

    # =====================================
    # STEP 5 — SORT RESULTS
    # =====================================

    results.sort(

        key=lambda x: (

            not x["ml_recommended"],

            -float(
                x["confidence"]
                .replace("%", "")
            )
        )
    )

    # =====================================
    # RETURN TOP 3 RESULTS
    # =====================================

    return results[:3]