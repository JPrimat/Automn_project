import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface File {
    _id: number;
    name: string,
    extension: string,
    date: string
  }
  
const DisplayFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<File[]>("http://localhost:3000/files")
      .then((res) => setFiles(res.data))
      .catch(err => {
       setError(err.message);
  });
  }, []);


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liste des fichiers</h1>
      {error && <p className="text-danger">{error}</p>}
      <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Extension</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <tr key={file._id}>
            <td>{file._id}</td>
            <td>{file.name}</td>
            <td>{file.extension}</td>
            <td>{file.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DisplayFiles;
