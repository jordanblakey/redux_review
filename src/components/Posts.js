import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPosts } from '../actions/postActions'

class Posts extends Component {
  componentWillMount = () => {
    this.props.fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost)
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    )
  }
}

Posts.defaultProps = {
  newPost: {}
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  newPost: PropTypes.object,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  newPost: state.posts.item,
  posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts)
