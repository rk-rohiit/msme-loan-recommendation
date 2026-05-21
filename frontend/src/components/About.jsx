import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AboutImg from "../assets/about.png";

const stats = [
  { value: "50K+", label: "Predictions Made" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "10K+", label: "Happy Businesses" },
  { value: "24/7", label: "Support Available" },
];

const About = () => {
  const theme = useTheme();

  return (
    <Box
    id="about"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",

        "&::after": {
          content: '""',
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "50%",
          height: "80%",
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}15 0%, transparent 70%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 7, md: 10 },
          }}
        >

          {/* LEFT IMAGE */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={AboutImg}
              alt="About"
              sx={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>

          {/* RIGHT CONTENT */}
          <Box sx={{ flex: 1 }}>

            {/* Overline */}
            <Typography variant="overline" gutterBottom>
              About Us
            </Typography>

            {/* Heading */}
            <Typography variant="h2" mb={2}>
              Empowering MSMEs with{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smart Predictions
              </Box>
            </Typography>

            {/* Text */}
            <Typography variant="body1" mb={2}>
              Our MSME Loan Prediction platform leverages cutting-edge AI to
              help businesses understand loan approval chances before applying.
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={5}>
              We analyze financials, credit history, and market trends to
              provide accurate predictions and help businesses make confident
              decisions.
            </Typography>

            {/* STATS */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {stats.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 3,
                    bgcolor: "background.paper",
                    borderRight:
                      i % 2 === 0 ? `1px solid ${theme.palette.divider}` : "none",
                    borderBottom:
                      i < 2 ? `1px solid ${theme.palette.divider}` : "none",
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography variant="caption">
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;