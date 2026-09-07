const PRODUCT_URL = "http://localhost:5000/api/product/list";
const CATEGORY_URL = "http://localhost:5000/api/category";
const USER_URL = "http://localhost:3000/users";
const ORDER_URL = "http://localhost:5000/api/order";

export const getOrders = async () => {
  try {
    const response = await fetch(`${ORDER_URL}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data.orders;
  } catch (error) {
    console.log("Get Orders Error:", error);
    throw error;
  }
};
export const addOrder = async (order) => {
  try {
    const response = await fetch(ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const updateOrder = async (id, order) => {
  try {
    const response = await fetch(`${ORDER_URL}/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderStatus: order.orderStatus,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update order");
    }

    return data;
  } catch (error) {
    console.log("Update Order Error:", error);
    throw error;
  }
};
export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${ORDER_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/user/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data.users;
  } catch (error) {
    console.log("Get Users Error:", error);
    throw error;
  }
};
export const addUser = async (user) => {
  try {
    const response = await fetch(USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${USER_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id) => {
  const response = await fetch(`${USER_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${CATEGORY_URL}/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch categories");
    }

    return data.categories;
  } catch (error) {
    console.log("Get Categories Error:", error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to add category");
    }

    return data;
  } catch (error) {
    console.log("Add Category Error:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(category),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update category");
    }

    return data;
  } catch (error) {
    console.log("Update Category Error:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to delete category");
    }

    return data;
  } catch (error) {
    console.log("Delete Category Error:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(PRODUCT_URL);

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data.products;
  } catch (error) {
    console.log("Get Products Error:", error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await fetch(PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
