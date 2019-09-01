import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';
import About from './About';
import Canvas from './Canvas';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';
import defaultProfile from '../../assets/images/profile-default.png';

class Profile extends Component {
  state = {};

  componentDidMount() {
    this.props.getUser(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.props.getUser(nextProps.userId);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired
  };

  render() {
    const user = this.props.user.user;

    return (
      <Container fluid style={{ padding: '1.25rem', maxWidth: '960px' }}>
        <Row>
          <Col md='4'>
            <Card
              className='card-shadow'
              style={{ alignItems: 'center', textAlign: 'center' }}
            >
              <CardImg
                src={defaultProfile}
                style={{
                  borderRadius: '50%',
                  marginTop: '1.25rem',
                  height: '7rem',
                  width: '7rem'
                }}
              />
              <CardBody style={{ paddingTop: '0.5rem' }}>
                {user ? (
                  <Fragment>
                    <CardTitle
                      className='bold-title mb-1'
                      style={{ fontSize: '1.35em' }}
                    >
                      {user.fullName}
                    </CardTitle>
                    <CardSubtitle className='mb-2'>
                      <strong>{user.profile.nickname}</strong>
                    </CardSubtitle>
                  </Fragment>
                ) : null}
                <CardText>
                  This is some example text to see how the line height affects
                  the project. Here is another sentence that will make the text
                  wrap.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md='8'>
            <About />

            <Canvas userId={this.props.userId} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth, user } = state;
  const { userId } = ownProps.match.params;

  return {
    auth,
    user,
    userId
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
