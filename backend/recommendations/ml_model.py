import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "Loan_Prediction_Dataset.csv")


def train_model():
    df = pd.read_csv(csv_path)

    print("Dataset Loaded Successfully")

    # Rename columns
    df.rename(columns={
        "ApplicantIncome": "turnover",
        "LoanAmount": "loan_amount",
        "Loan_Amount_Term": "loan_tenure",
        "Property_Area": "location"
    }, inplace=True)

    # Handle missing values
    df["loan_amount"] = df["loan_amount"].fillna(df["loan_amount"].mean())

    # 🔥 Add MSME fields
    df["business_type"] = np.random.choice(
        ["Manufacturing", "Service", "Trading"], len(df)
    )
    df["owner_category"] = np.random.choice(
        ["General", "Women", "SC/ST"], len(df)
    )
    df["years_in_business"] = np.random.randint(1, 10, len(df))

    #  Create Loan Scheme (TARGET)
    def assign_scheme(row):
        if row["loan_amount"] <= 10:
            return "MUDRA"
        elif row["owner_category"] in ["Women", "SC/ST"]:
         return "Stand-Up India"
        elif row["years_in_business"] < 3:
            return "Startup India"
        else:
            return "PMEGP"

    df["loan_scheme"] = df.apply(assign_scheme, axis=1)

    # Encode categorical
    business_map = {"Manufacturing": 0, "Service": 1, "Trading": 2}
    owner_map = {"General": 0, "Women": 1, "SC/ST": 2}

    df["business_type"] = df["business_type"].map(business_map)
    df["owner_category"] = df["owner_category"].map(owner_map)

    # Features & Target
    X = df[[
        "business_type",
        "turnover",
        "loan_amount",
        "owner_category",
        "years_in_business"
    ]]

    y = df["loan_scheme"]

    model = RandomForestClassifier()
    model.fit(X, y)

    return model


# Train model
model = train_model()


#  Prediction function
def predict_loan(user_data):
    business_map = {"Manufacturing": 0, "Service": 1, "Trading": 2}
    owner_map = {"General": 0, "Women": 1, "SC/ST": 2}

    #  IMPORTANT: Convert ₹ → Lakhs for ML
    loan_amount_lakh = user_data["loan_amount"] / 100000
    turnover_lakh = user_data["turnover"] / 100000

    input_data = pd.DataFrame([{
        "business_type": business_map.get(user_data["business_type"], 0),
        "turnover": turnover_lakh,
        "loan_amount": loan_amount_lakh,
        "owner_category": owner_map.get(user_data["owner_category"], 0),
        "years_in_business": user_data["years_in_business"]
    }])

    return model.predict(input_data)[0]