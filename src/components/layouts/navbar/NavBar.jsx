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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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

  return (
    <AppBar
      position="fixed"
      className="navbar-custom"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Desktop */}
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

          {/* Hamburger Menu Mobile */}
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

              {/* Carrito */}
              <MenuItem
                onClick={handleCloseNavMenu}
                component={Link}
                to="/cart"
              >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                <Typography>Carrito</Typography>
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
          </Box>

          <Link to={"/"} className="navbar-logo-mobile">
            <LogoIcon
              className="navbar-logo-icon-mobile"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            className="navbar-title-mobile"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            GAMERZONE
          </Typography>

          {/* Categorías Desktop */}
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

          <Box
            component={Link}
            to="/cart"
            sx={{
              display: "flex",
              mr: { xs: 1, md: 2 },
              color: "white",
              textDecoration: "none",
              alignItems: "center",
            }}
          >
            <CartWidget />
          </Box>

          {/* Toggle de tema */}
          <Tooltip title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
            <IconButton onClick={toggleTheme} className="theme-toggle-button">
              {theme === "dark" ? (
                <LightModeIcon className="theme-icon" />
              ) : (
                <DarkModeIcon className="theme-icon" />
              )}
            </IconButton>
          </Tooltip>

          {/* Menú de usuario */}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
