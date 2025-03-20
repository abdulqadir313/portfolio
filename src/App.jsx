import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import endpoints from './constants/endpoints';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ThemeToggler from './components/ThemeToggler';

const defaultRoutes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Education', path: '/education' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [routes, setRoutes] = useState(defaultRoutes);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.sections) {
          const formattedRoutes = [
            { name: 'Home', path: '/' },
            ...res.sections.map((section) => ({
              name: section.headerTitle,
              path: section.path,
            })),
          ];
          setRoutes(formattedRoutes);
        }
      })
      .catch((err) => {
        console.error('Error loading routes:', err);
      });
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3498db',
      },
      secondary: {
        main: '#2ecc71',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <NavBar routes={routes} />
          <ThemeToggler darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About header="About Me" />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
