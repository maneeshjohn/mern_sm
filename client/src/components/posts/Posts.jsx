import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { getPosts } from '../../redux/actions/postActions'
import PostItem from './PostItem'
import Spinner from '../common/Spinner'

export const Posts = props => {

  useEffect(() => {
    props.getPosts()
  }, [])

  const postList = props.posts.list.map(post => <PostItem post={ post } />)

  let postContent
  if(props.posts.loading){
    postContent = <Spinner />
  } else {
    if(props.posts.list.length < 1){
      postContent = <p className="text-center">No posts availabe. Please check back later</p>
    } else {
      postContent = postList
    }
  }

  return(
    <div className="posts">
      <Container>
        <h1 className="display-4 text-center">Posts</h1>
        <p className="lead text-muted text-center">View thoughts posted by other users</p>
        <div>
          { postContent }
        </div>
      </Container>
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)