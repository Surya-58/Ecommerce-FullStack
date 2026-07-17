const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

export const registerUser = async(user) => {
    const response = await fetch(`${BASE_URL}/users`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()
    return data
}