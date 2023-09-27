import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return { user: action.payload }
    case USER_DETAILS_FAIL:
      return { error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }

    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_SUCCESS:
      return { success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return { users: action.payload }
    case USER_LIST_FAIL:
      return { error: action.payload }
    case USER_LIST_RESET:
      return { user: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_SUCCESS:
      return { success: true }
    case USER_DELETE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return { success: true }
    case USER_UPDATE_FAIL:
      return { error: action.payload }
    case USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}
