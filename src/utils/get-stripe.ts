import { Stripe, loadStripe } from '@stripe/stripe-js';
import {env} from "~/env.mjs";

let stripePromise: Promise<Stripe | null>;
export default function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  }
  return stripePromise;
};