import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form } from 'reactstrap'
import { createPost } from '../../redux/actions/postActions'
import { InputComponent } from '../common/InputComponent'

const AddPost = props => {

  const [content, setContent] = useState('')

  const handleChange = e => {    
    setContent(e.target.value)    
  }

  const onSubmit = e => {
    e.preventDefault()
    const { name, id, avatar } = props.auth.user
    const data = { user: id, name, avatar, content }    
    props.createPost(data)
  }

  return(
    <div className="post-form mb-4">
      <Container>
        <h1 className="display-4 text-center">Add Post</h1>
        <p className="lead text-center">Have some thoughts to share? Fire away...</p>
        <Row>
          <Col
            md="7"
            className="m-auto">
            <Form
              noValidate
              onSubmit={onSubmit}>
              <div className="card card-body p-2 mb-2 bg-light">
                <h6>Say something</h6>
              </div>
              <InputComponent
                type="textarea"
                name="content"
                value={ content }
                change={ handleChange }
                className="form-control-lg"
                error={ props.errors.content }/>
              <button type="submit" className="btn btn-secondary btn-block">Post</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

AddPost.propTypes = {
  errors: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createPost }
)(AddPost)