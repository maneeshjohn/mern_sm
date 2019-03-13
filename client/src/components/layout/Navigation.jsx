import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/authActions'
import { clearProfile } from '../../redux/actions/profileActions'
import { Link } from 'react-router-dom'
import { Container, Navbar, NavbarToggler, Collapse, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const Navigation = props => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!isOpen)
  }

  const logout = () => {
    props.clearProfile()
    props.logoutUser()
  }

  const guestLinks = (
    <Nav
      className="ml-auto"
      navbar>
      <NavItem>
        <Link
          className="no-dec"
          to="/login">
          <NavLink>Login</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link
          className="no-dec"
          to="/register">
          <NavLink>Register</NavLink>
        </Link>
      </NavItem>
    </Nav>
  )

  const userLinks = (   
    <Nav
      className="ml-auto"
      navbar>
      <NavItem>
        <Link
          className="no-dec"
          to="/login">
          <NavLink>
            <img
              src={ props.auth.user.avatar}
              className="rounded-circle"
              style={{ width: '25px' }}
              alt={ props.auth.user.name }/>
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>                
        <NavLink
          onClick={ logout }
          >Logout
        </NavLink>        
      </NavItem>
    </Nav>
  )
  
  return(
    <div>
      <Navbar
        color="dark"
        dark
        expand="md">
        <Container>
          <Link
            className="no-dec"
            to="/">
            <NavbarBrand>{'<DeveloperHub />'}</NavbarBrand>
          </Link>
          <NavbarToggler onClick={ toggle } />
          <Collapse
            isOpen={ isOpen }
            navbar>
            { props.auth.isAuthenticated? userLinks : guestLinks }
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth  
})

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(Navigation)