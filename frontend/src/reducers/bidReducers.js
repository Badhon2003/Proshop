import {
  BID_CREATE_SUCCESS,
  BID_CREATE_FAIL,
  BID_LIST_SUCCESS,
  BID_LIST_FAIL,
  BID_LIST_RESET,
  BID_CREATE_RESET,
} from '../constants/bidConstants'

export const bidCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_CREATE_SUCCESS:
      return {
        success: true,
        bid: action.payload,
      }

    case BID_CREATE_FAIL:
      return {
        error: action.payload,
      }
  
    case BID_CREATE_RESET:
      return {}
      
    default:
      return state
  }
}


export const bidListReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LIST_SUCCESS:
      return {
        bids: action.payload,
      }
    case BID_LIST_FAIL:
      return {
        error: action.payload,
      }
    case BID_LIST_RESET:
      return {
        bids: [],
      }
    default:
      return state
  }
}