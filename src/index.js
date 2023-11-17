import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import Blog from './components/Blog';
import Detail from './components/Blog/Detail';
import NotFound404 from './components/Error/NotFound404';
import Home from './components/Home';
import Account from './components/Account';
import MemberAccount from './components/MemberAccount';
import Products from './components/Products';
import ProductAdd from './components/Products/ProductAdd';
import ProductEdit from './components/Products/ProductEdit';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart';
import WishList from './components/WishList';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Account />} />
            <Route path="/blog/list" element={<Blog />} />
            <Route path="/blog/details/:id" element={<Detail />} />
            <Route path="/account/update" element={<MemberAccount />} />
            <Route path="/account/product/list" element={<Products />} />
            <Route path="/account/product/add" element={<ProductAdd />} />
            <Route path="/account/product/edit/:id" element={<ProductEdit />} />
            <Route path="/product/detail/:id" element={<ProductDetails />} />
            <Route path="/product/cart" element={<Cart />} />
            <Route path="/product/wishlist" element={<WishList />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
