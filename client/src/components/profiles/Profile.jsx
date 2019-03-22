import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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
    if(Object.keys(props.profile.item).length > 0){
      profileContent = (
        <Row>
          <Col md="12">            
            <Header profile={ props.profile.item } />
            <About profile={ props.profile.item } />
            <Credentials
              education={ props.profile.item.education }
              experience={ props.profile.item.experience }/>
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