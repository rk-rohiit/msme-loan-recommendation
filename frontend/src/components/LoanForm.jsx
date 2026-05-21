import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Stack,
  Divider,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Tooltip,
  Chip,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import InfoOutlinedIcon        from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon        from "@mui/icons-material/ArrowForward";
import ArrowBackIcon           from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon         from "@mui/icons-material/AutoAwesome";
import StorefrontIcon          from "@mui/icons-material/Storefront";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import WomanIcon               from "@mui/icons-material/Woman";
import GroupsIcon              from "@mui/icons-material/Groups";
import PersonIcon              from "@mui/icons-material/Person";
import CheckIcon               from "@mui/icons-material/Check";
import LockOutlinedIcon        from "@mui/icons-material/LockOutlined";

import API      from "../services/api";
import LoanCard from "./LoanCard";

// ─── THEME TOKENS (mirrors theme.js) ──────────────────────────────
const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const NAVY       = "#0A0F1E";
const NAVY_2     = "#0F1629";
const SURFACE    = "#1A2340";
const SURFACE_2  = "#1F2A4A";
const BORDER     = "#2A3558";
const TEXT_PRI   = "#F0EDE6";
const TEXT_SEC   = "#8A94AF";
const TEXT_MUTED = "#4A5578";

// ─── STEP CONFIG ──────────────────────────────────────────────────
const STEPS = ["Loan Basics", "Business Profile", "Owner Details"];

// ─── BUSINESS TYPE OPTIONS ────────────────────────────────────────
const BUSINESS_TYPES = [
  { value: "Trading",       icon: <StorefrontIcon />,              desc: "Buy & sell goods"     },
  { value: "Service",       icon: <MiscellaneousServicesIcon />,   desc: "Skill-based services" },
  { value: "Manufacturing", icon: <PrecisionManufacturingIcon />,  desc: "Produce goods"        },
];

// ─── OWNER CATEGORY OPTIONS ───────────────────────────────────────
const OWNER_CATEGORIES = [
  { value: "Women",   label: "Women Entrepreneur",  icon: <WomanIcon />,  badge: "Priority Scheme"  },
  { value: "SC/ST",   label: "SC / ST Entrepreneur",icon: <GroupsIcon />, badge: "Subsidised Rate"  },
  { value: "General", label: "General Category",    icon: <PersonIcon />, badge: "Standard Scheme"  },
];

