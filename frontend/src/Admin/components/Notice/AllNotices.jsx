import { Dropdown, Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { clearErrors, deleteNotice, getAllNotice } from "../../../actions/noticeAction";
import { STAFF_DELETE_RESET } from "../../../constants/staffContants";

function AllNotices() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { error, notices, noticesCount, resultPerPage } = useSelector((state) => state.allNotices);
    const { isDeleted, error: deleteError, message } = useSelector((state) => state.updateAndDeleteNotice);

    const deleteNoticeHandler = (id) => {
        dispatch(deleteNotice(id));
    }

    const keyword = params.keyword;
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (e) => { setCurrentPage(e) };

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
            navigate("/admin/all-notices");
            dispatch({ type: STAFF_DELETE_RESET });
        }
        dispatch(getAllNotice(keyword, currentPage));
    }, [error, dispatch, message, navigate, deleteError, isDeleted, currentPage, keyword]);
    return (
        <>
            <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white uppercase">Notices</div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className=" h-16 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Publish Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                PDF
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices &&
                            notices.map((element) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >{element.date.substring(0, 10)}
                                    </th>
                                    <td className="px-6 py-4">{element.title}</td>
                                    <td className="px-6 py-4"><Link to={element.file.url}><BsFillFileEarmarkPdfFill size={"2rem"} color="" /></Link></td>
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
                                                <Link to={`/admin/notice/${element._id}`} className="text-center text-black dark:text-white">Edit</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button onClick={() => deleteNoticeHandler(element._id)} className=" text-center text-black dark:text-white">Delete</button>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {resultPerPage < noticesCount && (
                    <div className="text-center mb-2">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.round(noticesCount / resultPerPage)}
                            onPageChange={onPageChange}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default AllNotices;
