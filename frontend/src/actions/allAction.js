import axios from "axios";
import {
  ADD_NEW_TEACHER_FAILED,
  ADD_NEW_TEACHER_REQUEST,
  ADD_NEW_TEACHER_SUCCESS,
  ALL_NOTICE_FAILED,
  ALL_NOTICE_REQUEST,
  ALL_NOTICE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TEACHER_FAILED,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  GET_ALL_TEACHER_FAILED,
  GET_ALL_TEACHER_REQUEST,
  GET_ALL_TEACHER_SUCCESS,
  GET_TEACHERS_DETAILS_FAILED,
  GET_TEACHERS_DETAILS_REQUEST,
  GET_TEACHERS_DETAILS_SUCCESS,
  UPDATE_TEACHERS_FAILED,
  UPDATE_TEACHERS_REQUEST,
  UPDATE_TEACHERS_SUCCESS,
} from "../constants/teacherConstants";

export const getAllNews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NOTICE_REQUEST });
    const { data } = await axios.get("api/v1/news");
    dispatch({ type: ALL_NOTICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_NOTICE_FAILED, payload: error.response.data.error });
  }
};
export const getAllTeachers = (keyword="",currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEACHER_REQUEST });
    const { data } = await axios.get(`/api/v1/teachers?keyword=${keyword}&page=${currentPage}`);
    dispatch({ type: GET_ALL_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEACHER_FAILED,
      payload: error.response.data.error,
    });
  }
};

// get teacher details
export const getTeacherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHERS_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/teacher/${id}`);
    dispatch({ type: GET_TEACHERS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TEACHERS_DETAILS_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const teacherUpdate = (id, updatetData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEACHERS_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `/api/v1/admin/teacher/${id}`,
      updatetData,
      config
    );
    dispatch({ type: UPDATE_TEACHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TEACHERS_FAILED, payload: error.response });
  }
};

export const addNewTeacher = (newTecherData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_TEACHER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/admin/teacher/new`,
      newTecherData,
      config
    );
    dispatch({ type: ADD_NEW_TEACHER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ADD_NEW_TEACHER_FAILED,
      payload: err.response.data.error,
    });
  }
};

//DELETE TEACHER
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEACHER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/teacher/${id}`);
    dispatch({ type: DELETE_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TEACHER_FAILED,
      payload: error.response.data.error,
    });
  }
};

// cleare Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
