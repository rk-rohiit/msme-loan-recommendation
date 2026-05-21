import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeroImg from "../assets/hero.png";

const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const NAVY       = "#0A0F1E";
const SURFACE    = "#1A2340";
const BORDER     = "#2A3558";
const TEXT_PRI   = "#F0EDE6";
const TEXT_SEC   = "#8A94AF";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: NAVY,
        py: { xs: 10, md: 14 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "50%",
          height: "70%",
          background: `radial-gradient(ellipse at center, ${GOLD}0F 0%, transparent 70%)`,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "45%",
          height: "60%",
          background: "radial-gradient(ellipse at center, #4A7CF712 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 7, md: 10 },
          }}
        >

          {/* ── LEFT CONTENT ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>

            {/* Pill Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                border: `1px solid ${GOLD}44`,
                backgroundColor: `${GOLD}0F`,
                borderRadius: "999px",
                px: 2,
                py: 0.6,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: GOLD,
                  boxShadow: `0 0 8px ${GOLD}99`,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  color: GOLD_LIGHT,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                AI-Powered Loan Prediction
              </Typography>
            </Box>

            {/* Heading */}
            <Typography
              mb={2.5}
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: { xs: "2.2rem", md: "3rem" },
                lineHeight: 1.15,
                color: TEXT_PRI,
                letterSpacing: "-0.02em",
                "& span": {
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                },
              }}
            >
              Predict Your MSME Loan Approval{" "}
              <span>Instantly</span>
            </Typography>

            {/* Subtext */}
            <Typography
              mb={4.5}
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                color: TEXT_SEC,
                lineHeight: 1.8,
                fontSize: "1rem",
                maxWidth: 500,
              }}
            >
              Get accurate loan approval predictions for your Micro, Small, and
              Medium Enterprise using advanced machine learning algorithms. Make
              informed financial decisions today.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/check-loan")}
                sx={{
                  px: 3.5,
                  py: 1.3,
                  borderRadius: "9px",
                  fontSize: "0.925rem",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Start Prediction →
              </Button>

              <Button
                variant="outlined"
                sx={{
                  px: 3.5,
                  py: 1.3,
                  borderRadius: "9px",
                  fontSize: "0.925rem",
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: BORDER,
                  color: TEXT_SEC,
                  "&:hover": {
                    borderColor: `${GOLD}55`,
                    backgroundColor: `${GOLD}08`,
                    color: TEXT_PRI,
                  },
                }}
              >
                ▶ Watch Demo
              </Button>
            </Box>

            {/* Stats Row */}
            <Box sx={{ display: "flex", gap: 3.5, flexWrap: "wrap" }}>
              {[
                { icon: "✓", label: "95% Accuracy" },
                { icon: "⚡", label: "Instant Results" },
              ].map(({ icon, label }) => (
                <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 2px 8px ${GOLD}44`,
                    }}
                  >
                    <Typography sx={{ color: NAVY, fontSize: "0.6rem", lineHeight: 1, fontWeight: 700 }}>
                      {icon}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: TEXT_SEC,
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── RIGHT ILLUSTRATION ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
           <img src={HeroImg} alt="Hero Illustration" style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: `0 12px 40px rgba(0,0,0,0.4)` }} />
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Hero;