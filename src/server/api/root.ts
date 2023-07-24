import {exampleRouter} from "~/server/api/routers/example";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

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
      message: z.string().min(1, {message: "Musíte zadat zprávu."}),
    }))
    .mutation(({input}) => {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Tato funkce ještě není implementovaná.",
      })
    }),

  donate: publicProcedure
    .input(z.object({
      amount: z.number().min(1, {message: "Musíte zadat částku větší než 0."}),
      frequency: z.enum(["once", "monthly"]),
    }))
    .mutation(({input}) => {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Tato funkce ještě není implementovaná.",
      })
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
