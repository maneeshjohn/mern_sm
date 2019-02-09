const validator = require('validator');
const empty = require('./emptyChecker');

module.exports = {
  updateProfileValidation: function(data) {
    let errors = {};

    data.handle = !empty(data.handle)? data.handle: '';
    data.position = !empty(data.position)? data.position: '';
    data.skills = !empty(data.skills)? data.skills: '';
    data.facebook = !empty(data.facebook)? data.facebook: '';
    data.twitter = !empty(data.twitter)? data.twitter: '';
    data.instagram = !empty(data.instagram)? data.instagram: '';
    data.linkedin = !empty(data.linkedin)? data.linkedin: '';
    data.youtube = !empty(data.youtube)? data.youtube: '';

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
  },

  addExperienceValidation: function(data) {
    let errors = {};

    data.title = !empty(data.title)? data.title: '';    
    data.company = !empty(data.company)? data.company: '';
    data.location = !empty(data.location)? data.location: '';
    data.from = !empty(data.from)? data.from: '';

    if(validator.isEmpty(data.title)){
      errors.title = 'Title is required';
    }
    if(validator.isEmpty(data.company)){
      errors.company = 'Company is required';
    }
    if(validator.isEmpty(data.location)){
      errors.company = 'Location is required';
    }
    if(validator.isEmpty(data.from)){
      errors.from = 'Start date is required';
    }


    return {
      errors,
      valid: empty(errors)
    }
  },

  addEducationValidation: function(data) {
    let errors = {};

    data.university = !empty(data.university)? data.university: '';    
    data.institution = !empty(data.institution)? data.institution: '';
    data.stream = !empty(data.stream)? data.stream: '';
    data.location = !empty(data.location)? data.location: '';
    data.from = !empty(data.from)? data.from: '';

    if(validator.isEmpty(data.university)){
      errors.university = 'University is required';
    }    
    if(validator.isEmpty(data.institution)){
      errors.institution = 'Institution is required';
    }
    if(validator.isEmpty(data.stream)){
      errors.stream = 'Field is required';
    }
    if(validator.isEmpty(data.location)){
      errors.company = 'Location is required';
    }
    if(validator.isEmpty(data.from)){
      errors.from = 'Start date is required';
    }


    return {
      errors,
      valid: empty(errors)
    }
  }
}