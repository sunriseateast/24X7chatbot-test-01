import { integer, pgEnum, pgTable, varchar, boolean,bigint } from "drizzle-orm/pg-core";

export const planStatusEnum=pgEnum('plan_status',["paid","free"])

export const usersinfoTable = pgTable("users_info", {

  userId: varchar({ length: 255 }).primaryKey().notNull().unique(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified:boolean('email_verfied').notNull().default(false),
  planStatus:planStatusEnum().notNull().default('free'),
  duration:varchar({ length: 255 }).notNull().default('30days'),
  activeon: bigint("activeon", { mode: "number" }).notNull(),
  expiry: bigint("expiry", { mode: "number" }).notNull()
});
