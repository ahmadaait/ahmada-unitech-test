import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../api';
import LayoutDefault from '../../layouts/Default';

export default function CategoryEdit() {
  document.title = 'Edit Category - Unitech Test';

  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState('');
  const [errors, setErros] = useState([]);

  const access_token = Cookies.get('access_token');

  const fetchDataCategory = async () => {
    await Api.get(`/api/v1/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setName(response.data.data.name);
    });
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('_method', 'PUT');

    await Api.post(`/api/v1/categories/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'content-type': 'multipart/form-data',
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-right',
          duration: 2000,
        });

        navigate('/categories');
      })
      .catch((error) => {
        setErros(error.response.data);
      });
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/categories"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-folder"></i> Edit Category
                </h6>
                <hr />
                <form onSubmit={updateCategory}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Category Name"
                    />
                  </div>
                  {errors.name && (
                    <div className="alert alert-danger">{errors.name[0]}</div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-tertiary me-2"
                    >
                      <i className="fa fa-save"></i> Update
                    </button>
                    <button type="reset" className="btn btn-md btn-warning">
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
