import DisplayFiles from "./components/displayFiles";
import UploadFiles from "./components/uploadFiles";
import React  from 'react';

const App = () => {
  return (
    <>
    <div className="app-container">
      <div className="left-component">
        <UploadFiles/>
      </div> 
      <div className="right-component">
        <DisplayFiles/>
      </div> 
    </div>
    </>
  )
}
export default App;
