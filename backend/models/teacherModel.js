const mongoose = require("mongoose");
const validator = require("validator");

const teachersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name......"],
    maxLength: [30, "Name cannot exceed 30 characters...."],
    minLength: [3, "Name should have more than 4 characters..."],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email......"],
    validate: [validator.isEmail, "Please Enter a vallid email..."],
  },
  phone: {
    type: String,
    required: [true, "Enter the mobile number"],
    maxLength: [11, "Number cannot exeed more than 11 digit"],
    minLength: [11, "Number should have 11 digit"],
    validator: [validator.isNumber, "Please enter ethe mobile number"],
  },
  dagignation: {
    type: String,
    required: [true, "Please enter teacher dagignation"],
  },
  join_date: { type: Date, required: [true, "Enter the join date..."] },
  status: { type: Number, default: 1 },
  address: {
    type: String,
    required: [true, "Please enter the teacher address.."],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  cteateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Teachers", teachersSchema);
