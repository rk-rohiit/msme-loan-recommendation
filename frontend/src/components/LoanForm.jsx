import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import API from "../services/api";
import LoanCard from "./LoanCard";

const LoanForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    business_type: "",
    turnover: "",
    loan_amount: "",
    owner_category: "",
    years_in_business: "",
  });

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // 🔥 popup control

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key]) return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/recommend/", formData);

      const data = res.data.data || [];

      setResult(data);
      setOpen(true); // 🔥 open popup
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FORM CONTAINER */}
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" mb={2}>
          Enter Details
        </Typography>

        <TextField fullWidth label="Loan Amount" name="loan_amount" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Turnover" name="turnover" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Years in Business" name="years_in_business" margin="normal" onChange={handleChange} />

        <TextField select fullWidth label="Business Type" name="business_type" margin="normal" onChange={handleChange}>
          <MenuItem value="Service">Service</MenuItem>
          <MenuItem value="Retail">Retail</MenuItem>
          <MenuItem value="Manufacturing">Manufacturing</MenuItem>
        </TextField>

        <TextField select fullWidth label="Owner Category" name="owner_category" margin="normal" onChange={handleChange}>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="SC">SC</MenuItem>
          <MenuItem value="ST">ST</MenuItem>
          <MenuItem value="General">General</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Get Recommendation"}
        </Button>
      </Box>

      {/* 🔥 POPUP MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          🎯 Best Loan Recommendations
        </DialogTitle>

        <DialogContent>
          {result.length > 0 ? (
            result.map((loan, index) => (
              <LoanCard
                key={index}
                loan={loan}
                isBest={index === 0}
                onClose={()=>setOpen(false)}
              />
            ))
          ) : (
            <Typography>No results found</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanForm;