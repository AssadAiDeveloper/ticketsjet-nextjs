import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Multi-city en open-jaw vluchten: zo plan je een reis zonder heen en weer te gaan",
  description: "Leer het verschil tussen retour-, enkele reis-, open-jaw- en multi-citytickets, wanneer elk geld bespaart en welke praktische risico's je vóór het boeken moet controleren.",
  blocks: [
    { t: "p", text: "De meeste mensen zoeken vluchten op dezelfde manier: van huis naar een bestemming en weer terug. Maar veel reizen werken niet zo. Je kunt in de ene stad aankomen en vanuit een andere vertrekken, of meerdere steden achter elkaar bezoeken. Voor zulke reizen kan de manier van boeken de prijs, de route en je flexibiliteit veranderen." },
    { t: "p", text: "Deze gids legt de belangrijkste tickettypes in gewone taal uit, wanneer elk zinvol is en wat je vóór het boeken moet controleren. De regels van maatschappijen verschillen, dus bevestig de voorwaarden van je specifieke tarief." },

    { t: "h2", text: "1. De vier tickettypes", id: "types" },
    { t: "table", head: ["Tickettype", "Wat het is", "Het best voor"], rows: [
      ["Retour", "Heen en terug tussen dezelfde twee plaatsen", "Eenvoudige reizen met één bestemming"],
      ["Enkele reis", "Eén vlucht van A naar B", "Verhuizen, flexibele plannen of zelf maatschappijen combineren"],
      ["Open-jaw", "Naar de ene stad vliegen en vanuit een andere terug, met een stuk dat je over land aflegt", "Reizen langs een kust of route, zoals aankomen in Rome en vertrekken vanuit Venetië"],
      ["Multi-city", "Meerdere losse vluchten in één boeking, zoals A naar B, B naar C, C naar A", "Reizen met meer dan twee punten"]
    ] },
    { t: "p", text: "De namen verschillen een beetje tussen websites, maar het idee is hetzelfde. Het verschil is of je naar je startpunt terugkeert en of je één boeking of meerdere wilt." },

    { t: "h2", text: "2. Open-jaw: land in de ene stad, vertrek vanuit een andere", id: "open-jaw" },
    { t: "p", text: "Met een open-jawticket hoef je niet terug naar waar je begon. Je vliegt naar de ene plek, reist per trein, bus of auto en vliegt vanaf een andere plek naar huis. Dat bespaart tijd en voorkomt vaak de kosten voor het inleveren van een huurauto op een andere locatie." },
    { t: "ul", items: [
      "Goed voor road trips en treinreizen waarbij terugkeren een dag verspilt.",
      "Vaak vergelijkbaar geprijsd met een gewone retour en soms iets duurder. Vergelijk beide.",
      "Je bent zelf verantwoordelijk voor het vervoer tussen de twee punten, dus reken dat in je budget.",
      "Sla je een vlucht op een ticket over, dan kan de rest van het ticket worden geannuleerd. Sla geen deel over tenzij de voorwaarden van de maatschappij dat toestaan."
    ] },

    { t: "h2", text: "3. Multi-city: één boeking, meerdere stops", id: "multi-city" },
    { t: "p", text: "Bij een multi-cityzoekopdracht voer je elke vlucht zelf in. Het systeem prijst ze samen en geeft je één boeking. Dat is handig als je meerdere plaatsen wilt bezoeken en alles onder één referentie wilt houden." },
    { t: "p", text: "De prijs kan twee kanten op gaan. Soms is de gecombineerde prijs lager dan elk deel apart boeken. Soms is hij hoger. Test altijd beide en vergelijk daarna het totaal inclusief bagage." },
    { t: "ul", items: [
      "Eén boeking betekent één set bagageregels en één plek om wijzigingen te beheren.",
      "Als de maatschappij één vlucht wijzigt of annuleert, is de rest van de boeking meestal beschermd en kan de maatschappij je omboeken.",
      "Eén deel wijzigen kan meer kosten dan een simpele retour wijzigen. Controleer de wijzigingskosten voordat je boekt."
    ] },

    { t: "h2", text: "4. Twee enkele reizen kunnen goedkoper zijn", id: "one-ways" },
    { t: "p", text: "Op veel routes, vooral met lagekostenmaatschappijen, kosten twee enkele reizen evenveel als een retour of minder. Zo kun je maatschappijen mixen, voor elke richting een andere luchthaven gebruiken en de beste tijd voor elk deel kiezen." },
    { t: "ul", items: [
      "Maatschappijen mixen kan een goedkopere reis opleveren, maar elk ticket heeft eigen bagageregels.",
      "Is de eerste vlucht vertraagd, dan is de tweede maatschappij niet verplicht je te helpen. Reken royaal tijd tussen losse tickets.",
      "Controleer de inreisregels. Sommige landen willen bewijs dat je weer vertrekt, zoals een doorreisticket."
    ] },

    { t: "h2", text: "5. Hoe zoek je een multi-cityreis", id: "how-to-search" },
    { t: "ol", items: [
      "Zet je stops op volgorde met de ruwe data voor elk.",
      "Zoek de volledige route in multi-citymodus en noteer de totaalprijs.",
      "Zoek elk deel nog eens als enkele reis en tel ze op.",
      "Vergelijk het totaal met een simpele retour, als een retour zinvol is voor je route.",
      "Tel bagagekosten bij elke optie op voordat je beslist."
    ] },
    { t: "p", text: "Probeer ook luchthavens in de buurt. Een kleine verandering, zoals vertrekken vanaf een tweede luchthaven in dezelfde regio, kan verrassend veel besparen." },

    { t: "h2", text: "6. Data en volgorde doen ertoe", id: "dates" },
    { t: "p", text: "Prijzen veranderen per dag van de week en per seizoen, en de volgorde van je stops kan de prijs veranderen. Probeer de route om te draaien of te wisselen welke stad je eerst bezoekt. Zijn je data flexibel, kijk dan per deel naar de goedkoopste dagen." },
    { t: "callout", title: "Gebruik de kalenderweergave", text: "Een prijskalender laat zien welke data het goedkoopst zijn voor elk deel. Eén vlucht een dag verschuiven kan het totaal meer verlagen dan de hele reis verschuiven." },

    { t: "h2", text: "7. Bagage bij reizen met meerdere delen", id: "baggage" },
    { t: "p", text: "Controleer je bagagelimiet voor elke vlucht. Een boeking met meerdere maatschappijen kan op elk deel een andere limiet hebben, en een koffer die bij de eerste vlucht is inbegrepen, kan bij de tweede extra kosten. Heb je op elk deel een ruimbagage nodig, tel die dan mee in de prijs die je vergelijkt." },
    { t: "p", text: "Onze bagagegids legt uit hoe je de echte prijs van tarieven met verschillende inclusies vergelijkt." },

    { t: "h2", text: "8. Risico's om te controleren voordat je boekt", id: "risks" },
    { t: "ul", items: [
      "Losse tickets zijn niet beschermd als je een aansluiting mist.",
      "Sommige maatschappijen annuleren de rest van je reisschema als je een eerder deel niet gebruikt.",
      "Visum- en inreisregels gelden voor elk land waar je doorheen reist, inclusief transit.",
      "Open-jawreizen hebben vervoer tussen de twee steden nodig. Controleer trein- of busprijzen en -tijden.",
      "Reken genoeg tijd per stop, want steden kosten vaak meer tijd dan je verwacht."
    ] },

    { t: "h2", text: "9. Is het de moeite waard?", id: "worth-it" },
    { t: "p", text: "Voor een eenvoudige reis naar één plek is een retour meestal het makkelijkst. Beslaat je plan een regio, een route of een paar steden, dan kunnen open-jaw- en multi-citytickets een dag of meer besparen en voorkomen dat je terugloopt. Het prijsverschil is vaak klein, dus beslis eerst op basis van je plan en pas daarna op prijs." },

    { t: "h2", text: "10. Snelle checklist", id: "checklist" },
    { t: "ul", items: [
      "Heb ik multi-city, paren enkele reizen en een retour vergeleken?",
      "Heb ik bagagekosten bij elke optie opgeteld?",
      "Heb ik het vervoer tussen steden gepland en geprijsd?",
      "Heb ik genoeg tijd tussen aansluitingen bij losse tickets?",
      "Heb ik de inreis- en visumregels voor elk land gecontroleerd?"
    ] },
    { t: "p", text: "TicketsJet kan vluchten bij veel aanbieders vergelijken, zodat je snel verschillende routes en data kunt testen. De boeking rond je af op de site van de aanbieder." }
  ],
  faq: [
    { q: "Wat is een open-jawticket?", a: "Een open-jawticket is een boeking in retourstijl waarbij je naar de ene stad vliegt en vanuit een andere terugkeert, of je terugreis begint in een andere stad. Het stuk tussen de twee punten leg je zelf af, bijvoorbeeld met de trein." },
    { q: "Is een multi-cityticket duurder dan een retour?", a: "Soms, maar niet altijd. De prijs van multi-city hangt af van de route, data en maatschappijen. Vergelijk het multi-citytotaal met de kosten van enkele reizen en een gewone retour voordat je beslist." },
    { q: "Kan ik één vlucht op een multi-cityticket overslaan?", a: "Meestal kan de maatschappij de overige vluchten annuleren als je een eerdere mist. Controleer de tariefregels voordat je besluit een deel over te slaan." },
    { q: "Zijn twee enkele reizen riskanter dan een retour?", a: "Staan ze op verschillende tickets, dan ben je niet beschermd als de eerste vlucht vertraagd is en je de tweede mist. Reken royaal tijd en overweeg een verzekering." },
    { q: "Heb ik een visum nodig voor een transitstop?", a: "Dat hangt af van het land, je paspoort en of je de luchthaven verlaat. Controleer de officiële inreisregels voor elke stop op je route voordat je boekt." }
  ],
};
