import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categorywiseProduct.url, {
      method: SummaryApi.categorywiseProduct.method, // presumably "POST"
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
      credentials: "include", // if you rely on cookies/auth
    });

    if (!response.ok) {
      throw new Error(`Server responded ${response.status}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (err) {
    console.error("fetchCategoryWiseProduct error:", err);
    return { success: false, error: true, data: [] };
  }
};

export default fetchCategoryWiseProduct;
