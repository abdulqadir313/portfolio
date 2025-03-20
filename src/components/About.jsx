import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const About = ({ header }) => {
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
    <>
      <Header title={header} />
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          {data ? (
            <>
              <div className="text-lg font-medium leading-relaxed text-gray-700">
                <ReactMarkdown>{data.about}</ReactMarkdown>
              </div>
              <div className="flex justify-center">
                <img src={data.imageSource} alt="Profile" className="rounded-lg shadow-lg w-full max-w-md" />
              </div>
            </>
          ) : (
            <FallbackSpinner />
          )}
        </div>
      </section>
    </>
  );
};

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;