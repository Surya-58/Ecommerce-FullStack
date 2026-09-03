const BASE_URL = "http://localhost:5000/api/order";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMyOrdersApi = async () => {
  const response = await fetch(`${BASE_URL}/my-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
};

export const getOrderByIdApi = async (orderId) => {
  const response = await fetch(`${BASE_URL}/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data;
};

export const createOrderApi = async (orderData) => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to place order");
  }

  return data;
};