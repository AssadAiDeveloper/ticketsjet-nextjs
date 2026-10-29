import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 erreurs de réservation d'hôtel qui vous coûtent de l'argent",
  description: "Pièges de l'annulation gratuite, frais de resort et l'astuce de la carte que la plupart des voyageurs ignorent : voici comment mieux réserver vos séjours.",
  blocks: [
    { t: "p", text: "Erreur n° 1 : réserver au premier prix que vous voyez. Les tarifs d'hôtel varient largement d'une plateforme à l'autre pour exactement la même chambre. Une recherche comparative entre fournisseurs trouve régulièrement des écarts de 10 à 25 % par nuit." },
    { t: "p", text: "Erreur n° 2 : ignorer le prix total. Les frais de resort, les taxes de séjour et les frais de ménage peuvent ajouter 15 à 30 % au tarif affiché. Comparez toujours le prix final au paiement, pas l'appât du prix par nuit." },
    { t: "p", text: "Erreur n° 3 : réserver un tarif non remboursable trop tôt. Si vos plans peuvent tant soit peu changer, un tarif à annulation gratuite quelques euros plus cher est presque toujours le meilleur choix. Vous pouvez rebooker si les prix baissent." },
    { t: "p", text: "Utilisez la vue carte. Les hôtels situés à une station de métro du cœur touristique sont souvent 30 à 40 % moins chers pour une chambre de standing identique, et le trajet ne prend généralement que quelques minutes." }
  ],
};
