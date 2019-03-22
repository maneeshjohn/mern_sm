import React from 'react'
import { Row, Col } from 'reactstrap'

export default ({ experience, education }) => {

  const expValue = experience.map(
    exp =>
      <li
        key={ exp._id }
        className="list-group-item">
        <h4>{ exp.company }</h4>
        <p>{ exp.from.split('T')[0] } to { exp.to? exp.to.split('T')[0]: 'Now' }</p>
        <p>Position : { exp.title }</p>
        { exp.location && <p>Location : { exp.location }</p> }
        { exp.description && <p>Description : { exp.description }</p> }
      </li>
    )

  const eduValue = education.map(
    edu =>
      <li
        key={ edu._id }
        className="list-group-item">
        <h4>{ edu.institution }</h4>
        <p>University : { edu.university }</p>
        <p>{ edu.from.split('T')[0] } to { edu.to? edu.to.split('T')[0]: 'Now' }</p>
        <p>Field : { edu.stream }</p>
        { edu.location && <p>Location : { edu.location }</p> }
        { edu.description && <p>Description : { edu.description }</p> }
      </li>
    )

  return(
    <Row>
      <Col md="6">
        <h3 className="text-center text-info">Education</h3>
        { eduValue
          ?(<ul className="list-group mb-3">{ eduValue }</ul>)
          :<p className="text-muted">No education listed</p>
        }
      </Col>
      <Col md="6">
        <h3 className="text-center text-info">Experience</h3>
        { expValue
          ?(<ul className="list-group mb-3">{ expValue }</ul>)
          :<p className="text-muted">No experience listed</p>
        }
      </Col>
    </Row>
  )
}