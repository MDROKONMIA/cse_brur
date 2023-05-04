import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ routes }) => {

    const [dropdown, setDropdown] = useState(null);

    const [isShowSideBar, setShowSideBar] = useState(false);
    const onChageSidebarShow = () => {
        const mySidebar = document.getElementById("mySidebar");
        if (isShowSideBar) {
            mySidebar.style.width = "0"
        } else {
            mySidebar.style.width = "250px"
        }
        setShowSideBar(!isShowSideBar)
    }

    return (

        <aside>
            <div id="mySidebar" className={`sidebar ${isShowSideBar ? "w-64" : ""}`}>
                <button  className="closebtn " onClick={onChageSidebarShow}>&times;</button>
                <ul>
                    <li>
                        <button
                            type="button"
                            className="flex items-center w-full p-2 text-base font-normal text-gray-100 transition duration-75 rounded-lg group hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700"
                            aria-controls="dropdown-example"
                            data-collapse-toggle="dropdown-example"
                        >
                            <a href="/" className="flex-1 ml-3 text-left whitespace-nowrap">
                                Home
                            </a>
                        </button>
                    </li>
                    {routes.map((el, key) => (
                        <li>
                            <button
                                type="button"
                                className="flex items-center w-full p-2 text-base font-normal text-gray-100 transition duration-75 rounded-lg group hover:bg-gray-700 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-example"
                                data-collapse-toggle="dropdown-example"
                                onClick={() => setDropdown(dropdown === key ? null : key)}
                            >
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                    {el.title}
                                </span>
                                {dropdown === key ? (
                                    <AiOutlineCaretUp />
                                ) : (
                                    <AiOutlineCaretDown />
                                )}
                            </button>
                            <ul
                                id="dropdown-example"
                                className={` ${dropdown === key ? "block" : "hidden"
                                    } py-2 space-y-2`}
                            >
                                {el.submenu &&
                                    el.submenu.map((subList) => (
                                        <li>
                                            <Link
                                                to={subList.url}
                                                className="flex items-center w-full p-2 text-sm text-gray-300 transition duration-75 rounded-lg pl-4 md:pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                <span>{subList.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>

            </div>

            <div id="main" className={`sm:hidden fixed ${isShowSideBar ? "ml-64" : ""}`}>
                <button className="openbtn" onClick={onChageSidebarShow}>&#9776;</button>
            </div>
        </aside>
    );
}
export default Sidebar;
