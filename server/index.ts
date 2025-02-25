import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/server/schema';

const queryClient = postgres(process.env.AUTH_DRIZZLE_URL!);
export const db = drizzle(queryClient, {schema});