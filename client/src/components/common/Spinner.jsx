import React from 'react'
import spinner from '../../assets/img/spinner.gif'

export default props =>
  <img
    src={ spinner }
    alt="Loading"
    style={ spinStyle }/>

const spinStyle = {
  position: 'fixed',
  width: '50px',
  top: '50%',
  left: '50%',
  transform: 'translate(50%, 50%)'
}