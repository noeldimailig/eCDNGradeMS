import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

declare global {
  var queryClient: ReturnType<typeof postgres> | undefined;
  var db: ReturnType<typeof drizzle> | undefined;
}

// Reuse existing global connection in development to prevent multiple instances
const queryClient =
  global.queryClient ??
  postgres(process.env.AUTH_DRIZZLE_URL!, {
    max: 10, // Max concurrent connections
    idle_timeout: 30, // Close idle connections after 30s
  });

export const db = global.db ?? drizzle(queryClient, { schema });

// Store the connection globally (only in development mode)
if (process.env.NODE_ENV !== "production") {
  global.queryClient = queryClient;
  global.db = db;
}
