import React from "react";
import Taskonecard from "./taskonecard";
import data from "./writingdata";

function Taskone() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-10">
      {data.map((e, i) => (
        <Taskonecard key={i} item={e} />
      ))}
    </div>
  );
}

export default Taskone;
