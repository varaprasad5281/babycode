import React from "react";
import { Link } from "react-router-dom";

const UnderDevelopment = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">This page is under development</h1>
        <Link className="primary-btn px-4" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default UnderDevelopment;
