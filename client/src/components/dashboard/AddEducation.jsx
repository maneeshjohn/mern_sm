import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Container, Row, Col, Form } from 'reactstrap'
import { addEducation } from '../../redux/actions/profileActions'
import { InputComponent, CheckBox } from '../common/InputComponent'

const AddEducation = props => {

  const { errors } = props
  
  const [current, setCurrent] = useState(false)
  const [details, setDetails] = useState(
    {
      university: '',
      institution: '',
      stream: '',
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
    data.current = current
    props.addEducation(data, props.history)
  }

  const toggleCurrent = () => {
    setCurrent(!current)
  }

  return(
    <div className="add-education">
      <Container>
        <Row>
          <Col md="7" className="m-auto">
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">Enter your education details</p>
            <Link to="/dashboard">
              <button className="btn btn-sm btn-light ml-3">Back</button>
            </Link>
            <Form
              onSubmit={ onSubmit }
              noValidate
              className="p-3">
              <InputComponent
                name="university"
                value={ details.university }
                change={ handleChange }
                placeholder="University *"
                error={ errors.university }
                info="The university that your institution is affiliated to"/>
              <InputComponent
                name="institution"
                value={ details.institution }
                change={ handleChange }
                placeholder="Institution Name *"
                error={ errors.institution }
                info="Name of the institution from which you completed your degree"/>
              <InputComponent
                name="stream"
                value={ details.stream }
                change={ handleChange }
                placeholder="Field *"
                error={ errors.stream }
                info="Your field specialization"/>
              <InputComponent
                name="location"
                value={ details.location }
                change={ handleChange }
                placeholder="Location *"
                error={ errors.location }
                info="Where you completed this degree"/>
              <InputComponent
                name="from"
                type="date"
                value={ details.from }
                change={ handleChange }
                placeholder="Start Date *"
                error={ errors.from }
                info="When you start this education"/>
              <InputComponent
                name="to"
                type="date"
                value={ details.to }
                change={ handleChange }
                placeholder="End Date"
                error={ errors.to }
                disabled={ current }
                info="When did you complete this education"/>
              <CheckBox
                name="to"                
                value={ current }
                change={ toggleCurrent }
                info="Are you still pursuing this"/>
              <InputComponent
                name="description"
                value={ details.description }
                change={ handleChange }
                placeholder="Education Description"
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

AddEducation.propTypes = {  
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation))