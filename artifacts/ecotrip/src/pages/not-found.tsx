import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPinOff, Trees } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
      <Card className="w-full max-w-lg border-primary/20 shadow-lg">
        <CardContent className="pt-8 pb-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <MapPinOff className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">Erro 404</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <Trees className="h-7 w-7 text-primary" aria-hidden="true" />
              Página não encontrada
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              O endereço que você acessou não existe ou foi movido. Volte ao simulador para
              calcular emissões e explorar rotas da região.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Ir para o Simulador
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Ver Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
