import React, { useState, useRef } from 'react';
import './App.css';
import Copyright from './Copyright';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleProcessImage = () => {
    fileInputRef.current.click();
  };

  // Function to handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/process-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setProcessedImage(data.processedImage);
      setVehicleCount(data.vehicleCount);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image');
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li><a href="/"><b>Home</b></a></li>
          <li><a href="/about"><b>About</b></a></li>
          <li><a href="/contact"><b>Contact</b></a></li>
        </ul>
      </nav>

      <div className="container">
        <form className="image-form">
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={handleProcessImage}>Upload</button>
        </form>

        <div className="image-preview">
          {originalImage && <img src={originalImage} alt="Original" />}
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {processedImage && (
          <div className="processed-image">
            <h2>Processed Image</h2>
            <img src={processedImage} alt="Processed" />
          </div>
        )}
        {vehicleCount !== null && (
          <div className="vehicle-count">
            <h2>Vehicle Count</h2>
            <p>Total Vehicles Detected: {vehicleCount}</p>
          </div>
        )}
      </div>
      <Copyright />
    </div>
  );
}

export default App;

