import React from 'react';

import './nav-bar.css';

function NavBar({ navEls, navActive, onNavChange }) {
  const navigation = navEls.map((el) => {
    const { name } = el;
    const className = `nav__item ${name === navActive ? 'nav__item--selected' : ''}`;
    return (
      <li key={name} className={className} onClick={() => onNavChange(name)}>
        {name}
      </li>
    );
  });
  return <nav className="nav">{navigation}</nav>;
}

export default NavBar;
