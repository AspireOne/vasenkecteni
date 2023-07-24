import { exampleRouter } from "~/server/api/routers/example";
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
      name: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string(),
    }))
    .mutation(({ input }) => {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Tato funkce ještě není implementovaná.",
      })
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
