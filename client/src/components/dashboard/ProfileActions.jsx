import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
  <div className="mb-4 btn-group">
    <Link to="/dashboard/profile" className="btn btn-light">
      <i className="material-icons">account_circle</i>
      Edit Profile
    </Link>
    <Link to="/add/education" className="btn btn-light">
      <i className="material-icons">school</i>
      Add Education
    </Link>
    <Link to="/add/experience" className="btn btn-light">
      <i className="material-icons">work</i>
      Add Experience
    </Link>
  </div>