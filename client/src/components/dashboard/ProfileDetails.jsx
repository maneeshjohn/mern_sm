import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form } from 'reactstrap'
import { createProfile } from '../../redux/actions/profileActions'
import { InputComponent, SelectComponent, InputGroup } from '../common/InputComponent'

const ProfileDetails = props => {

  const { profile, errors } = props
  const { data } = profile

  const [links, setLinks] = useState(false)
  const [details, setDetails] = useState(
    {
      handle: '',
      position: 0,
      company: '',
      website: '',
      location: '',
      skills: '',
      github: '',
      bio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: '',
      linkedin: ''
    }
  )

  const handleChange = e => {
    let { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    props.createProfile(details, props.history)
  }

  const toggleLinks = () => {
    setLinks(!links)
  }  

  const displayLinks = () =>
    <div>
      <InputGroup
        icon="Tw"
        name="twitter"        
        change={ handleChange }
        placeholder="Twitter"
        error={ errors.twitter }
        value={ details.twitter } />
      <InputGroup
        icon="Fb"
        name="facebook"
        change={ handleChange }
        placeholder="Facebook"
        error={ errors.facebook }
        value={ details.facebook } />
      <InputGroup
        icon="Ig"
        name="instagram"        
        change={ handleChange }
        placeholder="Instagram"
        error={ errors.instagram }
        value={ details.instagram } />
      <InputGroup
        icon="Yt"
        name="youtube"        
        change={ handleChange }
        placeholder="Youtube"
        error={ errors.youtube }
        value={ details.youtube } />
      <InputGroup
        icon="Li"
        name="linkedin"
        change={ handleChange }
        placeholder="LinkedIn"
        error={ errors.linkedin }
        value={ details.linkedin } />
    </div>

  const statusOptions = [
    { label: 'Current Position *', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student', value: 'Student' },
    { label: 'Instructor', value: 'Instructor' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Others', value: 'Others' }
  ]

  return(
    <div className="profile-details">
      <Container>
        <Row>
          <Col md="7" className="m-auto">
            <h1 className="display-4 text-center">Create Profile</h1>
            <p className="lead text-center">Enter your details and distinguish yourself</p>
            <Form
              onSubmit={ onSubmit }
              noValidate
              className="p-3">
              <InputComponent
                name="handle"
                value={ details.handle }
                change={ handleChange }
                placeholder="Profile handle *"
                error={ errors.handle }
                info="A unique handle for your personal profile URL"/>
              <SelectComponent
                name="position"
                value={ details.position }
                change={ handleChange }
                options={ statusOptions }
                error={ errors.position }
                info="Where you currently are in your journey"/>
              <InputComponent
                name="company"
                value={ details.company }
                change={ handleChange }
                placeholder="Current Company that you work"
                error={ errors.company }
                info="The company that you work for, if you are working"/>
              <InputComponent
                name="website"
                value={ details.website }
                change={ handleChange }
                placeholder="Personal Website"
                error={ errors.website }
                info="Showcase your personal website"/>
              <InputComponent
                name="location"
                value={ details.location }
                change={ handleChange }
                placeholder="Current Location *"
                error={ errors.location }
                info="Where you are active currently"/>
              <InputComponent
                name="skills"
                value={ details.skills }
                change={ handleChange }
                placeholder="Your strengths *"
                error={ errors.skills }
                info="Use comma seperated values without spaces"/>
              <InputComponent
                name="github"
                value={ details.github }
                change={ handleChange }
                placeholder="Github Usernama"
                error={ errors.github }
                info="Enter username to access your repos"/>
              <InputComponent
                name="bio"
                value={ details.bio }
                change={ handleChange }
                placeholder="Short Bio *"
                error={ errors.bio }
                info="Tell people a little about yourself"/>

                <div className="mb-3">
                  <button
                    className="btn btn-light lead"
                    onClick={ toggleLinks }>
                    Add social network links
                  </button>
                </div>                
                { links && displayLinks() }
                <button className="btn btn-info btn-block mb-3">Submit</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile,
  errors: state.errors  
})

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(ProfileDetails))