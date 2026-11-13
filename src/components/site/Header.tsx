import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

const nav = [
  { label: "Propiedades", hash: "propiedades" },
  { label: "Servicios", hash: "servicios" },
  { label: "Cómo trabajo", hash: "como-trabajo" },
  { label: "Sobre mí", hash: "sobre-mi" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="font-serif text-xl">{site.name}</Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((i) => (
            <Link key={i.hash} to="/" hash={i.hash} className="text-sm hover:text-gold">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/" hash="contacto" className="btn btn-outline hidden !py-2.5 sm:inline-flex">Agendar visita ↗</Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            {open ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-background px-5 py-6 lg:hidden" aria-label="Móvil">
          <ul className="space-y-4">
            {nav.map((i) => (
              <li key={i.hash}>
                <Link to="/" hash={i.hash} onClick={() => setOpen(false)} className="font-serif text-2xl">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/" hash="contacto" onClick={() => setOpen(false)} className="btn btn-outline mt-6 w-full">Agendar visita ↗</Link>
        </nav>
      )}
    </header>
  );
}
