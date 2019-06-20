import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Post extends Component {
  state = {};

  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const { post, user } = this.props;

    return (
      <Card className='card-shadow mb-2'>
        <CardBody>
          <CardTitle className='mb-1' style={{ fontWeight: 'bold' }}>
            <Link to={`/profile/${post.postedBy._id}`}>
              {post.postedBy.fullName}
            </Link>
            <span> &#9658; </span> {user.fullName}
          </CardTitle>
          <CardSubtitle className='mb-2'>
            {new Date(post.dateCreated).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </CardSubtitle>
          <CardText>{post.body}</CardText>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = ownProps.post || {};
  const user = ownProps.user || {};

  return { post, user };
};

export default connect(
  mapStateToProps,
  null
)(Post);
