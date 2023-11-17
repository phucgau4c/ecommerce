import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const token = localStorage.getItem('token');
  const auth = JSON.parse(localStorage.getItem('auth'));
  const cart = JSON.parse(localStorage.getItem('cart'));
  const wishList = JSON.parse(localStorage.getItem('wishlist'));
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [cartProduct, setCartProduct] = useState(cart ? cart : {});
  const [wishListProducts, setWishListProducts] = useState(
    wishList.length > 0 ? wishList : []
  );

  const MAIN_URL = 'http://localhost/laravel8/public';

  useEffect(function () {
    getBrand();
  }, []);

  useEffect(
    function () {
      localStorage.setItem('cart', JSON.stringify(cartProduct));
    },
    [cartProduct]
  );

  useEffect(
    function () {
      localStorage.setItem('wishlist', JSON.stringify(wishListProducts));
    },
    [wishListProducts]
  );

  async function getBrand() {
    try {
      const res = await axios.get(`${MAIN_URL}/api/category-brand`);
      const data = await res.data;
      setBrands(data.brand);
      setCategory(data.category);
    } catch (error) {}
  }

  function handleCart(id, qty = 1) {
    setCartProduct((cart) => ({
      ...cart,
      [id]: qty + (cart[id] ? cart[id] : 0),
    }));
  }

  function handleDecreseCart(id, setCartDetail, qty = 1) {
    if (parseInt(cartProduct[id]) <= 0) {
      handleDeleteCart(id, setCartDetail);
      return;
    }
    setCartProduct((cart) => ({
      ...cart,
      [id]: (cart[id] ? cart[id] : 0) - qty,
    }));
  }

  function handleDeleteCart(id, setCartDetail) {
    const products = { ...cartProduct };
    delete products[id];
    console.log(products);
    setCartProduct(products);
    setCartDetail((cart) =>
      cart.filter((product) => parseInt(product.id) !== parseInt(id))
    );
  }

  function handleWishList(id) {
    if (wishListProducts.length > 0) {
      const checkWishList = wishListProducts.some(
        (idProduct) => parseInt(idProduct) === parseInt(id)
      );
      if (!checkWishList) {
        setWishListProducts((prv) => [...prv, id]);
      }
    } else {
      setWishListProducts((prv) => [...prv, id]);
    }
  }

  function deleteWishList(id) {
    setWishListProducts((idProducts) =>
      idProducts.filter((idProduct) => parseInt(idProduct) !== parseInt(id))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        token,
        auth,
        brands,
        category,
        MAIN_URL,
        handleCart,
        cart,
        cartProduct,
        handleDecreseCart,
        handleDeleteCart,
        handleWishList,
        wishListProducts,
        deleteWishList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  const global = useContext(GlobalContext);
  if (global === undefined)
    throw new Error('This can only use in side provider');
  return global;
}

export { GlobalProvider, useGlobalContext };
