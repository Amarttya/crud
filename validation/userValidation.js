const yup = require("yup");

const userInput = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(10).required(),
  phone: yup.number().required(),
});

module.exports = userInput;
