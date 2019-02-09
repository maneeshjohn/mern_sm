const validator = require('validator');
const empty = require('./emptyChecker');

module.exports = {

  newPostValidation: function(data) {
    let errors = {};

    data.content = !empty(data.content)? data.content: '';

    if(!validator.isLength(data.content, { min: 10, max: 300})){
      errors.content = 'Post should be atleast ten characters';
    }
    if(validator.isEmpty(data.content)){
      errors.content = 'Post is empty';
    }    

    return {
      errors,
      valid: empty(errors)
    }    
  }
}