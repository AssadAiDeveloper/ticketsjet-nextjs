import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 fouten bij het boeken van hotels die je geld kosten (en hoe je ze voorkomt)",
  description: "Verborgen kosten, verkeerd gelezen annuleringsregels, een slechte locatie en meer: zeven veelgemaakte fouten bij het boeken van hotels en de simpele controles die ze voorkomen.",
  blocks: [
    { t: "p", text: "Hotelprijzen lijken eenvoudig tot je op de laatste pagina komt. Een lage prijs per nacht kan groeien door belastingen en kosten, een label voor gratis annuleren kan eerder verlopen dan je denkt en een mooie score kan een kamer verbergen die niets op de foto's lijkt. Het is geen hogere wiskunde, maar het is makkelijk te missen als je veel opties op een klein scherm vergelijkt." },
    { t: "p", text: "Dit zijn zeven fouten die reizigers steeds weer maken, elk met een snelle oplossing. Ze controleren kost maar een paar minuten en kan echt geld en stress besparen." },

    { t: "h2", text: "1. Naar de prijs per nacht kijken in plaats van naar de totaalprijs", id: "total-price" },
    { t: "p", text: "De prijs in grote letters is vaak alleen de kamerprijs. Belastingen, toeristenbelasting, schoonmaakkosten en resortkosten kunnen er later bij komen en op sommige plekken betaal je kosten bij de accommodatie in plaats van bij het boeken. Twee hotels met dezelfde prijs per nacht kunnen heel verschillende totalen hebben." },
    { t: "ul", items: [
      "Zoek naar een totaalprijs voor je hele verblijf voordat je vergelijkt.",
      "Lees de prijsopbouw voor belastingen, servicekosten en schoonmaakkosten.",
      "Controleer of toeristenbelasting bij de accommodatie wordt betaald en hoeveel die per persoon per nacht is.",
      "Op sommige bestemmingen gelden resort- of faciliteitskosten, ook als je de faciliteiten niet gebruikt. Zoek ze op in de gegevens van de accommodatie."
    ] },

    { t: "h2", text: "2. Gratis annuleren verkeerd lezen", id: "cancellation" },
    { t: "p", text: "Gratis annuleren is waardevol, maar het heeft een deadline. Veel reizigers zien het label en nemen aan dat ze op elk moment kunnen annuleren. In werkelijkheid eindigt de gratis periode vaak een dag of langer voor aankomst, en daarna verlies je mogelijk de eerste nacht of het volledige bedrag." },
    { t: "ul", items: [
      "Lees de exacte datum en tijd tot wanneer annuleren gratis is en let op de tijdzone van de accommodatie.",
      "Vergelijk het terugbetaalbare tarief met het niet-terugbetaalbare tarief. Een niet-terugbetaalbaar tarief is goedkoper omdat jij het risico draagt.",
      "Kunnen je plannen veranderen, dan kan een iets hoger terugbetaalbaar tarief in totaal de goedkoopste keuze zijn.",
      "Zet de annuleringsdeadline in je agenda zodat je hem niet mist."
    ] },

    { t: "h2", text: "3. Boeken zonder de locatie op een kaart te bekijken", id: "location" },
    { t: "p", text: "Een goedkoop hotel dat ver ligt van waar je wilt zijn, kost vaak meer aan vervoer en tijd. De naam van een wijk in de advertentie kan ook ruimhartig zijn, dus controleer de echte ligging." },
    { t: "ul", items: [
      "Open het hotel op een kaart en kijk naar de afstand tot de plekken die je het meest bezoekt.",
      "Controleer de loopafstand tot het dichtstbijzijnde metro- of treinstation en hoe laat het rijdt.",
      "Kijk naar de omgeving. Een rustige straat en een straat boven een drukke bar zijn 's nachts heel verschillend.",
      "Kom je laat aan of reis je met bagage, reken dan het vervoer vanaf de luchthaven of het station mee."
    ] },
    { t: "callout", title: "De kaarttruc", text: "Zoek niet alleen op stad, maar bekijk alle resultaten op de kaart en vergelijk prijs en ligging samen. Vaak is een hotel een paar minuten buiten het centrum veel goedkoper en net zo handig." },

    { t: "h2", text: "4. Op de score vertrouwen en recente beoordelingen negeren", id: "reviews" },
    { t: "p", text: "Een score is een gemiddelde over lange tijd. Het hotel kan sinds het schrijven van veel beoordelingen zijn gerenoveerd of achteruit zijn gegaan. Lees de nieuwste beoordelingen, niet alleen het cijfer." },
    { t: "ul", items: [
      "Sorteer beoordelingen op nieuwste en lees er minstens een paar van de afgelopen maanden.",
      "Lees de lage en gemiddelde beoordelingen. Die laten zien wat er echt misgaat, zoals lawaai of netheid.",
      "Filter op soort reiziger. Een hotel waar stellen dol op zijn, past misschien niet bij gezinnen of zakenreizigers.",
      "Zoek naar patronen. Eén klacht is een mening, vijf vergelijkbare klachten zijn een probleem."
    ] },

    { t: "h2", text: "5. De details van de kamer overslaan", id: "room-details" },
    { t: "p", text: "De foto in de advertentie is meestal van de beste kamer. Controleer wat je echt boekt: het kamertype, de bedden, de grootte en de verdieping, en wat wel en niet is inbegrepen." },
    { t: "ul", items: [
      "Controleer de bedindeling. Twee eenpersoonsbedden en één tweepersoonsbed zijn niet hetzelfde.",
      "Kijk naar de kamergrootte in vierkante meters, vooral in grote steden waar kamers klein kunnen zijn.",
      "Controleer of ontbijt, wifi, airconditioning en parkeren zijn inbegrepen en of ze extra kosten.",
      "Is rust belangrijk, lees dan over het straatlawaai en overweeg een hogere verdieping te vragen."
    ] },

    { t: "h2", text: "6. Betaal- en valutadetails over het hoofd zien", id: "payment" },
    { t: "p", text: "Hoe en wanneer je betaalt kan de echte prijs veranderen. Sommige boekingen betaal je bij de accommodatie, andere vooraf. Betalen in een andere valuta dan die van je kaart kan omrekenkosten opleveren." },
    { t: "ul", items: [
      "Controleer of je nu, later of bij de accommodatie betaalt en welke betaalmethoden worden geaccepteerd.",
      "Staat de prijs in een vreemde valuta, controleer dan de wisselkoers van je bank en eventuele kaartkosten.",
      "Sommige accommodaties vragen een borg of reserveren een bedrag op je kaart bij het inchecken. Zorg dat je kaart daarvoor ruimte heeft.",
      "Bewaar je boekingsbevestiging en de betaalvoorwaarden voor het geval je een afschrijving wilt betwisten."
    ] },

    { t: "h2", text: "7. De praktische aankomstdetails vergeten", id: "arrival" },
    { t: "p", text: "Een goedkope kamer is geen goede deal als je er niet in kunt als je aankomt. Veel hotels hebben vaste incheckuren en sommige kleine accommodaties hebben geen nachtreceptie." },
    { t: "ul", items: [
      "Controleer de in- en uitchecktijden en of de receptie open is als je aankomt.",
      "Kom je laat aan, laat het de accommodatie dan van tevoren weten en bewaar hun telefoonnummer.",
      "Vraag of bagageopslag mogelijk is als je vlucht voor het inchecken of na het uitchecken ligt.",
      "Controleer de toegangsinstructies voor accommodaties met zelf inchecken voordat je reist."
    ] },

    { t: "h2", text: "Een snelle checklist voor je boekt", id: "checklist" },
    { t: "ol", items: [
      "Ken ik de totaalprijs inclusief belastingen en kosten?",
      "Tot wanneer is annuleren gratis, en in welke tijdzone?",
      "Ligt het hotel op de kaart waar ik wil zijn, met goed vervoer in de buurt?",
      "Komen de recente beoordelingen overeen met de score en de foto's?",
      "Past het kamer- en bedtype bij mijn gezelschap?",
      "Weet ik hoe en wanneer ik betaal, en in welke valuta?",
      "Kan ik inchecken als ik aankom?"
    ] },
    { t: "p", text: "De zoekfunctie Verblijven van TicketsJet brengt je naar Booking.com, waar je hotels op een kaart kunt vergelijken, kunt filteren op prijs en beoordeling en reviews kunt lezen. De boeking zelf rond je af op Booking.com, tegen hun prijs en onder hun annuleringsvoorwaarden." }
  ],
  faq: [
    { q: "Wat is de goedkoopste dag om een hotel te boeken?", a: "Er is geen enkele dag die altijd het goedkoopst is. Prijzen hangen af van de vraag naar je data, het seizoen en lokale evenementen. Betrouwbaarder is een paar data te vergelijken en vroeg een terugbetaalbaar tarief te boeken, zodat je opnieuw kunt boeken als de prijs daalt." },
    { q: "Is het beter om een terugbetaalbaar of niet-terugbetaalbaar tarief te boeken?", a: "Niet-terugbetaalbare tarieven zijn goedkoper maar dragen risico. Staan je plannen vast, dan kunnen ze geld besparen. Kunnen je plannen veranderen, dan is een terugbetaalbaar tarief vaak in totaal de betere waarde." },
    { q: "Waarom is de prijs anders als ik op de boekingspagina kom?", a: "Belastingen, kosten en opties kunnen in de laatste stap worden toegevoegd en prijzen kunnen met de vraag veranderen. Controleer altijd de totaalprijs voor je hele verblijf voordat je bevestigt." },
    { q: "Betaal ik toeristenbelasting bovenop de kamerprijs?", a: "In veel bestemmingen wel. Sommige steden rekenen per persoon per nacht een toeristen- of stadsbelasting, soms ter plaatse geïnd. Die staat meestal in de prijsgegevens of het beleid van de accommodatie." },
    { q: "Wat moet ik doen als het hotel niet is zoals beschreven?", a: "Maak het meteen beleefd bespreekbaar bij de receptie zodat ze het kunnen oplossen of je kunnen verplaatsen, en maak foto's. Is het niet opgelost, neem dan zo snel mogelijk contact op met het boekingsplatform met je bewijs." }
  ],
};
