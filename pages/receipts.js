import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 92.5vh;
    background-color: #f5f7fa;
    color: #333;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #4a4e69;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 2px solid #9a8c98;
    border-radius: 5px;
    width: 100%;
    font-size: 1rem;
    background-color: #f0efeb;
    color: #4a4e69;
`;

const Button = styled.button`
    background-color: #c9ada7;
    color: #fff;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 2vh;

    &:hover {
        background-color: #9a8c98;
    }
`;

const ResponseContainer = styled.div`
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f0efeb;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 50vw;
    font-size: .85rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ErrorContainer = styled(ResponseContainer)`
    background-color: #ffdddd;
    color: #a70000;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    color: #4a4e69;
    font-family: 'Arial', sans-serif;
    font-size: 1.5rem;
`;

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 20vh;
    margin-top: .75rem;
    border-radius: 10px;
`;

export default function Receipts() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
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
            setLoading(false);
            if (res.ok) {
                setResponse(data.response);
                setError(null);
            } else {
                setError(data.error);
                setResponse(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleRetry = () => {
        setFile(null);
        setResponse(null);
        setError(null);
        setImageSrc(null);
    };

    if (loading) {
        return (
            <LoadingContainer>
                Loading response...
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <Title>Upload Receipt</Title>
            {!response ? (
                <Form onSubmit={handleSubmit}>
                    <Input type="file" onChange={handleFileChange} />
                    <Button type="submit">Upload</Button>
                </Form>
            ) : (
                <>
                    {imageSrc && <ImagePreview src={imageSrc} alt="Uploaded receipt" />}
                    <ResponseContainer>
                        <h2>Response:</h2>
                        <p>{response}</p>
                        <Button onClick={handleRetry}>Try Another Image</Button>
                    </ResponseContainer>
                </>
            )}
            {error && (
                <ErrorContainer>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </ErrorContainer>
            )}
        </Container>
    );
}
