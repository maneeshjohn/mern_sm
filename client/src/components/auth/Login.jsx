import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { authorizeUser } from '../../redux/actions/authActions'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { InputComponent } from '../common/InputComponent'

const Login = props => {
  const [values, setValues] = useState({ email: '', password: '' })  

  const handleValues = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })    
  }  

  const handleSubmit = e => {
    e.preventDefault()
    props.authorizeUser(values, props.history)
  }

  return(
    <div className="login p-5">
      <Container>
        <Row>
          <Col md="6" className="m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your developer hub</p>
            <Form
              noValidate
              className="p-3"
              onSubmit={ handleSubmit }>              
              <InputComponent
                type="email"
                name="email"
                value={ values.email }
                placeholder="Enter your email id"
                change={ handleValues }
                error={ props.errors.email } />
              <InputComponent
                type="password"
                name="password"
                value={ values.password }
                placeholder="Enter your password"
                change={ handleValues }
                error={ props.errors.password } />
              <FormGroup>
                <Button
                  color="info" 
                  block>
                  Login</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  authorizeUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { authorizeUser }
)(withRouter(Login))