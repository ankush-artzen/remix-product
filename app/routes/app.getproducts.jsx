import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { Page, Layout, Card, ResourceList } from '@shopify/polaris';

const PRODUCTS_QUERY = `
  query {
    products(first: 100) {
      edges {
        node {
          id
          legacyResourceId
          title
        }
      }
    }
  }
`;

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  const res = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
  });

  const data = await res.json();

  return json({ products: data.data.products.edges });
};

export default function ProductsPage() {
  const { products } = useLoaderData();

  return (
    <Page title="Products">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={products}
              renderItem={({ node }) => {
                const { id, legacyResourceId, title } = node;
                return (
                  <ResourceList.Item
                    id={legacyResourceId}
                    url={`/app/product/${encodeURIComponent(id)}`}
                  >
                    <strong>{title}</strong>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
