import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuoteImages,
  deleteQuoteImage,
  clearImageMessages,
} from '../redux/slices/quoteImageSlice';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const QuoteImageManager = () => {
  const dispatch = useDispatch();
  const { images, loading, error, successMessage } = useSelector((state) => state.quoteImages);

  useEffect(() => {
    dispatch(fetchQuoteImages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearImageMessages());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearImageMessages());
    }
  }, [error, successMessage, dispatch]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this image?');
    if (confirm) {
      dispatch(deleteQuoteImage(id));
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">All Quote Images</h4>

      {loading && <p>Loading...</p>}
      {!loading && images.length === 0 && <p>No quote images found.</p>}

      <div className="row">
        {images.map((img) => (
          <div className="col-md-4 mb-4" key={img._id}>
            <div className="card shadow-sm">
              <img
                src={img.image}
                alt="Quote"
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body text-end">
                <FaTrash
                  className="text-danger"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(img._id)}
                  title="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteImageManager;
