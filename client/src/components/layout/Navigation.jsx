import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Navbar, NavbarToggler, Collapse, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const Navigation = () => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!isOpen)
  }
  
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
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation