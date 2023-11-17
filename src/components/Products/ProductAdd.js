import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../context/GlobalContext';

function ProductAdd() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [isSale, setIsSale] = useState(false);
  const { token, brands, category, MAIN_URL } = useGlobalContext();

  const arrImgsCheck = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/PNGs',
    'image/JPG',
  ];

  function onSubmit(data) {
    if (data.image.length > 3) {
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

    console.log(checkFormatFile.every((check) => check === true));

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

    addProduct(data);
  }

  async function addProduct(data) {
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

        const res = await axios.post(
          `${MAIN_URL}/api/user/product/add`,
          formData,
          config
        );
        if (res.data.response === 'success') {
          alert('add product success');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSale() {
    setIsSale(!isSale);
  }

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>Create product</h2>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <input
            id="name"
            placeholder="Name"
            {...register('name', {
              required: { value: true, message: 'Name has not been entered' },
            })}
          />
          <span className="text-danger">{errors.name?.message}</span>
          <input
            type="number"
            defaultValue="0"
            placeholder="Price"
            {...register('price')}
          />
          <select
            name=""
            {...register('category', {
              required: { value: true, message: 'category must be choose' },
            })}
            placeholder="Please choose category"
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
            id=""
            {...register('status')}
            onChange={handleSale}
          >
            <option value="1">New</option>
            <option value="0">Sale</option>
          </select>

          {isSale && (
            <input type="number" defaultValue={0} {...register('sale')} />
          )}

          <input
            type="text"
            placeholder="Company Profile"
            {...register('companyProfile', {
              required: {
                value: true,
                message: 'company profile has not been entered',
              },
            })}
          />
          <span className="text-danger">{errors.companyProfile?.message}</span>

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

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Detail"
            {...register('detail', {
              required: { value: true, message: 'Detail has not been entered' },
            })}
          ></textarea>
          <span className="text-danger">{errors.detail?.message}</span>

          <button type="submit" className="btn btn-default">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;
