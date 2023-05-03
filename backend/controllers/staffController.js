const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Staff = require("../models/staffModel");
const ApiFeatures = require("../utilities/apiFeatures");

exports.addNewStaff = catchAsyncErrors(async (req, res, next) => {
  const { name, email, address, phone, dagignation, join_date, status } =
    req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "cse_staffs",
    width: 150,
    crop: "scale",
  });
  const staff = await Staff.create({
    name,
    email,
    dagignation,
    phone,
    address,
    status,
    join_date,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    staff,
    message: "Staff add Successfully",
  });
});

//Get products details

exports.getStaffDetails = catchAsyncErrors(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler("Staff is not found!", 404));
  }
  res.status(201).json({ success: true, staff });
});

exports.getAllStaffs = catchAsyncErrors(async (req, res, next) => {
  // console.log("get all staffs")
  const resultPerPage = 8;
  const staffsCount = await Staff.countDocuments();

  const apiFeature = new ApiFeatures(Staff.find(), req.query).search().filter();
  const apiFeaturePagination = new ApiFeatures(Staff.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const filterStaffs = await apiFeature.query;
  // console.log(staffsCount)

  let filteredStaffsCount = filterStaffs.length;
  let staffs = await apiFeaturePagination.query;
  // console.log(staffs)

  res.status(200).json({
    success: true,
    staffs,
    staffsCount,
    resultPerPage,
    staffsCount,
    filteredStaffsCount,
  });
});

exports.updateStaff = catchAsyncErrors(async (req, res, next) => {
  let staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler("Staff is not found", 404));
  }
  if (req.body.avatar !== "null") {
    await cloudinary.v2.uploader.destroy(staff.avatar.public_id);
    const myCloude = await cloudinary.v2.uploader.upload(req.body.avatar);
    req.body.avatar = myCloude;
  } else {
    req.body.avatar = staff.avatar;
  }
  staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: `staff update successfully...`,
    staff,
    success: true,
  });
});

exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler("Staff is not found...", 404));
  }
  //Delete image from cloudinary
  const result = await cloudinary.v2.uploader.destroy(staff.avatar.public_id);
  staff = await Staff.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: "Staff delete successfully" });
});
