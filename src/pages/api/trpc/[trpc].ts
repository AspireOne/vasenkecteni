import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import * as trpcNext from '@trpc/server/adapters/next';
import {ZodError} from "zod";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({error, path}) => {
    if (env.NODE_ENV === "development") {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
      );
    }

    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // TODO: send to bug reporting.
    }

    if (error.cause instanceof ZodError) {
      // Returning only first zod error message to client
      error.message = JSON.parse(error.message)[0].message;
    }
  }
});
