import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';

export const action = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;
    const body = await request.json();
    const { productId, newTags } = body;

    const mutation = `
      mutation productUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            tags
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(`https://${shop}/admin/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            id: productId,
            tags: newTags,
          },
        },
      }),
    });

    const result = await response.json();
    return json(result.data.productUpdate);
  } catch (err) {
    return json({ error: err.message }, { status: 500 });
  }
};
