import {
  ADD_NEW_STAFF_FAILED,
  ADD_NEW_STAFF_REQUEST,
  ADD_NEW_STAFF_SUCCESS,
  CLEAR_ERRORS,
  STAFF_DETAILS_FAILED,
  STAFF_DETAILS_REQUST,
  STAFF_DETAILS_SUCCESS,
  GET_ALL_STAFFS_FAILED,
  GET_ALL_STAFFS_REQUEST,
  GET_ALL_STAFFS_SUCCESS,
  STAFF_UPDATE_REQUST,
  STAFF_DELETE_REQUST,
  STAFF_DELETE_SUCCESS,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_FAILED,
  STAFF_DELETE_FAILED,
  STAFF_DELETE_RESET,
  STAFF_UPDATE_RESET,
} from "../constants/staffContants";

export const AddNewStaffReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_STAFF_REQUEST:
      return { ...state, loading: true };
    case ADD_NEW_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        staff: action.payload.staff,
        message: action.payload.message,
      };
    case ADD_NEW_STAFF_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    case CLEAR_ERRORS:
      return { ...state, error: null,success:false };
    default:
      return { ...state };
  }
};

export const staffDetailsReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUST:
      return {
        loading: true,
        ...state,
      };
    case STAFF_DETAILS_SUCCESS:
      return {
        loading: false,
        staff: action.payload.staff,
        success: true,
      };
    case STAFF_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAllStaffsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STAFFS_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_STAFFS_SUCCESS:
      return {
        ...state,
        loading: false,
        staffs: action.payload.staffs,
        staffsCount: action.payload.staffsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredStaffsCount: action.payload.filteredStaffsCount,
      };
    case GET_ALL_STAFFS_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

//Delete product reducer
export const staffReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_DELETE_REQUST:
    case STAFF_UPDATE_REQUST:
      return {
        ...state,
        loading: true,
      };
    case STAFF_DELETE_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        message: action.payload.message,
        loading: false,
      };
    case STAFF_UPDATE_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        success: true,
        message: action.payload.message,
        staff: action.payload.staff,
      };
    case STAFF_DELETE_FAILED:
    case STAFF_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case STAFF_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case STAFF_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
