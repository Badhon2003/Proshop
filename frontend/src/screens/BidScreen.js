import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {
  getBidList,
} from '../actions/bidActions'
import { listProductDetails } from '../actions/productActions'


const BidScreen = ({ history, match }) => {
  const productId = match.params.id
  const dispatch = useDispatch()

  const { bids, error: bidListError, page, pages } = useSelector((state) => state.bidList)

  const productDetails = useSelector((state) => state.productDetails)
  const { error: productError, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { loading } = useSelector((state) => state.loader)

  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    }
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
      dispatch(getBidList(productId))
    }
    
  }, [
    dispatch,
    history,
    userInfo,
    productId
  ])

  useEffect(() => {
    console.log('bids list: ', bids)
  }, [bids])

  const getBidTime = (_createdDate) => {
    const date = new Date(_createdDate)

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    
    return date.toLocaleTimeString('en-US', options)
  }
  const getBidDate = (_createdDate) => {
    const date = new Date(_createdDate);

    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    return date.toLocaleDateString('en-US', options)
  }

  return (
    <>
      <Button
        className='btn btn-light my-3'
        onClick={() => {
          const _from = localStorage.getItem('view-bids')
          localStorage.removeItem('view-bids')
          if (_from === 'from-profile') {
            history.push('/profile')
          } else if (_from === 'from-admin-product-list') {
            history.push('/admin/product-list')
          } else {
            history.push('/')
          }
        }}
      >
        Go Back
      </Button>
      <Row className='align-items-center'>
        <Col>
          <h1>Bids of <strong className='text-info'>{product?.name || ''}</strong></h1>
        </Col>
      </Row>
      {bidListError ? (
        <Message variant='danger'>{bidListError}</Message>
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
                <th>USER NAME</th>
                <th>PRICE</th>
                <th>DATE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid._id}>
                  <td>{bid.user?.name || ''}</td>
                  <td>${bid.price}</td>
                  <td>{getBidDate(bid.createdAt)}</td>
                  <td>{getBidTime(bid.createdAt)}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default BidScreen
