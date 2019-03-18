import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { getCurrentProfile } from '../../redux/actions/profileActions'
import Spinner from '../common/Spinner'

const Dashboard = props => {  

  useEffect(() => {
    props.getCurrentProfile()        
  }, [])
  
  const { profile } = props

  let dashboardContent
  if(profile.loading){
    dashboardContent = <Spinner />
  } else {
    if(Object.keys(profile.data).length > 0){
      dashboardContent = (
        <div>
          <h1>TBD</h1>
        </div>
      )
    } else {
      dashboardContent = (
        <div className="p-5">
          <p className="lead text-muted">Welcome { props.auth.user.name }</p>
          <p>You don't have a profile yet. You can create one below</p>
          <Link to="dashboard/profile" className="btn btn-info btn-lg">Create Profile</Link>
        </div>
      )
    }
  }

  return(
    <div className="dashboard">
      <Container>
        <h1 className="display-4 text-center">Dashboard</h1>
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