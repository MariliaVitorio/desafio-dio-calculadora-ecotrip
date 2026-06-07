import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, tripsTable } from "@workspace/db";
import {
  ListTripsResponse,
  CreateTripBody,
  DeleteTripParams,
  GetTripStatsResponse,
  CalculateDistanceBody,
  CalculateDistanceResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/trips/stats", async (req, res): Promise<void> => {
  const trips = await db.select().from(tripsTable);

  if (trips.length === 0) {
    const empty = GetTripStatsResponse.parse({
      totalTrips: 0,
      totalEmissionKg: 0,
      totalSeedlings: 0,
      totalDistanceKm: 0,
      averageEcoScore: 0,
      mostUsedModal: null,
      emissionByModal: [],
    });
    res.json(empty);
    return;
  }

  const totalTrips = trips.length;
  const totalEmissionKg = trips.reduce((s, t) => s + t.emissionKg, 0);
  const totalSeedlings = trips.reduce((s, t) => s + t.seedlings, 0);
  const totalDistanceKm = trips.reduce((s, t) => s + t.distanceKm, 0);
  const averageEcoScore = trips.reduce((s, t) => s + t.ecoScore, 0) / totalTrips;

  const modalMap: Record<string, { totalEmissionKg: number; tripCount: number }> = {};
  for (const t of trips) {
    if (!modalMap[t.modal]) modalMap[t.modal] = { totalEmissionKg: 0, tripCount: 0 };
    modalMap[t.modal].totalEmissionKg += t.emissionKg;
    modalMap[t.modal].tripCount += 1;
  }

  const emissionByModal = Object.entries(modalMap).map(([modal, v]) => ({
    modal,
    totalEmissionKg: v.totalEmissionKg,
    tripCount: v.tripCount,
  }));

  const mostUsedModal = emissionByModal.reduce(
    (best, m) => (best === null || m.tripCount > best.tripCount ? m : best),
    null as (typeof emissionByModal)[0] | null,
  )?.modal ?? null;

  res.json(
    GetTripStatsResponse.parse({
      totalTrips,
      totalEmissionKg,
      totalSeedlings,
      totalDistanceKm,
      averageEcoScore,
      mostUsedModal,
      emissionByModal,
    }),
  );
});

router.post("/trips/distance", async (req, res): Promise<void> => {
  const parsed = CalculateDistanceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { originLat, originLng, destLat, destLng } = parsed.data;

  const R = 6371;
  const dLat = ((destLat - originLat) * Math.PI) / 180;
  const dLng = ((destLng - originLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((originLat * Math.PI) / 180) *
      Math.cos((destLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  res.json(CalculateDistanceResponse.parse({ distanceKm: Math.round(distanceKm * 10) / 10 }));
});

router.get("/trips", async (req, res): Promise<void> => {
  const trips = await db.select().from(tripsTable).orderBy(desc(tripsTable.createdAt));
  res.json(
    ListTripsResponse.parse(
      trips.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
    ),
  );
});

router.post("/trips", async (req, res): Promise<void> => {
  const parsed = CreateTripBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [trip] = await db.insert(tripsTable).values(parsed.data).returning();
  res.status(201).json({ ...trip, createdAt: trip.createdAt.toISOString() });
});

router.delete("/trips/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteTripParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(tripsTable)
    .where(eq(tripsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Trip not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
