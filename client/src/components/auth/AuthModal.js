import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class AuthModal extends Component {
  state = {
    modal: false,
    firstName: '',
    lastName: '',
    nickname: '',
    username: '',
    password: '',
    msg: '',
    action: 'Log In'
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL' || error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.data.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggleModal();
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  toggleModal = () => {
    // Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
      action: 'Log In'
    });
  };

  toggleTab = action => {
    this.setState({
      action
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      nickname,
      username,
      password,
      action
    } = this.state;

    if (action === 'Log In') {
      const user = { username, password };

      // Attempt to log in
      this.props.logIn(user);
    } else if (action === 'Register') {
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
    }
  };

  render() {
    const { modal, msg, action } = this.state;

    return (
      <div>
        <Button
          id='authPopover'
          onClick={this.toggleModal}
          outline
          color='light'
        >
          Log In
        </Button>
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <Nav tabs fill>
            <NavItem>
              <NavLink
                className={classnames({ active: action === 'Log In' })}
                onClick={() => {
                  this.toggleTab('Log In');
                }}
                href='#'
              >
                Log In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: action === 'Register' })}
                onClick={() => {
                  this.toggleTab('Register');
                }}
                href='#'
              >
                Register
              </NavLink>
            </NavItem>
          </Nav>
          <ModalBody>
            {msg ? <Alert color='danger'>{msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              {action === 'Register' ? (
                <Fragment>
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
                </Fragment>
              ) : null}
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
                  {action}
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
  { logIn, register, clearErrors }
)(AuthModal);
