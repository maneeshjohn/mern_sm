import { AUTHENTICATE_USER, GET_ERRORS } from './types'
import axios from 'axios'
import { API } from '../../utils/routes'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerNewUser = (data, history) => dispatch => {
  axios.post(`${API}/api/users/register`, data)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const authorizeUser = (data, history) => dispatch => {
  axios.post(`${API}/api/users/login`, data)
      .then(res => {        
        const { token } = res.data
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        const user = jwt_decode(token)
        dispatch(setUser(user))
        history.push('/dashboard')
      })
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setUser({}))
  history.push('/login')
}

export const setUser = user => {
  return {
    type: AUTHENTICATE_USER,
    payload: user
  }
}