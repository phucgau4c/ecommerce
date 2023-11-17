import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const url = 'http://localhost/laravel8/public/api/login';
  const navigate = useNavigate();

  function onSubmit(data) {
    handleLogin(data);
    if (Object.keys(errors).length) console.log(typeof errors);
  }

  async function handleLogin(data) {
    try {
      const res = await axios.post(`${url}`, data);
      if (res.data.success) {
        localStorage.setItem('auth', JSON.stringify(res.data.Auth));
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }

      if (res.data.errors && Object.keys(errors) !== 0) {
        for (const [, value] of Object.entries(res.data.errors)) {
          setError(`password`, { type: `password`, message: value });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Login to your account</h2>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
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
          <span className="text-danger">{errors.email?.message}</span>
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
          <span className="text-danger">{errors.password?.message}</span>
          <input type="hidden" defaultValue="0" {...register('level')} />
          <p></p>
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
