import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col, Form } from 'reactstrap'
import { addExperience } from '../../redux/actions/profileActions'
import { InputComponent, CheckBox } from '../common/InputComponent'

const AddExperience = props => {

  const { errors } = props    
  
  const [current, setCurrent] = useState(false)
  const [details, setDetails] = useState(
    {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',      
      description: '',
    }
  )

  const handleChange = e => {
    let { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    const data = details
    details.current = current
    props.addExperience(data, props.history)
  }

  const toggleCurrent = () => {
    setCurrent(!current)
  }

  return(
    <div className="add-experience">
      <Container>
        <Row>
          <Col md="7" className="m-auto">
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">Enter your relevent jobs, internships or other details</p>
            <Link to="/dashboard">
              <button className="btn btn-sm btn-light ml-3">Back</button>
            </Link>
            <Form
              onSubmit={ onSubmit }
              noValidate
              className="p-3">
              <InputComponent
                name="title"
                value={ details.title }
                change={ handleChange }
                placeholder="Job Title *"
                error={ errors.title }
                info="The role you played in this purticular experience"/>
              <InputComponent
                name="company"
                value={ details.company }
                change={ handleChange }
                placeholder="Company Involved *"
                error={ errors.location }
                info="The company you were involved with in this experience"/>
              <InputComponent
                name="location"
                value={ details.location }
                change={ handleChange }
                placeholder="Location *"
                error={ errors.location }
                info="Where you completed this experience"/>
              <InputComponent
                name="from"
                type="date"
                value={ details.from }
                change={ handleChange }
                placeholder="Start Date *"
                error={ errors.from }
                info="When you start this experience"/>
              <InputComponent
                name="to"
                type="date"
                value={ details.to }
                change={ handleChange }
                placeholder="End Date"
                error={ errors.to }
                disabled={ current }
                info="When did you complete this experience"/>
              <CheckBox
                name="to"                
                value={ current }
                change={ toggleCurrent }
                info="Are you still working here?"/>
              <InputComponent
                name="description"
                value={ details.description }
                change={ handleChange }
                placeholder="Job Description"
                error={ errors.description }
                info="Your thoughts on this experience"/>
                
                <button className="btn btn-info btn-block mb-3">Submit</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

AddExperience.propTypes = {  
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience))