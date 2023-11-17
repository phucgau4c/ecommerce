import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

function WishList() {
  const [wishList, setWishList] = useState([]);
  const { MAIN_URL, wishListProducts, deleteWishList, handleCart } =
    useGlobalContext();
  const filterProduct = wishListProducts.map((idProduct) =>
    wishList.filter((product) => parseInt(product.id) === parseInt(idProduct))
  );

  const listProduct = [].concat(...filterProduct);

  useEffect(function () {
    getWishlist();
  }, []);

  async function getWishlist() {
    try {
      const res = await axios.get(`${MAIN_URL}/api/product/wishlist`);
      const data = await res.data.data;
      setWishList(data);
    } catch (error) {}
  }

  // console.log(wishList);
  // console.log(wishListProducts);
  // console.log(listProduct);

  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Features Items</h2>

        {/* code here */}
        {listProduct.map((product) => (
          <div key={product.id} className="col-sm-4">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    src={`${MAIN_URL}/upload/product/${product.id_user}/${
                      JSON.parse(product.image)[0]
                    }`}
                    alt=""
                  />
                  <h2>${product.price}</h2>
                  <p>{product.name}</p>
                  <Link className="btn btn-default add-to-cart">
                    <i className="fa fa-shopping-cart"></i>Add to cart
                  </Link>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${product.price}</h2>
                    <p>{product.name}</p>
                    <Link
                      className="btn btn-default add-to-cart"
                      onClick={() => handleCart(product.id)}
                    >
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link onClick={() => deleteWishList(product.id)}>
                      <i className="fa fa-minus-square"></i>Delete
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
