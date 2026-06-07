import { useListTrips, useDeleteTrip, getGetTripStatsQueryKey, getListTripsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ArrowRight, Leaf, Trees } from "lucide-react";
import { MODAL_INFO, getEcoScoreClassification } from "@/lib/constants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function History() {
  const { data: trips, isLoading } = useListTrips();
  const deleteTrip = useDeleteTrip();
  const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja apagar este registro?")) {
      deleteTrip.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTripsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetTripStatsQueryKey() });
        }
      });
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando histórico...</div>;
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <Trees className="w-12 h-12 text-primary/50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Nenhuma viagem registrada</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Sua jornada sustentável começa aqui. Calcule sua primeira viagem para entender seu impacto.</p>
        </div>
        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          Simular Viagem
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Viagens</h1>
        <p className="text-muted-foreground">O registro do seu impacto ambiental e necessidade de compensação.</p>
      </div>

      <div className="space-y-4">
        {trips.map((trip, i) => {
          const info = MODAL_INFO[trip.modal];
          const scoreClass = getEcoScoreClassification(trip.ecoScore);
          
          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-primary/50 transition-colors">
                <div className="space-y-3 flex-1 w-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded text-foreground font-medium">
                      {format(new Date(trip.createdAt), "dd MMM yyyy", { locale: ptBR })}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-foreground bg-primary/5 px-2 py-1 rounded">
                      <span className="text-lg">{info?.icon}</span>
                      {info?.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 font-semibold text-lg break-all">
                    <span>{trip.origin}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{trip.destination}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="font-normal text-xs">
                      {trip.distanceKm.toFixed(1)} km
                    </Badge>
                    <Badge variant="outline" className="font-normal text-xs border-primary/20 text-primary">
                      {trip.emissionKg.toFixed(1)} kg CO₂
                    </Badge>
                    <Badge variant="outline" className={`font-normal text-xs ${scoreClass.color}`}>
                      {scoreClass.badge} Score {trip.ecoScore}
                    </Badge>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="text-center sm:text-right">
                    <div className="text-2xl font-bold text-primary flex items-center gap-1.5 sm:justify-end">
                      <Leaf className="w-5 h-5" /> {trip.seedlings}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">mudas para<br/>compensar</div>
                  </div>
                  
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(trip.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
