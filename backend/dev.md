# MSME Loan Recommendation System

## Server Links

```txt
Server_Link: http://127.0.0.1:8000/
Api_Server_Link: http://127.0.0.1:8000/api/
Msme_loan_recommend: http://127.0.0.1:8000/api/recommend/
```

---

# How to Start the Backend Server

```bash
# Navigate to backend folder
cd backend

# Start Django server
python manage.py runserver
```

---

# API Endpoint

## Loan Recommendation API

```http
POST http://127.0.0.1:8000/api/recommend/
```

---

# Request Format

```json
{
  "business_type": "Trading",
  "turnover": 3,
  "loan_amount": 1,
  "owner_category": "General",
  "years_in_business": 2
}
```

---

# Loan Testing Data

---

## Test Case 1 — Small Trading Business

### Request

```json
{
  "business_type": "Trading",
  "turnover": 3,
  "loan_amount": 1,
  "owner_category": "General",
  "years_in_business": 2
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Mudra Loan",
    "Working Capital Loan",
    "Retail Business Loan"
  ]
}
```

---

## Test Case 2 — Women Entrepreneur

### Request

```json
{
  "business_type": "Trading",
  "turnover": 10,
  "loan_amount": 5,
  "owner_category": "Women",
  "years_in_business": 4
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Women Entrepreneur Loan",
    "Stand-Up India Scheme",
    "Retail Business Loan"
  ]
}
```

---

## Test Case 3 — SC/ST Startup

### Request

```json
{
  "business_type": "Service",
  "turnover": 8,
  "loan_amount": 4,
  "owner_category": "SC/ST",
  "years_in_business": 1
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Stand-Up India Scheme",
    "Startup India Seed Fund",
    "SME Digital Loan"
  ]
}
```

---

## Test Case 4 — Manufacturing Large Business

### Request

```json
{
  "business_type": "Manufacturing",
  "turnover": 80,
  "loan_amount": 150,
  "owner_category": "General",
  "years_in_business": 6
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Export Business Loan",
    "Equipment Finance Loan",
    "CGTMSE Loan"
  ]
}
```

---

## Test Case 5 — Medium Manufacturing

### Request

```json
{
  "business_type": "Manufacturing",
  "turnover": 40,
  "loan_amount": 40,
  "owner_category": "General",
  "years_in_business": 5
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "CGTMSE Loan",
    "Equipment Finance Loan"
  ]
}
```

---

## Test Case 6 — Service Startup

### Request

```json
{
  "business_type": "Service",
  "turnover": 6,
  "loan_amount": 2,
  "owner_category": "General",
  "years_in_business": 1
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Startup India Seed Fund",
    "SME Digital Loan",
    "Mudra Loan"
  ]
}
```

---

## Test Case 7 — Digital SME

### Request

```json
{
  "business_type": "Service",
  "turnover": 15,
  "loan_amount": 20,
  "owner_category": "General",
  "years_in_business": 4
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "SME Digital Loan",
    "MSME Business Loan (Private Bank)"
  ]
}
```

---

## Test Case 8 — Green Energy Manufacturing

### Request

```json
{
  "business_type": "Manufacturing",
  "turnover": 100,
  "loan_amount": 120,
  "owner_category": "General",
  "years_in_business": 8
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Export Business Loan",
    "Green Energy MSME Loan",
    "Equipment Finance Loan"
  ]
}
```

---

## Test Case 9 — Transport Service

### Request

```json
{
  "business_type": "Service",
  "turnover": 20,
  "loan_amount": 35,
  "owner_category": "General",
  "years_in_business": 5
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Transport Vehicle Loan",
    "MSME Business Loan (Private Bank)"
  ]
}
```

---

## Test Case 10 — Very Small Business

### Request

```json
{
  "business_type": "Trading",
  "turnover": 1,
  "loan_amount": 0.5,
  "owner_category": "General",
  "years_in_business": 1
}
```

### Expected Output

```json
{
  "recommended_loans": [
    "Mudra Loan",
    "Working Capital Loan"
  ]
}
```

---

# Sample Python API Testing Code

```python
import requests

url = "http://127.0.0.1:8000/api/recommend/"

payload = {
    "business_type": "Trading",
    "turnover": 3,
    "loan_amount": 1,
    "owner_category": "General",
    "years_in_business": 2
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.json())
```

---

# Sample cURL Request

```bash
curl -X POST http://127.0.0.1:8000/api/recommend/ \
-H "Content-Type: application/json" \
-d '{
  "business_type": "Trading",
  "turnover": 3,
  "loan_amount": 1,
  "owner_category": "General",
  "years_in_business": 2
}'
```

---

# Tech Stack

```txt
Frontend  : React.js
Backend   : Django
API       : Django REST Framework
Database  : SQLite / MySQL
Language  : Python
```

---

# Features

- MSME Loan Recommendation
- Government Scheme Recommendation
- Women Entrepreneur Loan Detection
- SC/ST Startup Loan Support
- Manufacturing Business Loan Matching
- Service Business Loan Recommendation
- REST API Integration
- JSON Based API Testing
- Easy Backend Deployment
```