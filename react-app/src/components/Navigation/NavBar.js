import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import SearchBar from './SearchBar';

const NavBar = () => {
  const sessionUser = useSelector(state => state?.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document?.addEventListener('click', closeMenu);

    return () => document?.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // console.log("NavBarrrrrrrrrrrrrr", sessionUser)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/new-restaurant' exact={true} activeClassName='active'>
            New Restaurant
          </NavLink>
        </li>
        <div className='dropdown' >
          <img src={sessionUser?.avatar} onClick={openMenu} width='40px' height='40px' alt={sessionUser.id} />

            {showMenu && (
              <div className='dropdown-menu'>
                  <ul>
                    <li>
                      <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
                        About Me
                      </NavLink>
                    </li>
                    {/* <li>
                      <a>Account setting</a>
                    </li> */}
                    <li>
                      <LogoutButton />
                    </li>
                  </ul>

              </div>
            )}
        </div>
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
        <SearchBar />
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {sessionLinks}
      </ul>
    </nav>
  );

/* top: var(--navbar-body-height); */

}

export default NavBar;
