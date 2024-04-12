import React from "react";
import { Link } from "react-router-dom";

const NoData = ({ prevUrl, urlLabel }) => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-2 bg-background">
      <h2 className="text-3xl font-semibold">No data to display</h2>
      <Link to={prevUrl} className="primary-btn">
        Go back to {urlLabel}
      </Link>
    </div>
  );
};

export default NoData;
