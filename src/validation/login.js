Validator = require("validator"); // Validate Strings
isEmpty = require("lodash.isempty"); // Check if objects are empty
accountTypes = require("../config/accountTypes");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Turn empty objects into Empty strings for Validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // username validation
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
