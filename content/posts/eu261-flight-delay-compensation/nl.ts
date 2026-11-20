import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Vergoeding vertraagde vlucht volgens EU261: heb ik recht op geld?",
  description: "Een praktische gids over vergoeding voor een vertraagde vlucht: wie valt onder de regels, de drie-uursregel, de bedragen en welke bewijsstukken je bewaart.",
  blocks: [
    { t: "p", text: "Een lange vertraging op het vliegveld is al vervelend genoeg. Als je mogelijk ook recht hebt op geld, loont het om een paar documenten te bewaren. EU261 is de gebruikelijke naam voor de Europese regel met rechten voor luchtvaartpassagiers. In deze gids leggen we uit wanneer vertraging kan leiden tot een vergoeding, hoe de bedragen worden bepaald en wat je daarna doet." },
    { t: "p", text: "Dit is algemene informatie, geen juridisch advies. Regels en individuele situaties kunnen verschillen, dus raadpleeg de officiële bronnen aan het einde van dit artikel." },

    { t: "h2", text: "1. Wie valt onder de regel", id: "who-is-covered" },
    { t: "p", text: "De regel geldt voor vluchten die vertrekken vanaf een luchthaven in de Europese Unie. Ook geldt hij voor vluchten die in de EU aankomen wanneer de luchtvaartmaatschappij een EU-maatschappij is. Een vlucht tussen twee landen buiten de EU met een maatschappij van buiten de EU valt doorgaans buiten de regel, ook als jij in de EU woont." },
    { t: "p", text: "De bescherming hangt aan de vlucht, niet aan je paspoort. Het gaat om het begin of einde van de vlucht en om de maatschappij die hem uitvoert. Als je via een bureau hebt geboekt, blijft de uitvoerende luchtvaartmaatschappij de partij bij wie je de rechten geldend maakt." },

    { t: "h2", text: "2. De drie-uursregel", id: "three-hour-rule" },
    { t: "p", text: "De vergoeding bij vertraging wordt bepaald door je aankomsttijd op de bestemming, niet door het vertrek. Bereik je je eindbestemming drie uur of later dan gepland, dan kun je recht hebben op een bedrag." },
    { t: "p", text: "De klok stopt wanneer de deur op de bestemming opengaat. Een vlucht die laat vertrekt maar in de lucht tijd inhaalt, komt dus mogelijk niet in aanmerking. Bewaar je oorspronkelijke boekingsbevestiging én je instapkaart, want je moet de geplande aankomsttijd kunnen aantonen." },

    { t: "h2", text: "3. Hoeveel kun je krijgen", id: "amounts" },
    { t: "table", head: ["Afstand", "Mogelijke vergoeding per passagier"], rows: [
      ["Tot 1.500 km", "250 EUR"],
      ["1.500 tot 3.500 km", "400 EUR"],
      ["Langere vluchten binnen de EU", "400 EUR"],
      ["Meer dan 3.500 km", "600 EUR"],
    ] },
    { t: "p", text: "De afstand wordt voor de hele vlucht gemeten. Maatschappijen en toezichthouders gebruiken de geplande route om een reis in een van deze categorieën te plaatsen. Het bedrag geldt per passagier, dus twee reizigers op dezelfde boeking kunnen elk een claim hebben." },

    { t: "h2", text: "4. Wanneer geen vergoeding verschuldigd is", id: "extraordinary-circumstances" },
    { t: "p", text: "De maatschappij hoeft niet te betalen als de lange vertraging is veroorzaakt door buitengewone omstandigheden die ook met alle redelijke maatregelen niet te voorkomen waren. Weer, beperkingen van de luchtverkeersleiding en beveiligingsproblemen worden in dit verband vaak genoemd." },
    { t: "p", text: "We doen geen uitspraken over jouw specifieke geval. De luchtvaartmaatschappij moet haar beslissing toelichten, en nationale handhavingsinstanties kunnen helpen als je het niet eens bent. Vraag de reden schriftelijk op en bewaar alle berichten die je ontvangt." },

    { t: "h2", text: "5. Zorg tijdens het wachten", id: "care-while-you-wait" },
    { t: "p", text: "Los van een eventuele vergoeding heeft de maatschappij plichten om passagiers tijdens het wachten te verzorgen. Die plichten gelden ook wanneer de vertraging door buitengewone omstandigheden is ontstaan." },
    { t: "ul", items: [
      "Maaltijden en drankjes als het wachten lang genoeg duurt.",
      "Hulp bij communicatie, bijvoorbeeld berichten naar huis.",
      "Hotelaccommodatie als een overnachting nodig wordt, binnen de grenzen van de regel.",
      "Vervoer tussen luchthaven en hotel wanneer een hotel wordt aangeboden.",
    ] },

    { t: "h2", text: "6. Bewijsstukken om te bewaren", id: "documents" },
    { t: "p", text: "Een claim verloopt veel soepeler als je kunt tonen wat was beloofd en wat er echt gebeurde. Verzamel het volgende zolang de gebeurtenissen nog vers zijn." },
    { t: "ul", items: [
      "Je boekingsbevestiging, inclusief geplande vertrek- en aankomsttijd.",
      "Je instapkaart of elektronische instapgegevens.",
      "Screenshots van de vluchtborden en eventuele app-meldingen.",
      "Schriftelijke berichten van de maatschappij over de oorzaak van de vertraging.",
      "Bonnen van maaltijden, hotel of vervoer die je zelf moest regelen.",
    ] },

    { t: "h2", text: "7. Zo dien je een claim in", id: "how-to-claim" },
    { t: "p", text: "Begin bij de luchtvaartmaatschappij. De meeste maatschappijen hebben een online formulier, maar de precieze werkwijze verschilt. Vermeld het vluchtnummer, de datum, je boekingsreferentie en een korte beschrijving van wat er gebeurde." },
    { t: "ol", items: [
      "Controleer met de test in hoofdstuk één of je vlucht onder de regel valt.",
      "Bereken of je drie uur of later dan gepland bent aangekomen.",
      "Stuur de claim met je bewijsstukken naar de uitvoerende maatschappij.",
      "Bewaar een kopie van alles wat je verstuurt en noteer de datum.",
      "Krijg je geen bruikbaar antwoord, neem dan contact op met de nationale handhavingsinstantie in het land van vertrek of aankomst.",
    ] },
    { t: "p", text: "Met onze EU261-rekenmachine zie je snel in welke categorie een reis valt. Lees ook onze gids over geannuleerde vluchten en onze gids over instapweigering." },

    { t: "h2", text: "8. Een eenvoudig tijdschema", id: "timeline" },
    { t: "p", text: "Als de reis achter de rug is, werk je de claim in stappen af. Verzamel eerst de documenten die je al hebt, waaronder de boeking en de instapkaart. Noteer daarna de geplande en de werkelijke aankomsttijd, want dat verschil bepaalt of aan de drie-uursregel is voldaan. Stuur ten slotte een korte claim naar de uitvoerende maatschappij en bewaar het bewijs van de verzenddatum." },
    { t: "ul", items: [
      "Vroeg stadium: verzamel documenten, noteer de aankomsttijden en verstuur de eerste claim.",
      "Tijdens het wachten: bewaar kopieën van elk antwoord en noteer termijnen die de maatschappij noemt.",
      "Als er geen bruikbaar antwoord komt: neem contact op met de nationale handhavingsinstantie met dezelfde stukken.",
    ] },
    { t: "p", text: "Een rustige en overzichtelijke claim is voor iedereen makkelijker te behandelen. Vermijd lange verhalen over de ervaring en richt je op de vluchtgegevens, de tijden en wat je vraagt." },

    { t: "h2", text: "Controleer de officiële bron", id: "official-source" },
    { t: "p", text: "Voor de volledige tekst van de regel en de actuele uitleg kijk je op de website EU Your Europe en bij de nationale handhavingsinstantie van jouw land. Maatschappijen en procedures veranderen, en de officiële bron blijft altijd de uiteindelijke referentie." },
  ],
  faq: [
    { q: "Komt een vertraging van twee uur in aanmerking?", a: "Voor een vergoeding bij vertraging moet je drie uur of later dan gepland op je bestemming aankomen. Zorgplichten tijdens het wachten kunnen eerder ingaan." },
    { q: "Geldt de regel ook voor vluchten buiten de EU?", a: "De regel geldt voor vluchten vanaf een EU-luchthaven en voor vluchten naar de EU met een EU-maatschappij. Controleer de details via de officiële bron voor jouw reis." },
    { q: "Wat als de maatschappij buitengewone omstandigheden aanvoert?", a: "Vraag om een schriftelijke toelichting. Als je het niet eens bent met de beslissing, kun je de bevoegde nationale handhavingsinstantie inschakelen." },
  ],
};
