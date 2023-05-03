import {
  ADD_NOTICE_FAILED,
  ADD_NOTICE_REQUEST,
  ADD_NOTICE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_NOTICE_FAILED,
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_RESET,
  DELETE_NOTICE_SUCCESS,
  GET_ALL_NOTICE_FAILED,
  GET_ALL_NOTICE_REQUEST,
  GET_ALL_NOTICE_SUCCESS,
  GET_NOTICE_DETAILS_FAILED,
  GET_NOTICE_DETAILS_REQUEST,
  GET_NOTICE_DETAILS_SUCCESS,
  UPDATE_NOTICE_FAILED,
  UPDATE_NOTICE_REQUEST,
  UPDATE_NOTICE_RESET,
  UPDATE_NOTICE_SUCCESS,
} from "../constants/noticeConstants";

export const addNoticeReducer = (state = { notice: {} }, action) => {
  switch (action.type) {
    case ADD_NOTICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notice: action.payload.notice,
        success: true,
        message: action.payload.message,
      };
    case ADD_NOTICE_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return { ...state };
  }
};

export const getAllNoticeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_NOTICE_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: action.payload.notices,
        noticesCount: action.payload.noticesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredNoticesCount: action.payload.filteredNoticesCount,
      };
    case GET_ALL_NOTICE_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};


//Delete product reducer
export const noticeReducer = (state = { notice: {} }, action) => {
  switch (action.type) {
    case DELETE_NOTICE_REQUEST:
    case UPDATE_NOTICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NOTICE_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        message: action.payload.message,
        loading: false,
      };
    case UPDATE_NOTICE_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        success: true,
        message: action.payload.message,
        norice: action.payload.norice,
      };
    case DELETE_NOTICE_FAILED:
    case UPDATE_NOTICE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NOTICE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_NOTICE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false
      };
    default:
      return state;
  }
};


export const getNoticeDetailsReducer = (state = { notice: {} }, action) => {
    switch (action.type) {
      case GET_NOTICE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case GET_NOTICE_DETAILS_SUCCESS:
        return {
          loading: false,
          notice: action.payload.notice,
        };
      case GET_NOTICE_DETAILS_FAILED:
        return {
          loading: false,
          error: action.payload,
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