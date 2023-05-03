import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import sendEmail, {
  allUserReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./Reducer/userReducer";
import {
  addNewTeacherReducer,
  getAllNews,
  getAllTeachersReducer,
  getTeacherDetailsReducer,
  teacherReducer,
} from "./Reducer/allReducer";
import {
  AddNewStaffReducer,
  getAllStaffsReducer,
  staffDetailsReducer,
  staffReducer,
} from "./Reducer/staffReducer";
import {
  addNoticeReducer,
  getAllNoticeReducer,
  getNoticeDetailsReducer,
  noticeReducer,
} from "./Reducer/noticeReducer";

const reducer = combineReducers({
  send_email: sendEmail,
  notice: getAllNews,
  teachers: getAllTeachersReducer,
  addNewTeacher: addNewTeacherReducer,
  staffs: getAllStaffsReducer,
  addNewStaff: AddNewStaffReducer,
  staffDetails: staffDetailsReducer,
  teacherDetails: getTeacherDetailsReducer,
  updateOrDeleteTeacher: teacherReducer,
  updateOrDeleteStaff: staffReducer,
  addNewNotice: addNoticeReducer,
  allNotices: getAllNoticeReducer,
  noticeDetails: getNoticeDetailsReducer,
  updateAndDeleteNotice: noticeReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  userDetails: userDetailsReducer,
  allUsers: allUserReducer,
});
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;



