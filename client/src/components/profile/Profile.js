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
import Canvas from './Canvas';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';
import defaultProfile from '../../assets/images/profile-default.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
              <CardBody>
                {user ? (
                  <Fragment>
                    <CardTitle style={{ fontSize: '1.35em' }}>
                      <strong>{user.fullName}</strong>
                    </CardTitle>
                    <CardSubtitle>
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
            <Card className='card-shadow mb-4'>
              <CardBody>
                <CardTitle className='card-title'>About</CardTitle>
              </CardBody>
            </Card>

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
