import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsBySkip, POSTS_PER_PAGE } from "../../api/postsApi";

import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const InfiniteFeed = () => {
  const {
    data,
    error,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: ({ pageParam }) =>
      fetchPostsBySkip({ skip: pageParam, limit: POSTS_PER_PAGE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip >= lastPage.total) {
        return undefined;
      }
      return nextSkip;
    },
    staleTime: 30 * 1000,
  });

  if (isPending) {
    return <Loading text="Loading feed..." />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const posts = data.pages.flatMap((page) => page.posts);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Infinite Blog Feed</h2>

        <p className="mt-1 text-sm text-slate-500">
          useInfiniteQuery + fetchNextPage + hasNextPage
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More Posts"}
          </button>
        ) : (
          <p className="rounded-lg bg-slate-100 px-5 py-3 text-sm text-slate-500">
            🎉 You have reached the end
          </p>
        )}
      </div>
    </section>
  );
};

export default InfiniteFeed;
