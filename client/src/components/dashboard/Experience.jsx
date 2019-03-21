import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteExperience } from '../../redux/actions/profileActions'
import { Table } from 'reactstrap'

const Experience = props => {

  const deleteItem = item => {
    props.deleteExperience(item._id)
  }

  const renderData = () => {
    return props.data.map(
      item =>
        <tr key={ item._id }>
          <th>{ item.title }</th>
          <th>{ item.company }</th>
          <th>{ item.location }</th>
          <th>{ item.from.split('T')[0] } - { item.to? item.to.split('T')[0]: '(Now)' }</th>
          <th>
            <button
              onClick={ () => deleteItem(item) }
              className="btn btn-danger btn-sm">
              Remove
            </button>
          </th>
        </tr>
    )
  }

  return(
    <Table>    
      <thead>
        <tr>
          <th>Role</th>
          <th>Company</th>
          <th>Location</th>
          <th>Duration</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {renderData()}
      </tbody>
    </Table>
  )
}

Experience.propTypes = {
  data: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteExperience }
)(Experience)