import axios from "axios";
import {
  ADD_NOTICE_FAILED,
  ADD_NOTICE_REQUEST,
  ADD_NOTICE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_NOTICE_FAILED,
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_SUCCESS,
  GET_ALL_NOTICE_FAILED,
  GET_ALL_NOTICE_REQUEST,
  GET_ALL_NOTICE_SUCCESS,
  GET_NOTICE_DETAILS_FAILED,
  GET_NOTICE_DETAILS_REQUEST,
  GET_NOTICE_DETAILS_SUCCESS,
  UPDATE_NOTICE_FAILED,
  UPDATE_NOTICE_REQUEST,
  UPDATE_NOTICE_SUCCESS,
} from "../constants/noticeConstants";

export const addNotice = (noticeData) => async (dispacth) => {
  try {
    dispacth({ type: ADD_NOTICE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/v1/admin/notice/add-new-notice",
      noticeData,
      config
    );
    dispacth({ type: ADD_NOTICE_SUCCESS, payload: data });
  } catch (error) {
    dispacth({ type: ADD_NOTICE_FAILED, payload: error.response.data.error });
  }
};

export const getAllNotice = (keyword = "", currentPage = 1) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_NOTICE_REQUEST });
    const { data } = await axios.get(`/api/v1/all-notices?keyword=${keyword}&page=${currentPage}`);
    dispatch({ type: GET_ALL_NOTICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_NOTICE_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const getNoticeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_NOTICE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/notice/${id}`);
    dispatch({ type: GET_NOTICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_NOTICE_DETAILS_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const updateNotice = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTICE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `/api/v1/admin/notice/${id}`,
      updateData,
      config
    );
    dispatch({ type: UPDATE_NOTICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_NOTICE_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const deleteNotice = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTICE_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/notice/${id}`);
    dispatch({ type: DELETE_NOTICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_NOTICE_FAILED,
      payload: error.response.data.error,
    });
  }
};

// cleare Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
