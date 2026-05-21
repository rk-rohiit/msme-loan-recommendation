from rest_framework import serializers
from .models import LoanScheme

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanScheme
        fields = '__all__'