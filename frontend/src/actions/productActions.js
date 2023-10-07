import axios from 'axios'
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ACTIVE_LIST_SUCCESS,
  PRODUCT_ACTIVE_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_CLEAR,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_MY_LIST_SUCCESS,
  PRODUCT_MY_LIST_FAIL,
  PRODUCT_PURCHASED_LIST_SUCCESS,
  PRODUCT_PURCHASED_LIST_FAIL
} from '../constants/productConstants'
import { LOADING_FALSE, LOADING_TRUE } from '../constants/loaderConstants'

export const listProducts = (keyword = '', page = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_CLEAR })
    dispatch({ type: LOADING_TRUE })
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&page=${page}`
    )

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const listActiveProducts = (keyword = '', page = '') => async (dispatch) => {
  console.log('listActiveProducts called')
  try {
    dispatch({ type: PRODUCT_DETAILS_CLEAR })
    dispatch({ type: LOADING_TRUE })
    const { data } = await axios.get(
      `/api/products/active?keyword=${keyword}&page=${page}`
    )

    dispatch({ type: PRODUCT_ACTIVE_LIST_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTIVE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const listMyProducts = (userId) => async (dispatch, getState) => {
  
  try {
    dispatch({ type: LOADING_TRUE })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/products/my/${userId}`, config
    )

    console.log('myproducts data: ', data)

    dispatch({ type: PRODUCT_MY_LIST_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const listPurchasedProducts = (userId) => async (dispatch, getState) => {
  
  try {
    dispatch({ type: LOADING_TRUE })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/products/my-purchased/${userId}`, config
    )

    console.log('myproducts data: ', data)

    dispatch({ type: PRODUCT_PURCHASED_LIST_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_PURCHASED_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRUE })
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
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

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const createProduct = () => async (dispatch, getState) => {
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

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
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

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const updateProductStatus = (productId, productStatus) => async (dispatch, getState) => {
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

    const { data } = await axios.put(
      `/api/products/status/${productId}`,
      { status: productStatus },
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
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

    await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_CLEAR })
    dispatch({ type: LOADING_TRUE })
    const { data } = await axios.get(`/api/products/top`)

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
    dispatch({ type: LOADING_FALSE })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    dispatch({ type: LOADING_FALSE })
  }
}
