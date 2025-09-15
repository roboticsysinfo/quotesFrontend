import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminNotifications,
  createAdminNotification,
  updateAdminNotification,
  deleteAdminNotification,
  clearMessages,
} from "../redux/slices/adminNotificationSlice";
import toast from "react-hot-toast";

const AdminNotificationManager = () => {
  const dispatch = useDispatch();
  const { items, loading, error, success } = useSelector(
    (state) => state.adminNotifications
  );

  const [showModal, setShowModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", imageUrl: "" });

  // fetch notifications
  useEffect(() => {
    dispatch(fetchAdminNotifications());
  }, [dispatch]);

  // toast success/error
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessages());
      setShowModal(false);
    }
    if (error) {
      toast.error(error.message || error);
      dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setForm({ title: "", body: "", imageUrl: "" });
    setEditingNotification(null);
    setShowModal(true);
  };

  const openEditModal = (notif) => {
    setForm({ title: notif.title, body: notif.body, imageUrl: notif.imageUrl || "" });
    setEditingNotification(notif);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.body) {
      toast.error("Title and Body are required");
      return;
    }
    if (editingNotification) {
      dispatch(updateAdminNotification({ id: editingNotification._id, payload: form }));
    } else {
      dispatch(createAdminNotification(form));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      dispatch(deleteAdminNotification(id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">Manage Admin Notifications</h5>
            <button className="btn btn-primary" onClick={openCreateModal}>
              + Create Notification
            </button>
          </div>

          {loading && <p>Loading...</p>}

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Image</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((notif) => (
                    <tr key={notif._id}>
                      <td>{notif.title}</td>
                      <td>{notif.body}</td>
                      <td>
                        {notif.imageUrl ? (
                          <img
                            src={notif.imageUrl}
                            alt="img"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      <td>{new Date(notif.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => openEditModal(notif)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(notif._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No notifications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingNotification ? "Edit Notification" : "Create Notification"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Body</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="body"
                    value={form.body}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {editingNotification ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AdminNotificationManager;
