import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.scss';

const links: string[][] = [
  ['/', 'Home'],
  ['/performance', 'Performance'],
  ['/definitelyTyped', 'DefinitelyTyped'],
];

export function Navigation(): JSX.Element {
  return <div className='Navigation-container'>
    {links.map((link: string[], key: number) => {
      return <NavLink key={key} exact className='Navigation-link' activeClassName='Navigation-linkActive' to={link[0]}>{link[1]}</NavLink>;
    })}
  </div>;
}
