import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {
  listBids,
} from '../actions/bidActions'


const BidScreen = ({ history, match }) => {
  const pageNumber = match.params.page
  const dispatch = useDispatch()

  const { bids, error: bidListError, page, pages } = useSelector((state) => state.bidList)


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { loading } = useSelector((state) => state.loader)

  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    }
    dispatch(listBids('', pageNumber))
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
  ])

  useEffect(() => {
    console.log('bids list: ', bids)
  }, [bids])

  const getBidTime = (_createdDate) => {

    return ''
  }
  const getBidDate = (_createdDate) => {

    return ''
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Bids of <strong></strong></h1>
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
