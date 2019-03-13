import axios from 'axios'
import { GET_CURRENT_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, GET_ERRORS } from './types'
import { API } from '../../utils/routes'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`${API}/api/profile`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    })
}

export const setProfileLoading = () => { 
 return { type: PROFILE_LOADING }
}

export const clearProfile = () => { 
  return { type: CLEAR_PROFILE }
}