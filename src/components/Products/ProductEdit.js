import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

function ProductEdit() {
  const { id } = useParams();
  const url = 'http://localhost/laravel8/public/api';
  const imgUrl = 'http://localhost/laravel8/public/upload';
  const token = localStorage.getItem('token');
  const auth = JSON.parse(localStorage.getItem('auth'));
  const [product, setProduct] = useState();
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);
  const [isSale, setIsSale] = useState(false);
  const [imagesDelete, setImagesDelete] = useState([]);
  const totalImage = product?.image.filter(
    (img) => !imagesDelete.includes(img)
  );
  // console.log(product.id);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const arrImgsCheck = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/PNGs',
    'image/JPG',
  ];

  useEffect(function () {
    fetchProduct();
    getBrand();
  }, []);

  function onSubmit(data) {
    const numberOfImage = data.image.length + totalImage.length;
    if (numberOfImage > 3) {
      setError('image', {
        type: 'lengthOfImage',
        message: 'the number of image must be less than 3',
      });

      return;
    }

    const files = data.image;
    const sizeOfImage = 1024 * 1024;

    const checkFormatFile = Object.keys(files).map((file) => {
      return arrImgsCheck.includes(files[file].type);
    });

    const checkSizeFile = Object.keys(files).map((file) => {
      return files[file].size <= sizeOfImage;
    });

    if (!checkFormatFile.every((check) => check === true)) {
      setError('image', { type: 'filetype', message: 'only img are valid' });
      return;
    } else if (!checkSizeFile.every((check) => check === true)) {
      setError('image', {
        type: 'filesize',
        message: 'the image is too large required < 1mb',
      });
      return;
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    editProduct(data);
  }

  async function fetchProduct() {
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      const res = await axios.get(`${url}/user/product/${id}`, config);
      const data = await res.data;
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBrand() {
    try {
      const res = await axios.get(`${url}/category-brand`);
      const data = await res.data;
      setBrands(data.brand);
      setCategory(data.category);
    } catch (error) {}
  }

  async function editProduct(data) {
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      if (data) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('brand', data.brand);
        formData.append('company', data.companyProfile);
        formData.append('detail', data.detail);
        formData.append('status', data.status);
        formData.append('sale', data.sale);

        Object.keys(data.image).map((item) => {
          formData.append('file[]', data.image[item]);
        });

        imagesDelete.map((image) => {
          formData.append('avatarCheckBox[]', image);
        });

        const res = await axios.post(
          `${url}/user/product/update/${product.id}`,
          formData,
          config
        );
        if (res.data.response === 'success') {
          alert('edit product success');
        }
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSale(e) {
    if (parseInt(e.target.value) === 0) setIsSale(true);
    else if (parseInt(e.target.value) === 1) setIsSale(false);
  }

  function handleChecked(e, img) {
    if (e.target.checked) {
      setImagesDelete((imgs) => [...imgs, img]);
    } else if (!e.target.checked) {
      setImagesDelete((imgs) => imgs.filter((image) => image !== img));
    }
  }

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>Edit Product</h2>
        {product && (
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <input
              id="name"
              placeholder="Name"
              defaultValue={product.name}
              {...register('name', {
                required: { value: true, message: 'Name has not been entered' },
              })}
            />
            <span className="text-danger">{errors.name?.message}</span>
            <input
              type="number"
              defaultValue={product.price}
              placeholder="Price"
              {...register('price')}
            />
            <select
              name=""
              {...register('category', {
                required: { value: true, message: 'category must be choose' },
              })}
              placeholder="Please choose category"
              defaultValue={product.id_category}
            >
              <option value="">Please choose category</option>
              {category.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.category}
                </option>
              ))}
            </select>
            <span className="text-danger">{errors.category?.message}</span>

            <select
              name=""
              defaultValue={product.id_brand}
              {...register('brand', {
                required: { value: true, message: 'brand must be choose' },
              })}
              placeholder="Please choose brand"
            >
              <option value="">Please choose brand</option>
              {brands.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.brand}
                </option>
              ))}
            </select>
            <span className="text-danger">{errors.brand?.message}</span>

            <select
              name="status"
              defaultValue={product.status}
              id=""
              {...register('status')}
              onChange={handleSale}
            >
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>

            {(isSale || parseInt(product.status) === 0) && (
              <input
                type="number"
                defaultValue={product.sale}
                {...register('sale')}
              />
            )}

            <input
              type="text"
              defaultValue={product.company_profile}
              placeholder="Company Profile"
              {...register('companyProfile', {
                required: {
                  value: true,
                  message: 'company profile has not been entered',
                },
              })}
            />
            <span className="text-danger">
              {errors.companyProfile?.message}
            </span>

            <input
              type="file"
              multiple
              {...register('image', {
                required: {
                  value: true,
                  message: 'image has not been uploaded',
                },
              })}
            />
            <span className="text-danger">{errors.image?.message}</span>

            <div style={{ width: '200px', display: 'flex', flexWrap: 'wrap' }}>
              {product.image?.map((img, i) => (
                <span key={`img-${i}`} style={{ marginRight: '10px' }}>
                  <img
                    width="40px"
                    height="40px"
                    src={`${imgUrl}/product/${auth.id}/${img}`}
                    alt=""
                  />
                  <input
                    type="checkbox"
                    onChange={(e) => handleChecked(e, img)}
                  />
                </span>
              ))}
            </div>

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Detail"
              defaultValue={product.detail}
              {...register('detail', {
                required: {
                  value: true,
                  message: 'Detail has not been entered',
                },
              })}
            ></textarea>
            <span className="text-danger">{errors.detail?.message}</span>

            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductEdit;
