import {
  PASSWORD_PROCESS_FAILURE,
  PASSWORD_PROCESS_START,
  ADD_PASSWORD_SUCCESS,
  FETCH_PASSWORDS_SUCCESS,
  EDIT_PASSWORD_SUCCESS,
  DELETE_PASSWORD_SUCCESS,
  SEARCH_PASSWORDS_SUCCESS,
  SEARCH_PASSWORDS_FAILURE,
  SET_PASSWORD,
  CLEAR_PASSWORDS_ERROR,
  CLEAR_PASSWORDS_SUCCESS
} from '../actionTypes'

const initialState = {
  passwords: [{ id: 0 }],
  error: null,
  isLoading: false,
  success: null,
  password: null
}

export default function passwordsReducer(state = initialState, action) {
  switch(action.type) {
    case PASSWORD_PROCESS_START:
      return {
        ...state,
        isLoading: true
      }
    case PASSWORD_PROCESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case ADD_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'Password successfully added'
      }
    case FETCH_PASSWORDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        passwords: [{ id: 0 }, ...action.payload]
      }
    case EDIT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        password: null,
        success: 'Password successfully edited'
      }
    case DELETE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'Password successfully deleted'
      }
    case SEARCH_PASSWORDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        passwords: [{ id: 0 }, ...action.payload]
      }
    case SEARCH_PASSWORDS_FAILURE: 
    return {
        ...state,
        isLoading: false,
        passwords: [{ id: 0 }, {id: 1}]
      }
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case CLEAR_PASSWORDS_SUCCESS:
      return {
        ...state,
        success: null
      }
    case CLEAR_PASSWORDS_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}