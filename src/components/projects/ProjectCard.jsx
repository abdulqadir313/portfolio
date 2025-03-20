import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  useTheme,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  media: {
    height: 200,
    objectFit: 'cover',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 600,
    marginBottom: 1,
  },
  description: {
    flexGrow: 1,
    marginBottom: 2,
  },
  buttonContainer: {
    display: 'flex',
    gap: 1,
    marginBottom: 2,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
  chip: {
    borderRadius: '16px',
    fontWeight: 500,
  },
};

function ProjectCard({ project }) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={styles.card} elevation={3}>
        {project.image && (
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={styles.media}
          />
        )}
        <CardContent sx={styles.content}>
          <Typography variant="h5" component="h2" sx={styles.title}>
            {project.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={styles.description}
          >
            <ReactMarkdown>{project.bodyText}</ReactMarkdown>
          </Typography>
          {project.links && project.links.length > 0 && (
            <Box sx={styles.buttonContainer}>
              {project.links.map((link) => (
                <Button
                  key={link.href}
                  variant="contained"
                  color="primary"
                  onClick={() => window.open(link.href, '_blank')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  {link.text}
                </Button>
              ))}
            </Box>
          )}
          {project.tags && project.tags.length > 0 && (
            <Box sx={styles.chipContainer}>
              {project.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    ...styles.chip,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard; 