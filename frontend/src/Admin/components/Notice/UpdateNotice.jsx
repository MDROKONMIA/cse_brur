
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { getNoticeDetails } from "../../../../../backend/controller/noticeController";
import { clearErrors, getNoticeDetails, updateNotice } from "../../../actions/noticeAction";
import { UPDATE_NOTICE_RESET } from "../../../constants/noticeConstants";

function UpdateNotice() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const { error, notice } = useSelector(state => state.noticeDetails);
    const { error: upadateError, isUpdated, message } = useSelector(state => state.updateAndDeleteNotice);
    // console.log(message, error, success)
    const fileHandler = (e) => {
        if (e.target.name === "file") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setFile(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append('title', title);
        myForm.append('file', file);

        dispatch(updateNotice(id, myForm));

    };

    useEffect(() => {
        if (notice && notice._id !== id) {
            dispatch(getNoticeDetails(id));
        } else {
            setTitle(notice.title)
        }
        if (error) {
            toast(error);
            dispatch(clearErrors())
        }
        if (upadateError) {
            toast(upadateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast(message);
            navigate("/admin/all-notices");
            dispatch({ type: UPDATE_NOTICE_RESET });
        }
    }, [dispatch, navigate, isUpdated, message, upadateError, error, notice, id]);

    return (
        <>
            <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white uppercase ">
                Update Notice
            </div>
            <form
                className="w-full"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title" className="text-lg" />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            sizing="md"
                            value={title}
                            placeholder="Enter the notice title ...."
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="file" value="File" className="text-lg" />
                        </div>
                        <FileInput id="file" name="file" onChange={fileHandler} />
                        {/* <FileInput id="file" name="file" required onChange={e=>setFile(e.target.files[0])} /> */}
                    </div>
                </div>

                <div className="flex justify-between w-full">
                    <Button
                        type="submit"
                        gradientMonochrome={"success"}
                        className="w-full"
                    >
                        Update Notice
                    </Button>
                </div>
            </form>
        </>
    );
}

export default UpdateNotice;
