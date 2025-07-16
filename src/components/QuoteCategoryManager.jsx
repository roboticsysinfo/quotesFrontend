import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuoteCategories,
  createQuoteCategory,
  deleteQuoteCategory,
  updateQuoteCategory,
} from '../redux/slices/quoteCategorySlice';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function QuoteCategoryManager() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.quoteCategories);

  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchQuoteCategories());
  }, [dispatch]);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    if (editMode) {
      const result = await dispatch(updateQuoteCategory({ id: editId, name: categoryName }));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Category updated');
        setShowModal(false);
        resetModal();
      } else {
        toast.error(result.payload || 'Failed to update category');
      }
    } else {
      const result = await dispatch(createQuoteCategory({ name: categoryName }));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Category added');
        setShowModal(false);
        resetModal();
      } else {
        toast.error(result.payload || 'Failed to create category');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteQuoteCategory(id));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Category deleted');
    } else {
      toast.error(result.payload || 'Delete failed');
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id);
    setCategoryName(cat.name);
    setShowModal(true);
  };

  const resetModal = () => {
    setCategoryName('');
    setEditId(null);
    setEditMode(false);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">All Categories</h4>
        <Button variant="primary" onClick={() => { resetModal(); setShowModal(true); }}>
          Add Category
        </Button>
      </div>

      {/* Category List */}
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length ? (
          categories.map((cat) => (
            <div className="col-md-4 mb-3" key={cat._id}>
              <div className="card shadow-sm bg-light">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <strong>{cat.name}</strong>
                  <div className="d-flex gap-2">
                    <FaEdit
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(cat)}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(cat._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuoteCategoryManager;
