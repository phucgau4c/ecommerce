import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

function MenuLeft() {
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = 'http://localhost/laravel8/public';

  useEffect(function () {
    getBrand();
  }, []);

  async function getBrand() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}/api/category-brand`);
      const data = await res.data;
      setBrands(data.brand);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
          {category.map((el) => (
            <div key={el.id} className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link>{el.category}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="brands_products">
          <h2>Brands</h2>
          <div className="brands-name">
            <ul className="nav nav-pills nav-stacked">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link>
                    <span className="pull-right"></span>
                    {brand.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="price-range">
          <h2>Price Range</h2>
          <div className="well">
            <input
              type="text"
              className="span2"
              // value=""
              data-slider-min="0"
              data-slider-max="600"
              data-slider-step="5"
              data-slider-value="[250,450]"
              id="sl2"
            />
            <br />
            <b>$ 0</b> <b className="pull-right">$ 600</b>
          </div>
        </div>

        <div className="shipping text-center">
          <img src="images/home/shipping.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MenuLeft;
