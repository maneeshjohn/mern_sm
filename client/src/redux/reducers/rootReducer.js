import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postReducer,
  errors: errorReducer
})