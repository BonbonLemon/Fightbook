import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Button
} from 'reactstrap';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color='info' dark expand='sm'>
          <NavbarBrand href='/'>Fightbook</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Button id='authPopover' outline color='light'>
                  Log In
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
