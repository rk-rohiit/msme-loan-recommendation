import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

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

const quickLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "#about" },
  { label: "Features", href: "#features" },
  { label: "FAQ",      href: "#faq" },
  { label: "Contact",  href: "#contact" },
];

const services = [
  { label: "Loan Prediction",    href: "#" },
  { label: "Eligibility Check",  href: "#" },
  { label: "Financial Insights", href: "#" },
  { label: "Business Analytics", href: "#" },
];

const socials = [
  { icon: <FaFacebookF size={13} />, href: "#" },
  { icon: <FaTwitter   size={13} />, href: "#" },
  { icon: <FaLinkedinIn size={13} />, href: "#" },
  { icon: <FaInstagram  size={13} />, href: "#" },
];

const linkSx = {
  color: TEXT_SEC,
  fontSize: "0.875rem",
  textDecoration: "none",
  lineHeight: 1.5,
  fontFamily: "'DM Sans', sans-serif",
  transition: "color 0.2s",
  display: "block",
  "&:hover": { color: GOLD_LIGHT },
};

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: NAVY,
        color: TEXT_SEC,
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
        // Soft glow bottom-center
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "80%", height: "50%",
          background: `radial-gradient(ellipse at center bottom, ${GOLD}08 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

        {/* Main grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1fr 1.4fr" },
            gap: { xs: 5, md: 6 },
            mb: 6,
          }}
        >

          {/* ── Brand col ── */}
          <Box>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2.5 }}>
              <Box
                sx={{
                  width: 30, height: 30,
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                  borderRadius: "7px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 2px 10px ${GOLD}44`,
                }}
              >
                <Typography sx={{ color: NAVY, fontSize: "0.65rem", fontWeight: 800, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>
                  ML
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  color: TEXT_PRI,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.01em",
                }}
              >
                MSME LoanPredict
              </Typography>
            </Box>

            <Typography
              sx={{
                color: TEXT_SEC,
                lineHeight: 1.75,
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                mb: 3,
                maxWidth: 260,
              }}
            >
              Empowering businesses with AI-driven loan predictions for smarter financial decisions.
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: "flex", gap: 1.25 }}>
              {socials.map(({ icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  sx={{
                    width: 34, height: 34,
                    borderRadius: "8px",
                    backgroundColor: SURFACE,
                    border: `1px solid ${BORDER}`,
                    color: TEXT_SEC,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      backgroundColor: `${GOLD}18`,
                      borderColor: `${GOLD}44`,
                      color: GOLD_LIGHT,
                      boxShadow: `0 0 10px ${GOLD}22`,
                    },
                  }}
                >
                  {icon}
                </Link>
              ))}
            </Box>
          </Box>

          {/* ── Quick Links ── */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: TEXT_PRI,
                fontSize: "0.875rem",
                mb: 2.5,
                letterSpacing: "0.02em",
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {quickLinks.map(({ label, href }) => (
                <Link key={label} href={href} sx={linkSx}>{label}</Link>
              ))}
            </Box>
          </Box>

          {/* ── Services ── */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: TEXT_PRI,
                fontSize: "0.875rem",
                mb: 2.5,
                letterSpacing: "0.02em",
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {services.map(({ label, href }) => (
                <Link key={label} href={href} sx={linkSx}>{label}</Link>
              ))}
            </Box>
          </Box>

          {/* ── Contact ── */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: TEXT_PRI,
                fontSize: "0.875rem",
                mb: 2.5,
                letterSpacing: "0.02em",
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Email",   value: "support@msmeLoanPredict.com" },
                { label: "Phone",   value: "+1 (555) 123-4567" },
                { label: "Address", value: "123 Business Street, Suite 100\nNew York, NY 10001" },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Typography
                    sx={{
                      color: GOLD,
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontFamily: "'DM Sans', sans-serif",
                      mb: 0.3,
                    }}
                  >
                    {label}
                  </Typography>
                  {value.split("\n").map((line, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: TEXT_SEC,
                        fontSize: "0.855rem",
                        lineHeight: 1.65,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>

        </Box>

        {/* Divider with gold center glow */}
        <Box
          sx={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${GOLD}33, ${BORDER}, ${GOLD}33, transparent)`,
            mb: 3,
          }}
        />

        {/* Bottom bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: TEXT_MUTED,
              fontSize: "0.82rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © {new Date().getFullYear()} MSME LoanPredict. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                sx={{
                  color: TEXT_MUTED,
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "color 0.2s",
                  "&:hover": { color: GOLD_LIGHT },
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}