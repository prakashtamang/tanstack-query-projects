const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <h1 className="text-2xl font-bold text-slate-900">
          TranStack Query Blog
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Pagination, Infinite Queries, Prefetching & Dependent Queries
        </p>
      </div>
    </header>
  );
};

export default Header;
