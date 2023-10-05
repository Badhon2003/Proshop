import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listActiveProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import { useSocket } from '../contexts/SocketContext'

const HomeScreens = ({ match }) => {
  const keyword = match.params.keyword
  const pageFromQuery = match.params.page || 1

  const dispatch = useDispatch()
  const { alertWithSocket, updateKey, updateTime } = useSocket()

  const [updateTimeLocal, setUpdateTimeLocal] = useState('')
  

  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages } = productList

  const { loading } = useSelector((state) => state.loader)

  useEffect(() => {
    dispatch(listActiveProducts(keyword, pageFromQuery))
  }, [dispatch, keyword, pageFromQuery])

  useEffect(() => {
    if (updateTime !== updateTimeLocal && updateKey === 'product') {
      dispatch(listActiveProducts(keyword, pageFromQuery))
      setUpdateTimeLocal(updateTime)
    }
  }, [updateKey, updateTime])

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          {/* <ProductCarousel /> */}
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Active Products</h1>
      {error ? (
        <h3>
          <Message variant='danger'>{error}</Message>
        </h3>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            {!loading && products.length === 0 && (
              <Message variant='info'>No Product is available</Message>
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreens
