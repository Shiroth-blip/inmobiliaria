import { createFileRoute } from "@tanstack/react-router";
import { Home, Scale, KeyRound, FileText, BadgeCheck, Clock, MapPin } from "lucide-react";
import hero from "@/assets/hero.jpg";
import agent from "@/assets/agent.jpg";
import { site } from "@/config/site";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Contact } from "@/components/site/Contact";
import { Eyebrow, Reveal, Star } from "@/components/site/common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} · Propiedades en venta en ${site.zones}` },
      { name: "description", content: `Agente inmobiliario independiente. Venta, tasación y alquiler de propiedades en ${site.zones}. Primera consulta sin cargo.` },
      { property: "og:title", content: `${site.name} · Agente inmobiliario` },
      { property: "og:description", content: `Propiedades seleccionadas en ${site.zones}. Lo acompaño desde la primera visita hasta la firma.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "RealEstateAgent",
        name: site.name, telephone: site.phoneDisplay, email: site.email,
        address: site.address, areaServed: site.zones, openingHours: "Mo-Fr 09:00-18:00",
      }),
    }],
  }),
  component: Index,
});

const rubros = ["Casas", "Departamentos", "Terrenos", "Locales", "Oficinas"];
const services = [
  { icon: Home, t: "Venta de propiedades", d: "Preparo, publico y muestro su propiedad para venderla al mejor valor posible." },
  { icon: Scale, t: "Tasación profesional y gratuita", d: "Un valor realista, fundamentado en operaciones reales de la zona." },
  { icon: KeyRound, t: "Alquileres", d: "Busco inquilinos confiables y me ocupo de contratos y garantías." },
  { icon: FileText, t: "Asesoramiento legal y escritura", d: "Lo acompaño con documentación, escribanía y cada trámite hasta la firma." },
];
const steps = [
  { t: "Primera reunión y tasación", d: "Nos conocemos, entiendo qué necesita y le doy un valor honesto de mercado." },
  { t: "Preparación y fotografía profesional", d: "Pongo la propiedad en su mejor versión, con fotos que la muestran tal cual es." },
  { t: "Difusión y visitas acompañadas", d: "Publico en los portales principales y acompaño personalmente cada visita." },
  { t: "Negociación, reserva y escritura", d: "Negocio por usted y lo acompaño hasta el día de la escritura." },
];
const testimonials = [
  { q: "Vendimos en menos de dos meses y Martín nos explicó cada paso. Nunca nos sentimos solos.", n: "Laura y Diego", b: "Belgrano", op: "Venta" },
  { q: "Me mostró solo lo que de verdad encajaba con lo que buscaba. Me ahorró meses de visitas.", n: "Sofía R.", b: "Palermo", op: "Compra" },
  { q: "Honesto con el precio desde el primer día. Eso, para nosotros, valió todo.", n: "Familia Pereyra", b: "Núñez", op: "Venta" },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-on-dark">
        <img src={hero} alt="Casa moderna iluminada al atardecer" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pb-16">
          <Reveal>
            <h1 className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl md:text-8xl">Encuentre la casa donde <em className="gold">quiere vivir.</em></h1>
            <p className="mt-6 max-w-xl text-lg text-on-dark-muted">Le muestro las mejores propiedades en venta de {site.zones} y lo acompaño en todo el proceso, desde la primera visita hasta la firma.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="btn btn-light">Agendar una visita ↗</a>
              <a href="#propiedades" className="btn btn-ghost-light">Ver propiedades en venta ↗</a>
            </div>
          </Reveal>
          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-on-dark/25 pt-8">
            {[[`+${site.stats.sold}`, "Propiedades vendidas"], [site.stats.years, "Años de experiencia"], [`+${site.stats.families}`, "Familias acompañadas"]].map(([n, l]) => (
              <div key={String(l)}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-serif text-3xl md:text-5xl">{n}</dd>
                <dd className="eyebrow mt-2 text-[0.6rem] text-on-dark-muted md:text-[0.7rem]">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BANDA DE RUBROS */}
      <div className="overflow-hidden border-y border-on-dark/10 bg-ink py-6 text-on-dark">
        <div className="marquee flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {[...rubros, ...rubros].map((r, i) => (
                <span key={i} className="flex items-center gap-8 pr-8 font-serif text-3xl italic md:text-4xl">{r}<Star className="h-4 w-4" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PROPIEDADES */}
      <section id="propiedades" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <Eyebrow>Propiedades</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-6xl">Propiedades <em className="gold">seleccionadas.</em></h2>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {properties.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 120}><PropertyCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <Eyebrow>Servicios</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl md:text-6xl">Todo lo que necesita, <em className="gold">en una sola persona.</em></h2>
          </Reveal>
          <div className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 100} className="border-b border-r border-line p-8">
                <Icon className="h-8 w-8 text-gold" strokeWidth={1} />
                <h3 className="mt-8 text-2xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                <a href="#contacto" className="mt-6 inline-block text-sm underline-line hover:bg-[length:100%_1px]">Más información →</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJO */}
      <section id="como-trabajo" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <Eyebrow>Cómo trabajo</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl">Un proceso <em className="gold">claro.</em></h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            <span className="absolute left-0 right-0 top-5 hidden h-px bg-line md:block" aria-hidden />
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 120}>
                <li className="relative">
                  <span className="relative inline-block bg-background pr-4 font-serif text-4xl text-gold">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-20 flex items-center justify-center gap-4 text-center">
            <Star className="h-4 w-4" />
            <p className="font-serif text-2xl italic md:text-3xl">Mi compromiso: {site.commitment}.</p>
            <Star className="h-4 w-4" />
          </Reveal>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="border-t border-line">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <Reveal className="relative">
            <img src={agent} alt={`Retrato de ${site.name}, agente inmobiliario`} loading="lazy" width={896} height={1152} className="aspect-[4/5] w-full object-cover" />
            <span className="eyebrow absolute bottom-5 left-5 bg-background px-4 py-2 text-foreground">{site.name} · Matrícula {site.license}</span>
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Sobre mí</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight md:text-6xl">Inmobiliaria cercana, <em className="gold">hecha para acompañar.</em></h2>
            <p className="mt-6 text-muted-foreground">Hace {site.years} años que ayudo a familias a comprar y vender su casa. Trabajo con pocas propiedades a la vez para dedicarle a cada una el tiempo que merece, y me comprometo a {site.commitment}.</p>
            <div className="my-8 h-px bg-line" />
            <ul className="space-y-5">
              {[
                [BadgeCheck, site.title, `Matrícula ${site.license}`],
                [Clock, `${site.years} años de experiencia`, site.areas],
                [MapPin, "Zonas donde opero", site.zones],
              ].map(([Icon, t, s]) => {
                const I = Icon as typeof BadgeCheck;
                return (
                  <li key={String(t)} className="flex gap-4">
                    <I className="mt-0.5 h-6 w-6 shrink-0 text-gold" strokeWidth={1} />
                    <div><p className="font-semibold">{String(t)}</p><p className="text-sm text-muted-foreground">{String(s)}</p></div>
                  </li>
                );
              })}
            </ul>
            <a href="#contacto" className="btn btn-outline mt-10">Agendar visita</a>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <Eyebrow>Testimonios</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl">Lo que dicen <em className="gold">mis clientes.</em></h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.n} delay={i * 120}>
                <figure className="border-t border-ink pt-8">
                  <Star className="h-4 w-4" />
                  <blockquote className="mt-6 font-serif text-2xl leading-snug">“{t.q}”</blockquote>
                  <figcaption className="mt-6 text-sm"><span className="font-semibold">{t.n}</span><span className="text-muted-foreground"> · {t.b} · {t.op}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
