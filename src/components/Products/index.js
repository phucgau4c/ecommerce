import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const url = 'http://localhost/laravel8/public/api';
  const imgUrl = 'http://localhost/laravel8/public/upload';
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = localStorage.getItem('token');

  useEffect(function () {
    fectchProduct();
  }, []);

  async function fectchProduct() {
    setIsloading(true);
    try {
      const res = await axios.get(`${url}/product/list`);
      const data = await res.data.data.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  async function handleDelete(id) {
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      const res = await axios.get(`${url}/user/product/delete/${id}`, config);
      const data = await res.data;
      if (data.response === 'success') {
        alert('delete product success');
      }
      setProducts(Object.values(data.data));
    } catch (error) {}
  }

  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        {isLoading ? (
          <Loading />
        ) : (
          <table className="table table-condensed">
            <thead className="thead-light">
              <tr className="cart_menu">
                <td className="id">Id</td>
                <td className="Name">Name</td>
                <td className="image">Image</td>
                <td className="price">Price</td>
                <td className="action">Action</td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product) =>
                  parseInt(product.id_user) === parseInt(auth.id) && (
                    <tr key={product.id}>
                      <td className="product_id">{product.id}</td>
                      <td className="product_name">
                        <a href="http">{product.name}</a>
                      </td>
                      <td className="product_img">
                        <img
                          src={`${imgUrl}/product/${auth.id}/${
                            JSON.parse(product.image)[0]
                          }`}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </td>
                      <td className="product_price">
                        <p>${product.price}</p>
                      </td>
                      <td className="product_delete">
                        <Link
                          onClick={() => handleDelete(product.id)}
                          className="cart_quantity_delete"
                          style={{ marginRight: '10px' }}
                        >
                          <i className="fa fa-times"></i>
                        </Link>
                        <Link
                          to={`/account/product/edit/${product.id}`}
                          className="product_edit"
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
        <Link to="/account/product/add">Add product</Link>
      </div>
    </div>
  );
}

export default Products;
