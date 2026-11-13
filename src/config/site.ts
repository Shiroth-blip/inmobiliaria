/**
 * DATOS DEL AGENTE — reemplazá estos valores por los tuyos.
 * Todo el sitio lee de acá (header, footer, contacto, WhatsApp, números).
 */
export const site = {
  name: "Martín Álvarez", // [nombre y apellido]
  title: "Martillero y corredor público",
  license: "CUCICBA 0000", // [matrícula]
  years: 15,
  zones: "Palermo, Belgrano, Núñez y Zona Norte",
  areas: "Compra, venta y alquiler residencial",
  address: "Av. Cabildo 1234, Piso 3, CABA",
  hours: "Lunes a viernes, 9 a 18 h",
  whatsapp: "5491100000000", // solo números, con código de país
  phoneDisplay: "+54 9 11 0000-0000",
  email: "contacto@tuinmobiliaria.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/",
  commitment: "decirle la verdad y cuidar su tiempo",
  stats: { sold: 320, years: 15, families: 450 },
};

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
