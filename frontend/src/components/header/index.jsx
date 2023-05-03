import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../logo/logo1.png";
import Footer from "../footer/Footer";



import { fbPageLinks } from "../AllSocialLinks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { toast } from "react-toastify";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { useState } from "react";
function Header() {
  const { isAuthenticated, user } = useSelector(state => state.user)
  const mainMenu = [
    { title: "Home", url: "/" },
    {
      title: "About",
      url: "/",
      submenu: [
        {
          title: "About Our CSE Department",
          url: "/about_our_cse_deptartment",
        },
        { title: "History", url: "/" },
        { title: "Vision", url: "/vision" },
      ],
    },
    {
      title: "Facilities",
      url: "/",
      submenu: [
        { title: "Class Room", url: "/class_room" },
        { title: "Labratories", url: "/labratories" },
        { title: "Virtual Class Room", url: "/vc_room" },
      ],
    },
    {
      title: "Academic",
      url: "/",
      submenu: [
        { title: "Events", url: "/" },
        { title: "B.Sc Admission", url: "https://brur.ac.bd/undergraduate/" },
        { title: "Seminer", url: "/" },
        { title: "Others", url: "/" },
      ],
    },
    {
      title: "People",
      url: "/",
      submenu: [
        { title: "Teachers", url: "/teachers" },
        { title: "staffs", url: "/staffs" },
      ],
    },
    {
      title: "Notice",
      url: "/",
      submenu: [
        { title: "Notice", url: "/notice" },
        { title: "News Events", url: "/" },
      ],
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logout());
    toast("Sign out successfully....");
    navigate("/login");

  }
  const [theme, setTheme]=useState(localStorage.theme);
  const handleDarkMood = () => {
    if (theme === 'light') {
      localStorage.theme = 'dark';
      setTheme(localStorage.theme)
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      setTheme(localStorage.theme)
      document.documentElement.classList.remove('dark')
    }
  }
  return (
    <>
      <header>
        <div className="w-full">
          <div className="header-top bg-primary_bg dark:bg-black">

            <div className="sm:flex px-4">
              <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 w-full flex items-center">
                <div className="header-contact header-contact-phone flex">
                  <span className="ti-headphone"></span>
                  <p className="phone-number">+8801738240159</p>
                </div>
                <div className="header-contact header-contact-email flex">
                  <span className="ti-email"></span>
                  <p className="email-name">
                    <a
                      href={`/email/cse1605033brur@gmail.com`}
                      className="text-white"
                    >
                      cse1905031brur@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                <div className="header-social-icon-list">
                  <ul>
                    <li>
                      <div  onClick={handleDarkMood} className="pr-2 text-white cursor-pointer">{theme==='dark'?(<BsSun/>):(<BsMoonFill/>)}</div>
                    </li>

                    <li>
                      {isAuthenticated ? (<Link className="pr-2" onClick={handleSignOut}>Sign out</Link>) : (<Link className="pr-2" to={"/login"}>Sign in</Link>)}
                    </li>
                    {user && user.role === 'admin' && <li><Link className="pr-2" to={"/admin"}>Go to admin panel</Link></li>}
                    <li>
                      <Link className="pr-2" to={fbPageLinks} target="_blank">
                        <span className="ti-facebook"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://www.google.com/"} rel="nonreferrer" target="_blank">
                        <span className="ti-google"></span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="header-bottom-area header-sticky w-full  dark:bg-gray-900">
            <div className="px-2">
              <div className="md:flex items-center py-3">
                <div className="xl:w-1/5 lg:w-1/5  md:w-2/5 hidden md:block">
                  {/* logo */}
                  <div className="logo m-auto flex">
                    <a
                      href="/"
                      className="w-full flex items-center justify-center"
                    >
                      <img src={logo} alt="" width={"100px"} height={"100px"} />
                    </a>
                  </div>
                </div>



                {/* {university and deptName} */}

                <div className="xl:4/5 lg:w-4/5 md:w-3/5 w-full">
                  <div className=" w-full text-center dark:text-white">
                    <h1 className="font-extrabold text-4xl dark:text-white" >
                      Department of Compuer Science & Enginnering
                    </h1>
                    <h1 className="font-bold text-lg dark:text-white font-cursive">
                      {" "}
                      Established: 12 October, 2008
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="">
            <div className="main-menu">
              <nav id="mobile-menu"></nav>
              <ul className="">
                {mainMenu.map((menu) => (
                  <>
                    <li>
                      <span className="dark:text-white">{menu.title}</span>
                      {/* <a className="dark:text-white">{menu.title}</a> */}

                      {menu.submenu ? (
                        <ul className="submenu">
                          {menu.submenu.map((el) => (
                            <li>
                              <a href={el.url}>{el.title}</a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {<Outlet />}

      <Footer />
    </>
  );
}

export default Header;
