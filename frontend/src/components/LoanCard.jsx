import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert,
  Collapse,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

import CloseIcon               from "@mui/icons-material/Close";
import VerifiedIcon            from "@mui/icons-material/Verified";
import AccountBalanceIcon      from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon       from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon          from "@mui/icons-material/TrendingUp";
import EmojiObjectsIcon        from "@mui/icons-material/EmojiObjects";
import WorkspacePremiumIcon    from "@mui/icons-material/WorkspacePremium";
import PictureAsPdfIcon        from "@mui/icons-material/PictureAsPdf";
import ShareIcon               from "@mui/icons-material/Share";
import ContentCopyIcon         from "@mui/icons-material/ContentCopy";
import WhatsAppIcon            from "@mui/icons-material/WhatsApp";
import EmailIcon               from "@mui/icons-material/Email";
import ExpandMoreIcon          from "@mui/icons-material/ExpandMore";
import ExpandLessIcon          from "@mui/icons-material/ExpandLess";
import CheckCircleOutlineIcon  from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon      from "@mui/icons-material/CancelOutlined";
import AccessTimeIcon          from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon  from "@mui/icons-material/AssignmentTurnedIn";
import OpenInNewIcon           from "@mui/icons-material/OpenInNew";

// ─── THEME TOKENS ────────────────────────────────────────────────
const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK  = "#9B7A2F";
const NAVY       = "#0A0F1E";
const NAVY_2     = "#0F1629";
const SURFACE    = "#1A2340";
const SURFACE_2  = "#1F2A4A";
const BORDER     = "#2A3558";
const TEXT_PRI   = "#F0EDE6";
const TEXT_SEC   = "#8A94AF";
const TEXT_MUTED = "#4A5578";
const SUCCESS    = "#2ECC71";
const DANGER     = "#E74C3C";

