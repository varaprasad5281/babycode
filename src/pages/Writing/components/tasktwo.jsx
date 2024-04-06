import React from "react";

import data from "./tasktwodata";
import Tasktwocard from "./tasktwocard";

function Tasktwo() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]  md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5 md:gap-8">
      {data.map((e, i) => (
        <Tasktwocard key={i} item={e} />
      ))}
    </div>
  );
}

export default Tasktwo;
