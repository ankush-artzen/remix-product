import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getShopifyOrders } from './ordersapi';
import { Page, Layout, Card, Text } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
  try {
    const { shop, session } = await authenticate.admin(request);
    console.log("Authenticated shop:", shop);

    const orders = await getShopifyOrders(session?.shop, session.accessToken);
    console.log("Orders returned from API:", orders);

    return json({ orders });
  } catch (error) {
    console.error("Error in loader:", error);
    return json({ orders: null });
  }
};

  
export default function OrdersPage() {
  const { orders } = useLoaderData();

  console.log("Orders received in component:", orders);

  return (
    <Page>
      <TitleBar title="Orders" />
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd">Shopify Orders</Text>

            {orders?.length ? (
              orders.map((order) => {
                console.log("🛒 Rendering order:", order.id, order.name);
                return (
                  <Card key={order.id} sectioned>
                    <Text>Order: {order.name}</Text>
                    <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
                    <Text>
                      Total: {order.totalPriceSet.shopMoney.amount}{" "}
                      {order.totalPriceSet.shopMoney.currencyCode}
                    </Text>
                  </Card>
                );
              })
            ) : (
              <>
                {console.log("No orders found.")}
                <Text>No orders found.</Text>
              </>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
