import { useQuery } from "@tanstack/react-query";

import { fetchUser, fetchUserPosts } from "../../api/usersApi";

import PostCard from "../../components/PostCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const DependentPosts = () => {
  const userId = 5;

  const {
    data: user,
    isPending: isUserPending,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],

    queryFn: () => fetchUser(userId),

    staleTime: 60 * 1000,
  });

  const {
    data: postsData,
    isPending: isPostsPending,
    isError: isPostsError,
    error: postsError,
  } = useQuery({
    queryKey: ["user-posts", user?.id],

    queryFn: () => fetchUserPosts(user.id),

    enabled: !!user?.id,

    staleTime: 30 * 1000,
  });
  if (isUserPending) {
    return <Loading text="Loading user..." />;
  }

  if (isUserError) {
    return <ErrorMessage error={userError} />;
  }
  return (
    <section>
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">User loaded first</p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          {user.firstName} {user.lastName}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{user.email}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">User's Posts</h3>

        <p className="mt-1 text-sm text-slate-500">
          This query depends on the user query.
        </p>
      </div>

      {isPostsPending && <Loading text="Loading user's posts..." />}

      {isPostsError && <ErrorMessage error={postsError} />}

      {postsData && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {postsData.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DependentPosts;
