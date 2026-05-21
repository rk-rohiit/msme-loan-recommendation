import React, { useState } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "How accurate are the loan predictions?",
    answer:
      "Our AI model achieves 95% accuracy based on historical data from thousands of loan applications.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "Provide business details like revenue, credit score, loan amount, and financial history.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Yes, your data is encrypted and protected using industry standards.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "You get results instantly within seconds.",
  },
  {
    question: "Can I use this service multiple times?",
    answer:
      "Yes, you can check eligibility multiple times.",
  },
  {
    question: "What if I disagree with the prediction?",
    answer:
      "Predictions are guidance. Final decisions depend on lenders.",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // ✅ FIXED STATE
  const [expanded, setExpanded] = useState(null);

  // ✅ FIXED TOGGLE
  const toggle = (index) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

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
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}10, transparent)`,
        },
      }}
    >
      <Container maxWidth="md">

        {/* HEADER */}
        <Typography variant="overline" textAlign="center" display="block" sx={{ mb: 1.5 }}>
          FAQ
        </Typography>

        <Typography variant="h2" textAlign="center" sx={{ mb: 1.5 }}>
          Frequently Asked Questions
        </Typography>

        <Typography variant="body1" textAlign="center" sx={{ mb: 7 }}>
          Find answers to common questions about our loan prediction service
        </Typography>

        {/* FAQ LIST */}
        <Box display="flex" flexDirection="column" gap={2}>
          {faqs.map((item, index) => {
            const isOpen = expanded === index;

            return (
              <Box
                key={index}
                sx={{
                  border: `1px solid ${
                    isOpen
                      ? `${theme.palette.primary.main}55`
                      : theme.palette.divider
                  }`,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  transition: "all 0.25s ease",

                  "&:hover": {
                    borderColor: `${theme.palette.primary.main}44`,
                  },
                }}
              >
                {/* QUESTION */}
                <Box
                  onClick={() => toggle(index)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.question}
                  </Typography>

                  {/* ICON (FIXED CLICK) */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ fix
                      toggle(index);
                    }}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isOpen
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                        : theme.palette.background.default,
                      color: isOpen
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "all 0.3s",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
                  </Box>
                </Box>

                {/* ANSWER */}
                {isOpen && (
                  <Box
                    sx={{
                      px: 3,
                      pb: 3,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {item.answer}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* CTA BUTTON */}
        <Box textAlign="center" mt={7}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Still have questions?
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default FAQ;