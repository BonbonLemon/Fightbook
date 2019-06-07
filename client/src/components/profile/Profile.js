import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultProfile from '../../assets/images/profile-default.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md='4'>
            <Card>
              <CardImg src={defaultProfile} />
              <CardBody />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Profile);
