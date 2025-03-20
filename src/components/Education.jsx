import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  container: {
    py: 8,
  },
  title: {
    textAlign: 'center',
    mb: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: 'text.secondary',
    mb: 8,
  },
  educationCard: {
    height: '100%',
    p: 3,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      backgroundColor: 'primary.main',
      borderRadius: '2px',
    },
  },
  schoolName: {
    fontWeight: 600,
    mb: 1,
  },
  degree: {
    color: 'primary.main',
    mb: 1,
  },
  date: {
    color: 'text.secondary',
    mb: 2,
  },
  description: {
    color: 'text.secondary',
  },
  icon: {
    fontSize: 40,
    color: 'primary.main',
    mb: 2,
  },
};

function Education() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch education data');
        }
        return res.json();
      })
      .then((res) => {
        if (!res || !Array.isArray(res.education)) {
          throw new Error('Invalid education data format');
        }
        setData(res);
      })
      .catch((err) => {
        console.error('Error loading education data:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <FallbackSpinner />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={styles.container}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!data?.education?.length) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" sx={styles.title}>
          Education
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          My academic journey and qualifications
        </Typography>
        <Grid container spacing={4}>
          {data.education.map((edu, index) => (
            <Grid item xs={12} md={6} key={edu.school}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper elevation={3} sx={styles.educationCard}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SchoolIcon sx={styles.icon} />
                    <Typography variant="h5" sx={styles.schoolName}>
                      {edu.cardTitle}
                    </Typography>
                    <Typography variant="h6" sx={styles.degree}>
                      {edu.cardSubtitle}
                    </Typography>
                    <Typography variant="subtitle1" sx={styles.date}>
                      {edu.title}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Education; 