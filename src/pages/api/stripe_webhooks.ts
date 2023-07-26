import Stripe from "stripe";
import {NextApiRequest, NextApiResponse} from "next";
import {buffer} from "micro";
import {prisma} from "~/server/db";

const stripe = require('stripe')(process.env.STRIPE_SK);

// Because stripe needs raw body.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const buff = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  if (!sig) return res.status(400).send(`Stripe signature doesn't exist!`);

  try {
    event = stripe.webhooks.constructEvent(buff, sig, process.env.STRIPE_SIGNING_SECRET);
  } catch (err: any) {
    res.status(400).send(`Webhook Error (possibly wrong Stripe signature?): ${err?.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompletedEvent(event);
      return res.status(200).send("Webhook received | checkout.session.completed successfuly handled.");
    case "invoice.payment_succeeded":
      await handleInvoicePaymentSucceededEvent(event);
      return res.status(200).send("Webhook received | invoice.payment_succeeded successfuly handled.");
    default:
      return res.status(200).send("Webhook received | action not recognized.");
  }
}

/**
 * Handles the checkout.session.completed event. Occurs when a checkout session is completed - be it subscription
 * or one-time payment.
 * */
async function handleCheckoutSessionCompletedEvent(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  const email = session.customer_email || (await getEmailFromCheckout(session)) || undefined
  const sessionParsed = JSON.parse(JSON.stringify(session));
  const amount = session.amount_total! / 100;

  console.log("A", session.subscription);

  if (session.mode === "subscription") {
    await prisma.subscription.create({
      data: {
        email: email,
        session: sessionParsed,
        amount: amount,
        subscriptionId: session.subscription as string,
      }
    })
  } else {
    await prisma.donation.create({
      data: {
        email: email,
        session: sessionParsed,
        amount: amount,
      }
    })
  }

  //await Email.sendOfferPaidMail(user.email, stripeSession.offerId as OfferId, stripeSession.orderId);
}

async function getEmailFromCheckout(session: Stripe.Checkout.Session) {
  if (!session.payment_intent) {
    return null;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    const expandedPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntent.id, {
      expand: ['payment_method']
    });
    return expandedPaymentIntent.payment_method.billing_details.email;
  } catch (e) {
    return null;
  }
}

/**
 * Occurs when a subscription invoice is paid - usually each month.
* */
async function handleInvoicePaymentSucceededEvent(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
  /*const customer = await stripe.customers.retrieve(subscription.customer);*/

  if (invoice.billing_reason !== "subscription_cycle") {
    return;
  }

  const currentDate = new Date();

  // checks for the subscription status and the current billing period end because it needs to make sure that
  // the invoice event is related to an active subscription and that the invoice was generated
  // at the end of a billing cycle.
  const currentBillingPeriodEnd = new Date(subscription.current_period_end * 1000);
  if (subscription.status !== "active" || currentBillingPeriodEnd.getTime() !== currentDate.getTime()) {
    console.log("Subscription status was not active or current billing period was not the same as current date! Returning.");
    return;
  }

  // TODO: Send invoice?
}