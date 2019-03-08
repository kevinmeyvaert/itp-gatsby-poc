import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import styles from './blockSingleImage.module.css';

const BlockSingleImage = ({ contentBlock }) => {
  switch (contentBlock.style) {
    case 'fullWidth':
    case 'boxed':
      return (
        <div className={styles.singleImageBlockFullWidth}>
            <Img
              alt={contentBlock.imageDescription}
              fluid={contentBlock.image.fluid}
              className={styles.duoImageBlockFirstPhoto}
            />
        </div>
      );
    default:
      return null;
  }
};

BlockSingleImage.propTypes = {
  contentBlock: PropTypes.shape({
    image: PropTypes.shape({
      fluid: PropTypes.object,
    }),
    imageDescription: PropTypes.string,
    style: PropTypes.string,
  }).isRequired,
};

export default BlockSingleImage;