import {
  CLEAR_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGOUT_SUCCESS,
  CLEAR_USER_SUCCESS
} from '../actionTypes'

const initialState = {
  userId: null,
  isLoading: false,
  error: null,
  success: null
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload,
        isLoading: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userId: null,
        success: 'Successfully signed out' 
      }
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_USER_SUCCESS:
      return {
        ...state,
        success: null
      }
    default:
      return state
  }
}