const Validator = require('validator'); // Validate Strings
const isEmpty = require('lodash.isempty'); // Check if objects are empty
const accountTypes = require('../config/accountTypes');

const validateRegister = async data => {
  /* note: async function - returns promise
    Args:
      data <object> - key used to reference data in local storage
    Returns:
      { 
        errors <object> - contains any validation errors,
        isValid <boolean> - validation result
      }
  */
  const errors = [];
  let { username, usertype, password, password2 } = data;

  // turn empty objects into Empty strings for Validator
  username = !isEmpty(username) ? username : '';
  usertype = !isEmpty(usertype) ? usertype : '';
  password = !isEmpty(password) ? password : '';
  password2 = !isEmpty(password2) ? password2 : '';

  // username validation
  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.push({
      type: 'username',
      message: 'Username must be between 2 and 30 characters',
    });
  }
  if (Validator.isEmpty(username)) {
    errors.push({
      type: 'username',
      message: 'Username is required',
    });
  }

  // usertype validation
  if (Validator.isEmpty(usertype)) {
    errors.push({
      type: 'usertype',
      message: 'Account type is required',
    });
  }
  if (!Validator.isIn(usertype, accountTypes)) {
    errors.push({
      type: 'usertype',
      message: 'Account type is invalid',
    });
  }

  // password validation
  const passwordMinLength = 6;
  const passwordMaxLength = 100;
  if (Validator.isEmpty(password)) {
    errors.push({
      type: 'password',
      message: 'Password is required',
    });
  }
  if (!Validator.isLength(password, { min: passwordMinLength })) {
    errors.push({
      type: 'password',
      message: 'Password must be atleast 6 characters',
    });
  }
  if (!Validator.isLength(password, { max: passwordMaxLength })) {
    errors.push({
      type: 'password',
      message: 'Invalid password',
    });
  }

  // password 2 validation - only kicks in if errors.password is still empty
  if (!errors.password) {
    if (!Validator.equals(password, password2)) {
      errors.push({
        type: 'password2',
        message: 'Passwords must match',
      });
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegister;
