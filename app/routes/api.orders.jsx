// app/routes/api/orders.jsx
import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';

const ORDER_QUERY = `
  query {
    orders(first: 10) {
      edges {
        cursor
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
`;

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    const response = await fetch(`https://${shop}/admin/api/2025-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query: ORDER_QUERY }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GraphQL Error:", errorText);
      throw new Error("GraphQL request failed");
    }

    const result = await response.json();

    if (!result.data?.orders) {
      throw new Error("Orders not found in response");
    }

    return json({ orders: result.data.orders });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
};