// ─── COMPONENT ────────────────────────────────────────────────────
const LoanForm = () => {
  const theme  = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [formData,   setFormData]   = useState({
    business_type: "", turnover: "", loan_amount: "",
    owner_category: "", years_in_business: "",
  });
  const [result,  setResult]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);
  const [errors,  setErrors]  = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p  => ({ ...p, [name]: "" }));
  };
  const handleSelect = (field, value) => {
    setFormData(p => ({ ...p, [field]: value }));
    setErrors(p  => ({ ...p, [field]: "" }));
  };

  const validateStep = (step) => {
    const e = {};
    if (step === 0) {
      if (!formData.loan_amount)           e.loan_amount = "Required";
      else if (Number(formData.loan_amount) <= 0) e.loan_amount = "Must be > 0";
      if (!formData.turnover)              e.turnover = "Required";
      else if (Number(formData.turnover) <= 0)    e.turnover = "Must be > 0";
    }
    if (step === 1) {
      if (!formData.business_type)         e.business_type = "Please select a type";
      if (!formData.years_in_business)     e.years_in_business = "Required";
      else if (Number(formData.years_in_business) < 0) e.years_in_business = "Cannot be negative";
    }
    if (step === 2) {
      if (!formData.owner_category)        e.owner_category = "Please select one";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep(activeStep)) setActiveStep(s => s + 1); };
  const handleBack = () => setActiveStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    try {
      setLoading(true);
      const payload = {
        business_type:     formData.business_type,
        turnover:          Number(formData.turnover),
        loan_amount:       Number(formData.loan_amount),
        owner_category:    formData.owner_category,
        years_in_business: Number(formData.years_in_business),
      };
      const res = await API.post("/api/recommend/", payload);
      setResult(res.data.data || []);
      setOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (activeStep / (STEPS.length - 1)) * 100;

  // ─── STEP CONTENT ───────────────────────────────────────────
  const renderStep = () => {
    if (activeStep === 0) return (
      <Box>
        <StepHeading
          label="Step 01"
          title="Financing Requirements"
          subtitle="Provide the loan amount you seek and your annual business turnover."
        />
        <Stack spacing={2.5} mt={3.5}>
          <GoldAmountField
            label="Loan Amount Required"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            error={errors.loan_amount}
            helper="e.g. 5 = ₹5 Lakhs"
            tooltip="The maximum loan amount you are applying for"
          />
          <GoldAmountField
            label="Annual Business Turnover"
            name="turnover"
            value={formData.turnover}
            onChange={handleChange}
            error={errors.turnover}
            helper="e.g. 20 = ₹20 Lakhs"
            tooltip="Total revenue in your last financial year"
          />
        </Stack>
      </Box>
    );

    if (activeStep === 1) return (
      <Box>
        <StepHeading
          label="Step 02"
          title="Business Profile"
          subtitle="Select your business category and years of operation."
        />
        <Stack spacing={3} mt={3.5}>
          <Box>
            <FieldLabel label="Business Type" error={errors.business_type} />
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap mt={1}>
              {BUSINESS_TYPES.map(t => (
                <BusinessTypeCard
                  key={t.value}
                  item={t}
                  selected={formData.business_type === t.value}
                  onSelect={() => handleSelect("business_type", t.value)}
                />
              ))}
            </Stack>
            {errors.business_type && <ErrMsg msg={errors.business_type} />}
          </Box>

          <TextField
            fullWidth
            type="number"
            label="Years in Business"
            name="years_in_business"
            value={formData.years_in_business}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            error={!!errors.years_in_business}
            helperText={errors.years_in_business || "Total years your business has been operational"}
          />
        </Stack>
      </Box>
    );

    if (activeStep === 2) return (
      <Box>
        <StepHeading
          label="Step 03"
          title="Owner Category"
          subtitle="Your category determines subsidy eligibility and interest concessions."
        />
        <Stack spacing={1.5} mt={3.5}>
          {OWNER_CATEGORIES.map(cat => (
            <OwnerCategoryCard
              key={cat.value}
              item={cat}
              selected={formData.owner_category === cat.value}
              onSelect={() => handleSelect("owner_category", cat.value)}
            />
          ))}
          {errors.owner_category && <ErrMsg msg={errors.owner_category} />}
        </Stack>
      </Box>
    );
  };

  return (
    <>
      {/* ── FORM CARD ── */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          borderRadius: "16px",
          overflow: "hidden",
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* Gold top bar */}
        <Box sx={{ height: 3, background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})` }} />

        {/* Header */}
        <Box
          sx={{
            px: { xs: 3, md: 4 },
            pt: 3,
            pb: 2.5,
            background: `linear-gradient(180deg, ${alpha(GOLD, 0.06)} 0%, transparent 100%)`,
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography
                variant="overline"
                sx={{ color: GOLD, letterSpacing: "0.15em", fontSize: "0.68rem", fontWeight: 700 }}
              >
                Government of India · MSME Portal
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: TEXT_PRI, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, mt: 0.3 }}
              >
                Loan Recommendation
              </Typography>
            </Box>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: 13, color: `${GOLD} !important` }} />}
              label="AI Powered"
              size="small"
              sx={{
                bgcolor: alpha(GOLD, 0.1),
                color: GOLD,
                border: `1px solid ${alpha(GOLD, 0.3)}`,
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.05em",
              }}
            />
          </Stack>
        </Box>

        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 2,
            bgcolor: alpha(GOLD, 0.08),
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
              transition: "transform 0.6s ease",
            },
          }}
        />

        {/* Stepper */}
        <Box sx={{ px: { xs: 3, md: 4 }, pt: 2.5 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepConnector-line": { borderColor: BORDER },
              "& .MuiStepLabel-label": { color: TEXT_MUTED, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", mt: 0.5 },
              "& .MuiStepLabel-label.Mui-active": { color: GOLD },
              "& .MuiStepLabel-label.Mui-completed": { color: alpha(GOLD, 0.6) },
              "& .MuiStepIcon-root": { color: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: "50%" },
              "& .MuiStepIcon-root.Mui-active": { color: GOLD },
              "& .MuiStepIcon-root.Mui-completed": { color: alpha(GOLD, 0.6) },
              "& .MuiStepIcon-text": { fill: NAVY, fontWeight: 700, fontSize: "0.65rem" },
            }}
          >
            {STEPS.map(label => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ mt: 2.5, borderColor: BORDER }} />

        {/* Step Content */}
        <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>{renderStep()}</Box>

        {/* Navigation */}
        <Box
          sx={{
            px: { xs: 3, md: 4 },
            pb: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: BORDER,
              color: TEXT_SEC,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { borderColor: alpha(GOLD, 0.4), color: GOLD, bgcolor: alpha(GOLD, 0.04) },
              "&.Mui-disabled": { borderColor: alpha(BORDER, 0.4), color: alpha(TEXT_MUTED, 0.4) },
            }}
          >
            Back
          </Button>

          {activeStep < STEPS.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                color: NAVY,
                fontWeight: 700,
                borderRadius: "8px",
                textTransform: "none",
                px: 3.5,
                boxShadow: `0 4px 20px ${alpha(GOLD, 0.3)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                  boxShadow: `0 6px 24px ${alpha(GOLD, 0.45)}`,
                },
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              endIcon={loading
                ? <CircularProgress size={16} sx={{ color: NAVY }} />
                : <AutoAwesomeIcon />}
              sx={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                color: NAVY,
                fontWeight: 700,
                borderRadius: "8px",
                textTransform: "none",
                px: 3.5,
                boxShadow: `0 4px 20px ${alpha(GOLD, 0.3)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                  boxShadow: `0 6px 24px ${alpha(GOLD, 0.45)}`,
                },
                "&.Mui-disabled": { opacity: 0.5 },
              }}
            >
              {loading ? "Analysing Profile…" : "Get Recommendations"}
            </Button>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 4,
            py: 1.5,
            borderTop: `1px solid ${BORDER}`,
            background: alpha(NAVY_2, 0.6),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 11, color: TEXT_MUTED }} />
          <Typography variant="caption" sx={{ color: TEXT_MUTED, letterSpacing: "0.05em" }}>
            Secure & Confidential · MSME India
          </Typography>
        </Box>
      </Box>

      {/* ── RESULTS MODAL ── */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          },
        }}
      >
        <Box sx={{ height: 3, background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})` }} />
        <DialogTitle
          sx={{
            background: `linear-gradient(180deg, ${alpha(GOLD, 0.06)} 0%, transparent 100%)`,
            borderBottom: `1px solid ${BORDER}`,
            pb: 2,
          }}
        >
          <Typography variant="overline" sx={{ color: GOLD, fontSize: "0.65rem", letterSpacing: "0.15em" }}>
            AI Recommendation Engine
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: TEXT_PRI, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, mt: 0.3 }}
          >
            Best Matched Schemes
          </Typography>
          <Typography variant="body2" sx={{ color: TEXT_SEC, mt: 0.3, fontSize: "0.8rem" }}>
            Ranked by eligibility score based on your business profile
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, background: SURFACE }}>
          {result.length > 0 ? (
            result.map((loan, index) => (
              <LoanCard
                key={index}
                loan={loan}
                isBest={index === 0}
                onClose={() => setOpen(false)}
                formData={formData}
              />
            ))
          ) : (
            <Typography textAlign="center" py={6} sx={{ color: TEXT_SEC }}>
              No matching loan schemes found for your profile.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// ─── STEP HEADING ─────────────────────────────────────────────────
const StepHeading = ({ label, title, subtitle }) => (
  <Box>
    <Typography
      variant="overline"
      sx={{ color: GOLD, fontSize: "0.65rem", letterSpacing: "0.15em", fontWeight: 700 }}
    >
      {label}
    </Typography>
    <Typography
      variant="h5"
      sx={{ color: TEXT_PRI, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, mt: 0.2, lineHeight: 1.3 }}
    >
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: TEXT_SEC, mt: 0.5, fontSize: "0.82rem" }}>
      {subtitle}
    </Typography>
  </Box>
);

