import { useState } from 'react';

export default function Receipts() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

            const res = await fetch('/api/gpt4o', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64String }),
            });

            const data = await res.json();
            if (res.ok) {
                setResponse(data.response);
            } else {
                setError(data.error);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>Upload Receipt</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {response && <div><h2>Response:</h2><p>{response}</p></div>}
            {error && <div><h2>Error:</h2><p>{error}</p></div>}
        </div>
    );
}
