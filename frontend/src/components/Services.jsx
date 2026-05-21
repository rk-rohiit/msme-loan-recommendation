import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  FaRobot, FaBolt, FaShieldAlt,
  FaChartBar, FaUsers, FaMobileAlt,
} from "react-icons/fa";

export default function Services() {
  const theme = useTheme();

  const features = [
    {
      title: "AI-Powered Analysis",
      desc: "Advanced machine learning algorithms analyze your business data to provide accurate predictions based on historical patterns.",
      icon: <FaRobot size={20} />,
      accent: theme.palette.primary.main,
    },
    {
      title: "Instant Results",
      desc: "Get your loan approval prediction in seconds. No waiting, no hassle. Just quick and reliable insights.",
      icon: <FaBolt size={20} />,
      accent: theme.palette.secondary.main,
    },
    {
      title: "Secure & Private",
      desc: "Your business data is encrypted and protected. We never share your information with third parties.",
      icon: <FaShieldAlt size={20} />,
      accent: theme.palette.success.main,
    },
    {
      title: "Detailed Insights",
      desc: "Receive comprehensive reports explaining factors affecting your loan approval chances with actionable recommendations.",
      icon: <FaChartBar size={20} />,
      accent: theme.palette.primary.main,
    },
    {
      title: "Expert Support",
      desc: "Our team of financial experts is available to help you understand your results and guide your next steps.",
      icon: <FaUsers size={20} />,
      accent: theme.palette.secondary.main,
    },
    {
      title: "Mobile Friendly",
      desc: "Access predictions from anywhere, anytime. Our platform works seamlessly across all devices.",
      icon: <FaMobileAlt size={20} />,
      accent: theme.palette.success.main,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",

        // subtle glow
        "&::before": {
          content: '""',
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}10 0%, transparent 70%)`,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* OVERLINE */}
        <Typography
          variant="overline"
          display="block"
          textAlign="center"
          sx={{ mb: 1.5 }}
        >
          Features
        </Typography>

        {/* HEADING */}
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 1.5 }}
        >
          Why Choose Our Platform
        </Typography>

        {/* SUBTEXT */}
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: 8,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          Comprehensive features designed to give you the most accurate loan predictions
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
          {features.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                p: 3.5,
                border: `1px solid ${theme.palette.divider}`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s ease",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                  opacity: 0,
                  transition: "0.3s",
                },

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}33`,
                  borderColor: `${item.accent}55`,
                },

                "&:hover::before": {
                  opacity: 1,
                },
              }}
            >
              {/* ICON */}
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2,
                  backgroundColor: `${item.accent}15`,
                  border: `1px solid ${item.accent}33`,
                  color: item.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}
              >
                {item.icon}
              </Box>

              {/* TITLE */}
              <Typography variant="h6" sx={{ mb: 1 }}>
                {item.title}
              </Typography>

              {/* DESC */}
              <Typography variant="body2">
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}