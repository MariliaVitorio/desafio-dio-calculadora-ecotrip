import { useGetTripStats } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Trees, Car, Map, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { MODAL_INFO } from "@/lib/constants";

const PIE_COLORS = ['#2E5E3E', '#4F8A5B', '#8CC63E', '#A67C52', '#F2994A', '#E27D60', '#EB5757', '#9B51E0', '#BB6BD9', '#2D9CDB'];

export default function Dashboard() {
  const { data: stats, isLoading } = useGetTripStats();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando painel de impacto...</div>;
  }

  if (!stats) return null;

  const pieData = stats.emissionByModal.map(item => ({
    name: MODAL_INFO[item.modal as keyof typeof MODAL_INFO]?.label || item.modal,
    value: item.totalEmissionKg
  }));

  return (
    <div className="space-y-8 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Impacto</h1>
        <p className="text-muted-foreground">Visualize o impacto agregado de todas as suas viagens.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 space-y-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Map className="w-4 h-4 text-primary" /> Total de Viagens
          </div>
          <div className="text-3xl font-bold">{stats.totalTrips}</div>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-primary" /> CO₂ Emitido (kg)
          </div>
          <div className="text-3xl font-bold">{stats.totalEmissionKg.toFixed(1)}</div>
        </Card>
        <Card className="p-6 space-y-2 bg-primary/5 border-primary/20">
          <div className="text-sm font-medium text-primary flex items-center gap-2">
            <Trees className="w-4 h-4" /> Mudas Necessárias
          </div>
          <div className="text-3xl font-bold text-primary">{stats.totalSeedlings}</div>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Car className="w-4 h-4 text-primary" /> Modal Mais Usado
          </div>
          <div className="text-3xl font-bold">
            {stats.mostUsedModal ? MODAL_INFO[stats.mostUsedModal as keyof typeof MODAL_INFO]?.label : '-'}
          </div>
        </Card>
      </div>

      <Card className="p-6 sm:p-8 bg-gradient-to-r from-primary/10 to-transparent border-primary/20 relative overflow-hidden">
        <Trees className="absolute right-0 bottom-0 w-32 h-32 text-primary/10 -mb-8 -mr-8" />
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Impacto no Programa Arboretum</h2>
          <p className="text-lg max-w-3xl leading-relaxed text-foreground/80">
            Se todas as suas emissões fossem compensadas por iniciativas de restauração florestal semelhantes às realizadas pelo Programa Arboretum, 
            seriam necessárias aproximadamente <strong className="text-primary font-bold text-2xl">{stats.totalSeedlings} mudas nativas</strong> para recuperar <strong className="text-primary font-bold">{stats.totalSeedlings * 4}m²</strong> de área degradada.
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <h3 className="font-semibold text-lg">Emissões por Meio de Transporte</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number) => [`${value.toFixed(1)} kg`, 'CO₂']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="font-semibold text-lg">Uso de Modais (Qtd. de Viagens)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.emissionByModal.map(m => ({ name: MODAL_INFO[m.modal as keyof typeof MODAL_INFO]?.label || m.modal, count: m.tripCount }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: 'var(--color-primary)', opacity: 0.1 }} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
