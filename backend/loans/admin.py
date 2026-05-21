from django.contrib import admin
from .models import LoanScheme

@admin.register(LoanScheme)
class LoanSchemeAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'business_type',
        'min_turnover',
        'max_turnover',
        'interest_rate',
        'is_active'
    )

    list_filter = ('business_type', 'is_active')

    search_fields = ('name',)