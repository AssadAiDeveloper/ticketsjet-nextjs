import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Je eerste uur na de landing: een stapsgewijze aankomstchecklist",
  description: "Wat je moet doen tussen de vliegtuigdeur en je accommodatie: paspoortcontrole, bagage, online komen, geld, vervoer en veelgemaakte fouten bij aankomst.",
  blocks: [
    { t: "p", text: "Het eerste uur na de landing bepaalt de toon van je reis. Je bent moe, op een onbekende plek en moet meerdere dingen in de juiste volgorde doen. Een beetje plannen voor je vliegt maakt dit uur rustig in plaats van stressvol." },
    { t: "p", text: "Deze checklist volgt de echte volgorde van een aankomst, van de vliegtuigdeur tot de straat. Luchthavens en landen verschillen, dus gebruik hem als kader en controleer de officiële informatie voor je bestemming." },

    { t: "h2", text: "1. Voor de landing: bereid je voor in het vliegtuig", id: "on-the-plane" },
    { t: "p", text: "Veel werk kun je doen voordat je de grond raakt. Gebruik het laatste deel van de vlucht om je klaar te maken." },
    { t: "ul", items: [
      "Vul een aankomst- of douaneformulier in als dat wordt uitgedeeld, met het adres van je accommodatie.",
      "Stop je paspoort, instapkaart en eventuele toegangsdocumenten in één makkelijk bereikbaar zakje.",
      "Zet je telefoon op vliegtuigmodus tot je geland bent en download dan offline kaarten zolang je nog wifi of data hebt.",
      "Controleer de aankomstterminal en het vervoersplan dat je thuis hebt gemaakt.",
      "Noteer het adres van je accommodatie als tekst die je aan een chauffeur kunt laten zien, zo mogelijk in het lokale schrift."
    ] },

    { t: "h2", text: "2. Van het vliegtuig naar de paspoortcontrole", id: "passport-control" },
    { t: "p", text: "Volg de borden voor aankomst of immigratie. Heb je een overstap, volg dan in plaats daarvan de borden voor transfer. Loop in een gelijkmatig tempo, want vooraan in een lange rij staan kan veel tijd schelen." },
    { t: "ul", items: [
      "Houd je paspoort open op de pagina met de foto en eventuele visa of elektronische toestemming bij de hand.",
      "Wees voorbereid om simpele vragen te beantwoorden: waar je verblijft en hoe lang je blijft.",
      "Veel landen gebruiken elektronische poortjes en biometrische registratie. Inreissystemen in Europa en elders veranderen, dus controleer de actuele regels voor je bestemming voordat je reist.",
      "Houd je telefoon weg terwijl je in de rij staat, tenzij de grensautoriteit het gebruik toestaat."
    ] },
    { t: "callout", title: "Controleer de inreisregels voordat je vliegt", text: "Inreisvereisten zoals visa en elektronische reisautorisaties kunnen veranderen. Bevestig ze altijd op de officiële overheidswebsite van je bestemming, en doe dat voordat je boekt." },

    { t: "h2", text: "3. Haal je bagage op", id: "baggage" },
    { t: "p", text: "Kijk op de schermen naar je vluchtnummer en bandnummer. Ga een stukje van de band af staan zodat je de koffers kunt zien aankomen en makkelijk kunt bewegen." },
    { t: "ul", items: [
      "Vergelijk het nummer op het bagagelabel met je bon voordat je weggaat.",
      "Ontbreekt een koffer of is hij beschadigd, meld dat dan bij de balie van de maatschappij in de bagagehal voordat je de luchthaven verlaat en vraag een schriftelijk rapport.",
      "Bewaar je instapkaart totdat je al je bagage hebt, want de maatschappij kan erom vragen."
    ] },
    { t: "p", text: "Onze bagagegids legt in meer detail uit hoe je met vertraging en schade omgaat." },

    { t: "h2", text: "4. Douane en de aankomsthal", id: "customs" },
    { t: "p", text: "Na de bagage passeer je meestal de douane. Heb je niets aan te geven, volg dan de groene borden of de borden voor niets aan te geven, waar die er zijn. Controleer vóór je reist de toegestane hoeveelheden voor zaken als contant geld, alcohol, tabak en eten, want limieten verschillen sterk." },
    { t: "p", text: "Als je erdoor bent, kom je in de aankomsthal. Hier proberen mensen je taxi's en tours te verkopen. Loop er rustig langs en volg de borden naar het officiële vervoer." },

    { t: "h2", text: "5. Kom online", id: "online" },
    { t: "p", text: "Verbonden blijven maakt alles makkelijker, van kaarten tot ritapps. Bepaal vóór de landing hoe je dat doet." },
    { t: "ul", items: [
      "Een eSIM kun je vóór je reis installeren en bij aankomst activeren. Zie onze gids over eSIM, lokale simkaart en roaming.",
      "Een lokale simkaart kun je op de luchthaven kopen, maar de prijzen daar zijn vaak hoger dan in de stad.",
      "Wifi op de luchthaven vraagt vaak om registratie en is meestal niet veilig. Vermijd inloggen op je bankieren terwijl je erop zit.",
      "Download offline kaarten van je bestemming voordat je vertrekt, voor het geval je eerst geen bereik hebt."
    ] },

    { t: "h2", text: "6. Geld en betalingen", id: "money" },
    { t: "p", text: "De meeste plekken accepteren kaarten, maar het blijft handig een klein bedrag aan lokale valuta te hebben voor vervoer en kleine aankopen." },
    { t: "ul", items: [
      "Een geldautomaat op de luchthaven is meestal handig, maar controleer de kosten. Weiger de optie om in je eigen valuta te worden belast en kies de lokale valuta.",
      "Wisselkantoren op luchthavens hebben meestal slechte koersen. Wissel alleen een klein bedrag als het niet anders kan.",
      "Meld het je bank als je kaartproblemen in het buitenland verwacht en houd een reservebetaalmiddel apart van je hoofdmiddel.",
      "Contactloos betalen en telefoonwallets werken in veel landen, maar controleer wat gebruikelijk is op je bestemming."
    ] },

    { t: "h2", text: "7. Vervoer naar je accommodatie", id: "transport" },
    { t: "p", text: "Het beste vervoer is het vervoer dat je vóór aankomst hebt gepland. Vergelijk deze veelgebruikte opties en kies voordat je moe bent." },
    { t: "table", head: ["Optie", "Voordelen", "Nadelen"], rows: [
      ["Trein of metro", "Meestal het goedkoopst en vermijdt verkeer", "Kan druk zijn met bagage; controleer de laatste rit"],
      ["Luchthavenbus of shuttle", "Direct naar centrale gebieden, eenvoudig", "Vaste dienstregeling en haltes"],
      ["Officiële taxi", "Van deur tot deur, makkelijk met bagage", "Duurder; gebruik de officiële taxistandplaats en controleer hoe de prijs werkt"],
      ["Ritdienst-app", "Prijs vooraf zichtbaar in veel steden", "Ophaalpunten kunnen moeilijk te vinden zijn; heeft data nodig"],
      ["Vooraf geboekte transfer", "Chauffeur wacht op je, vaste prijs", "Duurder dan openbaar vervoer; bevestig de gegevens vooraf"]
    ] },
    { t: "p", text: "Vermijd onofficiële chauffeurs die je in de terminal aanspreken. Ze kunnen te veel rekenen en je hebt geen bescherming als er iets misgaat." },

    { t: "h2", text: "8. Veelgemaakte fouten bij aankomst", id: "mistakes" },
    { t: "ul", items: [
      "De eerste taxi nemen die wordt aangeboden zonder te controleren hoe de prijs wordt berekend.",
      "Een groot bedrag aan contant geld op de luchthaven wisselen.",
      "Bij je accommodatie aankomen zonder de inchecktijd te controleren. Land je vroeg, vraag dan of je bagage kunt stallen.",
      "Het adres van je accommodatie niet offline beschikbaar hebben.",
      "Openbare wifi gebruiken voor gevoelige accounts."
    ] },

    { t: "h2", text: "9. Als er iets misgaat", id: "problems" },
    { t: "p", text: "Vertragingen, zoekgeraakte koffers en gemiste aansluitingen komen voor. Ga bij problemen met de vlucht en bagage eerst naar de balie van je maatschappij. Neem bij verloren documenten contact op met je ambassade of consulaat. Bewaar een kopie van je paspoort en boekingsgegevens apart van de originelen, op papier of offline opgeslagen." },
    { t: "p", text: "Was je vlucht vertraagd of geannuleerd, dan heb je mogelijk recht op verzorging of compensatie. Zie onze gids over compensatie bij vertraagde vluchten in de EU." },

    { t: "h2", text: "10. Je aankomstchecklist", id: "checklist" },
    { t: "ul", items: [
      "Paspoort en inreisdocumenten klaar vóór de landing.",
      "Offline kaarten en adres van de accommodatie opgeslagen.",
      "eSIM of databundel geregeld.",
      "Een klein bedrag aan lokale valuta of een kaart die in het buitenland werkt.",
      "Een vooraf gekozen vervoersplan.",
      "Bagage opgehaald en gecontroleerd."
    ] },
    { t: "p", text: "TicketsJet helpt je vluchten te vergelijken, zodat je zowel een goede aankomsttijd als een goede prijs vindt. Landen bij daglicht met een makkelijke transfer kan een paar euro extra waard zijn." }
  ],
  faq: [
    { q: "Hoe lang duurt het om na de landing de luchthaven uit te komen?", a: "Dat verschilt per luchthaven en tijd van de dag. Reken ongeveer een tot twee uur tussen landing en het verlaten van het gebouw, meer op drukke momenten of bij lange rijen bij de immigratie." },
    { q: "Moet ik op de luchthaven geld wisselen?", a: "Meestal alleen een klein bedrag, als dat nodig is. Wisselkantoren op luchthavens hebben vaak minder gunstige koersen. Lokale valuta opnemen bij een geldautomaat of met de kaart betalen is vaak beter, maar controleer de kosten." },
    { q: "Wat is de veiligste manier om van de luchthaven naar de stad te komen?", a: "Gebruik officieel openbaar vervoer, een officiële taxistandplaats, een ritdienst-app of een vooraf geboekte transfer. Vermijd onofficiële chauffeurs die je in de terminal aanspreken." },
    { q: "Wat moet ik doen als mijn bagage niet aankomt?", a: "Ga naar de bagagebalie van de maatschappij voordat je de luchthaven verlaat en dien een schriftelijke melding in. Bewaar het referentienummer en bonnetjes van noodzakelijke aankopen terwijl je op je koffer wacht." },
    { q: "Moet ik de inreisvereisten controleren voordat ik vlieg?", a: "Ja. Visumregels en elektronische reisautorisaties verschillen per nationaliteit en bestemming en kunnen veranderen. Controleer de officiële overheidswebsite van je bestemming voordat je boekt en nogmaals voordat je reist." }
  ],
};
