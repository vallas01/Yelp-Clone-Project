import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <li>
        <NavLink to='/new-restaurant' exact={true} activeClassName='active'>
          New Restaurant
        </NavLink>
      </li>
      <li>
        <LogoutButton />
      </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
      <li>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
      </>
    )
  }


  return (
    <nav id='navbar-body'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active' id='kelp-me-home-link'>
            Kelp me!
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/new-restaurant' exact={true} activeClassName='active'>
            Open your Restaurant
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/restaurants' exact={true} activeClassName='active'>
            Restaurants
          </NavLink>
        </li>
        {/* <li>
          <LogoutButton />
        </li> */}
        {sessionLinks}
      </ul>
    </nav>
  );



}

export default NavBar;
