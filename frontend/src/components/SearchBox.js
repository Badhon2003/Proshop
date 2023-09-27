import React from 'react'
import { Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const searchHandler = (e) => {
    e.preventDefault()
    if (e.target.value.trim()) {
      history.push(`/search/${e.target.value.trim()}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form>
      <Form.Control
        type='text'
        size='sm'
        name='q'
        onChange={searchHandler}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
    </Form>
  )
}

export default SearchBox
