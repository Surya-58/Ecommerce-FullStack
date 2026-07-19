const BASE_URL = "http://localhost:3000";

export const getProducts = async() => {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()
    return data;
}

export const getProductById = async(id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error);
    }
}