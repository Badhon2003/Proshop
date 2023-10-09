import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { createProduct, deleteProduct, listMyProducts, listPurchasedProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [tabKey, setTabKey] = useState('profile');//profile

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error: userDetailsError, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile
  
  const { purchasedProducts, error: purchasedProductsError } = useSelector((state) => state.productListPurchased)
  
  const { myProducts, error: myProductListError } = useSelector((state) => state.productListMy)

  const productDelete = useSelector((state) => state.productDelete)
  const { error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        // dispatch(listMyOrders())
        dispatch(listMyProducts(userInfo._id))
        dispatch(listPurchasedProducts(userInfo._id))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
    if (successCreate) {
      localStorage.setItem('product-edit', 'from-profile')
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [history, userInfo, dispatch, user.name, user.email, successCreate])


  useEffect(() => {
    console.log('myProducts: ', myProducts)
  }, [myProducts])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ is: user._id, name, email, password }))
    }
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure!')) {
      dispatch(deleteProduct(id))
    }
  }

  const getStatusColorClassName = (_status) => {
    let _class = ''
    if (_status === 'Active') {
      _class = 'text-success'
    }
    if (_status === 'Expired') {
      _class = 'text-warning'
    }

    if (_status === 'Sold') {
      _class = 'text-info'
    }

    return _class
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Tabs
        id="controlled-tab-example"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          {message && <Message variant='danger'>{message}</Message>}
          {userDetailsError && <Message variant='danger'>{userDetailsError}</Message>}
          {success && <Message variant='success'>Profile Updated!!</Message>}
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
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="my-products" title="My Products">
          <Row>
            <Col>
              <Row className='align-items-center'>
                <Col>
                  <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                  <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                  </Button>
                </Col>
              </Row>

              {myProductListError ? (
                <Message variant='danger'>{myProductListError}</Message>
              ) : errorDelete ? (
                <Message variant='danger'>{errorDelete}</Message>
              ) : errorCreate ? (
                <Message variant='danger'>{errorCreate}</Message>
              ) : (
                <>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm text-center'
                  >
                    <thead>
                      <tr>
                        {/* <th>ID</th> */}
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>STATUS</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myProducts.map((product) => (
                        <tr key={product._id}>
                          {/* <td>{product._id}</td> */}
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td className={getStatusColorClassName(product.status)}>{product.status}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>

                          <td>
                            <LinkContainer to={`/admin/bids/${product._id}`}>
                              <Button variant='light' className='btn-sm' onClick={() => localStorage.setItem('view-bids', 'from-profile')}>
                                <i className='fas fa-gavel'></i>
                              </Button>
                            </LinkContainer>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm' onClick={() => localStorage.setItem('product-edit', 'from-profile')}>
                                <i className='fas fa-edit'></i>
                              </Button>
                            </LinkContainer>
                            <Button
                              variant='danger'
                              className='btn-sm'
                              onClick={() => {
                                deleteHandler(product._id)
                              }}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
                </>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="purchased-products" title="Purchased Products">
          <Row>
            
            <Col>
              {purchasedProductsError ? (
                <Message variant='danger'>{purchasedProductsError}</Message>
              ) : (
                <>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm text-center'
                  >
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchasedProducts.map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                            <LinkContainer to={`/admin/bids/${product._id}`}>
                              <Button variant='light' className='btn-sm' onClick={() => localStorage.setItem('view-bids', 'from-profile')}>
                                <i className='fas fa-gavel'></i>
                              </Button>
                            </LinkContainer>
                            <LinkContainer to={`/product/${product._id}`}>
                              <Button variant='light' className='btn-sm' onClick={() => localStorage.setItem('product-details', 'from-profile')}>
                                <i className='fas fa-eye'></i>
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </Col>
          </Row>
        </Tab>
      </Tabs>
      
    </>
  )
}

export default ProfileScreen
