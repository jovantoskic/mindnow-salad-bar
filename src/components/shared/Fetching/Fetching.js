import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import Message from '../Message';

function Fetching({ message }) {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFetching(false), 2500);
    return () => clearTimeout(timer);
  }, [isFetching]);

  return <div>{isFetching ? <Loading /> : <Message message={message} />}</div>;
}

Fetching.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Fetching;
