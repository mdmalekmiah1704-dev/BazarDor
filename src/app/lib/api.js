const API_URL = "https://api.abcz.workers.dev/api/bazardor";
// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      console.error("Products API status:", response.status);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data)
      ? data
      : Array.isArray(data.products)
        ? data.products
        : [];
  } catch (error) {
    console.error("Products API error:", error);
    return [];
  }
};
// Get categories
export const getCategories = async () => {
  try {
    const products = await getProducts();
    const categories = [];
    products.forEach((product) => {
      if (
        product.category &&
        !categories.some(
          (category) => category.slug === product.category
        )
      ) {
        categories.push({
          slug: product.category,
          nameBn:
            product.categoryNameBn || product.category,
          icon: product.categoryIcon || "🛒",
        });
      }
    });
    return categories;
  } catch (error) {
    console.error("Categories error:", error);
    return [];
  }
};
// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const products = await getProducts();
    return products.filter(
      (product) => product.category === category
    );
  } catch (error) {
    console.error("Category products error:", error);
    return [];
  }
};
// Get a single product by slug or ID
export const getProductBySlug = async (slug) => {
  try {
    const products = await getProducts();
    const product = products.find(
      (item) =>
        item.slug === slug ||
        String(item.id) === String(slug)
    );
    return product || null;
  } catch (error) {
    console.error("Product details error:", error);
    return null;
  }
};