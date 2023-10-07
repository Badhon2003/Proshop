import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Bid from '../models/bidModel.js'

// @desc    Fetch all Produts
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.page) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all Active Produts
// @route   GET /api/products/active
// @access  Public
const getActiveProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.page) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword, status: 'Active' })
  const products = await Product.find({ ...keyword, status: 'Active' })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single Produts
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})


// @desc    GET logged in user products
// @route   GET /api/products/my
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
  console.log('req.params: ', req.params)
  const products = await Product.find({ user: req.params.userId })
  // console.log('products: ', products)
  res.json(products)
})

// @desc    GET logged in user products
// @route   GET /api/products/my
// @access  Private
const getPurchasedProducts = asyncHandler(async (req, res) => {
  console.log('req.params: ', req.params)
  const products = await Product.find({ status: 'Sold' })
  const _filteredProducts = []
  for (const product of products) {
    const lastBid = await Bid.findOne({ product: product._id }).sort('-price')
    
    if (lastBid && lastBid.user.toString() === req.params.userId) {
      _filteredProducts.push(product)
    }
  }
  
  // console.log('products: ', products)
  res.json(_filteredProducts)
})

// @desc    DELETE a single product
// @route   GET /api/products/:id
// @access  private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

// @desc    create a single product
// @route   POST /api/products
// @access  private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Sample brand',
    status: 'Draft',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    update a single product
// @route   put /api/products/:id
// @access  private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    brand,
    status,
    category,
    countInStock,
  } = req.body

  console.log('req.body: ', req.body)

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.status = status
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    req.status(404)
    throw new Error('Product not found')
  }
})

// @desc    update a single product
// @route   put /api/products/status/:id
// @access  private/Admin
const updateProductStatus = asyncHandler(async (req, res) => {
  const {
    status,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.status = status

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    req.status(404)
    throw new Error('Product not found')
  }
})

// @desc    CREATE new review
// @route   post /api/products/:id/reviews
// @access  private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewd')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    req.status(404)
    throw new Error('Product not found')
  }
})

// @desc    GET Top Rated Products
// @route   post /api/products/top
// @access  public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getMyProducts,
  updateProductStatus,
  getPurchasedProducts,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getActiveProducts
}
