const validator = require('validator');
const empty = require('./emptyChecker');

module.exports = {
  updateProfileValidation: function(data) {
    let errors = {};

    data.handle = !empty(data.handle)? data.handle: '';
    data.website = !empty(data.website)? data.website: '';
  }
}