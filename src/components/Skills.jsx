import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
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
  skillCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 3,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  skillImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    mb: 2,
  },
  skillName: {
    fontWeight: 600,
    textAlign: 'center',
    mb: 1,
  },
  categoryTitle: {
    fontWeight: 600,
    mb: 4,
    textAlign: 'center',
    color: 'primary.main',
  },
  intro: {
    textAlign: 'center',
    mb: 6,
    maxWidth: '800px',
    mx: 'auto',
    lineHeight: 1.8,
  },
};

function Skills() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch skills');
        }
        return res.json();
      })
      .then((res) => {
        if (!res || !Array.isArray(res.skills)) {
          throw new Error('Invalid skills data format');
        }
        setData(res);
      })
      .catch((err) => {
        console.error('Error loading skills:', err);
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

  if (!data?.skills?.length) {
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
          Skills
        </Typography>
        <Typography variant="body1" sx={styles.intro}>
          {data.intro}
        </Typography>
        {data.skills.map((category, categoryIndex) => (
          <Box key={category.title} sx={{ mb: 8 }}>
            <Typography variant="h4" sx={styles.categoryTitle}>
              {category.title}
            </Typography>
            <Grid container spacing={4}>
              {category.items.map((skill, index) => (
                <Grid item xs={6} sm={4} md={3} key={skill.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper elevation={3} sx={styles.skillCard}>
                      <img
                        src={skill.icon}
                        alt={skill.title}
                        style={styles.skillImage}
                      />
                      <Typography variant="h6" sx={styles.skillName}>
                        {skill.title}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </motion.div>
    </Container>
  );
}

export default Skills; 