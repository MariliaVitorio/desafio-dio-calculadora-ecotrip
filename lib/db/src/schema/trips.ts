import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tripsTable = pgTable("trips", {
  id: serial("id").primaryKey(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  distanceKm: real("distance_km").notNull(),
  modal: text("modal").notNull(),
  emissionKg: real("emission_kg").notNull(),
  ecoScore: integer("eco_score").notNull(),
  seedlings: integer("seedlings").notNull(),
  restorationAreaM2: real("restoration_area_m2").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTripSchema = createInsertSchema(tripsTable).omit({ id: true, createdAt: true });
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Trip = typeof tripsTable.$inferSelect;
