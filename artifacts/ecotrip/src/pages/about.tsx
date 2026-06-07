import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bus,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Leaf,
  MapPin,
  Route,
  Sprout,
  Target,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ARBORETUM_URL = "https://www.programaarboretum.eco.br/";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1448375249986-8507865f9b0b?auto=format&fit=crop&w=1600&q=80";

const CALCULATION_STEPS = [
  {
    icon: MapPin,
    title: "Viagem",
    description: "Origem, destino e modal de transporte escolhidos pelo usuário.",
  },
  {
    icon: Route,
    title: "Distância",
    description: "Quilômetros percorridos com base nas rotas cadastradas ou informados manualmente.",
  },
  {
    icon: Bus,
    title: "Emissão de CO₂",
    description: "Estimativa a partir de fatores médios de emissão por km de cada modal.",
  },
  {
    icon: Sprout,
    title: "Compensação Ambiental",
    description: "Quantidade de mudas nativas sugerida para neutralizar o impacto estimado.",
  },
] as const;

const EMISSION_TOPICS = [
  {
    title: "O que é CO₂?",
    text: "O dióxido de carbono é um dos principais gases de efeito estufa. Em excesso na atmosfera, contribui para o aquecimento global.",
  },
  {
    title: "Transporte e emissões",
    text: "Carros, motos, ônibus e outros modais movidos a combustíveis fósseis liberam CO₂ durante o deslocamento.",
  },
  {
    title: "Papel da distância",
    text: "Quanto maior a distância percorrida, maior tende a ser a emissão total da viagem.",
  },
  {
    title: "Fatores de emissão",
    text: "O simulador utiliza médias simplificadas (kg de CO₂ por km) para comparar diferentes modais de forma educativa.",
  },
] as const;

const ARBORETUM_PILLARS = [
  "Produção de mudas nativas",
  "Coleta de sementes",
  "Capacitação de comunidades",
  "Pesquisa científica",
  "Recuperação de áreas degradadas",
] as const;

