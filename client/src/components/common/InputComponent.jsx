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
    { props.info && <FormText className="text-center">{ props.info }</FormText> }
    { props.error && <div className="invalid-feedback text-center">{ props.error }</div> }
  </FormGroup>

InputComponent.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string
}

InputComponent.defaultProps = {
  type: 'text'
}

export const SelectComponent = props =>
  <FormGroup>
    <Input
      type="select"
      name={ props.name }
      value={ props.value }
      onChange={ props.change }      
      disabled={ props.disabled }
      className={ props.error && 'is-invalid' } >
      {
        props.options.map(
          option =>
            <option
              key={ option.label }
              value={ option.value }>
              { option.label }
            </option>
        )
      }
    </Input>
    { props.info && <FormText className="text-center">{ props.info }</FormText> }
    { props.error && <div className="invalid-feedback text-center">{ props.error }</div> }
  </FormGroup>

SelectComponent.propTypes = {  
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,  
  disabled: PropTypes.string,
  className: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.object.isRequired
}

export const InputGroup = props =>
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        { props.icon }
      </span>
    </div>
    <Input
      type={ props.type }
      name={ props.name }
      value={ props.value }
      onChange={ props.change }      
      disabled={ props.disabled }
      className={ props.error && 'is-invalid' }
      placeholder={ props.placeholder }/>
    { props.error && <div className="invalid-feedback text-center">{ props.error }</div> }
  </div>

  InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.string,
  className: PropTypes.string,  
  error: PropTypes.string
}

InputGroup.defaultProps = {
  type: 'text'
} 