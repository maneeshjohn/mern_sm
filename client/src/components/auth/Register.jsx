import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Input, FormText, Button } from 'reactstrap'

const Register = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '', password2: '' })
  const [noMatch, setNoMatch] = useState('')

  const handleValues = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })    
  }  

  const handleSubmit = e => {
    e.preventDefault()    
    if(values.password == values.password2){
      console.log(values)
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
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  value={ values.name }
                  placeholder="Enter your full name"
                  onChange={ handleValues } />
                  <FormText className="text-center">Email is compatible with gravatar</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  value={ values.email }
                  placeholder="Enter your Email Id"
                  onChange={ handleValues } />
                  <FormText className="text-center">Email is compatible with gravatar</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  value={ values.password }
                  placeholder="Enter your Password"
                  onChange={ handleValues } />
                  <FormText className="text-center">Email is compatible with gravatar</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password2"
                  value={ values.password2 }
                  placeholder="Confirm your password"
                  onChange={ handleValues } />
                  <FormText className="text-center">{ noMatch }</FormText>
              </FormGroup>
              <FormGroup>
                <Button color="info" block>Register</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register