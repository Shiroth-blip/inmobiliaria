import { Facebook, Instagram, Linkedin, MessageCircle, Phone } from "lucide-react";
import { site, waLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-2 text-sm text-on-dark-muted">{site.title}<br />Matrícula {site.license}</p>
        </div>
        <div>
          <p className="eyebrow text-gold">Oficina</p>
          <p className="mt-3 text-sm text-on-dark-muted">{site.address}<br />{site.hours}</p>
        </div>
        <div>
          <p className="eyebrow text-gold">Contacto</p>
          <p className="mt-3 space-y-1 text-sm text-on-dark-muted">
            <a href={waLink("Hola, quisiera hacer una consulta.")} className="block hover:text-on-dark">WhatsApp {site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="block hover:text-on-dark">{site.email}</a>
          </p>
        </div>
        <div>
          <p className="eyebrow text-gold">Redes</p>
          <div className="mt-3 flex gap-4">
            <a href={site.instagram} aria-label="Instagram" className="hover:text-gold"><Instagram className="h-5 w-5" strokeWidth={1.25} /></a>
            <a href={site.facebook} aria-label="Facebook" className="hover:text-gold"><Facebook className="h-5 w-5" strokeWidth={1.25} /></a>
            <a href={site.linkedin} aria-label="LinkedIn" className="hover:text-gold"><Linkedin className="h-5 w-5" strokeWidth={1.25} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-on-dark/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-on-dark-muted md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
          <p className="flex gap-6"><a href="#" className="hover:text-on-dark">Aviso legal</a><a href="#" className="hover:text-on-dark">Política de privacidad</a></p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={`tel:+${site.whatsapp}`} aria-label="Llamar" className="flex h-12 w-12 items-center justify-center border border-line bg-background text-foreground hover:bg-ink hover:text-on-dark">
        <Phone className="h-5 w-5" strokeWidth={1.25} />
      </a>
      <a href={waLink("Hola, quisiera hacer una consulta.")} aria-label="Escribir por WhatsApp" className="flex h-12 w-12 items-center justify-center bg-ink text-on-dark hover:bg-gold">
        <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
      </a>
    </div>
  );
}
