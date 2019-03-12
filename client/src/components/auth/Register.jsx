import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerNewUser } from '../../redux/actions/authActions'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { InputComponent } from '../common/InputComponent'

const Register = props => {
  const [values, setValues] = useState({ name: '', email: '', password: '', password2: '' })  
  const [noMatch, setNoMatch] = useState('')

  const handleValues = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })    
  }  

  const handleSubmit = e => {
    e.preventDefault()    
    if(values.password == values.password2){
      props.registerNewUser(values, props.history)
    } else {
      setNoMatch('Passwords do not match')
    }
  }

  return(
    <div className="register p-5">
      <Container>
        <Row>
          <Col md="6" className="m-auto">
            <h1 className="display-4 text-center">Register</h1>
            <p className="lead text-center">Create your own developer hub</p>
            <Form
              noValidate
              className="p-3"
              onSubmit={ handleSubmit }>
              <InputComponent
                type="text"
                name="name"
                value={ values.name }
                placeholder="Enter your full name"
                change={ handleValues }
                error={ props.errors.name } />
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
              <InputComponent
                type="password"
                name="password2"
                value={ values.password2 }
                placeholder="Confirm your password"
                change={ handleValues }
                error={ props.errors.password2 } />
              <FormGroup>
                <Button
                  color="info" 
                  block>
                  Register</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  registerNewUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerNewUser }
)(withRouter(Register))