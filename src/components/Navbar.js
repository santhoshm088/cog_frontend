import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import '../styles/Navbar.css';

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAdmin } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-container">
          <img src={require('../assets/ccc_logo.png')} alt="CCC" />
        </div>{' '}
        <div className="waviy">
          <div style={{ '--i': '1' }}> C </div>{' '}
          <div style={{ '--i': '2' }}> S </div>{' '}
          <div style={{ '--i': '3' }}> E </div>{' '}
          <div style={{ '--i': '4' }}> &nbsp; &nbsp; </div>{' '}
          <div style={{ '--i': '5' }}> C </div>{' '}
          <div style={{ '--i': '6' }}> O </div>{' '}
          <div style={{ '--i': '7' }}> D </div>{' '}
          <div style={{ '--i': '8' }}> I </div>{' '}
          <div style={{ '--i': '9' }}> N </div>{' '}
          <div style={{ '--i': '10' }}> G </div>{' '}
          <div style={{ '--i': '11' }}> &nbsp; &nbsp; </div>{' '}
          <div style={{ '--i': '12' }}> C </div>{' '}
          <div style={{ '--i': '13' }}> L </div>{' '}
          <div style={{ '--i': '14' }}> U </div>{' '}
          <div style={{ '--i': '15' }}> B </div>{' '}
        </div>{' '}
      </div>{' '}
      <div
        className={
          menuOpen
            ? menuOpen
              ? 'container small-active-container green borderXwidth'
              : 'container small-container green borderXwidth'
            : 'container green borderXwidth'
        }
      >
        <Link to="/"> HOME </Link>{' '}
        <Link
          to="/guidelines
            "
        >
          GUIDELINES{' '}
        </Link>{' '}
        {userInfo ? (
          <Link to="/stage1"> CODE </Link>
        ) : (
          <Link to="/signin"> CODE </Link>
        )}{' '}
      </div>{' '}
      <div className="profile">
        {' '}
        {userInfo ? (
          userInfo.name
        ) : (
          <Link to="/signin">
            LOGIN <i className="fa-solid fa-right-to-bracket"> </i>{' '}
          </Link>
        )}{' '}
        {isAdmin ? (
          <Link to="/admin">
            ADMIN <i className="fa-solid fa-user-secret"> </i>{' '}
          </Link>
        ) : (
          <Link to="/admin-signin">
            ADMIN <i className="fa-solid fa-user-secret"> </i>{' '}
          </Link>
        )}{' '}
      </div>{' '}
    </nav>
  );
}
