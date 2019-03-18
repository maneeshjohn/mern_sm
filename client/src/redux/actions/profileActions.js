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
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    })
}

export const createProfile = (data, history) => dispatch => {
  axios.post(`${API}/api/profile`, data)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setProfileLoading = () => { 
 return { type: PROFILE_LOADING }
}

export const clearProfile = () => { 
  return { type: CLEAR_PROFILE }
}