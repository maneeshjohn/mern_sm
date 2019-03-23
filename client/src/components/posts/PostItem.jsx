import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { getSinglePost, likePost } from '../../redux/actions/postActions'

const PostItem = ({ auth, post }) => {

  const likeIcon = post.likes.filter(like => {
    if(like.user === auth.user.id){
      return like
    }
  })  

  return(
    <div
      key={ post._id }
      className="card card-body bg-light mb-3 pb-0">
      <Row>
        <Col md="2">
          <img
            alt="avatar"
            src={ post.avatar }
            className="rounded-circle mb-3"/>        
        </Col>
        <Col md="10">
          <h5 className="p-3 lead">{ post.content }</h5>        
        </Col>
        <Col md="2">
          <p className="text-center lead"><small>{ post.name }</small></p>
        </Col>
        <Col md="3">
          <div className="pl-5">
            <span>
              <i className="material-icons">{ likeIcon.length > 0? 'favorite': 'favorite_bordered' }</i>
              { likeIcon.length > 0 && likeIcon.length }
            </span>
          </div>
        </Col>
        <Col md="3">
          <div className="d-flex justify-content-center">
            <span>
              <button className="btn btn-sm btn-outline-info">Comments</button>
            </span>
          </div>
        </Col>
        <Col md="4">
          <div className="d-flex justify-content-center">
            <span>
              <p className="text-center lead">
                <small>
                  Posted on :
                  <em>{ post.date.split('T')[0] }</em>
                </small>
              </p>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  getSinglePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired    
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getSinglePost, likePost }
)(PostItem)