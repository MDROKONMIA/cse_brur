
import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SimpleBreadcrumbs from './components/SimpleBredcrambs';

function Layout() {
    return (
        <>
        
            <div className='dark:bg-gray-900 h-full'>
                <Sidebar />
                <div className="sm:ml-64 p-2 relative">
                    <Navbar/>
                    <SimpleBreadcrumbs/>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Layout;
