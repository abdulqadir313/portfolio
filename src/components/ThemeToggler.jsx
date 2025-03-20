import { motion } from 'framer-motion';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
};

function ThemeToggler({ darkMode, setDarkMode }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        color="inherit"
        aria-label="toggle theme"
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </motion.div>
  );
}

export default ThemeToggler; 