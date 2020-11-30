import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import './Message.scss';

function Message({ message }) {
  return (
    <Typography className="info-headline" variant="h3" color="primary">
      {message}
    </Typography>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
