const BASE_URL = "http://localhost:3000";

export const getProducts = async() => {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()
    return data;
}