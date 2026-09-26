import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="mt-4 text-sm text-slate-500">Loading products...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
