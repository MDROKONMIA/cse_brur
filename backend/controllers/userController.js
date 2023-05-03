const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utilities/jwtToken");
const sendEmail = require("../utilities/sendEmail");
const crypto = require("crypto");
const cloudinary= require('cloudinary');
const { Console } = require("console");
 
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
  const { name, email, password } = req.body; 

  const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"user",
    width:150,
    crop:"scale"
  })
//   let avatar = req.files.avatar;
//   console.log(avatar);
//   let fileExt = avatar.name.split(".").pop();
//   const fileExtensions = ["jpg", "jpeg", "png"];
//   if (!fileExtensions.includes(fileExt)) {
//     return next(new ErrorHandler("Only *jpg *jpeg *png file allow", 401));
//   }
//   if (avatar.size >= 512000) {
//     return next(new ErrorHandler("File size will be less than 500 KB", 401));
//   }
//   avatar.mv(
//     `${__dirname}/uploads/${name + "." + fileExt}`,
//     (err) => {
//       if (err) return next(new ErrorHandler(err, 500));
//     }
//   );
// const avatarUrl = `${__dirname}/uploads/${name+email+ "." + fileExt}`; 
// // const stroreImageUrl = avatarUrl.replace('\','/')
// console.log(avatarUrl);
// 
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  }); 
  sendToken(user, 201, res);
});

//login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user given paeesord and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

//Logout user

exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => { 
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  
  // Get Reset Pasword Token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  
  // const resetPasswordUrl = `${req.protocol}:://${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${req.protocol}:://${req.get('host')}/password/reset/${resetToken}`;
  
  const message = `Your reset password token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this
  email then, please ignore it`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: `CSE_BRUR Admin Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successully. Please visit email bodies link`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});


//Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get user Detais
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); 
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => { 
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(`Old password is incorrect`, 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Passowrd does not match`, 401));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//Update user Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {

 
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  
  if(req.body.avatar!==""){
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
       folder: "avatar",
       width: 150,
       crop: "scale",
     });

     newUserData.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url
     }
  } 

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
  sendToken(user, 200, res);
});

// Get all user details --admin;
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => { 
  const numberOfUsers = await User.countDocuments();
  const users = await User.find();
  res.status(200).json({
    success: true,
    numberOfUsers,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  //we wil remove cloudinary later
  if (!user) {
    return next(new ErrorHandler(`Usre not exist with id: ${req.params.id}`));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "Message user deleted successfully......",
  });
});
