import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getShopifyProducts } from './shopifyAPI';
import { Page, Layout, Card, Text } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
  try {
    const { shop, session } = await authenticate.admin(request);
    const products = await getShopifyProducts(session?.shop, session.accessToken);
    console.log(`Loading products for shop: ${shop}`, session);
    return json({ products });
  } catch (error) {
    console.error("Error loading products:", error);
    throw new Response("Failed to load products", { status: 500 });
  }
};

export default function ProductsPage() {
  const { products } = useLoaderData();

  return (
    <Page>
      <TitleBar title="Products (No Auth Wrapper)" />
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd">Shopify Products</Text>
            {products?.length ? (
              products.map((product) => (
                <Text key={product.id}>{product.title}</Text>
              ))
            ) : (
              <Text>No products found.</Text>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
