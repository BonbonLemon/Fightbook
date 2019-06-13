import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { searchUsers } from '../../actions/userActions';

export class SearchBar extends Component {
  state = {
    searchInput: '',
    redirectTo: false
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    searchUsers: PropTypes.func.isRequired
  };

  onInputChange = (input, { action }) => {
    if (action === 'input-change') {
      this.setState({ searchInput: input });

      this.props.searchUsers({ searchInput: input });
    }
  };

  onSelect = (user, { action }) => {
    if (action === 'select-option') {
      this.setState({ searchInput: '', redirectTo: '/profile/' + user.value });
    }
  };

  render() {
    const { searchInput, redirectTo } = this.state;
    const users = this.props.user.users || [];
    const options = users.map(user => ({
      value: user._id,
      label: user.fullName
    }));

    return (
      <Form inline>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <div className='mr-3' style={{ width: '18em' }}>
          <Select
            inputValue={searchInput}
            onInputChange={this.onInputChange}
            onChange={this.onSelect}
            options={options}
            placeholder='Search'
            noOptionsMessage={({ inputValue }) =>
              'Couldn\'t find anything for "' + inputValue + '"'
            }
            escapeClearsValue={false}
          />
        </div>
        <Button>Search</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { searchUsers }
)(SearchBar);
