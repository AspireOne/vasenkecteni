import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {StripeHelper} from "~/server/stripe";
import {TRPCError} from "@trpc/server";

export const donationRouter = createTRPCRouter({
  getSession: publicProcedure
    .input(z.object({
      amount: z.number().min(20, {message: "Musíte zadat částku větší, než 20Kč."}),
      frequency: z.enum(["once", "monthly"]),
    }))
    .mutation(({input, ctx}) => {
      try {
        return StripeHelper.createSession(input, ctx.req.headers.origin || "https://vasenkecteni.cz/");
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Chyba při zpracovávání platby.",
        });
      }
    }),
});
