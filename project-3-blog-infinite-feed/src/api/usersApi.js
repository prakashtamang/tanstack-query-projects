const BASE_URL = "https://dummyjson.com";
export const fetchUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const fetchUserPosts = async (userId) => {
  const response = await fetch(`${BASE_URL}/posts/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user's posts");
  }

  return response.json();
};
