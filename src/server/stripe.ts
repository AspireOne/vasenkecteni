import {Stripe} from "stripe";
import {DonateFormData} from "~/components/SupportUsForm";
import {pages} from "~/constants";
import {prisma} from "~/server/db";

const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: '2022-11-15',
});

export class StripeHelper {
  public static async cancelSubscription(subId: string) {
    await stripe.subscriptions.del(subId);
  }

  public static async createSession(data: DonateFormData, origin: string, refId?: string) {
    const once = data.frequency === "once";

    const session = await stripe.checkout.sessions.create({
      mode: once ? 'payment' : "subscription",
      submit_type: once ? 'donate' : undefined,
      payment_method_types: ['card'],
      currency: 'CZK',
      locale: 'cs',
      customer_email: data.email,
      allow_promotion_codes: false,
      automatic_tax: {enabled: false},
      client_reference_id: refId,

      success_url: `${origin}${pages.orderResult.path}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
      metadata: {},

      // line items for subscription.
      line_items: [
        {
          price_data: {
            currency: 'CZK',
            unit_amount: data.amount * 100,

            tax_behavior: "inclusive",
            recurring: once ? undefined : {
              interval: 'month',
              interval_count: 1,
            },

            product_data: {
              name: once ? "Příspěvek" : "Měsíční příspěvek",
              description: "na podporu Vášeň ke čtení",
              images: ["https://vasenkecteni.cz/logo-circular.png"],
            },
          },
          quantity: 1,
        },
      ],
    });

    return session;
  }
}