const express = require("express");
const {
  addNewNotice,
  getAllNotices,
  getNoticeDetails,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const router = express.Router();

router.route("/admin/notice/add-new-notice").post(addNewNotice);
router.route("/all-notices").get(getAllNotices);
router
  .route("/admin/notice/:id")
  .get(getNoticeDetails)
  .put(updateNotice)
  .delete(deleteNotice);
module.exports = router;
