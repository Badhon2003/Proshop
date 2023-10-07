import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreens from './screens/HomeScreens'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import { SocketProvider } from './contexts/SocketContext'

function App() {
  return (
    <Router>
        <SocketProvider>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            {/* <Route path='/cart/:id?' component={CartScreen} /> */}
            <Route path='/admin/user-list' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              path='/admin/product-list'
              component={ProductListScreen}
              exact
            />
            <Route
              path='/admin/product-list/:page'
              component={ProductListScreen}
              exact
            />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/order-list' component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreens} exact />
            <Route path='/page/:page' component={HomeScreens} exact />
            <Route
              path='/search/:keyword/page/:page'
              component={HomeScreens}
              exact
            />
            <Route path='/' component={HomeScreens} exact />
          </Container>
        </main>
        <Footer />
        </SocketProvider>
    </Router>
  )
}

export default App
