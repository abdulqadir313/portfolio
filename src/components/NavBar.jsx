import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  Box,
  useScrollTrigger,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion } from 'framer-motion';

const styles = {
  appBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&.dark-mode': {
      backgroundColor: 'rgba(18, 18, 18, 0.95)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    '&.scrolled': {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      '&.dark-mode': {
        backgroundColor: 'rgba(18, 18, 18, 0.98)',
      },
    },
  },
  toolbar: {
    justifyContent: 'space-between',
    minHeight: '64px',
    padding: '0 24px',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'text.primary',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.5rem',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: 'text.primary',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    '&:hover': {
      color: 'primary.main',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.active': {
      color: 'primary.main',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  menuButton: {
    display: { xs: 'block', sm: 'none' },
    color: 'text.primary',
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: 250,
      boxSizing: 'border-box',
      backgroundColor: 'background.paper',
    },
  },
  drawerItem: {
    padding: '12px 24px',
    '&.active': {
      backgroundColor: 'primary.light',
      color: 'primary.contrastText',
    },
  },
  themeToggle: {
    marginLeft: '16px',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
};

function NavBar({ routes = [], toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const isDarkMode = theme.palette.mode === 'dark';
  const isHomePage = location.pathname === '/';
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationLinks = Array.isArray(routes) ? routes : [];

  const NavLink = ({ route, onClick }) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={route.path.replace('/', '')}
          spy
          smooth
          offset={-64}
          duration={500}
          className="nav-link"
          style={styles.navLink}
          activeClass="active"
          onClick={onClick}
        >
          {route.name}
        </ScrollLink>
      );
    }
    return (
      <RouterLink
        to={`/${route.path.replace('/', '')}`}
        style={styles.navLink}
        className={location.pathname === route.path ? 'active' : ''}
        onClick={onClick}
      >
        {route.name}
      </RouterLink>
    );
  };

  NavLink.propTypes = {
    route: PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
  };

  const drawer = (
    <List>
      {navigationLinks.map((route) => (
        <ListItem
          key={route.name}
          className={location.pathname === route.path ? 'active' : ''}
          sx={styles.drawerItem}
        >
          <NavLink route={route} onClick={handleDrawerToggle} />
        </ListItem>
      ))}
      <ListItem>
        <IconButton onClick={toggleTheme} sx={styles.themeToggle}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </ListItem>
    </List>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar 
        position="fixed" 
        sx={{
          ...styles.appBar,
          '&.dark-mode': isDarkMode,
          '&.scrolled': trigger,
        }}
      >
        <Toolbar sx={styles.toolbar}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={styles.title}
          >
            Portfolio
          </Typography>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={styles.navLinks}>
              {navigationLinks.map((route) => (
                <NavLink key={route.name} route={route} />
              ))}
              <IconButton onClick={toggleTheme} sx={styles.themeToggle}>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={styles.drawer}
      >
        {drawer}
      </Drawer>
      <Toolbar /> {/* Add spacing below AppBar */}
    </motion.div>
  );
}

NavBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  toggleTheme: PropTypes.func.isRequired,
};

export default NavBar; 