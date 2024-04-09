import React from "react";
import Taskonecard from "./taskonecard";
import data from "./writingdata";

function Taskone({
  writingCategoryTask1AcademicData,
  writingCategoryTask1GeneralData,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
     gap-4 sm:gap-10
     "
    // grid-cols-[repeat(auto-fit,minmax(150px,1fr))]
     >
      {writingCategoryTask1AcademicData.length > 0 &&
        writingCategoryTask1AcademicData.map((item) => (
          <Taskonecard key={item.uniqueCategoryId} item={item} />
        ))}
    </div>
  );
}

export default Taskone;
