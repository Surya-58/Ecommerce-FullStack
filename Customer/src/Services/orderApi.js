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

export const cancelOrderApi = async (orderId) => {
  const response = await fetch(`${BASE_URL}/cancel/${orderId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to cancel order");
  }

  return data;
};

export const createRazorpayOrderApi = async(amount) => {
  const response = await fetch(`${BASE_URL.replace("/order", "/payment")}/create-order`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({amount}),
  })

  const data = await response.json()

  if(!response.ok || !data.success){
    throw new Error(data.message || "Failed to create payment order")
  }

  return data
}

export const verifyRazorpayPaymentApi = async(paymentData) => {
  const response = await fetch(
    `${BASE_URL.replace("/order","/payment")}/verify`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(paymentData),
    }
  )
}