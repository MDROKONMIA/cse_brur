const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Notice = require("../models/noticeModel");
const ApiFeatures = require("../utilities/apiFeatures");

exports.addNewNotice = catchAsyncErrors(async (req, res, body) => {
  const { title, file } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.file, {
    folder: "cse_notice",
    // // width: 150,
    // crop: "scale",
  });
  const notice = Notice.create({
    title,
    file: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    notice: notice,
    message: "Notice publish Successfully",
  });
});

exports.getAllNotices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const noticesCount = await Notice.countDocuments();
  //   console.log("hi");
  const apiFeature = new ApiFeatures(Notice.find(), req.query)
    .search()
    .filter();
  const apiFeaturePagination = new ApiFeatures(Notice.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const filterNotices = await apiFeature.query;
  // console.log(noticesCount)

  let filteredNoticesCount = filterNotices.length;
  let notices = await apiFeaturePagination.query;
  //   console.log(notices);

  res.status(200).json({
    success: true,
    notices,
    noticesCount,
    resultPerPage,
    noticesCount,
    filteredNoticesCount,
  });
});

// get notice details
exports.getNoticeDetails = catchAsyncErrors(async (req, res, next) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) {
    return next(new ErrorHandler("Notice is not found!", 404));
  }
  res.status(201).json({ success: true, notice });
});

// update notice
exports.updateNotice = catchAsyncErrors(async (req, res, next) => {
  let notice = await Notice.findById(req.params.id);
  if (!notice) {
    return next(new ErrorHandler("Notice is not found", 404));
  }
  if (req.body.file !== "null") {
    const result = await cloudinary.v2.uploader.destroy(notice.file.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.file);
    req.body.file = myCloud;
  } else {
    req.body.file = notice.file;
  }
  //   console.log(req.body);
  notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    message: `Notice update success...`,
    notice,
    success: true,
  });
});

// delete notice
exports.deleteNotice = catchAsyncErrors(async (req, res, next) => {
  let notice = await Notice.findById(req.params.id);
  if (!notice) {
    return next(new ErrorHanlder("Ntice is not found ....."));
  }
  const result = await cloudinary.v2.uploader.destroy(notice.file.public_id);
  notice = await Notice.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Notice delete successfully...",
    isDeleted: true,
  });
});
