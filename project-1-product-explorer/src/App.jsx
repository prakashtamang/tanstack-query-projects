import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Product Explorer
            </h1>

            <p className="text-sm text-slate-500">TanStack Query</p>
          </div>

          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            TanStack Query
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selectedProductId ? (
          <ProductDetails
            productId={selectedProductId}
            onBack={() => setSelectedProductId(null)}
          />
        ) : (
          <ProductList onSelectProduct={setSelectedProductId} />
        )}
      </main>
    </div>
  );
};

export default App;
