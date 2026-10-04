const PostCard = ({ post }) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          Post #{post.id}
        </span>
        <span className="text-xs text-slate-400">User #{post.userId}</span>
      </div>

      <h3 className="text-lg font-bold capitalize text-slate-900">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {post.body}
      </p>

      {post.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>👍 {post.reactions?.likes ?? 0}</span>
        <span>👎 {post.reactions?.dislikes ?? 0}</span>
      </div>
    </article>
  );
};

export default PostCard;
