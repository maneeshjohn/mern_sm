import axios from 'axios'
import { GET_CURRENT_PROFILE, GET_ALL_PROFILES, PROFILE_LOADING, CLEAR_PROFILE, GET_ERRORS, AUTHENTICATE_USER } from './types'
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

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`${API}/api/profile/users`)
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
      })
    })
}

export const getProfileByHandle = data => dispatch => {
  dispatch(setProfileLoading())
  axios.get(`${API}/api/profile/handle/${data}`)
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
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

export const addExperience = (data, history) => dispatch => {
  axios.post(`${API}/api/profile/experience`, data)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const addEducation = (data, history) => dispatch => {
  axios.post(`${API}/api/profile/education`, data)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deleteProfile = () => dispatch => {
  if(window.confirm('Are you sure?')){
    axios.delete(`${API}/api/profile/delete`)
      .then(res => dispatch({
        type: AUTHENTICATE_USER,
        payload: {}
      }))
      .catch(err => dispatch => ({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
}

export const deleteExperience = data => dispatch => {  
  axios.delete(`${API}/api/profile/experience/${data}`)
    .then(res => dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch => ({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deleteEducation = data => dispatch => {  
  axios.delete(`${API}/api/profile/education/${data}`)
    .then(res => dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch => ({
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