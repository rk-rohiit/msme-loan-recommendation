import { createTheme } from "@mui/material/styles";

// ─────────────────────────────────────────────
//  LUXURY DARK FINTECH THEME — "Obsidian Gold"
//  Deep navy canvas · Molten gold accents
//  Playfair Display (headings) + DM Sans (body)
// ─────────────────────────────────────────────

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

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main:         GOLD,
      light:        GOLD_LIGHT,
      dark:         GOLD_DARK,
      contrastText: "#0A0F1E",
    },

    secondary: {
      main:         "#4A7CF7",
      light:        "#6B96FF",
      dark:         "#2E5BD4",
      contrastText: "#ffffff",
    },

    success: { main: "#2ECC71" },
    error:   { main: "#E74C3C" },
    warning: { main: GOLD },

    background: {
      default: NAVY,
      paper:   SURFACE,
    },

    text: {
      primary:   TEXT_PRI,
      secondary: TEXT_SEC,
      disabled:  TEXT_MUTED,
    },

    divider: BORDER,
  },

  typography: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",

    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700, fontSize: "3rem", lineHeight: 1.15,
      color: TEXT_PRI, letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.2,
      color: TEXT_PRI, letterSpacing: "-0.015em",
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600, fontSize: "1.75rem", lineHeight: 1.3,
      color: TEXT_PRI,
    },
    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 600, fontSize: "1.4rem", lineHeight: 1.35,
      color: TEXT_PRI,
    },
    h5: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600, fontSize: "1.1rem", color: TEXT_PRI,
    },
    h6: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600, fontSize: "0.95rem", color: TEXT_PRI,
    },
    body1: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "1rem", lineHeight: 1.75, color: TEXT_SEC,
    },
    body2: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.875rem", lineHeight: 1.65, color: TEXT_SEC,
    },
    caption: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.72rem", color: TEXT_MUTED, letterSpacing: "0.08em",
    },
    overline: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600, fontSize: "0.7rem",
      letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD,
    },
    button: {
      fontFamily: "'DM Sans', sans-serif",
      textTransform: "none", fontWeight: 600, letterSpacing: "0.01em",
    },
  },

  shape: { borderRadius: 10 },

  components: {

    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }
        body {
          background-color: ${NAVY};
          color: ${TEXT_PRI};
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${NAVY_2}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${TEXT_MUTED}; }
        ::selection { background: ${GOLD}33; color: ${GOLD_LIGHT}; }
      `,
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: `${NAVY}E8`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "none",
          borderBottom: `1px solid ${BORDER}`,
          borderRadius:0,
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: "64px !important" },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
          fontSize: "0.875rem",
          padding: "9px 22px",
          transition: "all 0.2s ease",
          "&:hover": { boxShadow: "none", transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
          color: NAVY,
          fontWeight: 700,
          "&:hover": {
            background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
            boxShadow: `0 4px 20px ${GOLD}44`,
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #4A7CF7 0%, #6B96FF 100%)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(135deg, #6B96FF 0%, #4A7CF7 100%)",
            boxShadow: "0 4px 20px #4A7CF744",
          },
        },
        outlinedPrimary: {
          borderColor: `${GOLD}66`,
          color: GOLD,
          "&:hover": { borderColor: GOLD, backgroundColor: `${GOLD}11` },
        },
        outlined: {
          borderColor: BORDER,
          color: TEXT_SEC,
          "&:hover": { borderColor: `${TEXT_SEC}88`, backgroundColor: SURFACE_2 },
        },
        text: {
          color: TEXT_SEC,
          "&:hover": { backgroundColor: SURFACE_2, color: TEXT_PRI },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: "14px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          backgroundImage: "none",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${GOLD}22`,
            borderColor: `${GOLD}44`,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          backgroundImage: "none",
          border: `1px solid ${BORDER}`,
          borderRadius: "12px",
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: NAVY_2,
            borderRadius: "8px",
            color: TEXT_PRI,
            fontSize: "0.9rem",
            "& fieldset": { borderColor: BORDER },
            "&:hover fieldset": { borderColor: TEXT_MUTED },
            "&.Mui-focused fieldset": {
              borderColor: GOLD,
              borderWidth: "1.5px",
              boxShadow: `0 0 0 3px ${GOLD}18`,
            },
          },
          "& .MuiInputLabel-root": { color: TEXT_MUTED, fontSize: "0.875rem" },
          "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          backgroundImage: "none",
          border: `1px solid ${BORDER}`,
          borderRadius: "10px !important",
          boxShadow: "none",
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            borderColor: `${GOLD}44`,
            boxShadow: `0 0 0 1px ${GOLD}22`,
          },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: TEXT_PRI,
          "&:hover": { backgroundColor: SURFACE_2 },
        },
        expandIconWrapper: { color: GOLD },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          fontWeight: 500,
          fontSize: "0.72rem",
          backgroundColor: SURFACE_2,
          color: TEXT_SEC,
          border: `1px solid ${BORDER}`,
        },
        colorPrimary: {
          backgroundColor: `${GOLD}22`,
          color: GOLD_LIGHT,
          borderColor: `${GOLD}44`,
        },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: BORDER } },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          color: TEXT_SEC,
          "&:hover": { backgroundColor: SURFACE_2, color: TEXT_PRI },
          "&.Mui-selected": {
            backgroundColor: `${GOLD}18`,
            color: GOLD_LIGHT,
            "&:hover": { backgroundColor: `${GOLD}22` },
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: NAVY_2,
          borderLeft: `1px solid ${BORDER}`,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: SURFACE_2,
          color: TEXT_PRI,
          border: `1px solid ${BORDER}`,
          fontSize: "0.78rem",
          borderRadius: "6px",
        },
      },
    },
  },
});

export default theme;