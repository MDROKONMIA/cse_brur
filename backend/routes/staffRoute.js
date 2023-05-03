const express = require("express");
const {
  addNewStaff,
  getStaffDetails,
  getAllStaffs,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");
const {
  getAllTeachers,
  getAllTeachers1,
} = require("../controllers/teacherController");

const router = express.Router();

// router.route("/teachers").get(getAllTeachers);
router.route("/staffs").get(getAllStaffs);
router.route("/admin/staff/new").post(addNewStaff);
router
  .route("/admin/staff/:id")
  .get(getStaffDetails)
  .put(updateStaff)
  .delete(deleteStaff);

module.exports = router;
