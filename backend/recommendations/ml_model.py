import pandas as pd
import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =====================================
# CSV PATH
# =====================================

csv_path = os.path.join(
    BASE_DIR,
    "Loan_Prediction_Dataset.csv"
)

# =====================================
# MODEL PATH
# =====================================

model_path = os.path.join(
    BASE_DIR,
    "loan_prediction_model.pkl"
)

# =====================================
# TRAIN MODEL
# =====================================

def train_model():

    # LOAD DATASET
    df = pd.read_csv(csv_path)

    print("\n✅ Dataset Loaded Successfully\n")

    # =====================================
    # DROP LOAN ID
    # =====================================

    if "Loan_ID" in df.columns:
        df.drop("Loan_ID", axis=1, inplace=True)

    # =====================================
    # HANDLE MISSING VALUES
    # =====================================

    df = df.ffill()

    # =====================================
    # LABEL ENCODING
    # =====================================

    encoders = {}

    categorical_columns = [
        "Gender",
        "Married",
        "Dependents",
        "Education",
        "Self_Employed",
        "Property_Area",
        "Loan_Status"
    ]

    for col in categorical_columns:

        encoder = LabelEncoder()

        df[col] = pd.Series(
            encoder.fit_transform(df[col]),
            index=df.index
        )

        encoders[col] = encoder

    # =====================================
    # FEATURES
    # =====================================

    X = df[
        [
            "Gender",
            "Married",
            "Dependents",
            "Education",
            "Self_Employed",
            "ApplicantIncome",
            "CoapplicantIncome",
            "LoanAmount",
            "Loan_Amount_Term",
            "Credit_History",
            "Property_Area"
        ]
    ]

    # TARGET
    y = df["Loan_Status"]

    # =====================================
    # TRAIN TEST SPLIT
    # =====================================

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    print("===================================")
    print("📊 TRAIN TEST SPLIT")
    print("===================================")

    print(f"📁 Total Dataset Size : {len(df)}")
    print(f"🧠 Training Data Size : {len(X_train)}")
    print(f"🧪 Testing Data Size  : {len(X_test)}")

    # =====================================
    # RANDOM FOREST MODEL
    # =====================================

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=10,
        random_state=42
    )

    # TRAIN
    model.fit(X_train, y_train)

    print("\n✅ Model Trained Successfully")

    # =====================================
    # PREDICTION
    # =====================================

    y_pred = model.predict(X_test)

    # =====================================
    # ACCURACY
    # =====================================

    accuracy = accuracy_score(y_test, y_pred)

    print("\n===================================")
    print("🎯 MODEL ACCURACY")
    print("===================================")

    print(f"✅ Accuracy Score : {accuracy * 100:.2f}%")

    # =====================================
    # CLASSIFICATION REPORT
    # =====================================

    print("\n===================================")
    print("📊 CLASSIFICATION REPORT")
    print("===================================")

    print(
        classification_report(
            y_test,
            y_pred,
            zero_division=0
        )
    )

    # =====================================
    # SAVE MODEL
    # =====================================

    joblib.dump(model, model_path)

    joblib.dump(
        encoders,
        os.path.join(
            BASE_DIR,
            "loan_encoders.pkl"
        )
    )

    print("\n✅ Model Saved Successfully")

# =====================================
# TRAIN MODEL IF NOT EXISTS
# =====================================

if not os.path.exists(model_path):

    print("🚀 Training New Model...\n")

    train_model()

# =====================================
# LOAD MODEL & ENCODERS
# =====================================

model = joblib.load(model_path)

encoders = joblib.load(
    os.path.join(
        BASE_DIR,
        "loan_encoders.pkl"
    )
)

# =====================================
# PREDICT LOAN APPROVAL
# =====================================

def predict_loan(user_data):

    input_data = pd.DataFrame([{

        "Gender":
            encoders["Gender"].transform([
                user_data["Gender"]
            ])[0],

        "Married":
            encoders["Married"].transform([
                user_data["Married"]
            ])[0],

        "Dependents":
            encoders["Dependents"].transform([
                user_data["Dependents"]
            ])[0],

        "Education":
            encoders["Education"].transform([
                user_data["Education"]
            ])[0],

        "Self_Employed":
            encoders["Self_Employed"].transform([
                user_data["Self_Employed"]
            ])[0],

        "ApplicantIncome":
            user_data["ApplicantIncome"],

        "CoapplicantIncome":
            user_data["CoapplicantIncome"],

        "LoanAmount":
            user_data["LoanAmount"],

        "Loan_Amount_Term":
            user_data["Loan_Amount_Term"],

        "Credit_History":
            user_data["Credit_History"],

        "Property_Area":
            encoders["Property_Area"].transform([
                user_data["Property_Area"]
            ])[0]
    }])

    # =====================================
    # PREDICT
    # =====================================

    prediction = model.predict(input_data)

    result = encoders[
        "Loan_Status"
    ].inverse_transform(prediction)[0]

    return result