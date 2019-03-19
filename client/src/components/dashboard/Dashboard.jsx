import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { getCurrentProfile, deleteProfile } from '../../redux/actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'

const Dashboard = props => {  

  useEffect(() => {
    props.getCurrentProfile()        
  }, [])

  const deletAccount = () => {
    props.deleteProfile()
  }

  let dashboardContent
  if(props.profile.loading || props.profile.data === null){
    dashboardContent = <Spinner />
  } else {
    if(Object.keys(props.profile.data).length > 0){
      dashboardContent = (
        <Container>
          <p className="lead text-muted">Welcome{' '} 
            <Link to={`/${ props.profile.data.handle }`}>
              { props.auth.user.name }
            </Link>
          </p>
          <ProfileActions />
          <br />
          <button
            onClick={ deletAccount }            
            className="btn btn-danger m-3">
            Delete Account
          </button>
        </Container>
      )
    } else {
      dashboardContent = (
        <Container className="p-5">
          <p className="lead text-muted">Welcome { props.auth.user.name }</p>
          <p>You don't have a profile yet. You can create one below</p>
          <Link to="dashboard/profile" className="btn btn-info btn-lg">Create Profile</Link>
        </Container>
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
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile }
)(Dashboard)