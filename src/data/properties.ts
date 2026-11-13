/**
 * PROPIEDADES — para agregar o editar una, modificá esta lista.
 * La página de detalle (/propiedades/<slug>) se genera sola.
 * Las fotos son de referencia: reemplazalas en src/assets/ manteniendo el nombre,
 * o importá nuevas fotos y cambiá el array `images`.
 */
import living from "@/assets/living.jpg";
import garden from "@/assets/garden.jpg";
import patio from "@/assets/patio.jpg";
import kitchen from "@/assets/kitchen.jpg";
import bedroom from "@/assets/bedroom.jpg";
import bathroom from "@/assets/bathroom.jpg";
import hero from "@/assets/hero.jpg";

export type Status = "Nueva" | "Reservada" | "Vendida";
export type Img = { src: string; alt: string };

export type Property = {
  slug: string;
  title: string;
  status: Status;
  price: number; // USD
  neighborhood: string;
  address: string;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  coveredM2: number;
  totalM2: number;
  garage: string;
  age: string;
  lat: number;
  lng: number;
  summary: string;
  description: string[];
  features: string[];
  images: Img[];
};

const ph = (src: string, alt: string): Img => ({ src, alt: `${alt} (foto de referencia)` });

export const properties: Property[] = [
  {
    slug: "departamento-luminoso-palermo",
    title: "Departamento luminoso con balcón",
    status: "Nueva",
    price: 285000,
    neighborhood: "Palermo",
    address: "Zona Plaza Güemes",
    rooms: 3, bedrooms: 2, bathrooms: 2,
    coveredM2: 78, totalM2: 86,
    garage: "1 cochera fija", age: "8 años",
    lat: -34.5895, lng: -58.4144,
    summary: "Piso alto con vista abierta y balcón corrido.",
    description: [
      "Este departamento me gustó desde la primera visita: entra sol toda la mañana y el balcón corrido hace que el living se sienta mucho más grande.",
      "Está en un piso alto, con vista abierta y sin edificios enfrente. La distribución es muy cómoda: dos dormitorios bien separados, el principal en suite, y cocina integrada al living.",
      "El edificio tiene amenities, seguridad y expensas razonables. Ideal para quien busca vivir en Palermo con tranquilidad.",
    ],
    features: ["Balcón corrido", "Suite principal", "Cocina integrada", "Aire acondicionado", "Seguridad 24 h", "Pileta y SUM", "Apto crédito", "Cochera fija"],
    images: [
      ph(living, "Living con ventanales y vista a la ciudad"),
      ph(kitchen, "Cocina con isla de mármol"),
      ph(bedroom, "Dormitorio principal luminoso"),
      ph(bathroom, "Baño en suite con revestimiento de piedra"),
      ph(hero, "Fachada del edificio al atardecer"),
      ph(living, "Vista desde el balcón"),
      ph(bedroom, "Segundo dormitorio"),
      ph(bathroom, "Baño de cortesía"),
      ph(kitchen, "Detalle de la cocina"),
    ],
  },
  {
    slug: "casa-con-jardin-y-pileta-vicente-lopez",
    title: "Casa con jardín y pileta",
    status: "Nueva",
    price: 520000,
    neighborhood: "Vicente López",
    address: "Zona Av. Maipú",
    rooms: 5, bedrooms: 4, bathrooms: 3,
    coveredM2: 240, totalM2: 420,
    garage: "Cochera doble", age: "20 años",
    lat: -34.5265, lng: -58.4795,
    summary: "Casa familiar en lote amplio, con galería y parrilla.",
    description: [
      "Una casa pensada para la vida en familia. El jardín es el gran protagonista: parque con árboles, pileta y una galería con parrilla que se usa todo el año.",
      "Planta baja con living y comedor amplios, cocina con desayunador y un escritorio. Arriba, cuatro dormitorios, el principal con vestidor y baño en suite.",
      "Está en una cuadra tranquila, cerca de colegios y del corredor de Av. Maipú. Se la recomiendo a quien busque espacio sin alejarse de la Capital.",
    ],
    features: ["Jardín con árboles", "Pileta", "Galería con parrilla", "Cochera doble", "Vestidor", "Calefacción central", "Escritorio", "Lavadero independiente"],
    images: [
      ph(garden, "Jardín con pileta y fachada de ladrillo"),
      ph(hero, "Contrafrente con galería al atardecer"),
      ph(kitchen, "Cocina amplia con desayunador"),
      ph(living, "Living comedor"),
      ph(bedroom, "Dormitorio principal con vestidor"),
      ph(bathroom, "Baño en suite"),
      ph(garden, "Parque y solárium"),
      ph(bedroom, "Dormitorio secundario"),
      ph(bathroom, "Baño completo planta alta"),
      ph(kitchen, "Comedor diario"),
    ],
  },
  {
    slug: "ph-con-patio-colegiales",
    title: "PH reciclado con patio propio",
    status: "Reservada",
    price: 198000,
    neighborhood: "Colegiales",
    address: "Zona Plaza Mafalda",
    rooms: 3, bedrooms: 2, bathrooms: 1,
    coveredM2: 85, totalM2: 120,
    garage: "Sin cochera", age: "70 años (reciclado 2021)",
    lat: -34.5747, lng: -58.4497,
    summary: "Al frente, sin expensas, con patio y terraza.",
    description: [
      "Un PH con mucho carácter: ladrillo a la vista, techos altos y un patio lleno de plantas que es un refugio en plena ciudad.",
      "Fue reciclado en 2021 con instalaciones nuevas, conservando los detalles originales. Tiene dos dormitorios, living con salida al patio y una terraza propia.",
      "No paga expensas y está a pocas cuadras de la plaza y del subte. Es de esas propiedades que se recorren una vez y se quedan en la cabeza.",
    ],
    features: ["Patio propio", "Terraza", "Sin expensas", "Techos altos", "Reciclado a nuevo", "Ladrillo a la vista", "Cerca del subte", "Apto crédito"],
    images: [
      ph(patio, "Patio con plantas y ladrillo a la vista"),
      ph(living, "Living con salida al patio"),
      ph(kitchen, "Cocina reciclada"),
      ph(bedroom, "Dormitorio principal"),
      ph(bathroom, "Baño reciclado"),
      ph(patio, "Detalle de la galería"),
      ph(bedroom, "Segundo dormitorio"),
      ph(hero, "Vista de la terraza al atardecer"),
    ],
  },
];

export const formatUSD = (n: number) => `USD ${n.toLocaleString("es-AR")}`;
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
