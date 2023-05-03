import React, { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPeopleFill, BsPeopleFill } from "react-icons/bs";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdViewList } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToggleSwitch } from "flowbite-react";

function Sidebar() {
  const routes = [
    {
      title: "Teacher",
      icon: BsFillPeopleFill,
      subList: [
        {
          title: "Add Teacher",
          url: "/admin/add-teacher",
          icon: IoPersonAddSharp,
        },
        { title: "All Teachers", url: "/admin/all-teachers", icon: MdViewList },
      ],
      key: "teacher",
    },
    {
      title: "Staff",
      icon: BsPeopleFill,
      subList: [
        { title: "Add Staff", url: "/admin/add-new-staff", icon: IoPersonAddSharp },
        { title: "All Staff", url: "/admin/all-staffs", icon: MdViewList },
      ],
      key: "staff",
    },
    {
      title: "Notice",
      icon: BsPeopleFill,
      subList: [
        { title: "Add Notice", url: "/admin/add-notice", icon: IoPersonAddSharp },
        { title: "All Notices", url: "/admin/all-notices", icon: MdViewList },
      ],
      key: "notice",
    },
  ];
  const [dropdown, setDropdown] = useState(null);

  const [theme, setTheme] = useState(localStorage.theme);
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

    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>



          {routes.map((el) => (
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => setDropdown(dropdown === el.key ? null : el.key)}
              >
                <RiDashboardFill />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  {el.title}
                </span>
                {dropdown === el.key ? (
                  <AiOutlineCaretUp />
                ) : (
                  <AiOutlineCaretDown />
                )}
              </button>
              <ul
                id="dropdown-example"
                className={` ${dropdown === el.key ? "block" : "hidden"
                  } py-2 space-y-2`}
              >
                {el.subList &&
                  el.subList.map((subList) => (
                    <li>
                      <Link
                        to={subList.url}
                        className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        <span className="pr-2">
                          {" "}
                          <subList.icon />
                        </span>
                        <span>{subList.title}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>

       <div className="flex justify-between">
        <h2 className="text-gray-900 dark:text-gray-300">Dark Mode</h2>
        <ToggleSwitch
          color="success"
          theme={"red"}
          checked={theme==='dark'}
          onClick={handleDarkMood}
        />
       </div>
      </div>
    </aside>
  );
}
export default Sidebar;
