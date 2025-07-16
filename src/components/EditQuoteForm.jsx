import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    uploadQuote,
    updateQuote,
    fetchQuoteById,
    clearQuoteState,
} from '../redux/slices/quotesSlice';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditQuoteForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from route if editing
    const editMode = !!id;

    const { quote, successMessage } = useSelector((state) => state.quotes);

    const [formData, setFormData] = useState({
        langId: '',
        categoryId: '',
        type: 'image',
    });
    const [mediaFile, setMediaFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [langList, setLangList] = useState([]);
    const [catList, setCatList] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Fetch quote if editing
    useEffect(() => {
        if (editMode) {
            dispatch(fetchQuoteById(id));
        }

        fetchLangs();
        fetchCats();

        return () => dispatch(clearQuoteState());
    }, [dispatch, editMode, id]);

    // Prefill when quote is loaded
    useEffect(() => {
        if (editMode && quote) {
            setFormData({
                langId: quote.langId?._id || '',
                categoryId: quote.categoryId?._id || '',
                type: quote.type || 'image',
            });
            setPreview(quote.mediaUrl);
        }
    }, [quote, editMode]);

    const fetchLangs = async () => {
        try {
            const res = await api.get('/languages');
            setLangList(res.data.data);
        } catch {
            toast.error('Failed to load languages');
        }
    };

    const fetchCats = async () => {
        try {
            const res = await api.get('/quote-categories');
            setCatList(res.data.data);
        } catch {
            toast.error('Failed to load categories');
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
        if (file && file.type.startsWith('image')) {
            setPreview(URL.createObjectURL(file));
        } else if (file && file.type.startsWith('video')) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.langId || !formData.categoryId || (!mediaFile && !editMode)) {
            toast.error('All fields are required');
            return;
        }

        const data = new FormData();
        data.append('langId', formData.langId);
        data.append('categoryId', formData.categoryId);
        data.append('type', formData.type);
        if (mediaFile) {
            data.append('media', mediaFile);
        }

        setUploading(true);

        try {
            if (editMode) {
                await dispatch(updateQuote({ id, data })).unwrap();
                toast.success('Quote updated successfully');
            } else {
                await dispatch(uploadQuote(data)).unwrap();
                toast.success('Quote uploaded successfully');
            }

            navigate('/quotes-list'); // or your quote list route
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container my-4">
            <div className="card shadow">
                <div className="card-body">
                    <h4 className="card-title mb-3">
                        {editMode ? 'Edit Quote' : 'Upload Quote (Image / Video)'}
                    </h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        {/* Language Dropdown */}
                        <div className="mb-3">
                            <label className="form-label">Select Language</label>
                            <select
                                name="langId"
                                className="form-select"
                                value={formData.langId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Language --</option>
                                {langList.map((lang) => (
                                    <option key={lang._id} value={lang._id}>
                                        {lang.languageName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Dropdown */}
                        <div className="mb-3">
                            <label className="form-label">Select Category</label>
                            <select
                                name="categoryId"
                                className="form-select"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Category --</option>
                                {catList.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Media Type */}
                        <div className="mb-3">
                            <label className="form-label">Media Type</label>
                            <select
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>

                        {/* File Input */}
                        <div className="mb-3">
                            <label className="form-label">
                                {editMode ? 'Change File (optional)' : 'Select File'}
                            </label>
                            <input
                                type="file"
                                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                                className="form-control"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Preview */}
                        {preview && (
                            <div className="mb-3">
                                {formData.type === 'image' ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="img-fluid rounded"
                                        style={{ maxHeight: 200 }}
                                    />
                                ) : (
                                    <video
                                        src={preview}
                                        controls
                                        style={{ width: '100%', maxHeight: 300 }}
                                    />
                                )}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            {uploading ? 'Please wait...' : editMode ? 'Update Quote' : 'Upload Quote'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditQuoteForm;
