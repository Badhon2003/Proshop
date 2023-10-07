import axios from 'axios'
import {
  BID_CREATE_SUCCESS,
  BID_CREATE_FAIL,
  BID_LIST_SUCCESS,
  BID_LIST_FAIL,
} from '../constants/bidConstants'
import { LOADING_FALSE, LOADING_TRUE } from '../constants/loaderConstants'

export const createBid = (bid, socketUpdater) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/bids`, bid, config)

    socketUpdater('product')

    dispatch({
      type: BID_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: BID_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const getBidList = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bids/${productId}`, config)

    dispatch({
      type: BID_LIST_SUCCESS,
      payload: data,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: BID_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}
