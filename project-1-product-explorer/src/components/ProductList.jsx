import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const ProductList = ({ onSelectProduct }) => {
  const {
    data: products,
    error,
    isPending,
    isFetching,
    refetch,
  } = useProducts();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Products</h2>

          <p className="mt-1 text-sm text-slate-500">
            {products.length} products found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isFetching && (
            <span className="flex items-center gap-2 text-sm text-blue-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Updating...
            </span>
          )}

          <button
            onClick={refetch}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Refetch
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
