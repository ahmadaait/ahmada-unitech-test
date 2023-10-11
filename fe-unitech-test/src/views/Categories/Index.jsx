import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Api from '../../api';
import Pagination from '../../components/Pagination';
import LayoutDefault from '../../layouts/Default';

export default function CategoriesIndex() {
  document.title = 'Categories - Unitech Test';

  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState('');

  const access_token = Cookies.get('access_token');

  const fetchData = async (pageNumber = 1, keywords = '') => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/v1/categories?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setCategories(response.data.data.data);

      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = async (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  const deleteCategory = (id) => {
    confirmAlert({
      title: 'Are You Sure ?',
      message: 'want to delete this data ?',
      buttons: [
        {
          label: 'YES',
          onClick: async () => {
            await Api.delete(`/api/v1/categories/${id}`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }).then((response) => {
              toast.success(response.data.message, {
                position: 'top-right',
                duration: 2000,
              });

              fetchData();
            });
          },
        },
        {
          label: 'NO',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 col-12 mb-2">
                <Link
                  to="/categories/create"
                  className="btn btn-md btn-tertiary border-0 shadow w-100"
                  type="button"
                >
                  <i className="fa fa-plus-circle"></i> Add New
                </Link>
              </div>
              <div className="col-md-9 col-12 mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 shadow"
                    onChange={(e) => searchData(e)}
                    placeholder="search here..."
                  />
                  <span className="input-group-text border-0 shadow">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-centered mb-0 rounded">
                    <thead className="thead-dark">
                      <tr className="border-0">
                        <th className="border-0" style={{ width: '5%' }}>
                          No.
                        </th>
                        <th className="border-0 text-center">Category Name</th>
                        <th
                          className="border-0 text-center"
                          style={{ width: '15%' }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <tr key={index}>
                            <td className="fw-bold text-center">
                              {++index +
                                (pagination.currentPage - 1) *
                                  pagination.perPage}
                            </td>
                            <td className="text-center">{category.name}</td>
                            <td className="text-center">
                              <Link
                                to={`/categories/edit/${category.id}`}
                                className="btn btn-primary btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt"></i>
                              </Link>

                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={12}>
                            <div
                              className="alert alert-danger border-0 rounded shadow-sm w-100"
                              role="alert"
                            >
                              Data Belum Tersedia!.
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={pagination.currentPage}
                  perPage={pagination.perPage}
                  total={pagination.total}
                  onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                  position="end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
