import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Button,
  Badge,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

const PRODUCT_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      tags
    }
  }
`;

const UPDATE_TAGS_MUTATION = `
  mutation updateProductTags($input: ProductInput!) {
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

export const loader = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;
  const { productId } = params;

  const res = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: PRODUCT_QUERY,
      variables: { id: decodeURIComponent(productId) },
    }),
  });

  const data = await res.json();

  if (!data?.data?.product) {
    throw new Response("Product not found", { status: 404 });
  }

  return json({ product: data.data.product, shop, accessToken });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const newTags = formData.get("tags");
  const productId = decodeURIComponent(params.productId);

  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  const mutationRes = await fetch(
    `https://${shop}/admin/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query: UPDATE_TAGS_MUTATION,
        variables: {
          input: {
            id: productId,
            tags: newTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          },
        },
      }),
    },
  );

  const mutationData = await mutationRes.json();

  // shopify.toast.show("Tags updated successfully!");

  return json({ success: true, result: mutationData.data });
};

export default function ProductDetailPage() {
  const { product } = useLoaderData();

  const [tags, setTags] = useState(product.tags.join(", "));

  return (
    <Page title={`Edit Tags - ${product.title}`}>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <form method="post">
              <FormLayout>
                <TextField
                  label="Tags (comma separated)"
                  value={tags}
                  onChange={setTags}
                  name="tags"
                />

                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  {product.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>

                <Button submit primary>
                  Update Tags
                </Button>
              </FormLayout>
            </form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
