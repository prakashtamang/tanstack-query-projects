import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, POSTS_PER_PAGE } from "../../api/postsApi";

import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";
import ErroMessage from "../../components/ErrorMessage";
import { useState } from "react";

const PaginatedPosts = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["posts", page],

    queryFn: () =>
      fetchPosts({
        page,
        limit: POSTS_PER_PAGE,
      }),

    staleTime: 30 * 1000,
  });

  const totalPages = data ? Math.ceil(data.total / POSTS_PER_PAGE) : 0;

  async function prefetchNextPage() {
    if (page >= totalPages) return;

    await queryClient
      .query({
        queryKey: ["posts", page + 1],

        queryFn: () =>
          fetchPosts({
            page: page + 1,
            limit: POSTS_PER_PAGE,
          }),

        staleTime: 30 * 1000,
      })
      .catch(() => {});
  }

  if (isPending) {
    return <Loading text="Loading posts..." />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Normal Pagination
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Query key: ["posts", page]
          </p>
        </div>

        {isFetching && (
          <span className="text-sm text-blue-600">Updating...</span>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((current) => current - 1)}
            disabled={page === 1}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <span className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Page {page} / {totalPages}
          </span>

          <button
            onMouseEnter={prefetchNextPage}
            onFocus={prefetchNextPage}
            onClick={() => setPage((current) => current + 1)}
            disabled={page >= totalPages}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Hover over Next to prefetch the next page
        </p>
      </div>
    </section>
  );
};

export default PaginatedPosts;
