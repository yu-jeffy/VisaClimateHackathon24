import { useState } from 'react';

export default function Upload() {
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    try {
      const response = await fetch('/api/uploadStores', {
        method: 'POST',
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error uploading stores:', error);
      setMessage('Error uploading stores');
    }
  };

  return (
    <div>
      <h1>Upload Stores</h1>
      <button onClick={handleUpload}>Upload Stores Data</button>
      {message && <p>{message}</p>}
    </div>
  );
}
