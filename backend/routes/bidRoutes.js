import express from 'express'
import {
  createBid,
  getBidByProductId,
} from '../controllers/bidController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createBid)
router.route('/:productId').post(protect, getBidByProductId)

export default router
