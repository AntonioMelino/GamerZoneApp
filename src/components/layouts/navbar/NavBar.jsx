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
import { Link } from "react-router";
import CuentaIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import "./Navbar.css";

const pages = ["Todos", "PC", "Consolas", "Notebooks", "Perifericos"];

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await logout();
      handleCloseUserMenu();
      navigate("/");
    } catch (error) {
      console.error("[v0] Error al cerrar sesión:", error);
    }
  };

  const handleThemeToggleMobile = () => {
    toggleTheme();
    handleCloseNavMenu();
  };

  return (
    <AppBar
      position="fixed"
      className="navbar-custom"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflowX: "hidden", // Evitar scroll horizontal
      }}
    >
      <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {/* Logo Desktop */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link to={"/"} className="navbar-logo">
              <LogoIcon
                className="navbar-logo-icon"
                sx={{
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
                fontFamily: "inherit",
              }}
            >
              GamerZoneApp
            </Typography>
          </Box>

          {/* Vista Mobile - Menú hamburguesa, logo y carrito */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              overflowX: "hidden",
            }}
          >
            {/* Menú hamburguesa */}
            <IconButton
              size="large"
              aria-label="menú de navegación"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="navbar-menu-button"
              sx={{ ml: 0 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo y título mobile */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Link to={"/"} className="navbar-logo-mobile">
                <LogoIcon className="navbar-logo-icon-mobile" sx={{ mr: 1 }} />
              </Link>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                className="navbar-title-mobile"
                sx={{
                  fontFamily: "inherit",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { xs: "120px", sm: "180px" },
                }}
              >
                GAMERZONE
              </Typography>
            </Box>

            {/* Carrito mobile */}
            <Box
              component={Link}
              to="/cart"
              sx={{
                display: "flex",
                color: "white",
                textDecoration: "none",
                alignItems: "center",
                mr: 1,
              }}
            >
              <CartWidget />
            </Box>
          </Box>

          {/* Menú mobile completo */}
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
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                maxWidth: "100vw",
                overflowX: "hidden",
              },
            }}
            className="mobile-menu"
          >
            {/* Inicio */}
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
              <HomeIcon sx={{ mr: 1 }} />
              <Typography>Inicio</Typography>
            </MenuItem>

            {/* Categorías */}
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page === "Todos" ? "/" : `/category/${page}`}
              >
                <Typography sx={{ pl: 4 }}>{page}</Typography>
              </MenuItem>
            ))}

            {/* Toggle de tema - Moved inside mobile menu */}
            <MenuItem onClick={handleThemeToggleMobile}>
              {theme === "dark" ? (
                <LightModeIcon sx={{ mr: 1 }} />
              ) : (
                <DarkModeIcon sx={{ mr: 1 }} />
              )}
              <Typography>
                {theme === "dark" ? "Modo claro" : "Modo oscuro"}
              </Typography>
            </MenuItem>

            {/* Perfil o Login */}
            {user ? (
              <>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/profile"
                >
                  <CuentaIcon sx={{ mr: 1 }} />
                  <Typography>Mi Perfil</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleLogout();
                  }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  <Typography>Cerrar Sesión</Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/login"
              >
                <LoginIcon sx={{ mr: 1 }} />
                <Typography>Iniciar Sesión</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Vista Desktop - Categorías */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
            }}
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

          {/* Vista Desktop - Carrito, Toggle de tema y Cuenta */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Carrito desktop */}
            <Box
              component={Link}
              to="/cart"
              sx={{
                display: "flex",
                color: "white",
                textDecoration: "none",
                alignItems: "center",
                mr: 2,
              }}
            >
              <CartWidget />
            </Box>

            {/* Toggle de tema desktop */}
            <Tooltip title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
              <IconButton onClick={toggleTheme} className="theme-toggle-button">
                {theme === "dark" ? (
                  <LightModeIcon className="theme-icon" />
                ) : (
                  <DarkModeIcon className="theme-icon" />
                )}
              </IconButton>
            </Tooltip>

            {/* Menú de usuario desktop */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Mi cuenta">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <CuentaIcon className="navbar-account-icon" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar-user"
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
                {user ? (
                  <>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleCloseUserMenu}
                    >
                      <CuentaIcon sx={{ mr: 1 }} />
                      <Typography>Mi Perfil</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      <Typography>Cerrar Sesión</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleCloseUserMenu}
                  >
                    <LoginIcon sx={{ mr: 1 }} />
                    <Typography>Iniciar Sesión</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
