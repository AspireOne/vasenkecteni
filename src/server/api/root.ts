import {donationRouter} from "~/server/api/routers/donation";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";
import Mail from "~/server/mail";
import {StripeHelper} from "~/server/stripe";
import {prisma} from "~/server/db";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  submitContactForm: publicProcedure
    .input(z.object({
      name: z.string().min(1, {message: "Musíte zadat jméno."}),
      email: z.string().email({message: "Musíte zadat platný email."}),
      phone: z.string().optional(),
      message: z.string().min(5, {message: "Zpráva je příliš krátká."}),
    }))
    .mutation(async ({input}) => {
      await Mail.sendFormSubmissionMail(input);
      //setTimeout(() => Mail.sendFormSubmissionAcknowledgementMail(input.email), 200);
    }),

  testDb: publicProcedure
    .output(z.boolean())
    .query(async () => {
      
      try {
        const count = await prisma.user.count();
        return count >= 0;
      } catch (err) {
        console.error(err);
        return false;
      }
    }),
  donation: donationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
