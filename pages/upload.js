// pages/upload.js
import React from 'react';

const UploadPage = () => {
  const handleUpload = async () => {
    const response = await fetch('/api/upload-items', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Files uploaded successfully');
    } else {
      console.error('Error uploading files');
    }
  };

  return (
    <div>
      <h1>Upload JSON Files</h1>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPage;
