import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class SessionModal extends Component {
  state = {
    modal: false,
    firstName: '',
    lastName: '',
    nickname: '',
    username: '',
    password: '',
    msg: ''
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, nickname, username, password } = this.state;
    // Create user object
    const newUser = {
      firstName,
      lastName,
      nickname,
      username,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    const { modal, msg } = this.state;

    return (
      <div>
        <Button id='authPopover' onClick={this.toggle} outline color='light'>
          Log In
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Log In</ModalHeader>
          <ModalBody>
            {msg ? <Alert color='danger'>{msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <Row form>
                <Col xs='6'>
                  <FormGroup>
                    <Label for='firstName'>
                      First Name <span style={{ color: 'red' }}>*</span>
                    </Label>
                    <Input
                      type='text'
                      name='firstName'
                      id='firstName'
                      placeholder='First name'
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs='6'>
                  <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Last name'
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for='nickname'>Nickname</Label>
                <Input
                  type='text'
                  name='nickname'
                  id='nickname'
                  placeholder='Nickname'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='username'>
                  Username <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='password'>
                  Password <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Button color='info' block>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(SessionModal);
