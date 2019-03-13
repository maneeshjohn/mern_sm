import { GET_CURRENT_PROFILE, PROFILE_LOADING, CLEAR_PROFILE } from '../actions/types'

const initialState = {
  data: {},
  list: [],
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type){    
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
      case PROFILE_LOADING:
      return {
        ...state,        
        loading: true
      }
      case CLEAR_PROFILE:
      return {
        ...state,
        data: null        
      }
    default:
      return state
  }
}