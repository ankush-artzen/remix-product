import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';

const PRODUCT_QUERY = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          tags
        }
      }
    }
  }
`;

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;

    const response = await fetch(`https://${shop}/admin/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query: PRODUCT_QUERY }),
    });

    const result = await response.json();
    return json({ products: result.data.products.edges });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
};
