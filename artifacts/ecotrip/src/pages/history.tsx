import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Trees } from "lucide-react";
import { Link } from "wouter";

const FUTURE_FEATURES = [
  "Salvar viagens simuladas",
  "Consultar viagens anteriores",
  "Comparar resultados",
  "Acompanhar sua evolução ambiental",
];

export default function HistoryPage() {
  return (
    <div className="max-w-3xl mx-auto pb-16">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Viagens</h1>
      </div>

      <Card className="p-8 md:p-12 text-center space-y-8 border-primary/20 bg-gradient-to-b from-primary/5 to-card shadow-lg">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
          <History className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary">🚧 Funcionalidade em desenvolvimento</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Estamos trabalhando nesta funcionalidade.
          </p>
        </div>

        <div className="text-left max-w-md mx-auto space-y-4 bg-background/60 rounded-xl p-6 border border-primary/10">
          <p className="text-sm font-medium text-foreground">
            Em versões futuras será possível:
          </p>
          <ul className="space-y-2">
            {FUTURE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Trees className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/">
          <Button size="lg" className="px-8">
            Voltar ao Simulador
          </Button>
        </Link>
      </Card>
    </div>
  );
}
