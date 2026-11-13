import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatUSD, getProperty, properties } from "@/data/properties";
import { site, waLink } from "@/config/site";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Eyebrow, Reveal } from "@/components/site/common";

export const Route = createFileRoute("/propiedades/$slug")({
  loader: ({ params }) => {
    const p = getProperty(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p) return { meta: [{ title: "Propiedad no encontrada" }] };
    const title = `${p.title} en ${p.neighborhood} · ${formatUSD(p.price)} · ${site.name}`;
    const desc = `${p.summary} ${p.rooms} ambientes, ${p.bedrooms} dormitorios, ${p.coveredM2} m² cubiertos en ${p.neighborhood}.`;
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const [lb, setLb] = useState<number | null>(null);
  const mensajeInicial = `Hola, me interesa la propiedad "${p.title}" en ${p.neighborhood}. ¿Podemos coordinar una visita?`;
  const [msg, setMsg] = useState(mensajeInicial);
  useEffect(() => { setMsg(mensajeInicial); }, [mensajeInicial]);
  const others = properties.filter((o) => o.slug !== p.slug).slice(0, 2);
  const data: [string, string][] = [
    ["Ambientes", String(p.rooms)], ["Dormitorios", String(p.bedrooms)], ["Baños", String(p.bathrooms)],
    ["M² cubiertos", String(p.coveredM2)], ["M² totales", String(p.totalM2)], ["Cochera", p.garage], ["Antigüedad", p.age],
  ];
  const d = 0.006;
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${p.lng - d}%2C${p.lat - d}%2C${p.lng + d}%2C${p.lat + d}&layer=mapnik&marker=${p.lat}%2C${p.lng}`;

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <Link to="/" hash="propiedades" className="text-sm text-muted-foreground hover:text-foreground">← Volver a propiedades</Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Galería */}
        <div>
          <button onClick={() => setLb(0)} className="relative block w-full overflow-hidden" aria-label="Ampliar foto principal">
            <img src={p.images[0]!.src} alt={p.images[0]!.alt} width={1024} height={1280} className="aspect-[4/3] w-full object-cover" />
            <span className="eyebrow absolute bottom-4 right-4 bg-background px-3 py-1.5">1 / {p.images.length}</span>
          </button>
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {p.images.slice(1).map((img, i) => (
              <button key={i} onClick={() => setLb(i + 1)} className="overflow-hidden" aria-label={`Ampliar: ${img.alt}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </div>

        {/* Datos clave */}
        <aside>
          <h1 className="text-4xl leading-tight md:text-5xl">{p.title}</h1>
          <p className="mt-2 text-muted-foreground">{p.neighborhood} · {p.address}</p>
          <p className="mt-6 font-serif text-4xl md:text-5xl">{formatUSD(p.price)}</p>
          <dl className="mt-8 grid grid-cols-2 border-t border-line">
            {data.map(([k, v]) => (
              <div key={k} className="border-b border-line py-3">
                <dt className="eyebrow text-[0.6rem] text-muted-foreground">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink(msg)} className="btn btn-outline flex-1">Consultar por WhatsApp ↗</a>
            <a href="#consulta" className="btn btn-outline flex-1">Agendar visita ↗</a>
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-16">
          <section>
            <Eyebrow>Descripción</Eyebrow>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {p.description.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </section>
          <section>
            <Eyebrow>Características</Eyebrow>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-line pb-4">
                  <Check className="h-5 w-5 text-gold" strokeWidth={1.25} /> {f}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Eyebrow>Ubicación aproximada</Eyebrow>
            <iframe title={`Mapa de ${p.neighborhood}`} src={map} loading="lazy" className="mt-6 aspect-[16/9] w-full border border-line grayscale" />
          </section>
        </div>

        <div>
          <div id="consulta" className="border border-line p-6 lg:sticky lg:top-24 md:p-8">
            <p className="font-serif text-2xl">Consulte por esta propiedad</p>
            <textarea
              aria-label="Mensaje"
              rows={4}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="mt-6 w-full border-0 border-b border-line bg-transparent py-2.5 focus:border-ink focus:outline-none"
            />
            <a href={waLink(msg)} className="btn mt-6 w-full bg-ink text-on-dark hover:bg-gold">Consultar por WhatsApp ↗</a>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-7xl border-t border-line px-5 py-24 md:px-8">
        <Eyebrow>Otras propiedades</Eyebrow>
        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => <Reveal key={o.slug}><PropertyCard p={o} /></Reveal>)}
        </div>
      </section>

      {lb !== null && <Lightbox images={p.images} index={lb} setIndex={setLb} />}
    </div>
  );
}

function Lightbox({ images, index, setIndex }: { images: { src: string; alt: string }[]; index: number; setIndex: (i: number | null) => void }) {
  const n = images.length;
  const go = useCallback((dir: number) => setIndex((index + dir + n) % n), [index, n, setIndex]);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [go, setIndex]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Galería ampliada" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 text-on-dark"
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}>
      <button onClick={() => setIndex(null)} aria-label="Cerrar" className="absolute right-5 top-5" autoFocus><X className="h-7 w-7" strokeWidth={1.25} /></button>
      <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-3 md:left-8"><ChevronLeft className="h-9 w-9" strokeWidth={1} /></button>
      <figure className="max-h-[85vh] max-w-[88vw]">
        <img src={images[index]!.src} alt={images[index]!.alt} className="max-h-[78vh] w-auto object-contain" />
        <figcaption className="mt-4 flex justify-between gap-6 text-sm text-on-dark-muted">
          <span>{images[index]!.alt}</span><span className="eyebrow">{index + 1} / {n}</span>
        </figcaption>
      </figure>
      <button onClick={() => go(1)} aria-label="Siguiente" className="absolute right-3 md:right-8"><ChevronRight className="h-9 w-9" strokeWidth={1} /></button>
    </div>
  );
}
