const Validator = require('validator'); // Validate Strings
const isEmpty = require('lodash.isempty'); // Check if objects are empty

const validateLogin = data => {
  const errors = {};
  let { username, password } = data;

  // turn empty objects into Empty strings for Validator
  username = !isEmpty(username) ? username : '';
  password = !isEmpty(password) ? password : '';

  // username validation
  if (Validator.isEmpty(username)) {
    errors.username = 'Username is required';
  }

  // password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
