# MSME Loan Recommendation System

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-REST_Framework-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![API](https://img.shields.io/badge/REST-API-orange)
![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20MySQL-lightgrey)

---

# 📌 Project Overview

The **MSME Loan Recommendation System** is an intelligent web-based application designed to help Micro, Small, and Medium Enterprises (MSMEs) find the most suitable loan schemes based on their business details.

The system analyzes:
- Business Type
- Turnover
- Loan Amount
- Owner Category
- Years in Business

and recommends the best matching:
- Government Loan Schemes
- MSME Loans
- Startup Loans
- Women Entrepreneur Loans
- SC/ST Business Schemes
- Manufacturing & Service Sector Loans

---

# ❗ Problem Statement

Many MSME business owners face difficulties in:
- Finding suitable loan schemes
- Understanding government financial programs
- Selecting the correct MSME funding option
- Comparing available loans manually
- Accessing startup and women entrepreneur schemes

Currently, loan selection is:
- Time-consuming
- Manual
- Confusing
- Not personalized

---

# ✅ Solution

This project solves the problem by providing:

✔ Intelligent Loan Recommendation System  
✔ Automated Scheme Matching  
✔ Easy-to-use REST API  
✔ Fast Loan Suggestions  
✔ Business Category Based Filtering  
✔ Women & SC/ST Special Scheme Detection  

The system automatically recommends loans based on business information entered by the user.

---

# 🎯 Project Objectives

- Help MSMEs identify suitable loan schemes
- Automate loan recommendation process
- Reduce manual searching effort
- Improve financial accessibility
- Support startups and entrepreneurs
- Provide scalable REST API architecture

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend Language |
| Django | Web Framework |
| Django REST Framework | API Development |
| React.js | Frontend UI |
| SQLite / MySQL | Database |
| JSON | API Data Format |
| Postman | API Testing |

---

# 🏗️ System Architecture

```text
+-------------------+
|   React Frontend  |
+-------------------+
          |
          v
+-------------------+
| Django REST API   |
+-------------------+
          |
          v
+-------------------+
| Recommendation    |
| Engine / Logic    |
+-------------------+
          |
          v
+-------------------+
| SQLite / MySQL DB |
+-------------------+
```

---

# 🔄 Project Flowchart

```text
             +----------------+
             |   User Input   |
             +----------------+
                      |
                      v
          +----------------------+
          | Validate Input Data  |
          +----------------------+
                      |
                      v
          +----------------------+
          | Loan Recommendation  |
          |      Algorithm       |
          +----------------------+
                      |
                      v
          +----------------------+
          | Match Eligible Loans |
          +----------------------+
                      |
                      v
          +----------------------+
          | Return Recommended   |
          |       Loans          |
          +----------------------+
```

---

# 📂 Project Structure

```bash
MSME_LOAN_SYSTEM/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── serializers/
│   ├── views/
│   ├── urls.py
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md
```

---

# 🌐 API Links

## Main Server

```txt
http://127.0.0.1:8000/
```

## API Base URL

```txt
http://127.0.0.1:8000/api/
```

## Recommendation API

```txt
http://127.0.0.1:8000/api/recommend/
```

---

# ▶️ How to Run Backend Server

```bash
# Move to backend folder
cd backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

# 📥 Sample API Request

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

# 📤 Sample API Response

```json
{
  "status": "success",
  "recommended_loans": [
    "Mudra Loan",
    "Working Capital Loan",
    "Retail Business Loan"
  ]
}
```

---

# 🧠 Recommendation Logic

The recommendation engine works using:
- Rule-based filtering
- Business category matching
- Loan eligibility checking
- Owner category analysis
- Startup eligibility logic

---

# 📊 Features

✅ MSME Loan Recommendation  
✅ Women Entrepreneur Loan Support  
✅ SC/ST Startup Scheme Support  
✅ Startup India Loan Detection  
✅ Manufacturing Loan Recommendation  
✅ Service Sector Loan Matching  
✅ REST API Support  
✅ Easy JSON Integration  
✅ Scalable Architecture  

---

# 🔐 Future Enhancements

- AI/ML Based Recommendation Engine
- Credit Score Analysis
- Loan Approval Prediction
- Bank Integration
- User Authentication
- Admin Dashboard
- Loan Comparison System
- Chatbot Assistance

---

# 🧪 API Testing Using Python

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

print(response.json())
```

---

# 🧪 API Testing Using cURL

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

# 📸 Screenshots Section

## Homepage UI
```md
(Add Homepage Screenshot Here)
```

## API Response
```md
(Add API Response Screenshot Here)
```

## Loan Recommendation Result
```md
(Add Recommendation Output Screenshot Here)
```

---

# 👨‍💻 Developed By

**Rohit Kumar | P Nikhil Pavan | Deepak Tiwari | Shivansh Mishra**

Full Stack Developer  
MERN Stack | Django | React.js | REST API

---

# 📄 License

This project is developed for educational and academic purposes.