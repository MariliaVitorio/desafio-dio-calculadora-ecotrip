export interface Route {
  origin: string;
  destination: string;
  distanceKm: number;
}

/** Distâncias aproximadas para fins educacionais e de conscientização ambiental. */
export const DISTANCE_DISCLAIMER =
  "Distâncias aproximadas para fins educacionais e de conscientização ambiental.";

/** Cidades base do Extremo Sul da Bahia */
export const CORE_CITIES = [
  "Alcobaça",
  "Caravelas",
  "Eunápolis",
  "Itamaraju",
  "Mucuri",
  "Nova Viçosa",
  "Porto Seguro",
  "Prado",
  "Teixeira de Freitas",
] as const;

export const DEFAULT_ORIGIN = "Teixeira de Freitas";

/** Cidades destacadas no seletor de origem */
export const POPULAR_CITIES = [
  "Teixeira de Freitas",
  "Eunápolis",
  "Porto Seguro",
  "Itamaraju",
] as const;

/** Vale do Mucuri — Minas Gerais (Prioridade 1) */
export const MG_VALE_MUCURI_P1 = [
  "Águas Formosas",
  "Carlos Chagas",
  "Nanuque",
  "Serra dos Aimorés",
  "Teófilo Otoni",
] as const;

/** Vale do Mucuri — Minas Gerais (Prioridade 2) */
export const MG_VALE_MUCURI_P2 = [
  "Bertópolis",
  "Fronteira dos Vales",
  "Ladainha",
  "Machacalis",
  "Santa Helena de Minas",
] as const;

/** Municípios do Norte do Espírito Santo presentes no simulador */
export const ES_CITIES = [
  "Conceição da Barra",
  "Jaguaré",
  "Linhares",
  "Montanha",
  "Pedro Canário",
  "Pinheiros",
  "São Mateus",
] as const;

export const MG_CITIES = [...MG_VALE_MUCURI_P1, ...MG_VALE_MUCURI_P2] as const;

export const REGION_COVERAGE =
  "Extremo Sul da Bahia, Norte do Espírito Santo e Vale do Mucuri (MG)";

type CityRegion = "ba" | "es" | "mg";

function getCityRegion(city: string): CityRegion {
  if ((MG_CITIES as readonly string[]).includes(city)) return "mg";
  if ((ES_CITIES as readonly string[]).includes(city)) return "es";
  return "ba";
}

