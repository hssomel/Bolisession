Validator = require("validator"); // Validate Strings
isEmpty = require("lodash.isempty"); // Check if objects are empty
accountTypes = require("../config/accountTypes");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Turn empty objects into Empty strings for Validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.usertype = !isEmpty(data.usertype) ? data.usertype : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // username validation
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // usertype validation
  if (Validator.isEmpty(data.usertype)) {
    errors.usertype = "Account type is required";
  }
  if (!Validator.isIn(data.usertype, accountTypes)) {
    errors.usertype = "Account type is invalid";
  }

  // password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be atleast 6 characters";
  }
  if (!Validator.isLength(data.password, { max: 100 })) {
    errors.password = "Invalid password";
  }

  // password 2 validation - only kicks in if errors.password is still empty
  if (!errors.password) {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
