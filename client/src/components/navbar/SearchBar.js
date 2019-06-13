import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchUsers } from '../../actions/userActions';

export class SearchBar extends Component {
  state = {
    searchInput: '',
    dropdownOpen: true
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.props.searchUsers({ searchInput: e.target.value });
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { searchInput, dropdownOpen } = this.state;

    return (
      <Form inline>
        <Input
          name='searchInput'
          className='mr-2'
          placeholder='Search'
          onChange={this.onChange}
          value={searchInput}
        />
        <Dropdown tag='input' isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownMenu>
            <DropdownItem>name 1</DropdownItem>
            <DropdownItem>person 2</DropdownItem>
            <DropdownItem>guy 3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button>Search</Button>
      </Form>
    );
  }
}

export default connect(
  null,
  { searchUsers }
)(SearchBar);
