import React from 'react'
import { Row, Col } from 'reactstrap'

export default props =>
  <Row className="about">
    <Col md="12">
      <div className="card card-body bg-light mb-3">
        <h3 className="text-center text-info">Bio</h3>
        <p className="lead">{ props.profile.bio? props.profile.bio: 'Does not have a bio' }</p>
        <hr />
        <h3 className="text-center text-info">Skills</h3>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
        { props.profile.skills.map(
            skill =>
              <div
                key={ skill }
                className="p-3 d-flex align-items-center">
                <small><i className="material-icons">done</i></small>
                { skill }
              </div>
          )
        }
        </div>
      </div>
    </Col>
  </Row>