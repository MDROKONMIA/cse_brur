const express = require("express");
const {
  sendEmail,
  getAllNews,
  getAllTeachers,
  addNewTeacher,
  getAllTeachers1,
  getTeacherDetails,
  teacherUpdate,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.route("/sentmail").post(sendEmail);
router.route("/news").get(getAllNews);
router.route("/teachers").get(getAllTeachers);
router.route("/admin/teacher/new").post(addNewTeacher);
router
  .route("/admin/teacher/:id")
  .get(getTeacherDetails)
  .put(teacherUpdate)
  .delete(deleteTeacher);
// router.route("/staffs").get(getAllTeachers1);

module.exports = router;
