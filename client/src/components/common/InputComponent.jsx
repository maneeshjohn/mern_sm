import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, FormText } from 'reactstrap'

export const InputComponent = props =>
  <FormGroup>
    <Input
      type={ props.type }
      name={ props.name }
      value={ props.value }
      onChange={ props.change }
      placeholder={ props.placeholder }
      disabled={ props.disabled }
      className={ props.error && 'is-invalid' } />
    { props.info && <div className="invalid-feedback text-center">{ props.info }</div> }
    { props.error && <div className="invalid-feedback text-center">{ props.error }</div> }
  </FormGroup>

InputComponent.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string
}

InputComponent.defaultProps = {
  type: 'text'
}