// ─── FIELD LABEL ──────────────────────────────────────────────────
const FieldLabel = ({ label, error }) => (
  <Typography
    variant="body2"
    sx={{ fontWeight: 600, fontSize: "0.78rem", color: error ? "error.main" : TEXT_SEC, letterSpacing: "0.04em" }}
  >
    {label.toUpperCase()}
  </Typography>
);

// ─── ERROR MESSAGE ────────────────────────────────────────────────
const ErrMsg = ({ msg }) => (
  <Typography variant="caption" color="error" mt={0.5} display="block">{msg}</Typography>
);

// ─── GOLD AMOUNT FIELD ────────────────────────────────────────────
const GoldAmountField = ({ label, name, value, onChange, error, helper, tooltip }) => (
  <TextField
    fullWidth
    type="number"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error || helper}
    inputProps={{ min: 0 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: "0.95rem" }}>₹</Typography>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ color: TEXT_MUTED }}>Lakhs</Typography>
            <Tooltip title={tooltip} arrow>
              <InfoOutlinedIcon sx={{ fontSize: 15, color: TEXT_MUTED, cursor: "pointer", "&:hover": { color: GOLD } }} />
            </Tooltip>
          </Stack>
        </InputAdornment>
      ),
    }}
  />
);

// ─── BUSINESS TYPE CARD ───────────────────────────────────────────
const BusinessTypeCard = ({ item, selected, onSelect }) => (
  <Box
    onClick={onSelect}
    sx={{
      flex: "1 1 130px",
      minWidth: 120,
      p: 2,
      borderRadius: "10px",
      cursor: "pointer",
      border: `1px solid ${selected ? GOLD : BORDER}`,
      background: selected ? alpha(GOLD, 0.08) : "transparent",
      textAlign: "center",
      transition: "all 0.2s ease",
      position: "relative",
      "&:hover": {
        borderColor: alpha(GOLD, 0.6),
        background: alpha(GOLD, 0.04),
        transform: "translateY(-2px)",
      },
    }}
  >
    {selected && (
      <Box
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 16,
          height: 16,
          borderRadius: "50%",
          bgcolor: GOLD,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckIcon sx={{ fontSize: 10, color: NAVY }} />
      </Box>
    )}
    <Box sx={{ color: selected ? GOLD : TEXT_MUTED, mb: 0.75, "& svg": { fontSize: 24 } }}>
      {item.icon}
    </Box>
    <Typography
      variant="body2"
      sx={{ fontWeight: 700, color: selected ? GOLD : TEXT_PRI, fontSize: "0.82rem" }}
    >
      {item.value}
    </Typography>
    <Typography variant="caption" sx={{ color: TEXT_MUTED, fontSize: "0.68rem" }}>
      {item.desc}
    </Typography>
  </Box>
);

