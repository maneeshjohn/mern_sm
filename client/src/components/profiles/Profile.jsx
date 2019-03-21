import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import { getProfileByHandle } from '../../redux/actions/profileActions'
import Spinner from '../common/Spinner'
import Header from './Header'
import About from './About'
import Credentials from './Credentials'
import Github from './Github'

const Profile = props => {  

  useEffect(() => {
    let handle = props.match.params.handle
    props.getProfileByHandle(handle)
  }, [])

  let profileContent
  if(props.profile.loading){
    profileContent = <Spinner />
  } else {
    if(Object.keys(props.profile.list).length > 0){
      profileContent = (
        <Row>
          <Col md="12">
            <Link
              to="/profiles"
              className="btn btn-sm btn-light">
              Back
            </Link>          
            <Header profile={ props.profile.list } />
            <About />
            <Credentials />
            <Github />
          </Col>
        </Row>
      )
    } else {
      profileContent = <p className="text-center lead text-muted">Details not available</p>
    }
  }

  return(
    <div>
      <Container>
        { profileContent }
      </Container>
    </div>
)
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile)