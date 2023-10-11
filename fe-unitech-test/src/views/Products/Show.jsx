import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../../api';
import LayoutDefault from '../../layouts/Default';

export default function ProductShow() {
  document.title = 'Show Product - Unitech Test';

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
                  <i className="fa fa-folder"></i> Show Product
                </h6>
                <hr />
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Code</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter Product Code"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Name</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Product Link</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={product_url}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="Enter Product Link"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input
                      disabled
                      type="number"
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter Stock"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input
                      disabled
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <select
                      disabled
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
                  <div className="mb-3">
                    <label className="form-label fw-bold">Images</label>
                    <select
                      disabled
                      className="form-select"
                      value={imageId}
                      onChange={(e) => setImageId(e.target.value)}
                    >
                      <option value="">-- Select Image --</option>
                      {images.map((image) => (
                        <option value={image.id} key={image.id}>
                          http://127.0.0.1:8081{image.original}
                        </option>
                      ))}
                    </select>
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
