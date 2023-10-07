import asyncHandler from 'express-async-handler'
import Bid from '../models/bidModel.js'
import Product from '../models/productModel.js'

// @desc    Fetch bids by product Id
// @route   GET /api/bids/:productId
// @access  Public
const getBidByProductId = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ product: req.params.productId })
  if (bids) {
    res.json(bids)
  } else {
    res.status(404)
    throw new Error('Bid not found.')
  }
})

// @desc    DELETE a single bid
// @route   GET /api/bids/:id
// @access  private/Admin
const deleteBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)
  if (bid) {
    await bid.remove()
    res.json({ message: 'Bid Removed' })
  } else {
    res.status(404)
    throw new Error('Bid not found.')
  }
})

// @desc    create a single bid
// @route   POST /api/bids
// @access  private/Admin
const createBid = asyncHandler(async (req, res) => {
  const {
    price,
    product,
    user
  } = req.body

  if (price && product && user) {
    const bid = new Bid(req.body)
    const createdBid = await bid.save()

    const productF = await Product.findById(product)

    if (productF) {
      productF.price = price
    }
    
    await productF.save()

    res.status(201).json(createdBid)
  } else {
    res.status(403)
    throw new Error('Required properties not provided.')
  }

})


export {
  getBidByProductId,
  createBid
}