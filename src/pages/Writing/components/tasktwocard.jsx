import React from "react";
import { Link } from "react-router-dom";

function Tasktwocard({ item }) {
  const setSubcategoriesIntoStorage = () => {
    sessionStorage.setItem(
      "writingSubcategories",
      JSON.stringify(item.SubCategoryList)
    );
  };
  return (
    <Link
      to={`/writing/${item.CategoryName}/subcategories`}
      onClick={setSubcategoriesIntoStorage}
      style={{ background: `url(${item.thumbnail})` }}
      className={`aspect-[1/.7] cursor-pointer !bg-[length:100%_100%] rounded-xl transition-all duration-300 !bg-no-repeat flex flex-col justify-end hover:!bg-[length:120%_120%] !bg-[50%_50%] text-white font-[600] text-center`}
    >
      <p className="p-2">{item.CategoryName}</p>
    </Link>
  );
}

export default Tasktwocard;
