import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const user = this.props.user.user;

    // const

    return (
      <Card className='card-shadow mb-4'>
        <CardBody>
          <CardTitle className='bold-title'>About</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { auth, user } = state;

  return {
    auth,
    user
  };
};

export default connect(
  mapStateToProps,
  null
)(About);
