import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem
  // NavLink
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Container,
  // Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from './AuthModal';
import Logout from './Logout';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { isAuthenticated, currentUser } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem />
        <NavItem>
          {currentUser ? (
            <Link to={`/profile/${currentUser._id}`}>
              <span className='navbar-text mr-3'>
                <strong>{`Welcome ${currentUser.profile.firstName}`}</strong>
              </span>
            </Link>
          ) : null}
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <AuthModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='info' dark expand='sm'>
          <Link
            to='/'
            style={{ fontSize: '2rem', color: 'white', textDecoration: 'none' }}
          >
            fightbook
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
