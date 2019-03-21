import React from 'react'
import { Row, Col } from 'reactstrap'

export default props =>
  <Row>
    <Col md="12">
      <div className="card card-body bg-info text-white mb-3">
        <Row>
          <Col
            md="5"
            className="text-center">
            <img
              alt="Avatar"
              className="rounded-circle"
              src={ props.profile.user.avatar } />
          </Col>
        </Row>
        <div className="text-center">
          <h1 className="display-4">{ props.profile.user.name }</h1>
          <p className="lead">{ props.profile.position }</p>
          <p className="text-muted">{ props.profile.location }</p>
        </div>
      </div>
    </Col>
  </Row>