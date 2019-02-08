const validator = require('validator');
const empty = require('./emptyChecker');

module.exports = {
  updateProfileValidation: function(data) {
    let errors = {};

    data.handle = !empty(data.handle)? data.handle: '';    
    data.position = !empty(data.position)? data.position: '';
    data.skills = !empty(data.skills)? data.skills: '';

    if(!validator.isLength(data.handle, { min:4, max:15 })) {
      errors.handle = 'Length should be between 4 and 15 characters';
    }
    if(validator.isEmpty(data.handle)){
      errors.handle = 'Handle is required';
    }
    if(validator.isEmpty(data.position)){
      errors.position = 'Position is required';
    }
    if(validator.isEmpty(data.skills)){
      errors.skills = 'Skills is required';
    }
    if(!validator.isEmpty(data.facebook)){
      if(!validator.isURL(data.facebook)){
        errors.facebook = 'URLis not valid';
      }
    }
    if(!validator.isEmpty(data.twitter)){
      if(!validator.isURL(data.twitter)){
        errors.twitter = 'URL is not valid';
      }      
    }
    if(!validator.isEmpty(data.instagram)){
      if(!validator.isURL(data.instagram)){
        errors.instagram = 'URL is not valid';
      }      
    }
    if(!validator.isEmpty(data.linkedin)){
      if(!validator.isURL(data.linkedin)){
        errors.linkedin = 'URL is not valid';
      }      
    }
    if(!validator.isEmpty(data.youtube)){
      if(!validator.isURL(data.youtube)){
        errors.linkedin = 'URL is not valid';
      }      
    }

    return {
      errors,
      valid: empty(errors)
    }
  }
}