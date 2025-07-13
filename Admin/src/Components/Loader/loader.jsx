// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="loader flex justify-center items-center w-full h-full">
      <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-t-blue-500 rounded-full"></div>
    </div>
  );
};

export default Loader;
