import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, FormGroup, Input, FormText, Button } from 'reactstrap'
import { API } from  '../../utils/routes'

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' })

  const handleValues = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })    
  }  

  const handleSubmit = e => {
    e.preventDefault()    
    axios.post(`${API}/api/users/login`, values)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
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
                <Button color="info" block>Login</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login