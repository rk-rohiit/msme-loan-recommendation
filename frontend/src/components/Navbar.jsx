import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box,
  Container, IconButton, Drawer, List,
  ListItemButton, ListItemText, Divider,
} from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const GOLD      = "#C9A84C";
const GOLD_LIGHT= "#E8C96A";
const NAVY_2    = "#0F1629";
const BORDER    = "#2A3558";
const TEXT_PRI  = "#F0EDE6";
const TEXT_SEC  = "#8A94AF";

const navLinks = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "about" },
  { label: "Features", path: "features" },
  { label: "FAQ",      path: "faq" },
  { label: "Contact",  path: "contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: { xs: 60, md: 64 } }}
          >

            {/* ── Logo ── */}
            <Box
              onClick={() => navigate("/")}
              sx={{ display: "flex", alignItems: "center", gap: 1.25, cursor: "pointer" }}
            >
              {/* Gold square logo mark */}
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 2px 10px ${GOLD}44`,
                }}
              >
                <Typography sx={{ color: NAVY_2, fontSize: "0.65rem", fontWeight: 800, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>
                  ML
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: TEXT_PRI,
                  letterSpacing: "-0.01em",
                }}
              >
                MSME LoanPredict
              </Typography>
            </Box>

            {/* ── Center nav links (desktop) ── */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.25 }}>
              {navLinks.map(({ label, path }) => (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  sx={{
                    color: isActive(path) ? GOLD_LIGHT : TEXT_SEC,
                    fontWeight: isActive(path) ? 600 : 400,
                    fontSize: "0.875rem",
                    px: 1.75,
                    py: 0.75,
                    borderRadius: "7px",
                    textTransform: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: isActive(path) ? `${GOLD}14` : "transparent",
                    position: "relative",
                    "&:hover": { backgroundColor: `${GOLD}0D`, color: TEXT_PRI },
                    // Gold underline dot for active
                    "&::after": isActive(path) ? {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: GOLD,
                    } : {},
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* ── Right actions (desktop) ── */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
              {/* <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: TEXT_SEC,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  px: 2,
                  textTransform: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  "&:hover": { backgroundColor: `${GOLD}0D`, color: TEXT_PRI },
                }}
              >
                Sign In
              </Button> */}

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/check-loan")}
                sx={{
                  px: 2.5,
                  py: 0.9,
                  borderRadius: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Get Started
              </Button>
            </Box>

            {/* ── Hamburger (mobile) ── */}
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: TEXT_SEC, "&:hover": { color: GOLD } }}
            >
              <FaBars size={18} />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 270, backgroundColor: NAVY_2, borderLeft: `1px solid ${BORDER}`, px: 2, pt: 2.5 },
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 26, height: 26,
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Typography sx={{ color: NAVY_2, fontSize: "0.6rem", fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>ML</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: TEXT_PRI, fontSize: "0.9rem" }}>
              MSME LoanPredict
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: TEXT_SEC, "&:hover": { color: GOLD } }}>
            <FaTimes size={15} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: BORDER, mb: 1.5 }} />

        {/* Links */}
        <List disablePadding>
          {navLinks.map(({ label, path }) => (
            <ListItemButton
              key={label}
              selected={isActive(path)}
              onClick={() => { navigate(path); setOpen(false); }}
              sx={{ borderRadius: "8px", mb: 0.5, px: 1.5 }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: isActive(path) ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ borderColor: BORDER, my: 2.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            fullWidth variant="outlined"
            onClick={() => { navigate("/login"); setOpen(false); }}
            sx={{ borderColor: BORDER, color: TEXT_SEC, borderRadius: "8px", fontFamily: "'DM Sans', sans-serif", "&:hover": { borderColor: `${GOLD}66`, color: GOLD } }}
          >
            Sign In
          </Button>
          <Button
            fullWidth variant="contained" color="primary"
            onClick={() => { navigate("/check-loan"); setOpen(false); }}
            sx={{ borderRadius: "8px", fontFamily: "'DM Sans', sans-serif" }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;