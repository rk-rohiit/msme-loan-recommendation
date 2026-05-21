import pandas as pd
import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =====================================
# CSV PATH
# =====================================

csv_path = os.path.join(
    BASE_DIR,
    "msme_loan_dataset.csv"
)

# =====================================
# MODEL PATH
# =====================================

model_path = os.path.join(
    BASE_DIR,
    "loan_model.pkl"
)


# =====================================
# TRAIN MODEL
# =====================================

def train_model():

    # Load dataset
    df = pd.read_csv(csv_path)

    print("Dataset Loaded Successfully")

    # =====================================
    # LABEL ENCODING
    # =====================================

    business_encoder = LabelEncoder()

    target_encoder = LabelEncoder()

    df["business_type"] = pd.Series(
        business_encoder.fit_transform(df["business_type"]),
        index=df.index,
    )

    df["loan_scheme"] = pd.Series(
        target_encoder.fit_transform(df["loan_scheme"]),
        index=df.index,
    )

    # =====================================
    # FEATURES
    # =====================================

    X = df[[
        "business_type",
        "turnover",
        "loan_amount"
    ]]

    y = df["loan_scheme"]

    # =====================================
    # TRAIN RANDOM FOREST MODEL
    # =====================================

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    model.fit(X, y)

    # =====================================
    # SAVE MODEL FILES
    # =====================================

    joblib.dump(model, model_path)

    joblib.dump(
        business_encoder,
        os.path.join(
            BASE_DIR,
            "business_encoder.pkl"
        )
    )

    joblib.dump(
        target_encoder,
        os.path.join(
            BASE_DIR,
            "target_encoder.pkl"
        )
    )

    print("Model Trained Successfully")


# =====================================
# TRAIN MODEL IF NOT EXISTS
# =====================================

if not os.path.exists(model_path):

    print("Training new model...")

    train_model()


# =====================================
# LOAD MODEL FILES
# =====================================

model = joblib.load(model_path)

business_encoder = joblib.load(
    os.path.join(
        BASE_DIR,
        "business_encoder.pkl"
    )
)

target_encoder = joblib.load(
    os.path.join(
        BASE_DIR,
        "target_encoder.pkl"
    )
)


# =====================================
# PREDICT LOAN FUNCTION
# =====================================

def predict_loan(user_data):

    input_data = pd.DataFrame([{

        "business_type":
            business_encoder.transform([
                user_data["business_type"]
            ])[0],

        "turnover":
            user_data["turnover"],

        "loan_amount":
            user_data["loan_amount"]
    }])

    prediction = model.predict(input_data)

    predicted_scheme = (
        target_encoder.inverse_transform(
            prediction
        )[0]
    )

    return predicted_scheme