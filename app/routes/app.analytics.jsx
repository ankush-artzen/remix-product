import React from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineGrid,
  MediaCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AnalyticsPage() {
  const installs = 1234;
  const orders = 781;

  return (
    <Page>
      <TitleBar title="Analytics" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h1" variant="headingMd">
                App Analytics Overview
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Monitor your app's performance and usage insights
              </Text>

              <InlineGrid columns={2} gap="400">
                <Card>
                  <BlockStack>
                    <Text as="h3" variant="headingSm">
                      Total Installs
                    </Text>
                    <Text variant="bodyLg" fontWeight="bold">
                      {installs}
                    </Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack>
                    <Text as="h3" variant="headingSm">
                      Total Orders
                    </Text>
                    <Text variant="bodyLg" fontWeight="bold">
                      {orders}
                    </Text>
                  </BlockStack>
                </Card>
              </InlineGrid>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <MediaCard
            title="Getting Started with Shopify"
            primaryAction={{
              content: "Learn More",
              onAction: () => {
                window.open("https://shopify.dev", "_blank");
              },
            }}
            description="Discover how Shopify can power up your entrepreneurial journey."
            popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
          >
            <img
              alt="Getting started"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingSm">
                Tips for Growth
              </Text>
              <Text as="p" variant="bodySm">
                Analyze retention and session durations regularly.
              </Text>
              <Text as="p" variant="bodySm">
                Offer promotional incentives for repeat customers.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
