import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-red-600">{message}</p>
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
