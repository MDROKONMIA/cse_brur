import React from 'react';
import { useLocation} from 'react-router-dom';
import { Breadcrumb } from 'flowbite-react';



function SimpleBreadcrumbs(props) {
    let location = useLocation();
    const pathname = location.pathname.split("/").filter(x => x);
    const BreadCrumbDisabled = pathname[0] === undefined || pathname[0] === 'home';
    return (
        <div className={`${BreadCrumbDisabled ? "hidden" : ""} container-fluid  bg-gray-200 -mt-3`}>

            <Breadcrumb aria-label="Solid background breadcrumb example"
                className="bg-gray-50 py-3 px-5 dark:bg-gray-900">
                <Breadcrumb.Item
                    href="/"
                >
                    Home
                </Breadcrumb.Item>
                {pathname.map((name, index) => {
                    const routeTo = `/${pathname.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathname.length - 1;
                    return (
                        isLast ? (<Breadcrumb.Item href={routeTo}>
                            {name}
                        </Breadcrumb.Item>) :
                            (<Breadcrumb.Item href={routeTo}>
                                {name}
                            </Breadcrumb.Item>)
                    )
                })}
            </Breadcrumb>
        </div>
    );
}
export default SimpleBreadcrumbs;