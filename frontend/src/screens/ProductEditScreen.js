import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { useSocket } from '../contexts/SocketContext'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const { alertWithSocket } = useSocket()

  const [name, setName] = useState('')
  // const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { success: successUpdate, error: errorUpdate } = productUpdate

  const { loading } = useSelector((state) => state.loader)

  useEffect(() => {
    if (successUpdate) {
      console.log('successUpdate: ', successUpdate)
      dispatch({ type: PRODUCT_UPDATE_RESET })
      
      
      alertWithSocket('product')
      
      history.push('/admin/product-list')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setBrand(product.brand)
        setStatus(product.status)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, productId, history, product, successUpdate, productUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(image)
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        status,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      // console.log(data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }//to=
  return (
    <>
      <Button
        className='btn btn-light my-3'
        onClick={() => {
          const _from = localStorage.getItem('product-edit')
          localStorage.removeItem('product-edit')
          if (_from === 'from-profile') {
            history.push('/profile')
          } else {
            history.push('/admin/product-list')
          }
        }}
      >
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : errorUpdate ? (
          <Message variant='danger'>{errorUpdate}</Message>
        ) : (
          !loading && (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='rating'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as='select'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='Draft'>Draft</option>
                  <option value='Active'>Active</option>
                  <option value='Sold'>Sold</option>
                  <option value='Expired'>Expired</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Count In Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          )
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
