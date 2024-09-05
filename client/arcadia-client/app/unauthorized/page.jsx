import React from "react";

export default function unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <p className="text-xl mt-4 text-gray-700">Access Denied</p>
        <p className="text-lg mt-2 text-gray-500">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
