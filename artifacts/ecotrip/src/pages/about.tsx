import { Card } from "@/components/ui/card";
import { Leaf, Trees, Globe, RefreshCcw } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary flex items-center gap-3">
          <Trees className="w-10 h-10" /> Sobre o EcoTrip
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Nossa missão é conectar a conscientização ambiental com a ação prática, traduzindo as emissões de carbono das suas viagens em medidas reais de restauração ecológica.
        </p>
      </section>

      <Card className="p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Globe className="text-primary w-6 h-6" /> Pegada de Carbono
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            Cada vez que nos deslocamos utilizando veículos movidos a combustíveis fósseis, emitimos Dióxido de Carbono (CO₂). Este é um dos principais gases responsáveis pelo efeito estufa e pelas mudanças climáticas. O aplicativo utiliza fatores de emissão padronizados para estimar o custo ambiental de cada viagem, baseado no modal de transporte escolhido.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <RefreshCcw className="text-primary w-6 h-6" /> Compensação Florestal
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            Uma das formas mais eficazes de neutralizar o carbono emitido é através do plantio de árvores. As plantas absorvem CO₂ da atmosfera durante seu crescimento. Em nossos cálculos, estimamos que o plantio e a manutenção de 1 muda nativa ao longo de seu ciclo inicial compensa aproximadamente 15kg de CO₂.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Leaf className="text-primary w-6 h-6" /> O Programa Arboretum
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            Este aplicativo é inspirado no <strong>Programa Arboretum</strong>, um dos mais importantes programas de conservação e restauração da diversidade florestal do Brasil. O programa não apenas promove o plantio de mudas, mas também atua na coleta de sementes, capacitação de comunidades locais e pesquisa científica para garantir que a restauração ecológica seja bem-sucedida e resiliente.
          </p>
        </div>
      </Card>

      <div className="bg-muted/50 p-6 rounded-xl border text-sm text-muted-foreground italic text-center">
        Os cálculos apresentados nesta plataforma são estimativas educacionais com base em fatores médios de mercado. Eles têm o propósito de conscientização ambiental e não substituem inventários oficiais de emissões de Gases de Efeito Estufa (GEE).
      </div>
    </div>
  );
}
