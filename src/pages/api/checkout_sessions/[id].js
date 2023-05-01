import Stripe from "stirpe";

// endpoint to retrieve checkout session using an id

const stripe = new Stripe(process.env.STRIPE_SECTRETE_KEY);

export default async function handler(req, res) {
  const id = req.query.id;
  try {
    if (!id.startsWith(`cs_`)) {
      // if invalid id
      throw Error("Incorrect Checkoud Session ID");
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
