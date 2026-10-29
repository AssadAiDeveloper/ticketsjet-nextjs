import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 erros na reserva de hotéis que lhe custam dinheiro",
  description: "Armadilhas do cancelamento gratuito, taxas de resort e o truque do mapa que a maioria dos viajantes ignora. Eis como reservar alojamento de forma mais inteligente.",
  blocks: [
    { t: "p", text: "Erro um: reservar ao primeiro preço que vê. As tarifas de hotel variam muito entre plataformas para exatamente o mesmo quarto. Uma pesquisa comparativa entre fornecedores encontra regularmente diferenças de 10–25% por noite." },
    { t: "p", text: "Erro dois: ignorar o preço total. Taxas de resort, taxas municipais e custos de limpeza podem acrescentar 15–30% à tarifa anunciada. Compare sempre o preço final no pagamento, não o preço-isco por noite." },
    { t: "p", text: "Erro três: reservar não reembolsável demasiado cedo. Se os seus planos tiverem alguma hipótese de mudar, uma tarifa com cancelamento gratuito uns euros mais cara é quase sempre a melhor aposta. Pode reservar de novo se os preços baixarem." },
    { t: "p", text: "Use a vista de mapa. Os hotéis a uma paragem de metro do núcleo turístico são muitas vezes 30–40% mais baratos por um quarto de padrão idêntico, e o trajeto costuma demorar poucos minutos." }
  ],
};
