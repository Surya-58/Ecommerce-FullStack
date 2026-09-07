const BASE_URL = "http://localhost:5000/api/wishlist";

const getToken = () => {
  return localStorage.getItem("token");
};

export const addToWishlistApi = async (productId) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to add product to wishlist");
  }

  return data;
};

export const getWishlistApi = async () => {
  const response = await fetch(`${BASE_URL}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to get wishlist");
  }

  return data;
};

export const removeFromWishlistApi = async (productId) => {
  const response = await fetch(`${BASE_URL}/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to remove product");
  }

  return data;
};

export const clearWishlistApi = async () => {
  const response = await fetch(`${BASE_URL}/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to clear wishlist");
  }

  return data;
};