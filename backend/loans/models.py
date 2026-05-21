from django.db import models

class LoanScheme(models.Model):
    BUSINESS_TYPES = [
        ('Manufacturing', 'Manufacturing'),
        ('Service', 'Service'),
        ('Trading', 'Trading'),
        ('All', 'All'),
    ]

    name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=50, choices=BUSINESS_TYPES)
    
    min_turnover = models.FloatField()
    max_turnover = models.FloatField()

    min_loan_amount = models.FloatField()
    max_loan_amount = models.FloatField()

    interest_rate = models.FloatField(help_text="Interest rate in %")
    
    max_tenure_years = models.IntegerField(help_text="Loan tenure in years")

    description = models.TextField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name