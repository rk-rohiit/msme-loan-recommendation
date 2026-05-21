from django.urls import path
from .views import get_recommendations,home

urlpatterns = [
    path('', home),  # http://127.0.0.1:8000/api
    path('recommend/', get_recommendations),  # http://127.0.0.1:8000/api/recommend/
    # next
]