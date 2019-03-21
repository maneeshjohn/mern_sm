import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteEducation } from '../../redux/actions/profileActions'
import { Table } from 'reactstrap'

const Education = props => {

  const deleteItem = item => {
    props.deleteEducation(item._id)
  }

  const renderData = () => {
    return props.data.map(
      item =>
        <tr key={ item._id }>
          <th>{ item.stream }</th>
          <th>{ item.institution }</th>
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
          <th>Field</th>
          <th>Institution</th>
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

Education.propTypes = {
  data: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteEducation }
)(Education)