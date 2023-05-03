const mongoose = require("mongoose");
const validator = require("validator");

const noticeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, "Please, Enter the title of this notice...."],
  },
  file: {
    public_id: {
      type: String,
      default:null,
      required: true,
    },
    url: {
      type: String,
      default:null,
      required: true,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notice", noticeSchema);
