import { Avatar, Dropdown, Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, deleteStaff, getAllStaffs } from "../../../actions/staffAction";
import { STAFF_DELETE_RESET } from "../../../constants/staffContants";
import MetaData from "../../../components/Layout/MetaData";

function AllStaffs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { error, staffs,resultPerPage,staffsCount } = useSelector((state) => state.staffs);
  const { isDeleted, error: deleteError, message } = useSelector((state) => state.updateOrDeleteStaff);

  const deleteStaffHandler = (id) => {
    dispatch(deleteStaff(id));
  }

  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (e) => {
    setCurrentPage(e);
  }
  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast(deleteError);
      dispatch(clearErrors())
    }
    if (isDeleted) {
      toast(message);
      navigate("/admin/all-staffs");
      dispatch({ type: STAFF_DELETE_RESET });
    }
    dispatch(getAllStaffs(keyword, currentPage));
  }, [error, dispatch, message, navigate,currentPage,deleteError, isDeleted, keyword]);
  return (
    <>
      <MetaData title={"All Staffs"}/>
      <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white uppercase">Staff</div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" h-16 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Staff Name
              </th>
              <th scope="col" className="px-6 py-3">
                Dagignation
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {staffs &&
              staffs.map((element) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar
                        img={element.avatar.url}
                        rounded={true}
                        bordered={true}
                        color="gray"
                      />
                      <div className="font-medium dark:text-white">
                        <div>{element.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {element.email}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{element.dagignation}</td>
                  <td className="px-6 py-4">{element.phone}</td>
                  <td className="px-6 py-4">{element.status === 1 ? "On Duty" : "On Leave"}</td>
                  <td className="px-6 py-4">{element.join_date.substring(0,10)}</td>
                  <td className="px-6 py-4">
                    <Dropdown
                      label={<svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>}
                      dismissOnClick={false}
                      arrowIcon={false}
                      size="xs"
                      color={"transparant"}
                      placement="bottom"
                    >
                      <Dropdown.Item>
                        <Link to={`/admin/staff/${element._id}`} className="text-center text-black dark:text-white">Edit</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button onClick={() => deleteStaffHandler(element._id)} className=" text-center text-black dark:text-white">Delete</button>
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {resultPerPage < staffsCount && (
          <div className="text-center mb-2">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(staffsCount / resultPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AllStaffs;
