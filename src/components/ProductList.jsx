import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from '../redux/slices/redeemProductSlice';
import { toast } from 'react-toastify';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, pagination, loading } = useSelector((state) => state.redeem);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page }));
  }, [dispatch, page]);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id)).then(() => {
        toast.success('Product deleted');
      });
    }
  };

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setForm(product || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setForm({});
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct._id, formData })).then(() => {
        toast.success('Product updated');
        closeModal();
      });
    } else {
      dispatch(addProduct(formData)).then(() => {
        toast.success('Product added');
        closeModal();
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Product List</h4>
        <button className="btn btn-success" onClick={() => openModal()}>
          + Add Product
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name"
        value={search}
        onChange={handleSearch}
      />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price (₹)</th>
                <th>Required Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(page - 1) * pagination.limit + index + 1}</td>
                    <td>
                      <img
                        src={product.productImage || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
                        alt="product"
                        width="60"
                        height="60"
                        style={{ objectFit: 'cover', borderRadius: '6px' }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td style={{ maxWidth: '200px' }}>{product.description}</td>
                    <td>₹{product.price_value}</td>
                    <td>{product.requiredPoints}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(product)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="mt-2">Page {pagination.page} of {pagination.totalPages}</span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={page >= pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: '#00000088' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct ? 'Update Product' : 'Add Product'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name || ''}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={form.description || ''}
                    onChange={handleFormChange}
                    className="form-control"
                    rows="2"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    name="price_value"
                    value={form.price_value || ''}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Required Points</label>
                  <input
                    type="number"
                    name="requiredPoints"
                    value={form.requiredPoints || ''}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {selectedProduct ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
