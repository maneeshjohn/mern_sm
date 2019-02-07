const validator = require('validator');
const isValid = require('./emptyChecker');

module.exports = {
  registerValidation: function(data){
    let errors = {};

    if(validator.isLength(data.name, { min: 3, max: 20 })) {
      errors.name = 'Name should be between 3 and 20 characters';
    }

    return {
      errors,
      valid: isValid(errors)
    }
  }
}