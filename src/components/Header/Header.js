import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import PointsTracker from '../PointsTracker/PointsTracker';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderLogoutLink() {
    return (
      <div>
        <nav>
          <Link to='/dashboard' className='NavLink'>Dashboard</Link>
          {' | '}
          <Link
            className='NavLink'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
        <span className='username'>
          {this.context.user.name}
        </span>
        <span className='pointsTracker'>
          <PointsTracker />
        </span>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='NavLink'>Login</Link>
        {' | '}
        <Link to='/register' className='NavLink'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1 className='Title'>
          <Link to='/' className='TitleLink'>
            Goat
          </Link>
        </h1>
        <div className='NavBar'>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header;
