import { SET_POST_LOADING, GET_ALL_POSTS, GET_SINGLE_POST, ADD_POST, DELETE_POST, GET_ERRORS } from './types'
import axios from 'axios'
import { API } from '../../utils/routes'

export const getPosts = data => dispatch => {
  dispatch(setPostLoading())
  axios.get(`${API}/api/posts`)
    .then(res => dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const getSinglePost = data => dispatch => {
  dispatch(setPostLoading())
  axios.get(`${API}/api/posts/${data}`)
    .then(res => dispatch({
      type: GET_SINGLE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const createPost = data => dispatch => {
  axios.post(`${API}/api/posts`, data)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deletePost = data => dispatch => {
  axios.delete(`${API}/api/posts/${data}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const likePost = data => dispatch => {
  axios.post(`${API}/api/posts/like/${data}`)
    .then(res => dispatch({
      type: GET_SINGLE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const addComment = data => dispatch => {
  axios.post(`${API}/api/posts/comment/${data}`)
    .then(res => dispatch({
      type: GET_SINGLE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const removeComment = data => dispatch => {
  axios.delete(`${API}/api/posts/comment/${data.pId}/${data.cId}`)
    .then(res => dispatch({
      type: GET_SINGLE_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setPostLoading = () => { 
 return { type: SET_POST_LOADING }
}