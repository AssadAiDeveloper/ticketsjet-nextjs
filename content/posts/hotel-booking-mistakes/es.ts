import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 errores al reservar hotel que te cuestan dinero",
  description: "Trampas de la cancelación gratuita, tasas de resort y el truco del mapa que casi todos los viajeros pasan por alto: así se reserva mejor el alojamiento.",
  blocks: [
    { t: "p", text: "Error uno: reservar con el primer precio que ves. Las tarifas de hotel varían mucho entre plataformas para exactamente la misma habitación. Una búsqueda comparativa entre proveedores encuentra con frecuencia diferencias del 10–25 % por noche." },
    { t: "p", text: "Error dos: ignorar el precio total. Las tasas de resort, los impuestos municipales y los cargos de limpieza pueden añadir un 15–30 % a la tarifa anunciada. Compara siempre el precio final del pago, no el reclamo por noche." },
    { t: "p", text: "Error tres: reservar tarifa no reembolsable demasiado pronto. Si tus planes pueden cambiar en algo, una tarifa con cancelación gratuita unos euros más cara casi siempre es la mejor apuesta: puedes volver a reservar si bajan los precios." },
    { t: "p", text: "Usa la vista de mapa. Los hoteles a una parada de metro del centro turístico suelen ser un 30–40 % más baratos por una habitación de idéntico nivel, y el trayecto suele ser de unos minutos." }
  ],
};
