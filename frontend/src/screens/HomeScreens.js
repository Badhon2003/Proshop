import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreens = ({ match }) => {
  const keyword = match.params.keyword
  const pageFromQuery = match.params.page || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages } = productList

  const { loading } = useSelector((state) => state.loader)

  useEffect(() => {
    dispatch(listProducts(keyword, pageFromQuery))
  }, [dispatch, keyword, pageFromQuery])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {error ? (
        <h3>
          <Message variant='danger'>{error}</Message>
        </h3>
      ) : (
        !loading && (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )
      )}
    </>
  )
}

export default HomeScreens