const TECH_HIGHLIGHTS = [
  "Educação Ambiental",
  "Mobilidade Sustentável",
  "Conservação da Biodiversidade",
  "Conscientização Climática",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
} as const;

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-2xl md:text-3xl font-bold tracking-tight text-foreground", className)}>
      {children}
    </h2>
  );
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 md:space-y-14 pb-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl min-h-[320px] md:min-h-[400px] flex items-end shadow-lg border border-primary/20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, hsl(140 34% 18% / 0.94) 0%, hsl(140 34% 27% / 0.78) 45%, hsl(132 27% 43% / 0.55) 100%), url('${HERO_IMAGE}')`,
          }}
          role="img"
          aria-label="Paisagem de floresta tropical representando a Mata Atlântica"
        />
        <div className="relative z-10 p-8 md:p-12 space-y-4 max-w-3xl text-primary-foreground">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">🌿 EcoTrip Arboretum</h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-white/95">
            Cada quilômetro percorrido gera impacto. Cada escolha consciente ajuda a construir um
            futuro mais sustentável.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-white/85 max-w-2xl">
            Uma plataforma educacional para estimar emissões de carbono, incentivar escolhas de
            mobilidade sustentável e promover a conscientização ambiental.
          </p>
        </div>
      </motion.section>

      {/* Missão */}
      <motion.section {...fadeUp}>
        <Card className="p-8 md:p-10 bg-gradient-to-br from-primary/10 via-card to-accent/5 border-primary/20 shadow-md relative overflow-hidden">
          <Target className="absolute right-6 top-6 w-20 h-20 text-primary/10" />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <SectionTitle className="text-primary">🎯 Nossa Missão</SectionTitle>
            <p className="text-lg text-foreground/85 leading-relaxed">
              Conectar conscientização ambiental e ação prática, traduzindo as emissões de carbono
              das viagens em informações acessíveis e estimativas de compensação ambiental.
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Como funciona */}
      <motion.section {...fadeUp} className="space-y-8">
        <SectionTitle>🚗 Como calculamos as emissões?</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {EMISSION_TOPICS.map((topic) => (
            <Card key={topic.title} className="p-5 space-y-2 border-primary/10 hover:border-primary/25 transition-colors">
              <h3 className="font-semibold text-primary">{topic.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{topic.text}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 md:p-8 border-primary/15 bg-card/80">
          <p className="text-sm font-medium text-muted-foreground mb-6 text-center">
            Fluxo simplificado do simulador
          </p>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {CALCULATION_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col md:flex-row items-center gap-4 flex-1">
                  <div className="flex flex-col items-center text-center flex-1 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[180px] mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < CALCULATION_STEPS.length - 1 && (
                    <ArrowDown className="w-5 h-5 text-primary/50 shrink-0 md:rotate-[-90deg]" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </motion.section>

      {/* Compensação */}
      <motion.section {...fadeUp} className="space-y-6">
        <SectionTitle>🌳 Compensação Ambiental</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 md:p-8 space-y-4 border-primary/10">
            <p className="text-foreground/85 leading-relaxed">
              As árvores absorvem CO₂ da atmosfera durante o crescimento, atuando como reservatórios
              naturais de carbono. A restauração ecológica recupera áreas degradadas, protege a
              biodiversidade e fortalece serviços ecossistêmicos essenciais.
            </p>
            <p className="text-foreground/85 leading-relaxed">
              O EcoTrip Arboretum utiliza o conceito de compensação como referência educativa: traduz
              emissões estimadas em mudas nativas, inspirando reflexão sobre impacto e
              responsabilidade ambiental.
            </p>
          </Card>
          <Card className="p-6 md:p-8 bg-primary text-primary-foreground border-primary shadow-lg flex flex-col justify-center gap-4">
            <Leaf className="w-10 h-10 opacity-90" />
            <p className="text-lg md:text-xl font-semibold leading-relaxed">
              🌱 1 muda nativa pode compensar aproximadamente{" "}
              <span className="text-accent">15 kg de CO₂</span> ao longo de seu desenvolvimento
              inicial.
            </p>
          </Card>
        </div>
      </motion.section>

      {/* Programa Arboretum */}
      <motion.section {...fadeUp}>
        <Card className="p-8 md:p-10 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent relative overflow-hidden">
          <Trees className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/10" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <SectionTitle className="text-primary">🌱 Inspirado pelo Programa Arboretum</SectionTitle>
            <p className="text-foreground/85 leading-relaxed text-lg">
              O Programa Arboretum é uma referência nacional na conservação da biodiversidade e
              restauração da Mata Atlântica no Extremo Sul da Bahia.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARBORETUM_PILLARS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm bg-background/70 rounded-lg px-4 py-3 border border-primary/10"
                >
                  <Sprout className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="gap-2">
              <a href={ARBORETUM_URL} target="_blank" rel="noopener noreferrer">
                Conhecer o Programa Arboretum
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Card>
      </motion.section>

      {/* Tecnologia */}
      <motion.section {...fadeUp} className="space-y-6">
        <SectionTitle>🌎 Tecnologia a Serviço da Sustentabilidade</SectionTitle>
        <Card className="p-8 md:p-10 space-y-6 border-primary/10">
          <p className="text-foreground/85 leading-relaxed text-lg max-w-3xl">
            Ferramentas digitais podem contribuir para decisões mais conscientes e ampliar o acesso à
            educação ambiental.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TECH_HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/15 px-4 py-4"
              >
                <span className="text-primary font-bold text-lg">✔</span>
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.section>

      {/* Frase de impacto */}
      <motion.section {...fadeUp}>
        <div className="relative overflow-hidden rounded-2xl p-10 md:p-14 text-center bg-gradient-to-br from-primary via-primary to-secondary shadow-lg">
          <Globe className="absolute left-6 top-6 w-16 h-16 text-white/10" />
          <p className="relative z-10 text-xl md:text-3xl font-semibold leading-relaxed text-primary-foreground max-w-3xl mx-auto">
            "Compreender nossos impactos é o primeiro passo para transformá-los."
          </p>
        </div>
      </motion.section>

      {/* Aviso */}
      <motion.section {...fadeUp}>
        <Card className="p-6 md:p-8 border-muted bg-muted/30 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">ℹ️ Aviso Importante</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Os resultados apresentados nesta plataforma são estimativas educacionais baseadas em
              fatores médios de emissão e parâmetros simplificados de compensação ambiental.
            </p>
            <p>
              O objetivo é promover conscientização ambiental e educação para sustentabilidade.
            </p>
            <p>
              Os cálculos não substituem inventários oficiais ou metodologias técnicas de
              quantificação de emissões de Gases de Efeito Estufa (GEE).
            </p>
          </div>
        </Card>
      </motion.section>

      {/* Navegação para o Dashboard */}
      <motion.section {...fadeUp}>
        <Card className="p-8 md:p-10 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6" />
                🌿 Explore o Simulador
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                Quer conhecer mais sobre as rotas disponíveis, modais de transporte e conteúdos
                educativos sobre sustentabilidade?
              </p>
            </div>
            <Button asChild size="lg" className="gap-2 shrink-0 w-full md:w-auto">
              <Link href="/dashboard">
                Ir para o Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}
