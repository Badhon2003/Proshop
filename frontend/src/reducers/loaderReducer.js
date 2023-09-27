import { LOADING_TRUE, LOADING_FALSE } from '../constants/loaderConstants'

export const loadingReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOADING_TRUE:
      return { loading: true }

    case LOADING_FALSE:
      return { loading: false }
    default:
      return state
  }
}
