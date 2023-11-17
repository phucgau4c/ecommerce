import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../reducers/cartSlice';

function Cart() {
  const {
    cart,
    cartProduct,
    MAIN_URL,
    handleCart,
    handleDecreseCart,
    // handleDeleteCart,
  } = useGlobalContext();
  const [cartDetail, setCartDetail] = useState([]);

  const dispatch = useDispatch();
  const cartR = useSelector((state) => state);
  console.log(cartR);
  useEffect(function () {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const res = await axios.post(`${MAIN_URL}/api/product/cart`, cart);
      const data = await res.data.data;
      setCartDetail(data);
    } catch (error) {
      console.log(error);
    }
  }

  function totalPrice(id, price, sale = 0) {
    const productQty = Object.keys(cartProduct).find(
      (cartId) => parseInt(cartId) === parseInt(id)
    );

    const total = productQty ? +cartProduct[productQty] * price : 0;
    const discount = (total * sale) / 100;

    return total - discount;
  }

  function qty(id) {
    const productQty = Object.keys(cartProduct).find(
      (cartId) => parseInt(cartId) === parseInt(id)
    );
    return productQty ? cartProduct[productQty] : 0;
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id));
  }

  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description"></td>
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {cartDetail.map((product) => (
                <tr key={product.id}>
                  <td className="cart_product">
                    <Link>
                      <img
                        width="150px"
                        src={`${MAIN_URL}/upload/product/${product.id_user}/${
                          JSON.parse(product?.image)[0]
                        }`}
                        alt=""
                      />
                    </Link>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <Link>{product.name}</Link>
                    </h4>
                    <p>Web ID: {product.id}</p>
                  </td>
                  <td className="cart_price">
                    <p>${product.price}</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <Link
                        className="cart_quantity_up"
                        onClick={() => handleCart(product.id)}
                      >
                        +
                      </Link>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        value={qty(product.id)}
                        readOnly
                        size="2"
                      />
                      <Link
                        className="cart_quantity_down"
                        onClick={() =>
                          handleDecreseCart(product.id, setCartDetail)
                        }
                      >
                        -
                      </Link>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">
                      ${totalPrice(product.id, product.price, product.sale)}
                    </p>
                  </td>
                  <td className="cart_delete">
                    <Link
                      className="cart_quantity_delete"
                      onClick={() =>
                        // handleDeleteCart(product.id, setCartDetail)
                        handleDelete(product.id)
                      }
                    >
                      <i className="fa fa-times"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Cart;
