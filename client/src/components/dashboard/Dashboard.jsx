import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { getCurrentProfile } from '../../redux/actions/profileActions'
import Spinner from '../common/Spinner'

const Dashboard = props => {
  const [profile, setProfile] = useState(props.profile)
  useEffect(() => {
    props.getCurrentProfile()    
  }, [profile])
    
  let dashboardContent
  if(profile.loading){
    dashboardContent = <Spinner />
  } else {
    dashboardContent = (
      <div>
        <h1 className="display-4 text-center">{ props.auth.user.name }</h1>
      </div>
    )
  }

  return(
    <div className="dashboard">
      <Container>
        { dashboardContent }
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