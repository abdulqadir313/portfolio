import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, 
  TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
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
  timelineContent: {
    py: 2,
    px: 3,
    mb: 2,
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
  experienceTitle: {
    fontWeight: 600,
    mb: 1,
    color: 'primary.main',
  },
  companyName: {
    fontWeight: 500,
    mb: 1,
  },
  date: {
    color: 'text.secondary',
    fontWeight: 500,
  },
  location: {
    color: 'text.secondary',
    mb: 1,
  },
  description: {
    mt: 1,
    color: 'text.secondary',
  },
  timelineDot: {
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  timelineConnector: {
    backgroundColor: 'primary.main',
  },
  workType: {
    color: 'text.secondary',
    fontWeight: 500,
  },
};

function Experience() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch experiences');
        }
        return res.json();
      })
      .then((res) => {
        if (!res || !Array.isArray(res.experiences)) {
          throw new Error('Invalid experiences data format');
        }
        setData(res);
      })
      .catch((err) => {
        console.error('Error loading experiences:', err);
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

  if (!data?.experiences?.length) {
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
          Experience
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          My professional journey and work experience
        </Typography>
        <Timeline position="alternate">
          {data.experiences.map((experience, index) => (
            <TimelineItem key={experience.title}>
              <TimelineOppositeContent color="text.secondary">
                <Typography variant="subtitle1" sx={styles.date}>
                  {experience.duration}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" sx={styles.timelineDot}>
                  <WorkIcon />
                </TimelineDot>
                {index !== data.experiences.length - 1 && (
                  <TimelineConnector sx={styles.timelineConnector} />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper elevation={3} sx={styles.timelineContent}>
                    <Typography variant="h5" sx={styles.experienceTitle}>
                      {experience.title}
                    </Typography>
                    <Typography variant="h6" sx={styles.companyName}>
                      {experience.subtitle}
                    </Typography>
                    <Typography variant="subtitle2" sx={styles.workType}>
                      {experience.workType}
                    </Typography>
                    <Typography variant="subtitle1" sx={styles.date}>
                      {experience.dateText}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {experience.workDescription.map((desc, i) => (
                        <Typography 
                          key={i} 
                          variant="body1" 
                          sx={{ 
                            ...styles.description,
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            '&::before': {
                              content: '"•"',
                              marginRight: '8px',
                              color: 'primary.main',
                              fontSize: '1.2em',
                            }
                          }}
                        >
                          {desc}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </motion.div>
    </Container>
  );
}

export default Experience; 