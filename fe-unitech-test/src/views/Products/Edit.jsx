import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../api';
import LayoutDefault from '../../layouts/Default';

export default function ProductEdit() {
  document.title = 'Edit Product - Unitech Test';

  const navigate = useNavigate();

  const { id } = useParams();

  const [code, setCode] = useState(0);
  const [name, setName] = useState('');
  const [product_url, setProductUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [imageId, setImageId] = useState('');
  const [errors, setErros] = useState([]);

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const access_token = Cookies.get('access_token');

  const fetchDataCategories = async () => {
    await Api.get('/api/v1/categories', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setCategories(response.data.data.data);
    });
  };

  const fetchDataImages = async () => {
    await Api.get('/api/v1/images', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setImages(response.data.data.data);
    });
  };

  const fetchDataProduct = async () => {
    await Api.get(`/api/v1/products/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setCode(response.data.data.code);
      setName(response.data.data.name);
      setProductUrl(response.data.data.product_url);
      setStock(response.data.data.stock);
      setPrice(response.data.data.price);
      setCategoryId(response.data.data.category_id);
      setImageId(response.data.data.image_id);
    });
  };

  useEffect(() => {
    fetchDataCategories();
    fetchDataImages();
    fetchDataProduct();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('code', code);
    formData.append('name', name);
    formData.append('product_url', product_url);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('category_id', categoryId);
    formData.append('image_id', imageId);
    formData.append('_method', 'PUT');

    await Api.post(`/api/v1/products/${id}`, formData, {
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

        navigate('/products');
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
              to="/products"
              className="btn btn-md btn-tertiary border-0 shadow mb-3"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <div className="card border-0 shadow">
              <div className="card-body">
                <h6>
                  <i className="fa fa-folder"></i> Edit Product
                </h6>
                <hr />
                <form onSubmit={updateProduct}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter Product Code"
                    />
                  </div>
                  {errors.code && (
                    <div className="alert alert-danger">{errors.code[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Product Name"
                    />
                  </div>
                  {errors.name && (
                    <div className="alert alert-danger">{errors.name[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Link</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product_url}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="Enter Product Link"
                    />
                  </div>
                  {errors.product_url && (
                    <div className="alert alert-danger">
                      {errors.product_url[0]}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter Stock"
                    />
                  </div>
                  {errors.stock && (
                    <div className="alert alert-danger">{errors.stock[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter Price"
                    />
                  </div>
                  {errors.price && (
                    <div className="alert alert-danger">{errors.price[0]}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <select
                      className="form-select"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category_id && (
                    <div className="alert alert-danger">
                      {errors.category_id[0]}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Images</label>
                    <select
                      className="form-select"
                      value={imageId}
                      onChange={(e) => setImageId(e.target.value)}
                    >
                      <option value="">-- Select Image --</option>
                      {images.map((image) => (
                        <option value={image.id} key={image.id}>
                          {image.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.image_id && (
                    <div className="alert alert-danger">
                      {errors.image_id[0]}
                    </div>
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
