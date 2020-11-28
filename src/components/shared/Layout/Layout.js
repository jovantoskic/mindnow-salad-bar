import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

import './Layout.scss';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <section className="content">{children}</section>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
