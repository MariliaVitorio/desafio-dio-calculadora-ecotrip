export const ENVIRONMENTAL_CURIOSITIES = [
  "Uma árvore adulta pode absorver aproximadamente 22 kg de CO₂ por ano.",
  "O Brasil possui a maior biodiversidade do planeta.",
  "A Mata Atlântica abriga milhares de espécies endêmicas.",
  "O transporte coletivo pode reduzir significativamente as emissões por passageiro.",
  "As florestas tropicais armazenam mais carbono por hectare do que a maioria dos outros biomas.",
  "Pequenas mudanças nos hábitos de mobilidade podem gerar grande impacto coletivo.",
  "A restauração florestal ajuda a proteger nascentes e mananciais de água.",
  "Caminhar ou pedalar em trajetos curtos evita emissões e beneficia a saúde.",
  "O Extremo Sul da Bahia integra um dos corredores ecológicos mais importantes da Mata Atlântica.",
  "Plantar mudas nativas favorece a fauna local e a resiliência dos ecossistemas.",
  "Veículos elétricos tendem a emitir menos CO₂ quando a energia vem de fontes limpas.",
  "Compensar emissões com reflorestamento é uma estratégia complementar à redução de impactos.",
] as const;

export const SUSTAINABILITY_TIPS = [
  "Priorize viagens compartilhadas.",
  "Combine compromissos para reduzir deslocamentos.",
  "Utilize bicicleta em trajetos curtos.",
  "Prefira transporte coletivo quando possível.",
  "Compense suas emissões apoiando projetos de restauração florestal.",
  "Evite viagens desnecessárias e planeje rotas mais eficientes.",
  "Prefira modais com menor emissão de CO₂ sempre que viável.",
  "Mantenha seu veículo revisado para consumir menos combustível.",
  "Escolha horários que reduzam tempo parado no trânsito.",
  "Incentive colegas e familiares a adotarem hábitos de mobilidade sustentável.",
  "Valorize caminhadas em distâncias de até 2 km.",
  "Apoie iniciativas locais de conservação e plantio de mudas nativas.",
  "Reduza o peso transportado no carro para economizar combustível.",
  "Considere teletrabalho ou reuniões online quando possível.",
  "Informe-se sobre o impacto ambiental de cada modal antes de viajar.",
  "Divulgue práticas sustentáveis e inspire mudanças na sua comunidade.",
] as const;

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
