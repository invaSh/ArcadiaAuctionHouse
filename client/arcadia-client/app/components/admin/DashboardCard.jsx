import React from "react";

function DashboardCard({no, text, icon, color}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between col-span-3">
      <div className="bg-gray-100 p-2 rounded-full text-3x" style={{ color: `${color}` }}>
        {icon}
      </div>

      <div className="text-right">
        <p className="text-gray-500">{text}</p>
        <p className="text-2xl font-semibold">{no}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
