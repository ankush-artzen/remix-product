import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders.edges);
        } else {
          setError(data.error || "Something went wrong");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🧾 Shopify Orders</h1>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {orders.length > 0 ? (
        <ul>
          {orders.map(({ node }) => (
            <li key={node.id} style={{ marginBottom: "1rem" }}>
              <strong>{node.name}</strong><br />
              Created: {new Date(node.createdAt).toLocaleString()}<br />
              Total: {node.totalPriceSet.shopMoney.amount} {node.totalPriceSet.shopMoney.currencyCode}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading orders...</p>
      )}
    </div>
  );
}
