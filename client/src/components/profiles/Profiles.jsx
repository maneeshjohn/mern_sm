import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import { getProfiles } from '../../redux/actions/profileActions'
import ProfileCard from './ProfileCard'
import Spinner from '../common/Spinner'

const Profiles = props => {
  
  useEffect(() => {
    props.getProfiles()
  }, [])  

  const renderProfiles = () => {
    return props.profile.list.map(
      profile =>
        <ProfileCard key={ profile.id } profile={ profile } />
    )
  }

  let profileContent

  if(props.profile.loading){
    profileContent = <Spinner />
  } else {
    if(props.profile.list.length > 0){
      profileContent = renderProfiles()
    } else {
      profileContent = <p className="text-muted text-center">No profiles found</p>
    }
  }

  return(
    <div className="profiles">
      <Container>
        <h1 className="display-4 text-center">Profiles</h1>
          <p className="text-center lead">Browse all available profiles</p>
          { profileContent }
      </Container>
    </div>
  )
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)