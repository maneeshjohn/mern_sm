const validator = require('validator');
const empty = require('./emptyChecker');

module.exports = {
  registerValidation: function(data){
    let errors = {};

    data.name = !empty(data.name)? data.name: '';
    data.email = !empty(data.email)? data.email: '';
    data.password = !empty(data.password)? data.password: '';
    data.password2 = !empty(data.password2)? data.password2: '';

    if(!validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords do not match';
    }
    if(!validator.isLength(data.password, { min: 5, max: 20 })) {
      errors.password = 'Password should be atleast five characters';
    }
    if(!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    } 
    if(!validator.isLength(data.name, { min: 3, max: 20 })) {
      errors.name = 'Name should be between 3 and 20 characters';
    }
    if(validator.isEmpty(data.name)) {
      errors.name = 'Name is required';
    }
    if(validator.isEmpty(data.email)) {
      errors.email = 'Email is required';
    }
    if(validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }
    if(validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm your password';
    }

    return {
      errors,
      valid: empty(errors)
    }
  },

  loginValidation: function(data){
    let errors = {};
    
    data.email = !empty(data.email)? data.email: '';
    data.password = !empty(data.password)? data.password: '';

    if(!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    } 
    if(validator.isEmpty(data.email)) {
      errors.email = 'Email is required';
    }
    if(validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }

    return {
      errors,
      valid: empty(errors)
    }
  }
}