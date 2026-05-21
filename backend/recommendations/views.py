from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import recommend_loans


@api_view(['POST'])
def get_recommendations(request):
    """
    API to get loan recommendations based on user input
    """

    try:
        data = request.data

        # ✅ Input validation
        required_fields = ["business_type", "turnover", "loan_amount", "owner_category", "years_in_business"]

        for field in required_fields:
            if field not in data:
                return Response({
                    "status": "error",
                    "message": f"{field} is required"
                }, status=400)

        # ✅ Extract user input
        user_data = {
            "business_type": data.get("business_type"),
            "turnover": float(data.get("turnover")) * 100000,
            "loan_amount": float(data.get("loan_amount")) * 100000,
            "owner_category": data.get("owner_category"),
            "years_in_business": int(data.get("years_in_business"))
        }

        # ✅ Get recommendations (already formatted)
        results = recommend_loans(user_data)

        return Response({
            "status": "success",
            "count": len(results),
            "data": results
        })

    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=400)


# ✅ Home API
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "status": "success",
        "message": "MSME Loan Recommendation API is running 🚀",
        "endpoints": {
            "admin": "/admin/",
            "recommend": "/api/recommend/"
        }
    })