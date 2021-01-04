const mongoose = require("mongoose");

let Employee = mongoose.model("employees", 
{
  Full_Name: { type: String },
  Position: { type: String },
  Mobile_No: { type: String }
}, 'employees');

module.exports = { Employee };
