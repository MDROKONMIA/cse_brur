import axios from "axios";
import {
  GET_ALL_STAFFS_FAILED,
  GET_ALL_STAFFS_REQUEST,
  GET_ALL_STAFFS_SUCCESS,
  ADD_NEW_STAFF_FAILED,
  ADD_NEW_STAFF_REQUEST,
  ADD_NEW_STAFF_SUCCESS,
  CLEAR_ERRORS,
  STAFF_DETAILS_FAILED,
  STAFF_DETAILS_REQUST,
  STAFF_DETAILS_SUCCESS,
  STAFF_UPDATE_REQUST,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_FAILED,
  STAFF_DELETE_REQUST,
  STAFF_DELETE_FAILED,
} from "../constants/staffContants";

export const addNewStaff = (staffData) => async (dispath) => {
  try {
    dispath({ type: ADD_NEW_STAFF_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `/api/v1/admin/staff/new`,
      staffData,
      config
    );
    dispath({ type: ADD_NEW_STAFF_SUCCESS, payload: data });
  } catch (error) {
    dispath({ type: ADD_NEW_STAFF_FAILED, payload: error.response.data });
  }
};

export const getAllStaffs = (keyword="",currenrPage=1) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STAFFS_REQUEST });
    const { data } = await axios.get(`/api/v1/staffs?keyword=${keyword}&page=${currenrPage}`);
    dispatch({ type: GET_ALL_STAFFS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_STAFFS_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const getStaffDetails = (staffId) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_DETAILS_REQUST });
    const { data } = await axios.get(`/api/v1/admin/staff/${staffId}`);
    dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_DETAILS_FAILED, payload: error });
  }
};

export const updateStaff = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_UPDATE_REQUST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `/api/v1/admin/staff/${id}`,
      updateData,
      config
    );
    dispatch({ type: STAFF_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_UPDATE_FAILED, payload: error.response.data.error });
  }
};

export const deleteStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_DELETE_REQUST });
    const { data } = await axios.delete(`/api/v1/admin/staff/${id}`);
    dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_DELETE_FAILED, error: error.response.data.error });
  }
};

export const clearErrors = () => async (dispath) => {
  dispath({ type: CLEAR_ERRORS });
};
