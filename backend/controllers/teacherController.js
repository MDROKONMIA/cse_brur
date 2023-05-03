const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utilities/errorHandler");
const ApiFeatures = require("../utilities/apiFeatures");
const sendEmail = require("../utilities/sendEmail");
const puppeteer = require("puppeteer");
const Teachers = require("../models/teacherModel");
const cloudinary = require("cloudinary");

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  const { from, to, subject, body } = req.body;

  try {
    await sendEmail({
      from: from,
      to: to,
      subject: subject,
      message: body,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${to} successully.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getAllNews = catchAsyncErrors(async (req, res, next) => {
  const browser = await puppeteer.launch();
  const url = "https://brur.ac.bd/notices/";
  const page = await browser.newPage();
  await page.goto(url);

  const ProductHandles = await page.$$(
    "div.item.col-sm-12.col-md-6.col-lg-6 >.block-content>.content"
  );

  const allNotice = [];
  for (const productHandle of ProductHandles) {
    try {
      const title = await page.evaluate(
        (el) => el.querySelector("a").textContent,
        productHandle
      );
      const date = await page.evaluate(
        (el) => el.querySelector(".entry-meta>.date>p").textContent,
        productHandle
      );
      const href = await page.evaluate(
        (el) => el.querySelector("a[href]").textContent,
        productHandle
      );
      allNotice.push({ title: title, date: date, url: url });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
  await browser.close();

  res.status(200).json({
    success: true,
    data: allNotice,
  });
});

exports.getAllTeachersUsingUnWeb = catchAsyncErrors(async (req, res, next) => {
  const browser = await puppeteer.launch();
  const url =
    "https://brur.ac.bd/engineering-and-technology/department-of-computer-science-and-engineering/";
  const page = await browser.newPage();
  await page.goto(url);

  const teachers = await page.evaluate(() => {
    const srcs = Array.from(
      document.querySelectorAll(
        "div.team-block>.team-img.posion-related.effect6"
      )
    ).map((teacher) => {
      return {
        profUrl: teacher.querySelector("a").getAttribute("href"),
        img: teacher.querySelector("img").getAttribute("src"),
        name: teacher.querySelector("div.team-content.extension>h4")
          .textContent,
        dagignation: Array.from(
          teacher.querySelectorAll("div.team-content.extension>p")
        ).at(0).textContent,
        phone: Array.from(
          teacher.querySelectorAll("div.team-content.extension>p")
        ).at(1).textContent,
        email: Array.from(
          teacher.querySelectorAll("div.team-content.extension>p")
        ).at(2).textContent,
      };
    });
    return srcs;
  });
  await browser.close();
  res.status(200).json({
    success: true,
    data: teachers,
  });
});

// exports.getAllteachers=catchAsyncErrors(async(req,res,next)=>{

// })

exports.addNewTeacher = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, dagignation, join_date, status, address } =
    req.body;
  // console.log(req.body)

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "cse_teachers",
    width: 150,
    crop: "scale",
  });
  // let avatar = req.files.avatar;
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

  const teacher = await Teachers.create({
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
    teacher: teacher,
    message: "Teaccher add Successfully",
  });
});

exports.getAllTeachers = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const teachersCount = await Teachers.countDocuments();

  const apiFeature = new ApiFeatures(Teachers.find(), req.query)
    .search()
    .filter();
  const apiFeaturePagination = new ApiFeatures(Teachers.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const filterTeachers = await apiFeature.query;

  let filteredTeachersCount = filterTeachers.length;
  let teachers = await apiFeaturePagination.query;

  res.status(200).json({
    success: true,
    teachers,
    teachersCount,
    resultPerPage,
    teachersCount,
    filteredTeachersCount,
  });
});

exports.getTeacherDetails = catchAsyncErrors(async (req, res, next) => {
  const teacher = await Teachers.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler("Staff is not found!", 404));
  }
  res.status(201).json({ success: true, teacher });
});

exports.teacherUpdate = catchAsyncErrors(async (req, res, next) => {
  let teacher = await Teachers.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler("Teacher is not found", 404));
  }

  if (req.body.avatar !== "null") {
    await cloudinary.v2.uploader.destroy(teacher.avatar.public_id);
    const myCloude = await cloudinary.v2.uploader.upload(req.body.avatar);
    req.body.avatar = myCloude;
  } else {
    req.body.avatar = teacher.avatar;
  }

  teacher = await Teachers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: `Teacher update successfully...`,
    teacher,
    success: true,
  });
});

exports.deleteTeacher = catchAsyncErrors(async (req, res, next) => {
  let teacher = await Teachers.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorHandler("Teacher not found...", 404));
  }
  //Deleting images from cloudinary
  const result= await cloudinary.v2.uploader.destroy(teacher.avatar.public_id);
  await Teachers.findByIdAndRemove(req.params.id);
  console.log("delete teacher")
  res.status(201).json({ message: `Teacher deleted successfully` });
});
