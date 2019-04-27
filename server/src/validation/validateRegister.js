const Validator = require('validator'); // Validate Strings
const isEmpty = require('lodash.isempty'); // to check if errors array is empty
const accountTypes = require('../config/accountTypes');

const validateRegister = async data => {
  /* note: async function - returns promise
    Args:
      data <object> - parts of req.body from /api/credentials/register route
        {
          username: <string>,
          usertype: <string>,
          password: <string>,
          password2: <string>,
        }
    Returns:
      <object>
        { 
          errors <array> - contains any validation error objects 
            [
              {
                name: <string> - one of the following:
                  'UsernameError'
                  'UsertypeError'
                  'PasswordError'
                  'PasswordConfirmationError',
                message: <string>,
              },
            ],
          isValid <boolean> - validation result
        }
  */

  const errors = [];
  const { username, password, password2 } = data;
  const usertype = data.usertype.toLowerCase();

  // username validation
  if (!Validator.isLength(username, { min: 2, max: 30 })) {
    errors.push({
      name: 'UsernameError',
      message: 'Username must be between 2 and 30 characters',
    });
  }
  if (Validator.isEmpty(username)) {
    errors.push({
      name: 'UsernameError',
      message: 'Username is required',
    });
  }
  if (!Validator.matches(username, '^[a-zA-Z0-9_]*$')) {
    errors.push({
      name: 'UsernameError',
      message: 'Username must only contain letters, numbers, or underscores',
    });
  }

  // usertype validation
  if (Validator.isEmpty(usertype)) {
    errors.push({
      name: 'UsertypeError',
      message: 'Account type is required',
    });
  }
  if (!Validator.isIn(usertype, accountTypes)) {
    errors.push({
      name: 'UsertypeError',
      message: 'Account type is invalid',
    });
  }

  // password validation
  const passwordMinLength = 6;
  const passwordMaxLength = 100;
  if (Validator.isEmpty(password)) {
    errors.push({
      name: 'PasswordError',
      message: 'Password is required',
    });
  }
  if (!Validator.isLength(password, { min: passwordMinLength })) {
    errors.push({
      name: 'PasswordError',
      message: 'Password must be atleast 6 characters',
    });
  }
  if (!Validator.isLength(password, { max: passwordMaxLength })) {
    errors.push({
      name: 'PasswordError',
      message: 'Invalid password',
    });
  }
  if (!Validator.isAscii(password)) {
    errors.push({
      name: 'PasswordError',
      message: 'Password contains invalid character(s)',
    });
  }

  // password 2 validation - only kicks in if errors.password is still empty
  if (!errors.password) {
    if (!Validator.equals(password, password2)) {
      errors.push({
        name: 'PasswordConfirmationError',
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
