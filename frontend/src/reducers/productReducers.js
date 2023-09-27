import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_CLEAR,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return {
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }

    case PRODUCT_LIST_FAIL:
      return { error: action.payload }

    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_SUCCESS:
      return { product: action.payload }

    case PRODUCT_DETAILS_FAIL:
      return { error: action.payload }

    case PRODUCT_DETAILS_CLEAR:
      return { product: { reviews: [...state.product.reviews] } }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_SUCCESS:
      return { success: true }
    case PRODUCT_DELETE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_SUCCESS:
      return { success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_SUCCESS:
      return { success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_SUCCESS:
      return { products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
