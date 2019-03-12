import { AUTHENTICATE_USER } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type){    
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: (Object.keys(action.payload).length > 0),
        user: action.payload
      }    
    default:
      return state
  }
}