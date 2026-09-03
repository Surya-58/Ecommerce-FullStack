const BASE_URL = "http://localhost:5000/api/cart";

const getToken = () => {
  return localStorage.getItem("token");
};

export const addToCartApi = async (productId, quantity) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
};

// Get cart 
export const getCartApi = async () => {
  const response = await fetch(`${BASE_URL}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to get cart");
  }

  return data;
};
// Update cart from cart
export const updateCartApi = async (productId, quantity) => {
  const response = await fetch(`${BASE_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update cart");
  }

  return data;
};

// Remove product from cart
export const removeFromCartApi = async (productId) => {
  const response = await fetch(`${BASE_URL}/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to remove product");
  }

  return data;
};

// Clear cart
export const clearCartApi = async () => {
  const response = await fetch(`${BASE_URL}/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to clear cart");
  }

  return data;
};