// ─── OWNER CATEGORY CARD ──────────────────────────────────────────
const OwnerCategoryCard = ({ item, selected, onSelect }) => (
  <Box
    onClick={onSelect}
    sx={{
      p: 2,
      borderRadius: "10px",
      cursor: "pointer",
      border: `1px solid ${selected ? GOLD : BORDER}`,
      background: selected ? alpha(GOLD, 0.07) : "transparent",
      display: "flex",
      alignItems: "center",
      gap: 2,
      transition: "all 0.2s ease",
      "&:hover": { borderColor: alpha(GOLD, 0.5), background: alpha(GOLD, 0.04) },
    }}
  >
    {/* Icon circle */}
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: selected ? GOLD : alpha(GOLD, 0.1),
        border: `1px solid ${selected ? GOLD : alpha(GOLD, 0.25)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: selected ? NAVY : GOLD,
        flexShrink: 0,
        transition: "all 0.2s",
        "& svg": { fontSize: 20 },
      }}
    >
      {item.icon}
    </Box>

    <Box flex={1}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: selected ? GOLD : TEXT_PRI, fontSize: "0.88rem" }}>
        {item.label}
      </Typography>
    </Box>

    {/* Badge */}
    <Box
      sx={{
        px: 1.2,
        py: 0.3,
        borderRadius: "20px",
        bgcolor: alpha(GOLD, 0.1),
        border: `1px solid ${alpha(GOLD, 0.25)}`,
      }}
    >
      <Typography variant="caption" sx={{ color: GOLD, fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.06em" }}>
        {item.badge}
      </Typography>
    </Box>

    {/* Check */}
    {selected && (
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          bgcolor: GOLD,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CheckIcon sx={{ fontSize: 12, color: NAVY }} />
      </Box>
    )}
  </Box>
);

export default LoanForm;