import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';

function MemberAccount() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [dataUser, setDataUser] = useState();
  const [img, setImg] = useState('');
  // {
  //   name: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   address: '',
  //   avatar: '',
  // }

  const arrImgsCheck = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/PNGs',
    'image/JPG',
  ];

  const url = 'http://localhost/laravel8/public/api';

  useEffect(function () {
    if (!auth) navigate('/login');
  }, []);

  useEffect(
    function () {
      if (img && dataUser && Object.keys(errors).length === 0) {
        dataUser.avatar = img;
        if (typeof dataUser.avatar === 'string') {
          updateAccount(parseInt(auth.id), dataUser);
        }
      } else if (dataUser && Object.keys(errors).length === 0) {
        if (typeof dataUser.avatar === 'string') {
          updateAccount(parseInt(auth.id), dataUser);
        }
      }
    },
    [img, dataUser, errors]
  );

  async function updateAccount(id, data) {
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
        formData.append('id', id);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('avatar', data.avatar);
        const res = await axios.post(
          `${url}/user/update/${id}`,
          formData,
          config
        );
        console.log(res);
        if (res.data.response === 'success') {
          localStorage.setItem('auth', JSON.stringify(res.data.Auth));
          localStorage.setItem('token', res.data.token);
          alert('cap nhat thanh cong');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit(data) {
    const file = data.avatar[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImg(reader.result);
      };

      if (!arrImgsCheck.includes(file.type)) {
        setError('avatar', { type: 'filetype', message: 'only img are valid' });
        return;
      } else if (file.size > 1024 * 1024) {
        setError('avatar', {
          type: 'filesize',
          message: 'the image is too large required < 1mb',
        });
        return;
      }
    } else {
      data.avatar = auth.avatar;
    }
    setDataUser(data);
  }

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>Update Account</h2>
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            id="name"
            defaultValue={auth.name}
            {...register('name', {
              required: { value: true, message: 'Name has not been entered' },
              minLength: { value: 6, message: 'name at least 6 character' },
            })}
          />

          <span className="text-danger">{errors.name?.message}</span>

          <input
            readOnly
            id="email"
            type="email"
            defaultValue={auth.email}
            {...register('email')}
          />

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />

          <input
            type="text"
            defaultValue={auth.phone}
            {...register('phone', {
              required: { value: true, message: 'Phone has not been entered' },
              minLength: {
                value: 10,
                message: 'phone number has a minimum length of 10',
              },
            })}
          />
          <span className="text-danger">{errors.phone?.message}</span>
          <input
            type="text"
            defaultValue={auth.address}
            {...register('address', {
              required: {
                value: true,
                message: 'Address has not been entered',
              },
            })}
          />

          <span className="text-danger">{errors.address?.message}</span>
          <input type="file" {...register('avatar')} />
          <span className="text-danger">{errors.avatar?.message}</span>
          <input
            type="hidden"
            name="level"
            defaultValue="0"
            {...register('level')}
          />
          <button type="submit" className="btn btn-default">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberAccount;
