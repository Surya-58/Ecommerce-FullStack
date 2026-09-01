const BASE_URL = "http://localhost:5000/api/product";

export const getProducts = async() => {
    try {
        const response = await fetch(`${BASE_URL}/list`)

        if(!response.ok) {
            throw new Error("Failed to fetch products")
        }

        const data = await response.json()

        return data

    } catch (error) {
        console.log("Get Proudcts Error:",error);
        throw error
    }
}

export const getProductById = async(id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)

        if(!response.ok){
            throw new Error("Failed to fetch product")
        }

        const data = await response.json()

        return data
        
    } catch (error) {
        console.log("Get Product Error: ", error);
        throw error
        
    }
}