import { combineReducers } from 'redux'
import users from './users'
import passwords from './passwords'

export const rootReducer = combineReducers({
  users,
  passwords
})