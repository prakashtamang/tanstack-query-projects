const ErrorMessage = ({ error }) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm">{error?.message || "Unable to load data"}</p>
    </div>
  );
};

export default ErrorMessage;
