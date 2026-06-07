import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Leaf, ArrowRight, Save, LeafyGreen, Trees } from "lucide-react";
import { useCalculateDistance, useCreateTrip, getListTripsQueryKey, TripModal, TripInputModal } from "@workspace/api-client-react";
import { 
  MODAL_INFO, 
  calculateEmission, 
  calculateEcoScore, 
  getEcoScoreClassification, 
  calculateSeedlings, 
  calculateRestorationArea 
} from "@/lib/constants";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const calculateDistance = useCalculateDistance();
  const createTrip = useCreateTrip();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isManualDistance, setIsManualDistance] = useState(true);
  const [distanceKm, setDistanceKm] = useState("");
  const [originLat, setOriginLat] = useState("");
  const [originLng, setOriginLng] = useState("");
  const [destLat, setDestLat] = useState("");
  const [destLng, setDestLng] = useState("");
  const [selectedModal, setSelectedModal] = useState<TripModal | null>(null);

  const [result, setResult] = useState<{
    emissionKg: number;
    ecoScore: number;
    seedlings: number;
    restorationAreaM2: number;
    distance: number;
  } | null>(null);

  const handleCalculate = async () => {
    if (!origin || !destination) {
      toast({ title: "Erro", description: "Preencha origem e destino.", variant: "destructive" });
      return;
    }
    if (!selectedModal) {
      toast({ title: "Erro", description: "Selecione um meio de transporte.", variant: "destructive" });
      return;
    }

    let finalDistance = 0;
    if (isManualDistance) {
      if (!distanceKm || isNaN(Number(distanceKm))) {
        toast({ title: "Erro", description: "Insira uma distância válida em KM.", variant: "destructive" });
        return;
      }
      finalDistance = Number(distanceKm);
    } else {
      if (!originLat || !originLng || !destLat || !destLng) {
        toast({ title: "Erro", description: "Preencha todas as coordenadas.", variant: "destructive" });
        return;
      }
      try {
        const res = await calculateDistance.mutateAsync({
          data: {
            originLat: Number(originLat),
            originLng: Number(originLng),
            destLat: Number(destLat),
            destLng: Number(destLng),
          }
        });
        finalDistance = res.distanceKm;
      } catch (err) {
        toast({ title: "Erro", description: "Falha ao calcular distância.", variant: "destructive" });
        return;
      }
    }

    const emissionKg = calculateEmission(finalDistance, selectedModal);
    const ecoScore = calculateEcoScore(emissionKg, finalDistance);
    const seedlings = calculateSeedlings(emissionKg);
    const restorationAreaM2 = calculateRestorationArea(seedlings);

    setResult({ emissionKg, ecoScore, seedlings, restorationAreaM2, distance: finalDistance });
  };

  const handleSave = () => {
    if (!result || !selectedModal) return;

    createTrip.mutate({
      data: {
        origin,
        destination,
        distanceKm: result.distance,
        modal: selectedModal as unknown as TripInputModal,
        emissionKg: result.emissionKg,
        ecoScore: result.ecoScore,
        seedlings: result.seedlings,
        restorationAreaM2: result.restorationAreaM2,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Sucesso!", description: "Viagem salva no histórico." });
        queryClient.invalidateQueries({ queryKey: getListTripsQueryKey() });
        setResult(null);
        setOrigin("");
        setDestination("");
        setDistanceKm("");
        setSelectedModal(null);
      },
      onError: () => {
        toast({ title: "Erro", description: "Não foi possível salvar a viagem.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <section className="text-center space-y-4 py-8">
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

      <Card className="p-6 md:p-8 shadow-lg border-primary/10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-primary" /> Rota
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Origem</Label>
                  <Input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Ex: São Paulo, SP" />
                </div>
                <div className="space-y-2">
                  <Label>Destino</Label>
                  <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Ex: Rio de Janeiro, RJ" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox id="manual" checked={isManualDistance} onCheckedChange={(c) => setIsManualDistance(c as boolean)} />
                <Label htmlFor="manual" className="cursor-pointer">Inserir distância manualmente</Label>
              </div>

              {isManualDistance ? (
                <div className="space-y-2">
                  <Label>Distância (KM)</Label>
                  <Input type="number" value={distanceKm} onChange={(e) => setDistanceKm(e.target.value)} placeholder="Ex: 400" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-xs">Lat Origem</Label>
                    <Input type="number" value={originLat} onChange={(e) => setOriginLat(e.target.value)} placeholder="-23.55" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Lng Origem</Label>
                    <Input type="number" value={originLng} onChange={(e) => setOriginLng(e.target.value)} placeholder="-46.63" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Lat Destino</Label>
                    <Input type="number" value={destLat} onChange={(e) => setDestLat(e.target.value)} placeholder="-22.90" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Lng Destino</Label>
                    <Input type="number" value={destLng} onChange={(e) => setDestLng(e.target.value)} placeholder="-43.17" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Meio de Transporte</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(Object.entries(MODAL_INFO) as [TripModal, {label: string; icon: string}][]).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModal(key)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
                    selectedModal === key 
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" 
                      : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-primary/5 hover-elevate"
                  }`}
                >
                  <span className="text-3xl mb-2 block">{info.icon}</span>
                  <span className="text-xs font-medium text-center">{info.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <Button size="lg" onClick={handleCalculate} disabled={calculateDistance.isPending} className="w-full sm:w-auto px-8">
            {calculateDistance.isPending ? "Calculando..." : "Calcular Impacto"}
          </Button>
        </div>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-2 bg-gradient-to-br from-card to-card border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">Emissão de CO₂</div>
              <div className="text-4xl font-bold text-foreground">{result.emissionKg.toFixed(1)} <span className="text-xl text-muted-foreground">kg</span></div>
              <div className="text-xs text-muted-foreground mt-2">Para {result.distance.toFixed(1)} km percorridos</div>
            </Card>
            
            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-2 border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">Mudas Necessárias</div>
              <div className="text-4xl font-bold text-primary flex items-center gap-2">
                <Leaf className="w-8 h-8" /> {result.seedlings}
              </div>
              <div className="text-xs text-muted-foreground mt-2">Restaurando {result.restorationAreaM2} m² de área</div>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center justify-center space-y-3 border-primary/20">
              <div className="text-muted-foreground text-sm font-medium">EcoScore</div>
              <div className="text-4xl font-bold">{result.ecoScore}</div>
              <Badge variant="outline" className={`mt-2 ${getEcoScoreClassification(result.ecoScore).color} px-3 py-1 text-sm`}>
                {getEcoScoreClassification(result.ecoScore).badge} {getEcoScoreClassification(result.ecoScore).label}
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
                  Para neutralizar a emissão de <strong>{result.emissionKg.toFixed(1)}kg de CO₂</strong> desta viagem, 
                  o plantio de <strong>{result.seedlings} {result.seedlings === 1 ? 'muda nativa' : 'mudas nativas'}</strong> é recomendado. 
                  Isso ajuda a restaurar ecossistemas degradados e proteger a biodiversidade local.
                </p>
              </div>
              <Button onClick={handleSave} disabled={createTrip.isPending} size="lg" className="shrink-0 gap-2">
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
