import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, POSTS_PER_PAGE } from "../../api/postsApi";

import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const PrefetchPosts = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["prefetch-posts", page],

    queryFn: () =>
      fetchPosts({
        page,
        limit: POSTS_PER_PAGE,
      }),

    staleTime: 30 * 1000,
  });

  const totalPages = data ? Math.ceil(data.total / POSTS_PER_PAGE) : 0;

  const prefetchPage = async (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    await queryClient
      .query({
        queryKey: ["prefetch-posts", nextPage],

        queryFn: () =>
          fetchPosts({
            page: nextPage,
            limit: POSTS_PER_PAGE,
          }),

        staleTime: 30 * 1000,
      })
      .catch(() => {});
  };

  if (isPending) {
    return <Loading text="Loading posts..." />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Prefetching Demo</h2>

        <p className="mt-1 text-sm text-slate-500">
          The next page is loaded before you click Next.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => {
            setPage((current) => current - 1);
          }}
          disabled={page === 1}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          {page} / {totalPages}
        </span>

        <button
          onMouseEnter={() => {
            prefetchPage(page + 1);
          }}
          onFocus={() => {
            prefetchPage(page + 1);
          }}
          onClick={() => {
            setPage((current) => current + 1);
          }}
          disabled={page === totalPages}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
        💡 Hover over the Next button and check the Network tab. The next page
        should be requested before you click it.
      </div>
    </section>
  );
};

export default PrefetchPosts;
