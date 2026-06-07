import type { TripModal } from "@/lib/types";

export const EMISSION_FACTORS: Record<TripModal, number> = {
  walking: 0,
  bicycle: 0,
  metro: 0.02,
  train: 0.03,
  bus: 0.09,
  car_ethanol: 0.06,
  motorcycle: 0.11,
  car_gasoline: 0.21,
  car_electric: 0.02,
  airplane: 0.25,
};

export const MODAL_INFO: Record<TripModal, { label: string; icon: string }> = {
  walking: { label: "Caminhada", icon: "🚶" },
  bicycle: { label: "Bicicleta", icon: "🚲" },
  motorcycle: { label: "Motocicleta", icon: "🏍" },
  car_gasoline: { label: "Carro Gasolina", icon: "🚗" },
  car_ethanol: { label: "Carro Etanol", icon: "🌱" },
  car_electric: { label: "Carro Elétrico", icon: "🔋" },
  bus: { label: "Ônibus", icon: "🚌" },
  train: { label: "Trem", icon: "🚆" },
  metro: { label: "Metrô", icon: "🚇" },
  airplane: { label: "Avião", icon: "✈" },
};

export function calculateEmission(distanceKm: number, modal: TripModal): number {
  return distanceKm * EMISSION_FACTORS[modal];
}

export function calculateEcoScore(emissionKg: number, distanceKm: number): number {
  if (distanceKm === 0) return 100;
  const maxEmission = distanceKm * EMISSION_FACTORS.airplane;
  if (maxEmission === 0) return 100;
  const score = 100 - (emissionKg / maxEmission) * 100;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getEcoScoreClassification(score: number): { label: string; badge: string; color: string } {
  if (score >= 90) return { label: "Guardião da Floresta", badge: "🌳", color: "bg-green-100 text-green-800 border-green-200" };
  if (score >= 70) return { label: "Viajante Sustentável", badge: "🌱", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  if (score >= 50) return { label: "Em Transição", badge: "🍃", color: "bg-yellow-100 text-yellow-800 border-yellow-200" };
  return { label: "Alto Impacto", badge: "⚠", color: "bg-red-100 text-red-800 border-red-200" };
}

export function calculateSeedlings(emissionKg: number): number {
  return Math.ceil(emissionKg / 15);
}

export function calculateRestorationArea(seedlings: number): number {
  return seedlings * 4;
}