function sortCities(cities: string[]): string[] {
  return [...cities].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export interface CityGroup {
  label: string;
  cities: string[];
}

function route(origin: string, destination: string, distanceKm: number): Route {
  return { origin, destination, distanceKm };
}

const ROUTES: Route[] = [
  // ── Extremo Sul da Bahia — Rede principal (CORE_CITIES)
  route("Alcobaça", "Caravelas", 35),
  route("Alcobaça", "Eunápolis", 169),
  route("Alcobaça", "Itamaraju", 75),
  route("Alcobaça", "Mucuri", 150),
  route("Alcobaça", "Nova Viçosa", 118),
  route("Alcobaça", "Porto Seguro", 231),
  route("Alcobaça", "Prado", 25),
  route("Alcobaça", "Teixeira de Freitas", 64),
  route("Caravelas", "Eunápolis", 198),
  route("Caravelas", "Itamaraju", 104),
  route("Caravelas", "Mucuri", 120),
  route("Caravelas", "Nova Viçosa", 22),
  route("Caravelas", "Porto Seguro", 260),
  route("Caravelas", "Prado", 50),
  route("Caravelas", "Teixeira de Freitas", 91),
  route("Eunápolis", "Itamaraju", 105),
  route("Eunápolis", "Mucuri", 258),
  route("Eunápolis", "Nova Viçosa", 255),
  route("Eunápolis", "Porto Seguro", 67),
  route("Eunápolis", "Prado", 194),
  route("Eunápolis", "Teixeira de Freitas", 168),
  route("Itamaraju", "Mucuri", 155),
  route("Itamaraju", "Nova Viçosa", 152),
  route("Itamaraju", "Porto Seguro", 170),
  route("Itamaraju", "Prado", 52),
  route("Itamaraju", "Teixeira de Freitas", 64),
  route("Mucuri", "Nova Viçosa", 33),
  route("Mucuri", "Porto Seguro", 322),
  route("Mucuri", "Prado", 170),
  route("Mucuri", "Teixeira de Freitas", 101),
  route("Nova Viçosa", "Porto Seguro", 318),
  route("Nova Viçosa", "Prado", 135),
  route("Nova Viçosa", "Teixeira de Freitas", 110),
  route("Porto Seguro", "Prado", 215),
  route("Porto Seguro", "Teixeira de Freitas", 230),
  route("Prado", "Teixeira de Freitas", 81),

  // ── Teixeira de Freitas — Entorno regional (BA / ES)
  route("Teixeira de Freitas", "Conceição da Barra", 158),
  route("Teixeira de Freitas", "Guaratinga", 138),
  route("Teixeira de Freitas", "Ibirapuã", 42),
  route("Teixeira de Freitas", "Itabela", 138),
  route("Teixeira de Freitas", "Itagimirim", 198),
  route("Teixeira de Freitas", "Itanhém", 82),
  route("Teixeira de Freitas", "Jaguaré", 178),
  route("Teixeira de Freitas", "Jucuruçu", 104),
  route("Teixeira de Freitas", "Lajedão", 92),
  route("Teixeira de Freitas", "Linhares", 270),
  route("Teixeira de Freitas", "Medeiros Neto", 65),
  route("Teixeira de Freitas", "Montanha", 101),
  route("Teixeira de Freitas", "Pedro Canário", 85),
  route("Teixeira de Freitas", "Pinheiros", 117),
  route("Teixeira de Freitas", "São Mateus", 148),
  route("Teixeira de Freitas", "Vereda", 90),

  // ── Costa do Descobrimento e litoral sul
  route("Belmonte", "Eunápolis", 120),
  route("Belmonte", "Porto Seguro", 118),
  route("Guaratinga", "Itabela", 30),
  route("Guaratinga", "Porto Seguro", 135),
  route("Itabela", "Eunápolis", 29),
  route("Itabela", "Itamaraju", 77),
  route("Itabela", "Porto Seguro", 95),
  route("Santa Cruz Cabrália", "Belmonte", 138),
  route("Santa Cruz Cabrália", "Eunápolis", 85),
  route("Santa Cruz Cabrália", "Porto Seguro", 23),

  // ── Interior — Extremo Sul da Bahia e Norte do ES
  route("Conceição da Barra", "São Mateus", 39),
  route("Ibirapuã", "Medeiros Neto", 29),
  route("Ibirapuã", "Vereda", 45),
  route("Medeiros Neto", "Lajedão", 27),
  route("Medeiros Neto", "Vereda", 35),
  route("Montanha", "Pedro Canário", 42),
  route("Montanha", "Pinheiros", 26),
  route("Pedro Canário", "São Mateus", 63),
  route("São Mateus", "Linhares", 122),

  // ── Minas Gerais — Vale do Mucuri
  // Teixeira de Freitas → MG
  route("Teixeira de Freitas", "Nanuque", 110),
  route("Teixeira de Freitas", "Serra dos Aimorés", 125),
  route("Teixeira de Freitas", "Carlos Chagas", 175),
  route("Teixeira de Freitas", "Águas Formosas", 215),
  route("Teixeira de Freitas", "Teófilo Otoni", 320),
  // Rede interna — eixo Nanuque / Serra dos Aimorés
  route("Nanuque", "Serra dos Aimorés", 18),
  route("Nanuque", "Carlos Chagas", 70),
  route("Nanuque", "Águas Formosas", 115),
  route("Nanuque", "Teófilo Otoni", 215),
  route("Serra dos Aimorés", "Carlos Chagas", 65),
  route("Serra dos Aimorés", "Águas Formosas", 125),
  route("Serra dos Aimorés", "Teófilo Otoni", 225),
  route("Carlos Chagas", "Águas Formosas", 95),
  route("Carlos Chagas", "Teófilo Otoni", 145),
  route("Águas Formosas", "Teófilo Otoni", 120),

  // ── Minas Gerais — Vale do Mucuri
  // Teixeira de Freitas → MG
  route("Teixeira de Freitas", "Machacalis", 165),
  route("Teixeira de Freitas", "Fronteira dos Vales", 195),
  route("Teixeira de Freitas", "Bertópolis", 175),
  route("Teixeira de Freitas", "Santa Helena de Minas", 185),
  route("Teixeira de Freitas", "Ladainha", 260),
  // Rede interna — eixo Machacalis / Bertópolis
  route("Machacalis", "Bertópolis", 22),
  route("Machacalis", "Santa Helena de Minas", 28),
  route("Machacalis", "Fronteira dos Vales", 40),
  route("Bertópolis", "Santa Helena de Minas", 18),
  route("Bertópolis", "Fronteira dos Vales", 35),
  route("Santa Helena de Minas", "Fronteira dos Vales", 25),
  route("Fronteira dos Vales", "Águas Formosas", 42),
  // Ladainha — conexões com eixo P1
  route("Ladainha", "Teófilo Otoni", 85),
  route("Ladainha", "Carlos Chagas", 120),
  route("Ladainha", "Águas Formosas", 145),
];

export class RoutesDB {
  static getAllCities(): string[] {
    const cities = new Set<string>();
    for (const entry of ROUTES) {
      cities.add(entry.origin);
      cities.add(entry.destination);
    }
    return Array.from(cities).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  static getOriginCityGroups(): { popular: string[]; regions: CityGroup[] } {
    const all = RoutesDB.getAllCities();
    const popularSet = new Set<string>(POPULAR_CITIES);
    const popular = POPULAR_CITIES.filter((city) => all.includes(city));

    const buckets: Record<CityRegion, string[]> = { ba: [], es: [], mg: [] };
    for (const city of all) {
      if (popularSet.has(city)) continue;
      buckets[getCityRegion(city)].push(city);
    }

    const regions: CityGroup[] = [
      { label: "📍 Extremo Sul da Bahia", cities: sortCities(buckets.ba) },
      { label: "🌊 Norte do Espírito Santo", cities: sortCities(buckets.es) },
      { label: "⛰ Vale do Mucuri — Minas Gerais", cities: sortCities(buckets.mg) },
    ].filter((group) => group.cities.length > 0);

    return { popular, regions };
  }

  static getDestinationsGrouped(origin: string): CityGroup[] {
    const destinations = RoutesDB.getDestinations(origin);
    const buckets: Record<CityRegion, string[]> = { ba: [], es: [], mg: [] };

    for (const city of destinations) {
      buckets[getCityRegion(city)].push(city);
    }

    return [
      { label: "📍 Extremo Sul da Bahia", cities: sortCities(buckets.ba) },
      { label: "🌊 Norte do Espírito Santo", cities: sortCities(buckets.es) },
      { label: "⛰ Vale do Mucuri — Minas Gerais", cities: sortCities(buckets.mg) },
    ].filter((group) => group.cities.length > 0);
  }

  static getRegionalStats(): { ba: number; es: number; mg: number } {
    const all = RoutesDB.getAllCities();
    return {
      ba: all.filter((city) => getCityRegion(city) === "ba").length,
      es: all.filter((city) => getCityRegion(city) === "es").length,
      mg: all.filter((city) => getCityRegion(city) === "mg").length,
    };
  }

  static getDestinations(origin: string): string[] {
    if (!origin) return [];

    const destinations = new Set<string>();
    for (const entry of ROUTES) {
      if (entry.origin === origin) destinations.add(entry.destination);
      if (entry.destination === origin) destinations.add(entry.origin);
    }

    return Array.from(destinations).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  static findDistance(origin: string, destination: string): number | null {
    if (origin === destination) return 0;

    const match = ROUTES.find(
      (entry) =>
        (entry.origin === origin && entry.destination === destination) ||
        (entry.origin === destination && entry.destination === origin),
    );

    return match?.distanceKm ?? null;
  }

  static getRouteCount(): number {
    return ROUTES.length;
  }

  static getSimulatorStats(): { cityCount: number; routeCount: number } {
    return {
      cityCount: RoutesDB.getAllCities().length,
      routeCount: ROUTES.length,
    };
  }
}
