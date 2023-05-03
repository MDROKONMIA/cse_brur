import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../actions/userAction'



const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(logout());
        toast("Sign out successfully....");
        navigate("/login");

    }
    const {user}=useSelector(state=>state.user);

    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="mb-2"
        >
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img={user.avatar.url} rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {user.name}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {user.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={()=>navigate("/admin")}>
                       Dashboard
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignOut}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </div>
            {/* <Navbar.Collapse>
                <h5 className='text-4xl dark:text-gray-300 text-gray-900 font-extrabold'>CSE BRUR Dashboard</h5>
            </Navbar.Collapse> */}
            <h5 className='text-4xl dark:text-gray-300 text-gray-900 font-extrabold'>CSE BRUR Dashboard</h5>
        </Navbar>
    )
}

export default AdminNavbar