import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Trein of vliegtuig in Europa? Zo kies je op tijd, prijs en comfort",
  description: "Een praktische manier om trein en vlucht te vergelijken voor Europese reizen: deur-tot-deurtijd, echte kosten, bagage, flexibiliteit, comfort en wanneer welke optie logisch is.",
  blocks: [
    { t: "p", text: "Voor veel Europese reizen heb je een echte keuze: het vliegtuig of de trein. Het vliegtuig is sneller in de lucht en de trein is op de grond vaak makkelijker. Welke beter is, hangt af van de route, de datum en wat je het belangrijkst vindt." },
    { t: "p", text: "Deze gids geeft je een eenvoudige methode om de twee eerlijk te vergelijken. We noemen geen vaste prijzen en dienstregelingen, omdat die per datum en boekingstijdstip veranderen. Gebruik de methode hieronder met echte offertes voor je eigen reis." },

    { t: "h2", text: "1. Vergelijk van deur tot deur, niet van station tot station", id: "door-to-door" },
    { t: "p", text: "Een vlucht die een uur in de lucht duurt, kan in totaal vier of vijf uur kosten. Een eerlijke vergelijking telt de hele reis, van je voordeur tot je eindbestemming." },
    { t: "table", head: ["Stap", "Vlucht", "Trein"], rows: [
      ["Naar het vertrekpunt komen", "Luchthavens liggen vaak buiten de stad, dus reken tijd en kosten voor de overdracht", "Stations liggen meestal in het stadscentrum"],
      ["Tijd voor vertrek", "Meestal een tot drie uur voor inchecken, beveiliging en instappen", "Vaak 15 tot 30 minuten, langer bij internationale diensten met controles"],
      ["Reistijd onderweg", "Kort bij lange afstanden", "Langer, maar je kunt de hele tijd werken of ontspannen"],
      ["Aankomst", "Bagage ophalen en vervoer vanaf de luchthaven", "Je stapt uit in het stadscentrum"],
      ["Naar je accommodatie komen", "Vaak nog een trein-, bus- of taxirit", "Vaak lopend of met een korte lokale rit"]
    ] },
    { t: "callout", title: "Een handige vuistregel", text: "Over kortere afstanden is de totale tijd met de trein vaak vergelijkbaar met of beter dan een vlucht. Naarmate de afstand groeit, groeit het voordeel van het vliegtuig, maar controleer echte dienstregelingen, want hogesnelheidslijnen veranderen het beeld op sommige trajecten." },

    { t: "h2", text: "2. Vergelijk de echte prijs", id: "price" },
    { t: "p", text: "Vergelijk de eindprijs voor dezelfde reiziger met dezelfde bagage. Vluchten lijken vaak eerst goedkoop en worden duurder als je een koffer, een stoel en het vervoer van en naar de luchthaven toevoegt. Ook treinprijzen kunnen sterk veranderen, vooral bij hogesnelheidsdiensten waar vroeg boeken telt." },
    { t: "ul", items: [
      "Vlucht: ticketprijs, bagage, stoelkeuze, plus de kosten om naar en van de luchthaven te komen.",
      "Trein: ticket, eventuele verplichte plaatsreservering, plus lokaal vervoer aan beide kanten.",
      "Flexibiliteit: controleer de wijzigings- en terugbetalingsregels van beide. Een goedkoper tarief dat niet kan worden gewijzigd, kan duurder uitpakken als je plannen verschuiven.",
      "Groepen en gezinnen: treintickets kunnen bij sommige vervoerders korting geven voor kinderen of groepen, dus controleer dat voordat je aanneemt dat het vliegtuig goedkoper is."
    ] },
    { t: "p", text: "Zoek voor beide vroeg. Bij veel hogesnelheids- en langeafstandstreinen komen de laagste prijzen vooraf vrij en raken ze uitverkocht, net als bij vluchten." },

    { t: "h2", text: "3. Bagage en comfort", id: "comfort" },
    { t: "p", text: "Treinen zijn meestal ruimhartig met bagage en veel vervoerders rekenen niets extra voor een koffer van normaal formaat. Je houdt je tassen bij je, kunt opstaan, rondlopen en naar het toilet wanneer je wilt. Er zijn geen vloeistoflimieten en je hoeft niet ruim van tevoren aanwezig te zijn." },
    { t: "p", text: "In het vliegtuig win je tijd op lange afstanden, maar accepteer je meer regels: bagagelimieten, rijen bij de beveiliging en een vaste instaptijd. Reis je met veel bagage, een kinderwagen, sportuitrusting of een fiets, controleer dan het beleid van beide opties, want sommige treinen vereisen een reservering voor fietsen." },

    { t: "h2", text: "4. Betrouwbaarheid en wat er gebeurt als het misgaat", id: "reliability" },
    { t: "p", text: "Beide vervoersmiddelen kunnen vertraging oplopen. Het verschil is wat je eraan kunt doen. Met de trein kun je vaak de volgende dienst of een aansluitende dienst op hetzelfde ticket nemen. Bij een vlucht wacht je op omboeking door de maatschappij en in drukke perioden kan de volgende stoel een dag weg zijn." },
    { t: "ul", items: [
      "Bij vluchten binnen en vanuit de EU kunnen passagiersrechten je recht geven op verzorging of compensatie, afhankelijk van de oorzaak en de duur van de vertraging. Lees onze gids over compensatie bij vertraagde vluchten.",
      "Ook treinreizigers in de EU hebben rechten, maar de voorwaarden verschillen per vervoerder en tickettype.",
      "Bij aansluitingen beschermt één doorgaand ticket je beter dan twee losse tickets."
    ] },

    { t: "h2", text: "5. Milieu-effect", id: "environment" },
    { t: "p", text: "Per passagier veroorzaakt een treinreis meestal aanzienlijk minder broeikasgasuitstoot dan een korte vlucht, vooral op geëlektrificeerde trajecten. Als dit voor je telt, kan het een sterke reden zijn om de trein te kiezen wanneer het tijdsverschil klein is." },
    { t: "p", text: "Bij zeer lange reizen, of als je water moet oversteken, is vliegen vaak de enige praktische optie. Een goede aanpak is de trein te nemen waar die concurrerend is en te vliegen waar dat niet zo is." },

    { t: "h2", text: "6. Wanneer de trein meestal wint", id: "train-wins" },
    { t: "ul", items: [
      "Korte en middellange afstanden tussen stadscentra die met een hogesnelheidslijn zijn verbonden.",
      "Reizen waarbij je onderweg wilt werken of rusten.",
      "Reizen met zware bagage, kinderen of huisdieren.",
      "Reizen met meerdere stops onderweg, waarbij je de reis kunt opdelen.",
      "Reizen in de winter, wanneer weerverstoring op luchthavens waarschijnlijker is."
    ] },

    { t: "h2", text: "7. Wanneer het vliegtuig meestal wint", id: "plane-wins" },
    { t: "ul", items: [
      "Lange afstanden, vooral als er geen directe treindienst is.",
      "Zee oversteken of eilanden bereiken.",
      "Routes waarbij een luchthaven veel dichter bij je bestemming ligt dan een station.",
      "Reizen op het laatste moment waarvoor wel een vlucht beschikbaar is en geen trein."
    ] },

    { t: "h2", text: "8. Een eenvoudige beslismethode", id: "method" },
    { t: "ol", items: [
      "Schrijf je echte startpunt en eindbestemming op, niet alleen de twee steden.",
      "Zoek de totale deur-tot-deurtijd van beide opties op voor jouw datum.",
      "Tel de echte kosten van beide op, inclusief bagage en overdrachten.",
      "Controleer de flexibiliteit: kun je wijzigen of annuleren, en tegen welke kosten?",
      "Kies de optie die bij je prioriteiten past: tijd, prijs, comfort of milieu-effect."
    ] },
    { t: "p", text: "Beslis niet uit gewoonte. Op sommige routes is de trein sneller en goedkoper dan het voelt, en op andere bespaart het vliegtuig je uren." },

    { t: "h2", text: "9. Beide combineren", id: "combine" },
    { t: "p", text: "Je hoeft niet altijd te kiezen. Sommige reizen werken het best met een vlucht heen en een trein terug, of een trein naar een grotere luchthaven gevolgd door een vlucht. Combineer je tickets van verschillende aanbieders, reken dan extra tijd tussen aansluitingen, want vertragingen worden niet gedekt over losse boekingen." },

    { t: "h2", text: "10. Snelle checklist", id: "checklist" },
    { t: "ul", items: [
      "Heb ik de hele reis van deur tot deur vergeleken?",
      "Heb ik bagage-, stoel- en overdrachtskosten bij beide opgeteld?",
      "Heb ik de wijzigings- en annuleringsvoorwaarden gecontroleerd?",
      "Heb ik voor elke aansluiting genoeg tijd gerekend, vooral bij losse tickets?",
      "Heb ik mijn paspoort of id bij me als ik een grens oversteek?"
    ] },
    { t: "p", text: "TicketsJet helpt je vluchten van veel aanbieders te vergelijken, zodat je ziet of vliegen op jouw route de moeite waard is. Bekijk treinopties apart op de website van de spoorwegmaatschappij." }
  ],
  faq: [
    { q: "Is de trein goedkoper dan vliegen in Europa?", a: "Dat hangt af van de route en de datum. Vluchten kunnen zeer lage getoonde prijzen hebben, maar bagage, stoelen en vervoer van en naar de luchthaven kunnen het gat dichten. Vergelijk de volledige kosten voor je exacte reis en boek voor beide vroeg." },
    { q: "Is de trein of het vliegtuig sneller?", a: "Over kortere afstanden is de trein van deur tot deur vaak concurrerend, omdat stations in stadscentra liggen en instappen sneller gaat. Op langere afstanden wint het vliegtuig meestal, tenzij een hogesnelheidslijn de route bedient." },
    { q: "Kan ik in de trein meer bagage meenemen?", a: "Meestal wel. Veel treinvervoerders staan grotere tassen toe en rekenen niets extra voor gewone bagage, maar regels verschillen per vervoerder, dus controleer dat, vooral voor fietsen of grote voorwerpen." },
    { q: "Wat gebeurt er als mijn trein vertraagd is en ik een aansluiting mis?", a: "Bij één doorgaand ticket moet de vervoerder je over het algemeen naar je bestemming brengen, vaak met de eerstvolgende beschikbare dienst. Bij losse tickets moet je mogelijk zelf een nieuw ticket kopen." },
    { q: "Is het beter om trein en vliegtuig op één ticket te boeken?", a: "Eén gecombineerde boeking biedt meer bescherming als je een aansluiting mist. Boek je los, reken dan extra tijd en controleer de annuleringsregels van elk ticket." }
  ],
};
