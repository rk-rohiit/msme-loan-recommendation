import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoanForm from "../components/LoanForm";

const CheckLoan = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden",

        // 🔥 Background glow (premium look)
        "&::before": {
          content: '""',
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}10, transparent)`,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <Box textAlign="center" pt={10} pb={6}>
          <Typography variant="overline" display="block" sx={{ mb: 1 }}>
            Loan Prediction
          </Typography>

          <Typography variant="h2" sx={{ mb: 2 }}>
            Find the Best Loan for Your Business
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Enter your business details and let our AI suggest the most suitable
            loan options with high approval chances.
          </Typography>
        </Box>

        {/* FORM */}
        <LoanForm />

      </Container>
    </Box>
  );
};

export default CheckLoan;