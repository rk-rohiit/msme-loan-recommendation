import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  FaUniversity, FaHandHoldingUsd, FaShieldAlt,
  FaIndustry, FaSeedling, FaStore
} from "react-icons/fa";

const LoanSection = () => {
  const theme = useTheme();

  const loans = [
    {
      name: "Mudra Loan",
      badge: "Most Popular",
      accent: theme.palette.success.main,
      desc: "Up to ₹10 Lakhs for small businesses under Shishu, Kishore & Tarun categories.",
      icon: <FaHandHoldingUsd size={20} />,
      details: ["No collateral required", "Low interest rates", "Quick disbursement"],
      approval: "82%",
      approvalNum: 82,
    },
    {
      name: "PMEGP",
      badge: "Government Backed",
      accent: theme.palette.secondary.main,
      desc: "Prime Minister's Employment Generation Programme — subsidized funding for new enterprises.",
      icon: <FaUniversity size={20} />,
      details: ["Up to 35% subsidy", "Manufacturing & services", "First-time entrepreneurs"],
      approval: "74%",
      approvalNum: 74,
    },
    {
      name: "CGTMSE",
      badge: "Collateral Free",
      accent: theme.palette.primary.main,
      desc: "Collateral-free loans up to ₹2 Crore for MSMEs.",
      icon: <FaShieldAlt size={20} />,
      details: ["Up to ₹2 Cr limit", "No guarantee", "For existing businesses"],
      approval: "78%",
      approvalNum: 78,
    },
    {
      name: "SIDBI MSME Loan",
      badge: "Fast Track",
      accent: "#B07FFF",
      desc: "Direct credit to MSMEs at competitive rates.",
      icon: <FaIndustry size={20} />,
      details: ["Loans up to ₹1 Cr", "Minimal documentation", "Digital processing"],
      approval: "80%",
      approvalNum: 80,
    },
    {
      name: "Stand-Up India",
      badge: "Inclusive",
      accent: "#F97066",
      desc: "Loans for SC/ST & women entrepreneurs.",
      icon: <FaSeedling size={20} />,
      details: ["₹10L–₹1Cr range", "Composite loan", "Inclusive scheme"],
      approval: "71%",
      approvalNum: 71,
    },
    {
      name: "PSB Loans in 59 Min",
      badge: "Instant",
      accent: theme.palette.success.main,
      desc: "Get approval within 59 minutes.",
      icon: <FaStore size={20} />,
      details: ["Up to ₹5 Cr", "GST-based", "Fast approval"],
      approval: "76%",
      approvalNum: 76,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "55%",
          height: "80%",
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}10, transparent)`,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-5%",
          left: "-10%",
          width: "50%",
          height: "60%",
          background: `radial-gradient(ellipse at center, ${theme.palette.secondary.main}10, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Typography variant="overline" textAlign="center" display="block" sx={{ mb: 1.5 }}>
          Loan Schemes
        </Typography>

        <Typography variant="h2" textAlign="center" sx={{ mb: 1.5 }}>
          Popular MSME Loan Schemes
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: 8,
            maxWidth: 520,
            mx: "auto",
          }}
        >
          Our AI predicts your approval chances across these government and bank-backed schemes — helping you apply smartly.
        </Typography>

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {loans.map((loan, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                p: 3,
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                transition: "all 0.25s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${loan.accent}33`,
                  borderColor: `${loan.accent}55`,
                },
              }}
            >
              {/* ICON + BADGE */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: `${loan.accent}15`,
                    border: `1px solid ${loan.accent}33`,
                    color: loan.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loan.icon}
                </Box>

                <Box
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "999px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    backgroundColor: `${loan.accent}15`,
                    border: `1px solid ${loan.accent}33`,
                    color: loan.accent,
                  }}
                >
                  {loan.badge}
                </Box>
              </Box>

              {/* TITLE */}
              <Typography variant="h6">
                {loan.name}
              </Typography>

              {/* DESC */}
              <Typography variant="body2">
                {loan.desc}
              </Typography>

              {/* DETAILS */}
              <Box>
                {loan.details.map((d, i) => (
                  <Typography key={i} variant="caption" display="block" color="primary.main">
                    • {d}
                  </Typography>
                ))}
              </Box>

              {/* APPROVAL */}
              <Box sx={{ mt: "auto" }}>
                <Typography variant="caption">
                  Avg. AI Approval Rate:{" "}
                  <Box component="span" sx={{ color: loan.accent, fontWeight: 700 }}>
                    {loan.approval}
                  </Box>
                </Typography>

                <Box
                  sx={{
                    mt: 1,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${loan.approvalNum}%`,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${loan.accent}, ${loan.accent})`,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LoanSection;