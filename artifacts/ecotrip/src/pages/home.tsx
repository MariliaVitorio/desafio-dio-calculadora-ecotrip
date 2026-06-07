import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Leaf, MapPin, PenLine, Save, LeafyGreen, Trees } from "lucide-react";
import type { TripModal } from "@/lib/types";
import {
  MODAL_INFO,
  calculateEmission,
  calculateEcoScore,
  getEcoScoreClassification,
  calculateSeedlings,
  calculateRestorationArea,
} from "@/lib/constants";
import { DEFAULT_ORIGIN, RoutesDB } from "@/lib/routes-db";
import { cn } from "@/lib/utils";

const ORIGIN_GROUPS = RoutesDB.getOriginCityGroups();

const VALIDATION_TOAST = { variant: "destructive" as const, duration: 3500 };

type DistanceInputMode = "route" | "manual";

const DISTANCE_MODE_TOGGLE_CLASS =
  "flex-1 h-10 rounded-xl border gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=off]:bg-card data-[state=off]:hover:border-primary/50";

export default function Home() {
  const { toast, dismiss } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
  const [destination, setDestination] = useState("");
  const [distanceInputMode, setDistanceInputMode] = useState<DistanceInputMode>("route");
  const isManualDistance = distanceInputMode === "manual";
  const [distanceKm, setDistanceKm] = useState("");
  const [selectedModal, setSelectedModal] = useState<TripModal | null>(null);

  const [result, setResult] = useState<{
    emissionKg: number;
    ecoScore: number;
    seedlings: number;
    restorationAreaM2: number;
    distance: number;
  } | null>(null);

  const destinationGroups = useMemo(
    () => RoutesDB.getDestinationsGrouped(origin),
    [origin],
  );

  const destinationCount = useMemo(
    () => destinationGroups.reduce((total, group) => total + group.cities.length, 0),
    [destinationGroups],
  );

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    setDestination("");
    setDistanceKm("");
  };

  const handleDistanceModeChange = (mode: DistanceInputMode) => {
    if (mode === distanceInputMode) return;

    setDistanceInputMode(mode);

    if (mode === "manual") {
      setOrigin("");
      setDestination("");
      setDistanceKm("");
      return;
    }

    setOrigin(DEFAULT_ORIGIN);
    setDestination("");
    setDistanceKm("");
  };

  useEffect(() => {
    if (isManualDistance || !origin || !destination) return;

    const distance = RoutesDB.findDistance(origin, destination);
    if (distance !== null) {
      setDistanceKm(String(distance));
    } else {
      setDistanceKm("");
    }
  }, [origin, destination, isManualDistance]);

  useEffect(() => {
    if (!result) return;

    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);

    return () => window.clearTimeout(timer);
  }, [result]);

  const handleCalculate = () => {
    if (!selectedModal) {
      toast({
        ...VALIDATION_TOAST,
        title: "Erro",
        description: "Selecione um meio de transporte.",
      });
      return;
    }

    let finalDistance = 0;

    if (isManualDistance) {
      if (!distanceKm || isNaN(Number(distanceKm)) || Number(distanceKm) <= 0) {
        toast({
          ...VALIDATION_TOAST,
          title: "Atenção",
          description: "Informe uma distância válida para continuar.",
        });
        return;
      }
      finalDistance = Number(distanceKm);
    } else {
      if (!origin || !destination) {
        toast({
          ...VALIDATION_TOAST,
          title: "Erro",
          description: "Selecione origem e destino.",
        });
        return;
      }
      if (origin === destination) {
        toast({
          ...VALIDATION_TOAST,
          title: "Erro",
          description: "Origem e destino devem ser diferentes.",
        });
        return;
      }

      const distance = RoutesDB.findDistance(origin, destination);
      finalDistance = distance ?? Number(distanceKm);
    }

    dismiss();

    const emissionKg = calculateEmission(finalDistance, selectedModal);
    const ecoScore = calculateEcoScore(emissionKg, finalDistance);
    const seedlings = calculateSeedlings(emissionKg);
    const restorationAreaM2 = calculateRestorationArea(seedlings);

    setResult({ emissionKg, ecoScore, seedlings, restorationAreaM2, distance: finalDistance });
    setIsSearchExpanded(false);
  };

  const handleSave = () => {
    toast({
      variant: "info",
      duration: 4000,
      title: "🚧 Funcionalidade em desenvolvimento",
      description:
        "O histórico de viagens estará disponível em uma próxima versão do EcoTrip Arboretum.",
    });
  };

  const modalInfo = selectedModal ? MODAL_INFO[selectedModal] : null;
  const showRouteSummary = !isManualDistance && origin && destination;

  return (
    <div className={cn("max-w-4xl mx-auto pb-16", result ? "space-y-6" : "space-y-12")}>
      <section className={cn("text-center space-y-4", result ? "py-4" : "py-8")}>
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <LeafyGreen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Calcule sua Pegada Ecológica
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Descubra o impacto das suas viagens e saiba quantas mudas nativas são necessárias para restaurar o equilíbrio ambiental, inspirado no Programa Arboretum.
        </p>
      </section>

      <Card className="shadow-lg border-primary/10 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 border-b border-primary/10 bg-card">
          <div className="flex-1 min-w-0">
            {isSearchExpanded ? (
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-primary shrink-0" /> Simular viagem
              </h2>
            ) : (
              <div className="space-y-2">
                {showRouteSummary ? (
                  <div className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                    <span>{origin}</span>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>{destination}</span>
                  </div>
                ) : (
                  <div className="font-semibold text-foreground">
                    Viagem com distância informada manualmente
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  {modalInfo && (
                    <span className="inline-flex items-center gap-1.5">
                      <span>{modalInfo.icon}</span>
                      {modalInfo.label}
                    </span>
                  )}
                  {distanceKm && (
                    <>
                      {modalInfo && <span aria-hidden="true">·</span>}
                      <span>{Number(distanceKm).toFixed(1)} km</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSearchExpanded((expanded) => !expanded)}
            className="shrink-0 border-primary/20 text-primary hover:bg-primary/5"
          >
            {isSearchExpanded ? "▲ Ocultar Pesquisa" : "▼ Expandir Pesquisa"}
          </Button>
        </div>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isSearchExpanded ? "max-h-[2400px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="text-primary" /> Rota
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Origem</Label>
                      <Select
                        value={origin || undefined}
                        onValueChange={handleOriginChange}
                        disabled={isManualDistance}
                      >
                        <SelectTrigger disabled={isManualDistance} className={isManualDistance ? "bg-muted/50" : undefined}>
                          <SelectValue placeholder={isManualDistance ? "" : "Selecione a cidade de origem"} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          <SelectGroup>
                            <SelectLabel className="text-primary">🌿 Mais utilizadas</SelectLabel>
                            {ORIGIN_GROUPS.popular.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          {ORIGIN_GROUPS.regions.map((group) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                      {!isManualDistance && origin === DEFAULT_ORIGIN && (
                        <p className="text-xs text-muted-foreground">
                          🌿 Cidade base do Programa Arboretum
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Destino</Label>
                      <Select
                        value={destination || undefined}
                        onValueChange={setDestination}
                        disabled={isManualDistance || !origin}
                      >
                        <SelectTrigger
                          disabled={isManualDistance || !origin}
                          className={isManualDistance ? "bg-muted/50" : undefined}
                        >
                          <SelectValue
                            placeholder={
                              isManualDistance
                                ? ""
                                : `${destinationCount} destinos disponíveis`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {destinationGroups.map((group) => (
                            <SelectGroup key={group.label}>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Modo de distância</Label>
                    <ToggleGroup
                      type="single"
                      value={distanceInputMode}
                      onValueChange={(value) => {
                        if (value === "route" || value === "manual") {
                          handleDistanceModeChange(value);
                        }
                      }}
                      className="grid w-full grid-cols-2 gap-2"
                      variant="outline"
                    >
                      <ToggleGroupItem value="route" className={DISTANCE_MODE_TOGGLE_CLASS} aria-label="Calcular por rota">
                        <MapPin className="w-4 h-4" />
                        Por rota
                      </ToggleGroupItem>
                      <ToggleGroupItem value="manual" className={DISTANCE_MODE_TOGGLE_CLASS} aria-label="Inserir distância manualmente">
                        <PenLine className="w-4 h-4" />
                        Distância manual
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Distância (KM)</Label>
                    <Input
                      type="number"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(e.target.value)}
                      placeholder={isManualDistance ? "Informe a distância da viagem" : "Ex: 68"}
                      readOnly={!isManualDistance}
                      className={!isManualDistance ? "bg-muted/50" : undefined}
                      min={isManualDistance ? 1 : undefined}
                    />
                    {isManualDistance ? (
                      <p className="text-xs text-muted-foreground">
                        Modo manual ativo. A distância será utilizada diretamente no cálculo ambiental.
                      </p>
                    ) : (
                      origin &&
                      destination &&
                      distanceKm && (
                        <p className="text-xs text-muted-foreground">
                          Distância preenchida automaticamente a partir das rotas cadastradas.
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Meio de Transporte</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.entries(MODAL_INFO) as [TripModal, { label: string; icon: string }][]).map(
                    ([key, info]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedModal(key)}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200",
                          selectedModal === key
                            ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                            : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-primary/5 hover-elevate",
                        )}
                      >
                        <span className="text-3xl mb-2 block">{info.icon}</span>
                        <span className="text-xs font-medium text-center">{info.label}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end">
              <Button size="lg" onClick={handleCalculate} className="w-full sm:w-auto px-8">
                Calcular Impacto
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {result && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="scroll-mt-24 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-2 bg-gradient-to-br from-card to-card border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">Emissão de CO₂</div>
              <div className="text-4xl font-bold text-foreground">
                {result.emissionKg.toFixed(1)} <span className="text-xl text-muted-foreground">kg</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Para {result.distance.toFixed(1)} km percorridos
              </div>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-2 border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">Mudas Necessárias</div>
              <div className="text-4xl font-bold text-primary flex items-center gap-2">
                <Leaf className="w-8 h-8" /> {result.seedlings}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Restaurando {result.restorationAreaM2} m² de área
              </div>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-3 border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">EcoScore</div>
              <div className="text-4xl font-bold">{result.ecoScore}</div>
              <Badge
                variant="outline"
                className={`mt-2 ${getEcoScoreClassification(result.ecoScore).color} px-3 py-1 text-sm`}
              >
                {getEcoScoreClassification(result.ecoScore).badge}{" "}
                {getEcoScoreClassification(result.ecoScore).label}
              </Badge>
            </Card>
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
                  <Trees className="w-5 h-5" /> Compensação Florestal
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para neutralizar a emissão de <strong>{result.emissionKg.toFixed(1)}kg de CO₂</strong> desta
                  viagem, o plantio de{" "}
                  <strong>
                    {result.seedlings} {result.seedlings === 1 ? "muda nativa" : "mudas nativas"}
                  </strong>{" "}
                  é recomendado. Isso ajuda a restaurar ecossistemas degradados e proteger a biodiversidade local.
                </p>
              </div>
              <Button onClick={handleSave} size="lg" className="shrink-0 gap-2">
                <Save className="w-4 h-4" />
                Salvar no Histórico
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
