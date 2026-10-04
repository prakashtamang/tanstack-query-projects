import { useState } from "react";
import Header from "./components/Header";

import PaginatedPosts from "./features/pagination/PaginatedPosts";
import InfiniteFeed from "./features/infinite/InfiniteFeed";
import PrefetchPosts from "./features/prefetch/PrefetchPosts";
import DependentPosts from "./features/dependent/DependentPosts";

const tabs = [
  {
    id: "pagination",
    label: "Pagination",
  },
  {
    id: "infinite",
    label: "Infinite Feed",
  },
  {
    id: "prefetch",
    label: "Prefetching",
  },
  {
    id: "dependent",
    label: "Dependent Query",
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("pagination");
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "pagination" && <PaginatedPosts />}

        {activeTab === "infinite" && <InfiniteFeed />}

        {activeTab === "prefetch" && <PrefetchPosts />}

        {activeTab === "dependent" && <DependentPosts />}
      </main>
    </div>
  );
};

export default App;
