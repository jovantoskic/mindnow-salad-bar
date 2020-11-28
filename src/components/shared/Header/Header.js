import React from 'react';
import { NavLink } from 'react-router-dom';

import { AppBar, Toolbar, List } from '@material-ui/core';
import { navItems } from './headerConfig';
import { ReactComponent as SaladImage } from '../../../assets/icons/salad.svg';

import './Header.scss';

function Header() {
  return (
    <AppBar className="header-container" position="static" color="transparent">
      <Toolbar className="header-inner-container">
        <SaladImage className="salad-icon" />
        <List component="nav" className="header-items">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              activeClassName="header-item-active"
              className="header-item"
              exact={item.exact}
              to={item.to}
            >
              {item.name}
            </NavLink>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
