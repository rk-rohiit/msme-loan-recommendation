from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    BUSINESS_TYPE = (
        ('manufacturing', 'Manufacturing'),
        ('service', 'Service'),
        ('trading', 'Trading'),
    )

    business_type = models.CharField(max_length=20, choices=BUSINESS_TYPE, null=True)
    annual_turnover = models.FloatField(null=True, blank=True)
    credit_score = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True)