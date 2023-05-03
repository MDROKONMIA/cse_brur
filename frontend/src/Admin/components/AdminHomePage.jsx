import { Card, Table } from "flowbite-react";
import Carousel from "react-multi-carousel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "../../actions/allAction";
import { getAllNotice } from "../../actions/noticeAction";
import { getAllStaffs } from "../../actions/staffAction";
import "react-multi-carousel/lib/styles.css";

function AdminHomePage() {
  const dispatch = useDispatch();
  const { teachers, teachersCount } = useSelector((state) => state.teachers);
  const { staffs, staffsCount } = useSelector((state) => state.staffs);
  const { notices, noticesCount } = useSelector((state) => state.allNotices);


  useEffect(() => {
    if (teachers === undefined) {
      dispatch(getAllTeachers());
    }
    if (staffs === undefined) {
      dispatch(getAllStaffs());
    }
    if (notices === undefined) {
      dispatch(getAllNotice());
    }
  }, [dispatch, teachers, staffs, notices]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Teacher
          </h5>
          <p className="font-normal text-center text-gray-700 dark:text-gray-400 text-5xl">
            {teachersCount}
          </p>
        </Card>

        <Card href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Staff
          </h5>
          <p className="font-normal text-center text-gray-700 dark:text-gray-400 text-5xl">
            {staffsCount}
          </p>
        </Card>
        <Card href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Notice
          </h5>
          <p className="font-normal text-center text-gray-700 dark:text-gray-400 text-5xl">
            {noticesCount}
          </p>
        </Card>
      </div>

      <div className="flex items-center justify-center h-20 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Teacher
        </h5>
      </div>
     {teachers && <Carousel responsive={responsive} autoPlay={true}>
          {teachers?.map((teacher) => (
          <div className="p-1">
            <Card>
              <img
                src={teacher.avatar.url}
                alt="..."
              />
              <span className="text-gray-700 dark:text-white">{teacher.name}</span>
            </Card>
          </div>
        ))}
      </Carousel>}


      <div className="flex items-center justify-center h-20 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Staff
        </h5>
      </div>

      {staffs && <Carousel responsive={responsive} autoPlay={true}>
         {staffs?.map((teacher) => (
          <div className="p-1">
            <Card>
              <img
                src={teacher.avatar.url}
                alt="..."
              />
              <span className="text-gray-700 dark:text-white">{teacher.name}</span>
            </Card>
          </div>
        ))}
      </Carousel>}

      <div className="flex items-center justify-center h-20 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Notice
        </h5>
      </div>

      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell className="capitalize">
            Publish Date
          </Table.HeadCell>
          <Table.HeadCell className="capitalize">
            Title
          </Table.HeadCell>
        </Table.Head>
        {notices && notices.map((notice) => (
          <Table.Body>
            <Table.HeadCell>
              {notice.date.substring(0, 10)}
            </Table.HeadCell>
            <Table.HeadCell>
              {notice.title}
            </Table.HeadCell>
          </Table.Body>
        ))}
      </Table>

    </div>
  );
}

export default AdminHomePage;
