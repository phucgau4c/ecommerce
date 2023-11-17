import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState('');
  const [dataUser, setDataUser] = useState();

  const arrImgsCheck = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/PNGs',
    'image/JPG',
  ];

  const url = 'http://localhost/laravel8/public/api/register';

  function onSubmit(data) {
    const file = data.avatar[0];
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

    setDataUser(data);
    if (Object.keys(errors).length === 0) {
      reset();
    }
  }

  useEffect(
    function () {
      if (img && dataUser && Object.keys(errors).length === 0) {
        dataUser.avatar = img;
        postData(dataUser);

        setImg('');
        setDataUser();
      }
    },
    [img, dataUser]
  );

  async function postData(data) {
    try {
      const res = await axios.post(`${url}`, data);
      console.log(res.data);
      if (res.data.errors) {
        for (const [key, value] of Object.entries(res.data.errors)) {
          setError(`${key}`, { type: `${key}`, message: value });
        }
      } else if (res.data.message === 'success') {
        alert(`dang ky thanh cong tai khoan ${res.data[0].name}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <input
            id="name"
            placeholder="Name"
            {...register('name', {
              required: { value: true, message: 'Name has not been entered' },
              minLength: { value: 6, message: 'name at least 6 character' },
            })}
          />

          <span className="text-danger">
            {errors.name?.type === 'required' && errors.name.message}
            {errors.name?.type === 'minLength' && errors.name.message}
          </span>

          <input
            id="email"
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: {
                value: true,
                message: 'Email has not been entered',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <span className="text-danger">
            {errors.email?.type === 'required' && errors.email.message}
            {errors.email?.type === 'pattern' && errors.email.message}
            {errors.email?.type === 'email' && errors.email.message}
          </span>

          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password has not been entered',
              },
              minLength: { value: 8, message: 'password at least 8 character' },
            })}
          />

          <span className="text-danger">
            {errors.password?.type === 'required' && errors.password.message}
            {errors.password?.type === 'minLength' && errors.password.message}
          </span>

          <input
            type="text"
            placeholder="Phone"
            {...register('phone', {
              required: { value: true, message: 'Phone has not been entered' },
              minLength: {
                value: 10,
                message: 'phone number has a minimum length of 10',
              },
            })}
          />
          <span className="text-danger">
            {errors.phone?.type === 'required' && errors.phone.message}
            {errors.phone?.type === 'minLength' && errors.phone.message}
          </span>
          <input
            type="text"
            placeholder="Address"
            {...register('address', {
              required: {
                value: true,
                message: 'Address has not been entered',
              },
            })}
          />

          <span className="text-danger">
            {errors.address?.type === 'required' && errors.address.message}
          </span>
          <input
            type="file"
            {...register('avatar', {
              required: { value: true, message: 'please choose one img' },
            })}
          />
          <span className="text-danger">
            {errors.avatar?.type === 'filetype' && errors.avatar.message}
            {errors.avatar?.type === 'required' && errors.avatar.message}
            {errors.avatar?.type === 'filesize' && errors.avatar.message}
          </span>
          <input
            type="hidden"
            name="level"
            defaultValue="0"
            {...register('level')}
          />
          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
