// ✅ Get all products
export async function getShopifyProducts(shop, accessToken) {
  const response = await fetch(`https://${shop}/admin/api/2024-01/products.json`, {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.products;
}

