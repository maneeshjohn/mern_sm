import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

export const props => ({ profile }) {  
  return(
    <div className="card card-body bg-light mb-3">
      <Row>
        <Col md="2">
          <img
            alt="avatar"
            src={ profile.user.avatar }
            className="rounded-circle" />
        </Col>
        <Col md="4">
          <h3 className="lead">{ profile.user.name }</h3>
          <p>{ profile.status }</p>
          <p>{ profile.location && profile.location }</p>
        </Col>
      </Row>
    </div>
  )
}