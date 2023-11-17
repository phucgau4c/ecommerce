import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import Modals from '../Modals';
import style from './ProductDetails.module.css';
import { useGlobalContext } from '../../context/GlobalContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [chooseImg, setChooseImg] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showDetail, setShowDetail] = useState(true);
  const { brands, MAIN_URL } = useGlobalContext();

  console.log(product);

  useEffect(function () {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setIsloading(true);
    try {
      const res = await axios.get(`${MAIN_URL}/api/product/detail/${id}`);
      const data = await res.data.data;
      setProduct(data);
      setChooseImg(JSON.parse(data.image)[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  function handleImg(img) {
    setChooseImg(img);
  }

  const handleClose = () => setShowImage(false);
  const handleShow = () => setShowImage(true);
  const handleShowDetail = () => setShowDetail(true);
  const handleHideDetail = () => setShowDetail(false);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Modals
        linkImg={`${MAIN_URL}/upload/product/${product.id_user}/${chooseImg}`}
        handleClose={handleClose}
        showImage={showImage}
      />
      <div className="col-sm-9 padding-right">
        <div className="product-details">
          <div className="col-sm-5">
            <div className="view-product">
              <img
                src={`${MAIN_URL}/upload/product/${product.id_user}/${chooseImg}`}
                alt=""
              />
              <Link onClick={handleShow}>
                <h3>ZOOM</h3>
              </Link>
            </div>
            <div
              id="similar-product"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="item active">
                  {Object.keys(product).length > 0 &&
                    JSON.parse(product.image).map((img, i) => (
                      <Link key={`img-${i}`} onClick={() => handleImg(img)}>
                        <img
                          width="90px"
                          src={`${MAIN_URL}/upload/product/${product.id_user}/${img}`}
                          alt=""
                        />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="product-information">
              <p className={`newarrival ${style.sale}`}>{`${
                product.sale ? `sale ${product.sale}%` : 'new'
              }`}</p>
              <h2>{product.name}</h2>
              <p>Web ID: {product.id}</p>
              <img src="images/product-details/rating.png" alt="" />
              <span>
                <span>US ${product.price}</span>
                <label>Quantity:</label>
                <input type="text" defaultValue="1" />
                <button type="button" className="btn btn-fefault cart">
                  <i className="fa fa-shopping-cart"></i>
                  Add to cart
                </button>
              </span>
              <p>
                <b>Availability:</b> In Stock
              </p>
              <p>
                <b>Condition:</b> {product.sale ? 'Sale' : 'New'}
              </p>
              <p>
                <b>Brand: </b>
                {brands &&
                  brands.find((brand) => brand.id === product.id_brand)?.brand}
              </p>
              <Link to="">
                <img
                  src="images/product-details/share.png"
                  className="share img-responsive"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="category-tab shop-details-tab">
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li className={showDetail && 'active'}>
                <Link onClick={handleShowDetail}>Details</Link>
              </li>
              <li className={!showDetail && 'active'}>
                <Link onClick={handleHideDetail}>Company Profile</Link>
              </li>
            </ul>
          </div>
          <div className="tab-content ">
            <div className="tab-pane fade active in">
              <div className="col-sm-3">
                <div>
                  {showDetail ? product.detail : product.company_profile}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recommended_items">
          <h2 className="title text-center">recommended items</h2>

          <div
            id="recommended-item-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/recommend3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="left recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="prev"
            >
              <i className="fa fa-angle-left"></i>
            </a>
            <a
              className="right recommended-item-control"
              href="#recommended-item-carousel"
              data-slide="next"
            >
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
