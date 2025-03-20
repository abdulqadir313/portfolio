import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  icon: {
    margin: '0 10px',
  },
  error: {
    color: 'error.main',
    textAlign: 'center',
    marginTop: '20px',
  },
};

function Social() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch social data');
        }
        return res.json();
      })
      .then((res) => {
        if (!res || !Array.isArray(res.social)) {
          throw new Error('Invalid social data format');
        }
        setData(res);
      })
      .catch((err) => {
        console.error('Error loading social data:', err);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.error}
      >
        {error}
      </motion.div>
    );
  }

  if (!data?.social?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={styles.container}
    >
      {data.social.map((social) => {
        if (!social?.network || !social?.href) {
          return null;
        }
        return (
          <motion.div
            key={social.network}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={styles.icon}
          >
            <SocialIcon
              url={social.href}
              network={social.network}
              style={{ width: 35, height: 35 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Social; 