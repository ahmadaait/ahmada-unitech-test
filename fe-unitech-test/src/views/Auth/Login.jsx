import Cookies from 'js-cookie';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Api from '../../api';

export default function Login() {
  document.title = 'Login - Administartor';

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);

  const login = async (e) => {
    e.preventDefault();

    await Api.post('/api/v1/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        Cookies.set('access_token', response.data.access_token);

        Cookies.set('user', JSON.stringify(response.data.user));

        toast.success('Login Successfully!', {
          position: 'top-right',
          duration: 2000,
        });

        navigate('/dashboard');
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  if (Cookies.get('access_token')) {
    return navigate('/dashboard');
  }

  return (
    <div className="login-page bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1" style={{ marginTop: '120px' }}>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    {errors.message && (
                      <div className="alert alert-danger">{errors.message}</div>
                    )}
                    <form onSubmit={login} className="row g-4">
                      <div className="col-12">
                        <label>Email Address</label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fa fa-envelope"></i>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email Address"
                          />
                        </div>
                        {errors.email && (
                          <div className="alert alert-danger mt-2">
                            {errors.email[0]}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label>Password</label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fa fa-lock"></i>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                          />
                        </div>
                        {errors.password && (
                          <div className="alert alert-danger mt-2">
                            {errors.password[0]}
                          </div>
                        )}
                      </div>

                      <div className="col-sm-6 col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineFormCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineFormCheck"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-6 col-6">
                        <button
                          type="submit"
                          className="btn btn-tertiary px-4 float-end"
                        >
                          LOGIN
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 ps-0 d-none d-md-block">
                  <div className="form-right h-100 bg-tertiary text-white text-center pt-5">
                    <img
                      src="/assets/images/Code-Optimization.png"
                      width="150"
                      className="mb-3"
                    />
                    <h5 className="fs-3">UNITECH TEST</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
