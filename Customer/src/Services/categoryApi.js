const BASE_URL = `${import.meta.env.VITE_API_URL}/category`;

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/list`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch categories");
  }

  return data;
};