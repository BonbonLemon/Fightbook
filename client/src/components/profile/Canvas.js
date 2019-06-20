import React, { Component, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { Post } from './Post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, createPost } from './../../actions/postActions';

export class Canvas extends Component {
  state = {
    post: ''
  };

  componentDidMount() {
    this.props.getPosts(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.props.getPosts(nextProps.userId);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { user, auth, createPost } = this.props;
    const { post } = this.state;

    const newPost = {
      postedBy: auth.currentUser._id,
      postedTo: user.user._id,
      body: post
    };

    createPost(newPost);
  };

  render() {
    const user = this.props.user.user || {};
    const profile = user.profile || {};
    const { post } = this.state;
    const posts = this.props.post.posts || [];

    return (
      <Fragment>
        <Card className='card-shadow mb-3'>
          <CardBody>
            <CardTitle className='bold-title'>Canvas</CardTitle>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  name='post'
                  type='textarea'
                  placeholder={
                    'Write something to ' + profile.firstName + '...'
                  }
                  value={post}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Button color='info' block>
                  Post
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <h6 className='ml-1'>Posts</h6>
        {posts.map(post => (
          <Post key={post._id} post={post} user={user} />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth, user, post } = state;
  const { userId } = ownProps;

  return {
    auth,
    user,
    userId,
    post
  };
};

export default connect(
  mapStateToProps,
  { createPost, getPosts }
)(Canvas);
