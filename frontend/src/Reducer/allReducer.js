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
  DELETE_TEACHER_RESET,
  DELETE_TEACHER_SUCCESS,
  GET_ALL_TEACHER_FAILED,
  GET_ALL_TEACHER_REQUEST,
  GET_ALL_TEACHER_SUCCESS,
  GET_TEACHERS_DETAILS_FAILED,
  GET_TEACHERS_DETAILS_REQUEST,
  GET_TEACHERS_DETAILS_SUCCESS,
  GET_TEACHERS_FAILD,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  UPDATE_TEACHERS_FAILED,
  UPDATE_TEACHERS_REQUEST,
  UPDATE_TEACHERS_RESET,
  UPDATE_TEACHERS_SUCCESS,
} from "../constants/teacherConstants";

export const getAllNews = (state = {}, action) => {
  switch (action.type) {
    case ALL_NOTICE_REQUEST:
      return { ...state, error: null, loading: true };
    case ALL_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload.data,
      };
    case ALL_NOTICE_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
export const getAllTeachersUsingUnWeb = (state = {}, action) => {
  switch (action.type) {
    case GET_TEACHERS_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        data: action.payload.data,
      };
    case GET_TEACHERS_FAILD:
      return { ...state, loading: false, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const getAllTeachersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.payload.teachers,
        teachersCount: action.payload.teachersCount,
        resultPerPage: action.payload.resultPerPage,
        filteredTeachersCount: action.payload.filteredTeachersCount,
      };
    case GET_ALL_TEACHER_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const addNewTeacherReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_TEACHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_TEACHER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        teacher: action.payload.teacher,
        message: action.payload.message,
      };
    case ADD_NEW_TEACHER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success:false,
      };
    default:
      return state;
  }
};

export const getTeacherDetailsReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case GET_TEACHERS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_TEACHERS_DETAILS_SUCCESS:
      return {
        loading: false,
        teacher: action.payload.teacher,
      };
    case GET_TEACHERS_DETAILS_FAILED:
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

//Delete product reducer
export const teacherReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case DELETE_TEACHER_REQUEST:
    case UPDATE_TEACHERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        message: action.payload.message,
        loading: false,
      };
    case UPDATE_TEACHERS_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        success: true,
        message: action.payload.message,
        teacher: action.payload.teacher,
      };
    case DELETE_TEACHER_FAILED:
    case UPDATE_TEACHERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TEACHER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_TEACHERS_RESET:
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
