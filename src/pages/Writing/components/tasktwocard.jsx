import React from "react";

function Tasktwocard({ item }) {
  const { title, image } = item;
  return (
    <div
      style={{ background: `url(${image})` }}
      className={`aspect-[1/.7]  !bg-[length:100%_100%] rounded-xl transition-all duration-300 !bg-no-repeat flex flex-col justify-end hover:!bg-[length:120%_120%] !bg-[50%_50%] text-white font-[600] text-center`}
    >
      <p className="p-2">{title}</p>
    </div>
  );
}

export default Tasktwocard;
