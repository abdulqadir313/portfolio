import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { Container, Box, Typography } from '@mui/material';
import endpoints from '../constants/endpoints';
import Social from './Social';
import About from './About';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import Projects from './Projects';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '4em',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  inlineChild: {
    display: 'inline-block',
    fontSize: '2em',
    marginBottom: '2rem',
  },
  mainContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem 0',
  },
  section: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4rem 0',
    scrollMarginTop: '64px', // height of navbar
  },
  heroSection: {
    background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
  },
  typewriterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
};

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch home data');
        }
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading home data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <FallbackSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Element name="home">
        <Box sx={{ ...styles.section, ...styles.heroSection }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.mainContainer}
            >
              <Typography variant="h1" sx={styles.nameStyle}>
                {data?.name}
              </Typography>
              <Box sx={styles.typewriterContainer}>
                <Typography sx={styles.inlineChild}>I&apos;m&nbsp;</Typography>
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    strings: data?.roles,
                    wrapperClassName: styles.inlineChild,
                    cursorClassName: styles.inlineChild,
                  }}
                />
              </Box>
              <Social />
            </motion.div>
          </Container>
        </Box>
      </Element>

      <Element name="about">
        <Box sx={styles.section}>
          <About header="About Me" />
        </Box>
      </Element>

      <Element name="skills">
        <Box sx={styles.section}>
          <Skills />
        </Box>
      </Element>

      <Element name="education">
        <Box sx={styles.section}>
          <Education />
        </Box>
      </Element>

      <Element name="experience">
        <Box sx={styles.section}>
          <Experience />
        </Box>
      </Element>

      <Element name="projects">
        <Box sx={styles.section}>
          <Projects />
        </Box>
      </Element>
    </Box>
  );
}

export default Home; 