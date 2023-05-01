import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECTRETE_KEY);

export const config = {
  api: {
    bodyParser: false, // dont parse body for request, to verify webhook event signature
    // this allows us to confirm that the webhook was sent from stripe and not some random 3rd party
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;
    try {
      // 1) retrieve the eveny by verifying signature using raw body and secrete
      const rawBody = await buffer(req); // rawbody
      const signature = req.headers["stripe-signature"]; // signatures of req

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Error Message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // successfully constructed event
    console.log("Success:", event.id);
    // 2) handle event type (add business logic here)
    if (event.type === "checkout.sessions.completed") {
      console.log("Payment Recieved!");
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }
    // 3) return a response to acknowledge receipt of the event
    res.json({ recieved: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
