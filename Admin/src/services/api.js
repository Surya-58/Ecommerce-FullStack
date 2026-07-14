const PRODUCT_URL = "http://localhost:3000/products";
const CATEGORY_URL = "http://localhost:3000/categories";
const USER_URL = "http://localhost:3000/users";
const ORDER_URL = "http://localhost:3000/orders"

export const getOrders = async() =>{
  try {
    const response = await fetch(ORDER_URL)
    return await response.json()
    
  } catch (error) {
    console.log(error);
    
  }
}
export const addOrder = async(order) => {
  try {
    const response = await fetch(ORDER_URL,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(order)
    })
    return await response.json()

  } catch (error) {
    console.log(error);
    
  }
}
export const updateOrder = async(id,order) => {
  try {
    const response = await fetch(`${ORDER_URL}/${id}`,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(order)
    })
    return await response.json()
    
  } catch (error) {
    console.log(error);   
  }
}
export const deleteOrder = async(id) =>{
  try {
    const response = await fetch(`${ORDER_URL}/${id}`,{
      method : "DELETE"
    })
    return await response.json()
  } 
  catch (error) {
    console.log(error);
    
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(USER_URL);
    return await response.json();
  } catch (error) {
    console.log(error);
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
    const response = await fetch(`${USER_URL}/${id}`,
        {
            method: "DELETE"
        }
    )
    return await response.json()
};

export const getCategories = async () => {
  try {
    const response = await fetch(CATEGORY_URL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (category) => {
  try {
    const response = await fetch(CATEGORY_URL, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(PRODUCT_URL);
    return await response.json();
  } catch (error) {
    console.log(error);
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
