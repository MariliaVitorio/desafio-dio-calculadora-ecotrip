import { Link, useLocation } from "wouter";
import { Trees, LayoutDashboard, History, Info } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Simulador", icon: Trees },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "Histórico", icon: History },
    { href: "/about", label: "Sobre", icon: Info },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:bg-primary/90 transition-colors">
              <Trees className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">EcoTrip Arboretum</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {links.map((link) => {
              const active = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe">
        <div className="flex justify-around items-center h-16">
          {links.map((link) => {
            const active = location === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
