import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadQuoteImage } from "../redux/slices/quoteImageSlice";
import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadQuoteImage = () => {
    
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.quoteImages);

  const [image, setImage] = useState(null);
  const [langList, setLangList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetchLangs();
    fetchCats();
  }, []);

  const fetchLangs = async () => {
    try {
      const res = await api.get("/languages");
      setLangList(res.data.data);
    } catch {
      toast.error("Failed to load languages");
    }
  };

  const fetchCats = async () => {
    try {
      const res = await api.get("/quote-categories");
      setCatList(res.data.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleUpload = () => {
    if (!image || !selectedLang || !selectedCat) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("langId", selectedLang);
    formData.append("categoryId", selectedCat);
    formData.append("uploadedBy", "admin");

    dispatch(uploadQuoteImage(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Uploaded!");
        setImage(null);
        setSelectedLang("");
        setSelectedCat("");
      } else {
        toast.error(res.payload || "Upload failed");
      }
    });
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Upload Quote Image</h3>

      <div className="mb-3">
        <label className="form-label">Select Language</label>
        <select
          className="form-select"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="">-- Select Language --</option>
          {langList.map((lang) => (
            <option key={lang._id} value={lang._id}>
              {lang.languageName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Category</label>
        <select
          className="form-select"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {catList.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Pick Image</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
      </div>

      {image && (
        <div className="mb-3">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="img-fluid rounded border"
            style={{ maxHeight: "200px" }}
          />
        </div>
      )}

      <button className="btn btn-primary w-100" onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadQuoteImage;
