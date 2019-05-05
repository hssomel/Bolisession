const Validator = require('validator'); // Validate Strings
const isEmpty = require('lodash.isempty'); // Check if objects are empty

const validateLogin = async data => {
  /* note: async function - returns promise
    Args:
      data <object> - parts of req.body from /api/credentials/register route
        {
          username: <string>,
          password: <string>,
        }
    Returns:
      <object>
        { 
          errors <array> - contains any validation error objects 
            [
              {
                name: <string> - one of the following:
                  'UsernameError',
                  'PasswordError',
                message: <string>,
              },
            ],
          isValid <boolean> - validation result
        }
  */

  const errors = [];
  const { username, password } = data;

  if (Validator.isEmpty(username)) {
    errors.push({
      name: 'UsernameError',
      message: 'Username is required',
    });
  }

  // password validation
  if (Validator.isEmpty(password)) {
    errors.push({
      name: 'PasswordError',
      message: 'Password is required',
    });
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
