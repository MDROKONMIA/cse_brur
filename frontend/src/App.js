import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/style.css";
import "./App.css";
import "./css/themify-icons.css";
import "./css/homePage.css";

import Header from "./components/header";
import Email from "./components/Email/Email";
import Notice from "./components/Pages/Notice&Events/Notice";
import Teachers from "./components/teachers/Teachers";
import OfficeStaffs from "./components/teachers/OfficeStaffs";
import { ScrollToTop } from "./components/ScrollToTop";
import HomePage from "./components/HomePage";
import AboutOurCseDept from "./components/Pages/AboutOurCseDept";
import AllTeachers from "./Admin/components/teacher/AllTeachers";
import Layout from "./Admin/Laoyout";
import AllStaffs from "./Admin/components/staff/AllStaff";
import AdminHomePage from "./Admin/components/AdminHomePage";
import AddNewStaff from "./Admin/components/staff/AddStaff";
import UpdateStaff from "./Admin/components/staff/UpdateStaff";
import AddTeacher from "./Admin/components/teacher/AddTeacher";
import UpdateTeacher from "./Admin/components/teacher/UpdateTeacher";
import AddNotice from "./Admin/components/Notice/AddNotice";
import AllNotices from "./Admin/components/Notice/AllNotices";
import UpdateNotice from "./Admin/components/Notice/UpdateNotice";
import LoginSignUp from "./components/user/LoginSignUp";
import ForgotPassword from "./components/user/ForgotPassword";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ResetPassword from "./components/user/ResetPassword";
import { Vision } from "./components/Pages/Vision";
import AcademicRoom from "./components/Pages/AcademicRoom";
import Labratories from "./components/Pages/Labratories";
import VirtualClassRoom from "./components/Pages/VirtualClassRoom";
import NotFound404 from "./components/NotFound404";
// localStorage.theme = "light";

function App() {
  const theme=localStorage.theme;
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (theme==='dark') {
     document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    store.dispatch(loadUser());
  }, [theme]);

  return (
    <>
      <Router>
        {/* <Header /> */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/email/:email" element={<Email />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/staffs" element={<OfficeStaffs />} />
            <Route
              path="/about_our_cse_deptartment"
              element={<AboutOurCseDept />}
            />
            <Route exact path="/class_room" element={<AcademicRoom />} />
            <Route exact path="/vc_room" element={<VirtualClassRoom />} />
            <Route exact path="/vision" element={<Vision />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route exact path="/labratories" element={<Labratories />} />
          </Route>

          {/* Routing for admin  */}

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={true}
              />
            }
          >
            <Route path="/admin" element={<Layout />}>
              <Route exact path="/admin" element={<AdminHomePage />} />
              <Route
                exact
                path="/admin/all-teachers"
                element={<AllTeachers />}
              />
              <Route
                exact path="/admin/teacher/:id"
                element={<UpdateTeacher />}
              />
              <Route exact path="/admin/add-teacher" element={<AddTeacher />} />
              <Route exact path="/admin/all-staffs" element={<AllStaffs />} />
              <Route
                exactn
                path="/admin/staff/:staffId"
                element={<UpdateStaff />}
              />
              <Route exact path="/admin/add-notice" element={<AddNotice />} />
              <Route exact path="/admin/all-notices" element={<AllNotices />} />
              <Route
                exact
                path="/admin/notice/:id"
                element={<UpdateNotice />}
              />
              <Route
                exact
                path="/admin/add-new-staff"
                element={<AddNewStaff />}
              />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound404/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
