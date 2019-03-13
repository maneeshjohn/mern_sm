import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { getCurrentProfile } from '../../redux/actions/profileActions'

const Dashboard = props => {
  const [profile, setProfile] = useState(props.profile)
  useEffect(() => {
    props.getCurrentProfile()    
  })

  return(
    <div className="dashboard">
      <Container>
        <h1 className="display-4 text-center">{ props.auth.user.name }</h1>
      </Container>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)