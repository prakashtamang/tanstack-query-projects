import { useQueryClient } from "@tanstack/react-query";
import { fetchProduct } from "../services/productApi";

const ProductCard = ({ product, onSelectProduct }) => {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    void queryClient
      .query({
        queryKey: ["product", product.id],
        queryFn: () => fetchProduct(product.id),
        staleTime: 30 * 1000,
      })
      .catch(() => {});
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-64 items-center justify-center bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
          {product.category}
        </span>

        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {product.title}
        </h3>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-sm text-slate-500">
              ⭐ {product.rating?.rate}
            </span>
          </div>

          <button
            onClick={() => onSelectProduct(product.id)}
            className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
