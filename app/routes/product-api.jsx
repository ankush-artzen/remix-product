import { json } from "@remix-run/node";
export const loader = async ({ request }) => {

  const analytics = {
    totalInstalls: 1234,
    totalOrders: 781,
    averageOrderValue: 54.32,
    retentionRate: "67%",
  };

  return json(analytics);
};

export const action = async ({ request }) => {


    console.log(`Received analytics request for shop:`);

  return new Response();
};

// export const loader = async ({ request }) => {
//   const { shop,session } = await authenticate.admin(request);

//   const analytics = {
//     shop,
//     session,
//     totalInstalls: 1234,
//     totalOrders: 781,
//     averageOrderValue: 54.32,
//     retentionRate: "67%",
//   };

//   return json(analytics);
// };

// // POST, PATCH, DELETE - Create, Update, Delete
// export const action = async ({ request }) => {
//   try {
//     const { shop, session } = await authenticate.admin(request);
//     const method = request.method;

//     const analytics = {
//       shop,
//       session,
//       totalInstalls: 1234,
//       totalOrders: 781,
//       averageOrderValue: 54.32,
//       retentionRate: "67%",
//     };

//     switch (method) {
//       case "POST": {
//         const body = await request.json();
//         console.log("Creating analytics data:", body);

//         // Save to DB here
//         return json({ message: "Created successfully", data: body });
//       }

//       case "PATCH": {
//         const body = await request.json();
//         console.log("Updating analytics data:", body);

//         return json({ message: "Updated successfully", data: body });
//       }

//       case "DELETE": {
//         console.log("Deleting analytics data for shop:", shop);
//         return json({ message: "Deleted successfully" });
//       }

//       default:
//         return json({ error: "Method not allowed" }, { status: 405 });
//     }
//   } catch (error) {
//     return json({ error: "Invalid JSON" }, { status: 400 });
//   }
// };
