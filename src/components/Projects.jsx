import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import ProjectCard from './projects/ProjectCard';

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
  grid: {
    mt: 4,
  },
};

function Projects() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        return res.json();
      })
      .then((res) => {
        if (!res || !Array.isArray(res.projects)) {
          throw new Error('Invalid projects data format');
        }
        setData(res);
      })
      .catch((err) => {
        console.error('Error loading projects:', err);
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

  if (!data?.projects?.length) {
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
          Projects
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          A collection of my work and contributions
        </Typography>
        <Grid container spacing={4} sx={styles.grid}>
          {data.projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.title}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Projects; 