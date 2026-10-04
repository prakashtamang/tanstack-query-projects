const BASE_URL = "https://dummyjson.com";
export const POSTS_PER_PAGE = 6;
export const fetchPosts = async ({ page = 1, limit = POSTS_PER_PAGE }) => {
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export const fetchPostsBySkip = async ({
  skip = 0,
  limit = POSTS_PER_PAGE,
}) => {
  const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export const fetchPost = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};
