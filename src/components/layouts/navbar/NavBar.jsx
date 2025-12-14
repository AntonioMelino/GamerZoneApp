"use client";

import CartWidget from "../../common/cartWidget/CartWidget";
import LogoIcon from "@mui/icons-material/SportsEsports";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router";
import CuentaIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../../context/ThemeContext";
import "./Navbar.css";

const pages = ["Todos", "PC", "Consolas", "Notebooks", "Perifericos"];

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      className="navbar-custom"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"} className="navbar-logo">
            <LogoIcon
              className="navbar-logo-icon"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            className="navbar-title"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
            }}
          >
            GamerZoneApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menú de navegación"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="navbar-menu-button"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page === "Todos" ? "/" : `/category/${page}`}
                    sx={{ textAlign: "center" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GAMERZONE
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === "Todos" ? "/" : `/category/${page}`}
                className="navbar-category-button"
                sx={{ my: 2, display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Tooltip title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
            <IconButton onClick={toggleTheme} className="theme-toggle-button">
              {theme === "dark" ? (
                <LightModeIcon className="theme-icon" />
              ) : (
                <DarkModeIcon className="theme-icon" />
              )}
            </IconButton>
          </Tooltip>

          <Box
            component={Link}
            to="/cart"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              color: "white",
              textDecoration: "none",
              alignItems: "center",
            }}
          >
            <CartWidget />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mi cuenta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <CuentaIcon className="navbar-account-icon" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Iniciar Sesión
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: "center" }}>Mi Perfil</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
