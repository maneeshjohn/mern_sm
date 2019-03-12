import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

const Dashboard = props => {
  return(
    <div className="dashboard">
      <Container>
        <h1 classNAme="display-4 text-center">{ props.auth.user.name }</h1>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Dashboard)