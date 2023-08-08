const registerValidator = require("validator");
const { isEmpty: isDataEmpty } = require('./is_Empty');
const { IRegister } = require('../utils/types');

//data is an object of things to validate
module.exports = function validateRegisterInput(data: typeof IRegister) {
  let errors: any = {};

  //isEmpty needs to check a string
  data.name = !isDataEmpty(data.name) ? data.name : "";
  data.email = !isDataEmpty(data.email) ? data.email : "";
  data.password = !isDataEmpty(data.password) ? data.password : "";

  if (registerValidator.isEmpty(data.name)) {
    errors.msg = "Name field is required";
  }

  else if (registerValidator.isEmpty(data.email)) {
    errors.msg = "Email field is required";
  }

  else if (registerValidator.isEmpty(data.password)) {
    errors.msg = "Password field is required";
  }

  else if (!registerValidator.isLength(data.name, { min: 2, max: 30 })) {
    errors.msg = "Name must be between 2 and 30 characters";
  }

  else if (!registerValidator.isEmail(data.email)) {
    errors.msg = "Email is invalid";
  }

  else if (!registerValidator.isLength(data.password, { min: 8, max: 30 })) {
    errors.msg = "Password must be at least 8 characters";
  }

  return {
    errors,
    isValid: isDataEmpty(errors)
  };
};