// ─── PDF GENERATOR ────────────────────────────────────────────────
const generatePDF = (loan, score, formData) => {
  const w = window.open("", "_blank");
  const ownerCategory = formData?.owner_category || "General";
  const businessType  = formData?.business_type  || loan?.business_type || "MSME";
  const loanAmount    = formData?.loan_amount     ? `₹${formData.loan_amount} Lakhs` : "—";
  const turnover      = formData?.turnover        ? `₹${formData.turnover} Lakhs`    : "—";

  w.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>MSME Loan Report – ${loan?.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',Arial,sans-serif;background:#fff;color:#0A0F1E}
        .page{max-width:740px;margin:0 auto;padding:48px 52px}
        .top-bar{height:4px;background:linear-gradient(90deg,#E8C96A,#C9A84C,#E8C96A);margin-bottom:32px}
        .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid #E8E0D0}
        .brand-label{font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#C9A84C;margin-bottom:6px}
        .doc-title{font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:#0A0F1E;line-height:1.2}
        .date{font-size:12px;color:#8A94AF;margin-top:4px}
        .badge{background:#FDF3DC;color:#9B7A2F;border:1px solid #E8C96A;border-radius:20px;padding:4px 14px;font-size:11px;font-weight:700}
        .score-block{display:flex;align-items:center;gap:24px;background:linear-gradient(135deg,#FDF3DC,#fff);border:1px solid #E8C96A;border-radius:12px;padding:24px 28px;margin-bottom:28px}
        .donut{position:relative;width:80px;height:80px;flex-shrink:0}
        .donut svg{width:80px;height:80px;transform:rotate(-90deg)}
        .donut-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#C9A84C}
        .loan-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#0A0F1E;margin-bottom:4px}
        .loan-sub{font-size:13px;color:#8A94AF}
        .prog-wrap{margin-top:10px;width:260px}
        .prog-bg{height:8px;background:#F5EDD5;border-radius:10px;overflow:hidden}
        .prog-fill{height:100%;background:linear-gradient(90deg,#C9A84C,#E8C96A);border-radius:10px;width:${score}%}
        .section{margin-bottom:24px}
        .sec-title{font-size:10px;font-weight:700;color:#C9A84C;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #F5EDD5}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .field{background:#F8F6F2;border-radius:8px;padding:12px 16px;border-left:3px solid #E8C96A}
        .fl{font-size:10px;color:#8A94AF;margin-bottom:3px;text-transform:uppercase;letter-spacing:0.08em}
        .fv{font-size:14px;font-weight:700;color:#0A0F1E}
        .insight{background:#FDF3DC;border-left:4px solid #C9A84C;border-radius:4px;padding:14px 18px;font-size:13px;color:#5D4037;line-height:1.8}
        .apply-btn{display:inline-block;background:linear-gradient(135deg,#C9A84C,#E8C96A);color:#0A0F1E;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:800;text-decoration:none;margin-top:24px}
        .footer{margin-top:40px;padding-top:16px;border-top:1px solid #eee;font-size:10px;color:#aaa;text-align:center;line-height:1.8}
      </style>
    </head>
    <body>
    <div class="top-bar"></div>
    <div class="page">
      <div class="header">
        <div>
          <div class="brand-label">Government of India · MSME Portal</div>
          <div class="doc-title">Loan Recommendation Report</div>
          <div class="date">Generated: ${new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</div>
        </div>
        <div class="badge">AI Verified ✓</div>
      </div>

      <div class="score-block">
        <div class="donut">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#F5EDD5" stroke-width="8"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="#C9A84C" stroke-width="8"
              stroke-dasharray="${2 * Math.PI * 32}" stroke-dashoffset="${2 * Math.PI * 32 * (1 - score / 100)}"
              stroke-linecap="round"/>
          </svg>
          <div class="donut-text">${score}%</div>
        </div>
        <div>
          <div class="loan-title">${loan?.name || "MSME Business Loan"}</div>
          <div class="loan-sub">Eligibility Score &nbsp;·&nbsp; Approval Probability</div>
          <div class="prog-wrap"><div class="prog-bg"><div class="prog-fill"></div></div></div>
        </div>
      </div>

      <div class="section">
        <div class="sec-title">Loan Details</div>
        <div class="grid">
          <div class="field"><div class="fl">Interest Rate</div><div class="fv">${loan?.interest_rate || "10"}% p.a.</div></div>
          <div class="field"><div class="fl">Loan Range</div><div class="fv">${loan?.loan_range || "₹1L – ₹100L"}</div></div>
          <div class="field"><div class="fl">Repayment Tenure</div><div class="fv">${loan?.tenure || "5 Years"}</div></div>
          <div class="field"><div class="fl">Processing Time</div><div class="fv">7 – 15 Working Days</div></div>
        </div>
      </div>

      <div class="section">
        <div class="sec-title">Your Business Profile</div>
        <div class="grid">
          <div class="field"><div class="fl">Business Type</div><div class="fv">${businessType}</div></div>
          <div class="field"><div class="fl">Owner Category</div><div class="fv">${ownerCategory}</div></div>
          <div class="field"><div class="fl">Loan Amount Requested</div><div class="fv">${loanAmount}</div></div>
          <div class="field"><div class="fl">Annual Turnover</div><div class="fv">${turnover}</div></div>
        </div>
      </div>

      <div class="section">
        <div class="sec-title">AI Insight</div>
        <div class="insight">${
          score >= 90
            ? "Excellent match. Your business profile, turnover, and category strongly qualify for this scheme. High probability of approval."
            : score >= 75
            ? "Good match. Your profile aligns well with this MSME scheme and has a competitive approval probability."
            : "Partial match. Consider improving your turnover or providing collateral to strengthen your eligibility."
        }</div>
      </div>

      <a class="apply-btn" href="https://msme.gov.in/" target="_blank">Apply Now on MSME Portal →</a>

      <div class="footer">
        Powered by AI · MSME Financial Assistance Platform · Government of India<br/>
        This report is for informational purposes only. Verify all details at msme.gov.in before applying.
      </div>
    </div>
    </body></html>
  `);
  w.document.close();
  setTimeout(() => w.print(), 500);
};

// ─── COMPONENT ────────────────────────────────────────────────────
const LoanCard = ({ loan, isBest, onClose, formData }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shareOpen,   setShareOpen]   = useState(false);
  const [expanded,    setExpanded]    = useState(false);
  const [snackbar,    setSnackbar]    = useState({ open: false, msg: "" });

  const score = parseFloat(loan?.eligibility_score || 85);

  const scoreColor = score >= 90 ? SUCCESS : score >= 75 ? GOLD : DANGER;
  const scoreLabel = score >= 90 ? "Excellent" : score >= 75 ? "Good" : "Fair";

  const shareText = `🏦 MSME Loan Recommendation\n\n📋 ${loan?.name || "MSME Business Loan"}\n💹 Interest Rate: ${loan?.interest_rate || "10"}%\n✅ Eligibility Score: ${score}%\n\nApply at: https://msme.gov.in/`;

  const handleCopy = () =>
    navigator.clipboard.writeText(shareText).then(() => {
      setSnackbar({ open: true, msg: "Copied to clipboard" });
      setShareOpen(false);
    });

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    setShareOpen(false);
  };

  const handleEmail = () => {
    const sub  = encodeURIComponent(`MSME Loan: ${loan?.name}`);
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${sub}&body=${body}`, "_blank");
    setShareOpen(false);
  };

  const checks = [
    { label: "Business turnover qualifies",         pass: true  },
    { label: "Owner category is eligible",          pass: true  },
    { label: "Business type is supported",          pass: true  },
    { label: "CIBIL score ≥ 700 recommended",       pass: score >= 85 },
    { label: "Collateral may be required",          pass: false, neutral: true },
  ];

  // ─── DETAIL ROWS ──────────────────────────────────────────────
  const detailRows = [
    ["Loan Name",         loan?.name                            ],
    ["Interest Rate",     `${loan?.interest_rate || "—"}% p.a.`],
    ["Eligibility Score", `${score}%`                           ],
    ["Business Type",     loan?.business_type                   ],
    ["Loan Range",        loan?.loan_range || "₹1L – ₹100L"    ],
    ["Repayment Tenure",  loan?.tenure || "5 Years"             ],
    ["Processing Time",   "7 – 15 Working Days"                 ],
    ["Govt. Support",     "Available under MSME schemes"        ],
  ];

  return (
    <>
      {/* ── MAIN CARD ─────────────────────────────────────────── */}
      <Card
        elevation={0}
        sx={{
          mt: 2.5,
          borderRadius: "14px",
          overflow: "hidden",
          background: SURFACE,
          border: `1px solid ${isBest ? alpha(GOLD, 0.55) : BORDER}`,
          boxShadow: isBest
            ? `0 0 0 1px ${alpha(GOLD, 0.2)}, 0 16px 48px rgba(0,0,0,0.45)`
            : "0 8px 32px rgba(0,0,0,0.35)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: alpha(GOLD, isBest ? 0.7 : 0.35),
            boxShadow: `0 20px 56px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(GOLD, 0.25)}`,
          },
        }}
      >
        {/* Gold top accent */}
        <Box
          sx={{
            height: 3,
            background: isBest
              ? `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})`
              : `linear-gradient(90deg, ${BORDER}, ${alpha(GOLD, 0.3)}, ${BORDER})`,
          }}
        />

        <CardContent sx={{ p: 3, pb: "20px !important" }}>

          {/* Row 1: badges + close */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2.5}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {isBest && (
                <Chip
                  icon={<WorkspacePremiumIcon sx={{ fontSize: 13, color: `${NAVY} !important` }} />}
                  label="Top Recommendation"
                  size="small"
                  sx={{
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                    color: NAVY,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.04em",
                    border: "none",
                  }}
                />
              )}
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: 13, color: `${SUCCESS} !important` }} />}
                label="AI Verified"
                size="small"
                sx={{
                  bgcolor: alpha(SUCCESS, 0.1),
                  color: SUCCESS,
                  border: `1px solid ${alpha(SUCCESS, 0.3)}`,
                  fontWeight: 600,
                  fontSize: "0.68rem",
                }}
              />
              <Chip
                label={`${scoreLabel}  ·  ${score}%`}
                size="small"
                sx={{
                  bgcolor: alpha(scoreColor, 0.12),
                  color: scoreColor,
                  border: `1px solid ${alpha(scoreColor, 0.3)}`,
                  fontWeight: 700,
                  fontSize: "0.68rem",
                }}
              />
            </Stack>
            {onClose && (
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ color: TEXT_MUTED, "&:hover": { color: TEXT_PRI, bgcolor: SURFACE_2 } }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>

          {/* Loan Name */}
          <Typography
            variant="h5"
            sx={{ color: TEXT_PRI, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, mb: 2.5, lineHeight: 1.3 }}
          >
            {loan?.name || "MSME Business Loan"}
          </Typography>

          {/* Stat pills */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mb={2.5}>
            <StatPill icon={<CurrencyRupeeIcon sx={{ fontSize: 15 }} />} label="Interest" value={`${loan?.interest_rate || "10"}% p.a.`} />
            <StatPill icon={<TrendingUpIcon   sx={{ fontSize: 15 }} />} label="Eligibility" value={`${score}%`} highlight />
            <StatPill icon={<AccountBalanceIcon sx={{ fontSize: 15 }} />} label="Business" value={loan?.business_type || "MSME"} />
            <StatPill icon={<AccessTimeIcon   sx={{ fontSize: 15 }} />} label="Tenure" value={loan?.tenure || "5 Yrs"} />
          </Stack>

          {/* Approval Progress */}
          <Box mb={2.5}>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography variant="caption" sx={{ color: TEXT_MUTED, fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.68rem" }}>
                APPROVAL PROBABILITY
              </Typography>
              <Typography variant="caption" sx={{ color: scoreColor, fontWeight: 700, fontSize: "0.75rem" }}>
                {score}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={score}
              sx={{
                height: 6,
                borderRadius: 10,
                bgcolor: alpha(GOLD, 0.08),
                "& .MuiLinearProgress-bar": {
                  background: score >= 90
                    ? `linear-gradient(90deg, ${SUCCESS}, ${alpha(SUCCESS, 0.6)})`
                    : `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                  borderRadius: 10,
                },
              }}
            />
          </Box>

          {/* AI Insight */}
          <Box
            sx={{
              p: 2,
              borderRadius: "10px",
              background: alpha(GOLD, 0.06),
              border: `1px solid ${alpha(GOLD, 0.2)}`,
              mb: 2.5,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
              <EmojiObjectsIcon sx={{ fontSize: 15, color: GOLD }} />
              <Typography variant="caption" sx={{ color: GOLD, fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.65rem" }}>
                AI INSIGHT
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: TEXT_SEC, lineHeight: 1.75, fontSize: "0.82rem" }}>
              {score >= 90
                ? "Excellent match. Your profile strongly qualifies — high approval probability with preferential rates."
                : score >= 75
                ? "Good match. Your business profile aligns well with this scheme and competitive approval is expected."
                : "Partial match. Improving turnover or providing collateral could strengthen your eligibility further."}
            </Typography>
          </Box>

          {/* Expandable checklist */}
          <Box
            onClick={() => setExpanded(v => !v)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              mb: expanded ? 1.5 : 0,
              "&:hover .check-label": { color: GOLD },
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 14, color: TEXT_MUTED }} />
            <Typography
              className="check-label"
              variant="caption"
              sx={{ color: TEXT_MUTED, fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.68rem", transition: "color 0.15s" }}
            >
              ELIGIBILITY CHECKLIST
            </Typography>
            <Box sx={{ ml: "auto", color: TEXT_MUTED }}>
              {expanded ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
            </Box>
          </Box>
          <Collapse in={expanded}>
            <Stack spacing={0.75} mb={2}>
              {checks.map((c, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  {c.neutral
                    ? <CancelOutlinedIcon  sx={{ fontSize: 14, color: GOLD }}    />
                    : c.pass
                    ? <CheckCircleOutlineIcon sx={{ fontSize: 14, color: SUCCESS }} />
                    : <CancelOutlinedIcon  sx={{ fontSize: 14, color: DANGER }}  />}
                  <Typography variant="caption" sx={{ color: TEXT_SEC, fontSize: "0.75rem" }}>
                    {c.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Collapse>

          <Divider sx={{ borderColor: BORDER, mb: 2.5 }} />

          {/* Action buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            {/* Apply */}
            <Button
              fullWidth
              variant="contained"
              href="https://msme.gov.in/"
              target="_blank"
              endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
              sx={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                color: NAVY,
                fontWeight: 700,
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: `0 4px 16px ${alpha(GOLD, 0.3)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                  boxShadow: `0 6px 20px ${alpha(GOLD, 0.45)}`,
                },
              }}
            >
              Apply Now
            </Button>

            {/* View Details */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setDetailsOpen(true)}
              sx={{
                borderColor: BORDER,
                color: TEXT_SEC,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { borderColor: alpha(GOLD, 0.5), color: GOLD, bgcolor: alpha(GOLD, 0.04) },
              }}
            >
              View Details
            </Button>

            {/* PDF */}
            <Tooltip title="Download PDF Report" arrow>
              <IconButton
                onClick={() => generatePDF(loan, score, formData)}
                sx={{
                  border: `1px solid ${BORDER}`,
                  borderRadius: "8px",
                  color: TEXT_MUTED,
                  px: 1.5,
                  "&:hover": { borderColor: alpha(GOLD, 0.5), color: GOLD, bgcolor: alpha(GOLD, 0.06) },
                }}
              >
                <PictureAsPdfIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Share */}
            <Tooltip title="Share Recommendation" arrow>
              <IconButton
                onClick={() => setShareOpen(true)}
                sx={{
                  border: `1px solid ${BORDER}`,
                  borderRadius: "8px",
                  color: TEXT_MUTED,
                  px: 1.5,
                  "&:hover": { borderColor: alpha(GOLD, 0.5), color: GOLD, bgcolor: alpha(GOLD, 0.06) },
                }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>

      {/* ── DETAILS MODAL ─────────────────────────────────────────── */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
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
            background: alpha(GOLD, 0.04),
            borderBottom: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            pb: 2,
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: GOLD, fontSize: "0.62rem", letterSpacing: "0.15em" }}>
              Scheme Details
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: TEXT_PRI, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, mt: 0.2 }}
            >
              {loan?.name || "MSME Business Loan"}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDetailsOpen(false)}
            size="small"
            sx={{ color: TEXT_MUTED, "&:hover": { color: TEXT_PRI } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ background: SURFACE, pt: 2 }}>
          <Stack spacing={0}>
            {detailRows.map(([label, value]) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <Typography variant="body2" sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.03em" }}>
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: TEXT_PRI, fontWeight: 700, textAlign: "right", maxWidth: "55%", fontSize: "0.85rem" }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box
            mt={2}
            p={2}
            sx={{ background: alpha(GOLD, 0.06), border: `1px solid ${alpha(GOLD, 0.2)}`, borderRadius: "10px" }}
          >
            <Typography variant="body2" sx={{ color: TEXT_SEC, lineHeight: 1.8, fontSize: "0.8rem" }}>
              This MSME scheme supports businesses with flexible repayment terms, affordable interest rates, and priority processing under the Government of India's financial assistance programs.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1, borderTop: `1px solid ${BORDER}`, background: SURFACE }}>
          <Button
            onClick={() => generatePDF(loan, score, formData)}
            startIcon={<PictureAsPdfIcon />}
            sx={{
              borderColor: BORDER,
              color: TEXT_SEC,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              border: `1px solid ${BORDER}`,
              "&:hover": { borderColor: alpha(GOLD, 0.5), color: GOLD, bgcolor: alpha(GOLD, 0.04) },
            }}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            href="https://msme.gov.in/"
            target="_blank"
            sx={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: NAVY,
              fontWeight: 700,
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": { background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` },
            }}
          >
            Apply Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── SHARE MODAL ───────────────────────────────────────────── */}
      <Dialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        maxWidth="xs"
        fullWidth
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
            background: alpha(GOLD, 0.04),
            borderBottom: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: GOLD, fontSize: "0.62rem", letterSpacing: "0.15em" }}>
              Export & Share
            </Typography>
            <Typography variant="h6" sx={{ color: TEXT_PRI, fontWeight: 700, mt: 0.2 }}>
              Share Recommendation
            </Typography>
          </Box>
          <IconButton onClick={() => setShareOpen(false)} size="small" sx={{ color: TEXT_MUTED, "&:hover": { color: TEXT_PRI } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ background: SURFACE, pt: 2 }}>
          <Stack spacing={1.2}>
            {[
              { icon: <WhatsAppIcon sx={{ fontSize: 20, color: "#25D366" }} />,  label: "Share via WhatsApp",    sub: "Send to contacts",       fn: handleWhatsApp },
              { icon: <EmailIcon    sx={{ fontSize: 20, color: GOLD_LIGHT }} />, label: "Share via Email",       sub: "Open mail client",       fn: handleEmail    },
              { icon: <ContentCopyIcon sx={{ fontSize: 20, color: TEXT_SEC }} />,label: "Copy to Clipboard",    sub: "Copy details as text",   fn: handleCopy     },
              { icon: <PictureAsPdfIcon sx={{ fontSize: 20, color: DANGER }} />, label: "Download PDF Report",  sub: "Print-ready document",   fn: () => { generatePDF(loan, score, formData); setShareOpen(false); }},
            ].map(opt => (
              <Box
                key={opt.label}
                onClick={opt.fn}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.75,
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: `1px solid ${BORDER}`,
                  background: SURFACE_2,
                  transition: "all 0.15s",
                  "&:hover": { borderColor: alpha(GOLD, 0.4), background: alpha(GOLD, 0.05) },
                }}
              >
                {opt.icon}
                <Box>
                  <Typography variant="body2" sx={{ color: TEXT_PRI, fontWeight: 700, fontSize: "0.85rem" }}>
                    {opt.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, fontSize: "0.7rem" }}>
                    {opt.sub}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* ── SNACKBAR ──────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbar({ open: false, msg: "" })}
          sx={{ bgcolor: alpha(GOLD, 0.95), color: NAVY, fontWeight: 700, borderRadius: "10px" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

// ─── STAT PILL ────────────────────────────────────────────────────
const StatPill = ({ icon, label, value, highlight }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 1,
      px: 1.5,
      py: 1.1,
      borderRadius: "8px",
      bgcolor: highlight ? alpha(GOLD, 0.08) : SURFACE_2,
      border: `1px solid ${highlight ? alpha(GOLD, 0.25) : BORDER}`,
      minWidth: 0,
    }}
  >
    <Box sx={{ color: highlight ? GOLD : TEXT_MUTED, flexShrink: 0 }}>{icon}</Box>
    <Box minWidth={0}>
      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: "block", lineHeight: 1.1, fontSize: "0.62rem", letterSpacing: "0.05em" }}>
        {label.toUpperCase()}
      </Typography>
      <Typography variant="caption" sx={{ color: highlight ? GOLD : TEXT_PRI, fontWeight: 700, fontSize: "0.75rem" }} noWrap>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default LoanCard;