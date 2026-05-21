import React, { useState } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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

const contactInfo = [
  {
    icon: <FaEnvelope size={15} />,
    label: "Email",
    value: "support@msmeLoanPredict.com",
    accent: GOLD,
  },
  {
    icon: <FaPhone size={15} />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    accent: "#4A7CF7",
  },
  {
    icon: <FaMapMarkerAlt size={15} />,
    label: "Office",
    value: "123 Business Street, Suite 100\nNew York, NY 10001",
    accent: "#2ECC71",
  },
  {
    icon: <FaClock size={15} />,
    label: "Business Hours",
    value: "Monday – Friday: 9:00 AM – 6:00 PM\nSaturday – Sunday: Closed",
    accent: "#B07FFF",
  },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: NAVY,
    fontSize: "0.875rem",
    color: TEXT_PRI,
    fontFamily: "'DM Sans', sans-serif",
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: TEXT_MUTED },
    "&.Mui-focused fieldset": {
      borderColor: GOLD,
      borderWidth: "1.5px",
      boxShadow: `0 0 0 3px ${GOLD}18`,
    },
    "& input::placeholder": { color: TEXT_MUTED, opacity: 1 },
    "& textarea::placeholder": { color: TEXT_MUTED, opacity: 1 },
  },
};

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", subject: "", message: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: NAVY,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "10%", left: "-5%",
          width: "45%", height: "80%",
          background: `radial-gradient(ellipse at center, ${GOLD}07 0%, transparent 65%)`,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "0%", right: "-10%",
          width: "50%", height: "60%",
          background: "radial-gradient(ellipse at center, #4A7CF708 0%, transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

        {/* Section label */}
        <Typography
          display="block"
          sx={{
            color: GOLD,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontFamily: "'DM Sans', sans-serif",
            mb: 1.5,
          }}
        >
          Contact Us
        </Typography>

        {/* Two-column layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 8 },
            alignItems: "flex-start",
          }}
        >

          {/* ── LEFT: Info ── */}
          <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: "38%" } }}>

            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: TEXT_PRI,
                fontSize: { xs: "1.8rem", md: "2.25rem" },
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Get in Touch
            </Typography>

            <Typography
              sx={{
                color: TEXT_SEC,
                lineHeight: 1.75,
                fontSize: "0.9rem",
                fontFamily: "'DM Sans', sans-serif",
                mb: 4,
              }}
            >
              Have questions or need assistance? Our team is here to help you
              make the most of our loan prediction platform.
            </Typography>

            {/* Info rows */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {contactInfo.map(({ icon, label, value, accent }) => (
                <Box key={label} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {/* Accent icon box */}
                  <Box
                    sx={{
                      width: 38, height: 38,
                      borderRadius: "9px",
                      backgroundColor: `${accent}18`,
                      border: `1px solid ${accent}33`,
                      color: accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    {icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: TEXT_MUTED,
                        fontWeight: 600,
                        fontSize: "0.68rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
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
                          lineHeight: 1.65,
                          fontSize: "0.875rem",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── RIGHT: Form ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: "16px",
                p: { xs: 3, md: 4 },
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                position: "relative",
                overflow: "hidden",
                // Subtle top gold line
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${GOLD}66, transparent)`,
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

                {/* Full Name */}
                <Box>
                  <Typography sx={{ color: TEXT_SEC, fontWeight: 600, fontSize: "0.8rem", mb: 0.75, display: "block", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                    Full Name
                  </Typography>
                  <TextField fullWidth name="fullName" placeholder="John Doe"
                    value={form.fullName} onChange={handleChange}
                    variant="outlined" size="small" sx={fieldSx} />
                </Box>

                {/* Email */}
                <Box>
                  <Typography sx={{ color: TEXT_SEC, fontWeight: 600, fontSize: "0.8rem", mb: 0.75, display: "block", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                    Email Address
                  </Typography>
                  <TextField fullWidth name="email" placeholder="john@example.com"
                    value={form.email} onChange={handleChange}
                    variant="outlined" size="small" sx={fieldSx} />
                </Box>

                {/* Phone */}
                <Box>
                  <Typography sx={{ color: TEXT_SEC, fontWeight: 600, fontSize: "0.8rem", mb: 0.75, display: "block", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                    Phone Number
                  </Typography>
                  <TextField fullWidth name="phone" placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={handleChange}
                    variant="outlined" size="small" sx={fieldSx} />
                </Box>

                {/* Subject */}
                <Box>
                  <Typography sx={{ color: TEXT_SEC, fontWeight: 600, fontSize: "0.8rem", mb: 0.75, display: "block", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                    Subject
                  </Typography>
                  <TextField fullWidth name="subject" placeholder="How can we help?"
                    value={form.subject} onChange={handleChange}
                    variant="outlined" size="small" sx={fieldSx} />
                </Box>

                {/* Message */}
                <Box>
                  <Typography sx={{ color: TEXT_SEC, fontWeight: 600, fontSize: "0.8rem", mb: 0.75, display: "block", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                    Message
                  </Typography>
                  <TextField fullWidth name="message" placeholder="Your message here..."
                    value={form.message} onChange={handleChange}
                    variant="outlined" multiline rows={4} sx={fieldSx} />
                </Box>

                {/* Submit */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    py: 1.4,
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    fontFamily: "'DM Sans', sans-serif",
                    mt: 0.5,
                  }}
                >
                  Send Message
                </Button>

              </Box>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}