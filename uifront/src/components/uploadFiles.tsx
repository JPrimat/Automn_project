import React, { useState } from "react";
import axios from 'axios';

const UploadFiles = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail">("initial");
    const [errorMessage, setErrorMessage] = useState('');



    const handleFileChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setStatus("initial");
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
      if (!file) {
        setErrorMessage('Veuillez sélectionner un fichier');
        return;
      }

        if (file) {
          setStatus("uploading");    
          const formData = new FormData();
          formData.append("file", file);
    
          try {
            await axios.post('http://localhost:3000/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setStatus("success");
          } catch (error) {
            setErrorMessage('Erreur lors du téléchargement du fichier ' + error);
            setStatus("fail");
          }
        }
      };

      return (
        <>
          <div className="input-group">
            <label htmlFor="file" className="sr-only">
              Choose a file
            </label>
            <input id="file" type="file" onChange={handleFileChanges} />
          </div>
          {file && (
            <section>
              File details:
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.name.split('.').pop()}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            </section>
          )}
          {file && (
            <button onClick={handleUpload} className="submit">
              Upload a file
            </button>
          )}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

    
          <Result status={status} />
        </>
      );
};

const Result = ({ status }: { status: string }) => {
    if (status === "success") {
      return <p><span role="img" aria-label="success">✅</span> File uploaded successfully!</p>;
    } else if (status === "fail") {
      return <p><span role="img" aria-label="failed">❌</span> File upload failed!</p>;
    } else if (status === "uploading") {
      return <p><span role="img" aria-label="waiting">⏳</span> Uploading selected file...</p>;
    } else {
      return null;
    }
};

export default UploadFiles; 