export async function getShopifyOrders(shop, accessToken) {
    try {
      const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          query: `
            query {
              orders(first: 10) {
                edges {
                  node {
                    id
                    name
                    createdAt
                    totalPriceSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          `
        })
      });
  
      const result = await response.json();
      console.log("🔍 Raw Shopify Orders Response:", JSON.stringify(result, null, 2));
  
      if (result.errors) {
        console.error("❌ Shopify GraphQL Errors:", result.errors);
        return null;
      }
  
      const orders = result?.data?.orders?.edges?.map(edge => edge.node) || [];
      return orders;
    } catch (error) {
      console.error("🔥 Failed to fetch Shopify orders:", error);
      return null;
    }
  }
  