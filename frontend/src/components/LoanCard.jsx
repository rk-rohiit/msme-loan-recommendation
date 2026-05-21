import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const LoanCard = ({ loan, isBest, onClose }) => {
  const theme = useTheme();
  const score = parseFloat(loan.eligibility_score);

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 4,
        p: 1,
        position: "relative",
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",

        border: `1px solid ${
          isBest
            ? theme.palette.primary.main
            : theme.palette.divider
        }`,

        transition: "0.4s",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardContent>

        {/* ❌ CLOSE BUTTON */}
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        {/* AI Badge */}
        {isBest && (
          <Chip
            label="🤖 AI Recommended"
            color="primary"
            size="small"
            sx={{ mb: 2 }}
          />
        )}

        {/* TITLE */}
        <Typography variant="h6" mb={2}>
          {loan.name}
        </Typography>

        {/* SCORE */}
        <Box display="flex" alignItems="center" gap={3}>
          <Box
            sx={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              background: `conic-gradient(${theme.palette.primary.main} ${score}%, rgba(255,255,255,0.08) ${score}%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            {score}%
          </Box>

          <Box>
            <Typography variant="body2">
              💰 Interest: <b>{loan.interest_rate}%</b>
            </Typography>

            <Typography variant="body2" mt={1}>
              📊 Score: {loan.eligibility_score}
            </Typography>
          </Box>
        </Box>

        {/* AI INSIGHT */}
        <Box
          mt={3}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.03)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="primary">
            🤖 AI Insight
          </Typography>

          <Typography variant="body2" mt={1}>
            This loan is highly suitable based on your business profile and approval probability.
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default LoanCard;