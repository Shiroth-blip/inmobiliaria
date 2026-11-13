import { useState } from "react";
import kitchen from "@/assets/kitchen.jpg";
import { site, waLink } from "@/config/site";
import { Eyebrow } from "./common";

const types = ["Comprar", "Vender", "Alquilar", "Tasar"] as const;

const messages: Record<(typeof types)[number], string> = {
  Comprar: "Hola Martín, quiero comprar una propiedad. ¿Podemos coordinar una charla?",
  Vender: "Hola Martín, quiero vender mi propiedad. ¿Podemos coordinar una charla?",
  Alquilar: "Hola Martín, quiero alquilar una propiedad. ¿Podemos coordinar una charla?",
  Tasar: "Hola Martín, quiero tasar mi propiedad. ¿Podemos coordinar una charla?",
};

export function Contact() {
  const [type, setType] = useState<(typeof types)[number]>("Comprar");

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink text-on-dark">
      <img src={kitchen} alt="Cocina luminosa con isla de mármol" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <div>
          <Eyebrow dark>Primera consulta sin cargo</Eyebrow>
          <h2 className="mt-6 text-5xl md:text-6xl">Cuéntenos <em className="gold">qué busca.</em></h2>
          <p className="mt-6 max-w-md text-on-dark-muted">Escríbame y coordinamos una charla o una visita. Le respondo en el día.</p>
          <p className="mt-8 text-sm text-on-dark-muted">{site.hours}<br />{site.address}</p>
        </div>
        <div className="border border-on-dark/20 bg-ink/40 p-6 backdrop-blur-sm md:self-center md:p-10">
          <fieldset>
            <legend className="eyebrow mb-4 text-on-dark-muted">Tipo de consulta</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {types.map((t) => (
                <button type="button" key={t} onClick={() => setType(t)} aria-pressed={type === t}
                  className={`border px-3 py-2.5 text-sm transition-colors ${type === t ? "border-cream bg-cream text-ink" : "border-on-dark/40 hover:border-cream"}`}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <a href={waLink(messages[type])} className="btn btn-light mt-8 w-full">Consultar por WhatsApp ↗</a>
        </div>
      </div>
    </section>
  );
}
