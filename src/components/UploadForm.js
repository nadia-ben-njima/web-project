// src/components/UploadForm.js
import React, { useState } from 'react';

const UploadForm = () => {
  const [formData, setFormData] = useState({ name: '', price: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

   
    await fetch('/api/products', {
      method: 'POST',
      body: data,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <input
        type="file"
        name="image"
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
