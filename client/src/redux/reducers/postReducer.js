import { SET_POST_LOADING, GET_ALL_POSTS, GET_SINGLE_POST, ADD_POST, DELETE_POST } from '../actions/types'

const initialState = {
  data: {},
  list: [],
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case SET_POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_POSTS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case GET_SINGLE_POST:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        data: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}