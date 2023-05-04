import { Avatar, Dropdown,  Pagination, } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { clearErrors, deleteTeacher, getAllTeachers } from "../../../actions/allAction"
import { DELETE_TEACHER_RESET } from "../../../constants/teacherConstants";
import MetaData from "../../../components/Layout/MetaData";

function AllTeachers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keyword=useParams().keyword;

  const { resultPerPage, error, teachers, teachersCount } = useSelector((state) => state.teachers);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.updateOrDeleteTeacher);

  const deleteTeacherHandler = (id) => {
    dispatch(deleteTeacher(id));
  }
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (e) => { setCurrentPage(e); }
 
  useEffect(() => {
    if (error) {
      toast(error)
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast(error)
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast(message);
      navigate('/admin/all-teachers');
      dispatch({ type: DELETE_TEACHER_RESET })
    }
    dispatch(getAllTeachers(keyword,currentPage));
  }, [error, dispatch, isDeleted, message, navigate, deleteError,currentPage,keyword]);

  return (
    <>
      <MetaData title={"All Teachers"}/>
      <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white uppercase  ">Teachers</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" h-16 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Teacher Name
              </th>
              <th scope="col" className="px-6 py-3">
                Dagignation
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
            {teachers &&
              teachers.map((element) => (
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
                  <td className="px-6 py-4">{element.status===1?"On Duty":"Study Leave"}</td>
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
                        <Link to={`/admin/teacher/${element._id}`} className="text-center text-black dark:text-white">Edit</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button onClick={() => deleteTeacherHandler(element._id)} className=" text-center text-black dark:text-white">Delete</button>
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {resultPerPage < teachersCount && (
          <div className="text-center mb-2">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(teachersCount / resultPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AllTeachers;
