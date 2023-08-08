const Validator = require("validator");
const { isEmpty } = require('./is_Empty');
const { ILogin } = require('../utils/types');

//data is an object of things to validate
module.exports = function validateLoginInput(data: typeof ILogin) {
  let errors: any = {};

  //isEmpty needs to check a string
  // these two lines check if the data is set to null or undefined, if they are, set them two an empty string

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.msg = "Email field is required";
  }

  else if (Validator.isEmpty(data.password)) {
    errors.msg = "Password field is required";
  }

  else if (!Validator.isEmail(data.email)) {
    errors.msg = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
