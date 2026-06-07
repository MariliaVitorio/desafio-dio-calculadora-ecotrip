import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Sprout } from "lucide-react";
import { MODAL_INFO } from "@/lib/constants";
import { REGION_COVERAGE, RoutesDB } from "@/lib/routes-db";
import {
  ENVIRONMENTAL_CURIOSITIES,
  SUSTAINABILITY_TIPS,
  pickRandom,
} from "@/lib/dashboard-content";

const ARBORETUM_URL = "https://www.programaarboretum.eco.br/";

const { cityCount, routeCount } = RoutesDB.getSimulatorStats();
const regionalStats = RoutesDB.getRegionalStats();
const modalCount = Object.keys(MODAL_INFO).length;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;

export default function Dashboard() {
  const [curiosity] = useState(() => pickRandom(ENVIRONMENTAL_CURIOSITIES));
  const [tip] = useState(() => pickRandom(SUSTAINABILITY_TIPS));

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="space-y-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Visão geral do simulador: indicadores, curiosidades ambientais e dicas de mobilidade
          sustentável.
        </p>
      </motion.div>

      {/* Seção 1 — Estatísticas do simulador */}
      <motion.section {...fadeUp} className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Estatísticas do Simulador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="p-6 space-y-3 border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground">🏙 Municípios Disponíveis</p>
            <p className="text-3xl font-bold text-foreground">{cityCount}</p>
            <p className="text-xs text-muted-foreground">
              {regionalStats.ba} BA · {regionalStats.es} ES · {regionalStats.mg} MG
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground">🛣 Rotas Disponíveis</p>
            <p className="text-3xl font-bold text-foreground">{routeCount}</p>
            <p className="text-xs text-muted-foreground">rotas cadastradas</p>
          </Card>

          <Card className="p-6 space-y-3 border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-muted-foreground">🚗 Modais de Transporte</p>
            <p className="text-3xl font-bold text-foreground">{modalCount}</p>
            <p className="text-xs text-muted-foreground">modais disponíveis</p>
          </Card>

          <Card className="p-6 space-y-3 bg-primary/5 border-primary/20 shadow-sm">
            <p className="text-sm font-medium text-primary">🌿 Cobertura Regional</p>
            <p className="text-base font-semibold leading-snug text-foreground">
              {REGION_COVERAGE}
            </p>
          </Card>
        </div>
      </motion.section>

      {/* Seções 2 e 3 — Curiosidade e Dica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...fadeUp}>
          <Card className="p-6 h-full space-y-4 border-primary/10 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">🌎 Curiosidade Ambiental</h2>
            <p className="text-foreground/85 leading-relaxed">{curiosity}</p>
            <p className="text-xs text-muted-foreground">Uma nova curiosidade a cada visita à página.</p>
          </Card>
        </motion.div>

        <motion.div {...fadeUp}>
          <Card className="p-6 h-full space-y-4 bg-primary/5 border-primary/20 shadow-sm">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              💡 Dica Sustentável
            </h2>
            <p className="text-foreground/85 leading-relaxed">{tip}</p>
            <p className="text-xs text-muted-foreground">Uma nova dica a cada visita à página.</p>
          </Card>
        </motion.div>
      </div>

      {/* Seção 4 — Programa Arboretum */}
      <motion.section {...fadeUp}>
        <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-lg relative overflow-hidden">
          <Sprout className="absolute right-4 bottom-4 w-24 h-24 text-primary/10 pointer-events-none" />
          <div className="relative z-10 space-y-5 max-w-3xl">
            <h2 className="text-2xl font-bold text-primary">🌱 Programa Arboretum</h2>
            <p className="text-foreground/85 leading-relaxed text-base md:text-lg">
              Referência nacional na conservação da biodiversidade e restauração da Mata Atlântica no
              Extremo Sul da Bahia, com produção de mudas nativas e fortalecimento de comunidades
              locais.
            </p>
            <Button asChild className="gap-2">
              <a href={ARBORETUM_URL} target="_blank" rel="noopener noreferrer">
                Conhecer o Programa
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}
