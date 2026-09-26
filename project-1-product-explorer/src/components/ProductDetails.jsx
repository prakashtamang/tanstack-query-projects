import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../services/productApi";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = ({ productId, onBack }) => {
  const {
    data: product,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load product: {error.message}
      </div>
    );
  }

  return (
    <section>
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        ← Back to products
      </button>

      <div className="relative grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
        {isFetching && (
          <div className="absolute right-4 top-4 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Updating...
          </div>
        )}

        <div className="flex min-h-100 items-center justify-center p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-100 max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center border-t border-slate-100 p-8 md:border-l md:border-t-0">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {product.category}
          </span>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
              ⭐ {product.rating?.rate}
            </span>
          </div>

          <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

          <div className="mt-8 rounded-lg bg-slate-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Rating</span>

              <span className="font-medium text-slate-900">
                {product.rating?.rate} / 5
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-slate-500">Reviews</span>

              <span className="font-medium text-slate-900">
                {product.rating?.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
