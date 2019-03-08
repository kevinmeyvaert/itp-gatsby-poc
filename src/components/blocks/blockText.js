import React from 'react';
import PropTypes from 'prop-types';

import styles from './blockText.module.css';

const BlockText = ({ contentBlock }) => (
  <div className={styles.textBlock}>
    <div
      dangerouslySetInnerHTML={{
        __html: contentBlock.text.childMarkdownRemark.html,
      }}
    />
  </div>
);

BlockText.propTypes = {
  contentBlock: PropTypes.shape({
    text: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default BlockText;