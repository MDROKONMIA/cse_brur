import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendEmail, clearErrors } from "../../actions/userAction";
import MetaData from "../Layout/MetaData";

// const nodemailer=require('nodemailer')

function Email() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email } = params;
  const [sender_Email, setSenderEmail] = useState("");
  const [email_Subject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const { error, success, message } = useSelector((state) => state.send_email);

  const sentEmail = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("to", email);
    myForm.set("from", sender_Email);
    myForm.set("subject", email_Subject);
    myForm.set("body", emailBody);
    dispatch(sendEmail(myForm));
  };
  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast(message);
      navigate("/");
    }
  }, [dispatch, error, success, navigate, message]);

  return (
    <Fragment>
      <MetaData title="Sent Email" />
      <div class="w-full max-w-3xl m-auto">
        <form
          class="bg-white shadow-md m-auto  w-4/5 rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={sentEmail}
        >
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              From
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              value={sender_Email}
              type={"email"}
              name={"sender_Email"}
              required
              placeholder="Enter your email address"
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              To
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={email}
              placeholder="Enter your password"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Subject
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={email_Subject}
              type="text"
              placeholder="Enter a subject"
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Message
            </label>
            <textarea
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              rows={"10"}
              required
              placeholder="Type your message"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full px-4 rounded focus:outline-none focus:shadow-outline uppercase"
              type={"submit"}
            >
              send
            </button>
            {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a> */}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Email;
