import Stripe from "stripe";

// this is the endpoint for our checkout
// everyone new post req generates an id for checkout

const stripe = new Stripe(process.env.STRIPE_SECTRETE_KEY); // creates new stripe instance

export default async function handler(req, res) {
  // we will only being make post req
  if (req.method === "POST") {
    try {
      // creating checkout sessions
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req?.body?.items ?? [], // all items in cart, if null, return an empty arr
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`, // or `${req.headers.origin}/cart`
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ statusCode: 500, messgage: err.message });
    }
  } else {
    res.setHeader("Allow", "Post");
    res.status(405).end("Method not allowed");
  }
}
