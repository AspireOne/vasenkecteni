import {z} from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {StripeHelper} from "~/server/stripe";
import {TRPCError} from "@trpc/server";
import {prisma} from "~/server/db";

const donationInput = z.object({
  amount: z.number().min(20, {message: "Musíte zadat částku větší, než 20Kč."}),
  frequency: z.enum(["once", "monthly"]),
  email: z.string().email({message: "Musíte zadat platný email."}).optional()
});

const donationInputRefined = donationInput.refine(data => {
  // If the frequency is 'monthly', make sure the email is not undefined or empty.
  return !(data.frequency === 'monthly' && (!data.email || data.email.trim() === ''));

}, {
  // This is the error message to display if validation fails.
  message: "Email je povinný."
});

export const donationRouter = createTRPCRouter({
  getPayments: protectedProcedure
    .output(z.object({
      subscription: z.object({
        id: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        amount: z.number(),
      }).nullish(),
      donations: z.array(z.object({
        id: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        amount: z.number(),
      })),
    }))
    .query(async ({input, ctx}) => {
      const subscription = await prisma.subscription.findFirst({
        where: {
          email: ctx.session.user.email!
        }
      });
      const donations = await prisma.donation.findMany({
        where: {
          email: ctx.session.user.email
        }
      })
      return {
        subscription,
        donations
      }
    }),

  cancelSubscription: protectedProcedure
    .mutation(async ({input, ctx}) => {
      const sub = await prisma.subscription.findFirst({
        where: {email: ctx.session.user.email!}
      })

      if (!sub) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Na tento e-mail není nastavený měsíční příspěvek."
        })
      }

      try {
        await StripeHelper.cancelSubscription(sub.subscriptionId);
        await prisma.subscription.delete({
          where: {
            id: sub.id
          }
        })
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Chyba při rušení měsíční platby.",
        });
      }
    }),

  createSession: publicProcedure
    .input(donationInputRefined)
    .mutation(async ({input, ctx}) => {
      if (input.frequency === "monthly") {
        const sub = await prisma.subscription.findFirst({
          where: {
            email: input.email
          }
        })

        if (!!sub) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Na tento e-mail je již měsíční příspěvek nastavený. Své platby můžete spravovat v sekci s příspěvky."
          })
        }
      }

      try {
        return StripeHelper.createSession(input, ctx.req.headers.origin || "https://vasenkecteni.cz/", input.email);
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Chyba při zpracovávání platby.",
        });
      }
    }),
});
