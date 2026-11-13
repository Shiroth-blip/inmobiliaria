import { Link } from "@tanstack/react-router";
import { formatUSD, type Property } from "@/data/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group relative">
      <Link to="/propiedades/$slug" params={{ slug: p.slug }} className="block" aria-label={`Ver ${p.title}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img src={p.images[0]!.src} alt={p.images[0]!.alt} loading="lazy" width={1024} height={1280}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="pt-5">
          <p className="font-serif text-2xl">{formatUSD(p.price)}</p>
          <h3 className="mt-1 font-sans text-base">{p.title}</h3>
          <p className="text-sm text-muted-foreground">{p.neighborhood} · {p.address}</p>
          <p className="mt-3 border-t border-line pt-3 text-xs uppercase tracking-wider text-muted-foreground">
            {p.rooms} amb · {p.bedrooms} dorm · {p.bathrooms} baños · {p.coveredM2} m²
          </p>
          <p className="mt-4 text-sm"><span className="underline-line group-hover:bg-[length:100%_1px]">Ver propiedad →</span></p>
        </div>
      </Link>
    </article>
  );
}
