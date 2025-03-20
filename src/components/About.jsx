import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  container: {
    py: 8,
    px: 3,
  },
  content: {
    height: '100%',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
  },
};

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoints.about);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching About data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
        }}
      >
        {header}
      </Typography>
      {data ? (
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={styles.text}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={data.imageSource}
                alt="Profile"
                style={styles.image}
              />
            </motion.div>
          </Grid>
        </Grid>
      ) : (
        <FallbackSpinner />
      )}
    </Container>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About; 