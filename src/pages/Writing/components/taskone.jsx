import React from "react";
import Taskonecard from "./taskonecard";
import data from "./writingdata";

function Taskone({
  writingCategoryTask1AcademicData,
  writingCategoryTask1GeneralData,
  activeSection,
}) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
     gap-4 sm:gap-10 w-full lg:w-[80%]
     "
      // grid-cols-[repeat(auto-fit,minmax(150px,1fr))]
    >
      {activeSection === 0
        ? writingCategoryTask1AcademicData.length > 0 &&
          writingCategoryTask1AcademicData.map((item) => (
            <Taskonecard key={item.uniqueCategoryId} item={item} />
          ))
        : writingCategoryTask1GeneralData.length > 0 &&
          writingCategoryTask1GeneralData.map((item) => (
            <Taskonecard key={item.uniqueCategoryId} item={item} />
          ))}
    </div>
  );
}

export default Taskone;
