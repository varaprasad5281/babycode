import React from "react";
import icon from "../../../assets/images/profile-icon.png";

function PartnerCard({ item }) {
  return (
    <div className="flex items-center bg-white p-3 gap-5 rounded-lg shadow-md">
      <div>
        <img src={icon} className="h-14 w-14" alt="." />
      </div>
      <div>
        <p className="font-semibold text-lg">{item.name}</p>
        <p className="text-sm text-[#E56948]">{item.role}</p>
      </div>
    </div>
  );
}

export default PartnerCard;
