import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getActiveProducts,
  updateProductStatus,
  getMyProducts,
  getPurchasedProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, createProduct)
router.route('/active').get(getActiveProducts)
router.route('/my/:userId').get(getMyProducts)
router.route('/my-purchased/:userId').get(getPurchasedProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/status/:id').put(protect, updateProductStatus)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)

export default router
