import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'

export default props =>    
  <div className="landing">
    <div className="dark-overlay landing-inner text-light">
      <Container>
        <Row>
          <Col md="12" className="text-center">
            <h1 className="display-3 mb-4">Developer Hub</h1>
            <p className="lead">
              {' '}
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <hr />
            <Link
              to="/register"
              className="no-dec">
              <Button
                outline
                color="info"
                size="lg"
                className="m-2">
                Register
              </Button>
            </Link>
            <Link
              to="/login"
              className="no-dec">
              <Button                
                size="lg"
                outline
                color="warning"
                className="m-2">
                Login
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  </div>    