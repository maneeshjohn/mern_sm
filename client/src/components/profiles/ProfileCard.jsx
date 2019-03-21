import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

const ProfileCard = ({ profile }) => {  
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
          <Link
            className="btn btn-info"
            to={ `/profile/${profile.handle}` }>
            View Profile
          </Link>
        </Col>
        <Col md="4">
          <h4>Skills</h4>
          <ul className="list-group">
            {profile.skills.map(
              skill =>
                <li
                  key={ skill }
                  className="list-group-item">
                  <i className="material-icons mr-5">done</i>{ skill }
                </li>
            )}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileCard