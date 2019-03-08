import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styles from './author.module.css';

const Author = ({ author }) => (
  <div className={styles.authorWrapper}>
    <Img
      alt={author.name}
      fluid={author.image.fluid}
      className={styles.authorImage}
    />
    <div className={styles.authorMeta}>
      <p className={styles.authorName}>{author.name}</p>
      <p className={styles.authorRole}>{author.role}</p>
    </div>
  </div>
);

Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.shape({
      fluid: PropTypes.object,
    }),
  }).isRequired,
};

export default Author;