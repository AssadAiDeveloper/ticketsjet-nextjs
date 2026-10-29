import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Vlucht vertraagd of geannuleerd? Je rechten en compensatie onder EU261",
  description: "Waar je recht op hebt bij een vertraagde, geannuleerde of overboekte vlucht: zorg, terugbetaling, omboeking en vaste compensatie onder EU-Verordening 261/2004, en hoe je een claim indient.",
  blocks: [
    { t: "p", text: "Een vertraagde of geannuleerde vlucht is al vervelend genoeg zonder dat je hoeft uit te zoeken waar je recht op hebt. In Europa geeft een verordening, bekend als EU261, passagiers duidelijke rechten, en veel reizigers claimen nooit wat hen toekomt. Deze gids legt de belangrijkste regels in begrijpelijke taal uit, en wat je op de luchthaven en daarna kunt doen." },
    { t: "p", text: "Dit is algemene informatie en geen juridisch advies. Regels hebben voorwaarden en uitzonderingen en details kunnen veranderen. Raadpleeg dus de officiële pagina's van de EU of de nationale autoriteit en de voorwaarden van je maatschappij voor jouw situatie." },

    { t: "h2", text: "1. Wanneer is EU261 van toepassing op je vlucht?", id: "when-it-applies" },
    { t: "p", text: "EU261 beschermt passagiers op vluchten binnen de Europese Unie, IJsland, Noorwegen en Zwitserland, en op vluchten die vertrekken vanaf een luchthaven in die landen. Het geldt ook voor vluchten die vanuit een land buiten de EU in de EU aankomen, maar alleen als de maatschappij in de EU is geregistreerd." },
    { t: "table", head: ["Jouw vlucht", "Gedekt door EU261?"], rows: [
      ["Vertrekt vanaf een EU-luchthaven, elke maatschappij", "Ja"],
      ["Komt van buiten de EU aan in de EU, met een EU-maatschappij", "Ja"],
      ["Komt van buiten de EU aan in de EU, met een maatschappij van buiten de EU", "Meestal niet"],
      ["Vertrekt van buiten de EU, met een maatschappij van buiten de EU, naar een bestemming buiten de EU", "Nee"]
    ] },
    { t: "p", text: "Het Verenigd Koninkrijk heeft eigen, vergelijkbare regels (vaak UK261 genoemd) voor vluchten vanaf Britse luchthavens en sommige vluchten met Britse maatschappijen. De principes lijken op elkaar, maar controleer welke regels voor jouw vlucht gelden." },

    { t: "h2", text: "2. Je rechten bij een vertraagde vlucht", id: "delays" },
    { t: "p", text: "Bij een vertraging zijn er twee aparte dingen om te weten: de zorg die de maatschappij moet bieden terwijl je wacht, en de compensatie waar je daarna recht op kunt hebben." },
    { t: "h3", text: "Zorg en bijstand tijdens het wachten" },
    { t: "p", text: "Als je vertrek langer dan een bepaalde tijd vertraagd is (afhankelijk van de vluchtafstand), moet de maatschappij maaltijden en drankjes aanbieden, de mogelijkheid om twee keer te bellen of berichten te sturen en, als de vertraging tot de volgende dag duurt, een hotel en vervoer ernaartoe." },
    { t: "h3", text: "Compensatie bij een lange vertraging" },
    { t: "p", text: "Je hebt mogelijk recht op een vaste compensatie als je drie uur of langer te laat op je eindbestemming aankomt. Wat telt is de vertraging bij aankomst op je eindbestemming, niet bij vertrek." },
    { t: "table", head: ["Vluchtafstand", "Compensatie per passagier"], rows: [
      ["Tot 1.500 km", "250 euro"],
      ["Binnen de EU boven 1.500 km, en andere vluchten tussen 1.500 en 3.500 km", "400 euro"],
      ["Andere vluchten boven 3.500 km", "600 euro"]
    ] },
    { t: "p", text: "Bij lange vluchten kan de compensatie met de helft worden verlaagd als de vertraging bij aankomst minder dan vier uur is. Het bedrag geldt per passagier, dus een gezin van vier kan vier keer zoveel krijgen." },
    { t: "p", text: "Bij een vertraging van meer dan vijf uur kun je er ook voor kiezen de reis te laten vallen en terugbetaling van het ongebruikte ticket te vragen." },

    { t: "h2", text: "3. Je rechten bij een geannuleerde vlucht", id: "cancellations" },
    { t: "p", text: "Als een maatschappij je vlucht annuleert, heb je een keuze die niet afhangt van de reden van de annulering." },
    { t: "ol", items: [
      "Volledige terugbetaling van het ticket (en een vlucht terug naar je eerste vertrekpunt als je al op een reis met overstap zat).",
      "Omboeking naar je bestemming zo snel mogelijk, onder vergelijkbare voorwaarden.",
      "Omboeking op een latere datum die jou schikt, als er plaatsen beschikbaar zijn."
    ] },
    { t: "p", text: "Terwijl je wacht moet de maatschappij ook maaltijden, communicatie en indien nodig hotelaccommodatie bieden, net als bij een vertraging." },
    { t: "p", text: "Mogelijk heb je ook recht op de hierboven genoemde vaste compensatie, tenzij je ruim van tevoren over de annulering bent geïnformeerd (meestal minstens twee weken voor vertrek), de maatschappij een passende alternatieve vlucht met slechts een klein tijdsverschil aanbood, of de annulering door buitengewone omstandigheden werd veroorzaakt." },

    { t: "h2", text: "4. Instapweigering en overboeking", id: "denied-boarding" },
    { t: "p", text: "Maatschappijen verkopen soms meer tickets dan er stoelen zijn. Als je tegen je wil de toegang tot het vliegtuig wordt geweigerd, terwijl je op tijd hebt ingecheckt, heb je recht op zorg, een keuze tussen terugbetaling en omboeking en dezelfde vaste compensatie als bij lange vertragingen en annuleringen. Maatschappijen vragen meestal eerst om vrijwilligers en bieden daar iets voor, waarover je kunt onderhandelen." },

    { t: "h2", text: "5. Wanneer je mogelijk geen compensatie krijgt", id: "exceptions" },
    { t: "p", text: "De maatschappij hoeft de vaste compensatie niet te betalen als de vertraging of annulering werd veroorzaakt door buitengewone omstandigheden die niet te vermijden waren, ook niet als alle redelijke maatregelen waren genomen. Denk aan zwaar weer, beperkingen door de luchtverkeersleiding, veiligheidsrisico's, politieke instabiliteit of stakingen van luchthavenpersoneel buiten de invloed van de maatschappij." },
    { t: "ul", items: [
      "Technische storingen aan het toestel gelden meestal niet als buitengewoon, al zijn er uitzonderingen.",
      "Stakingen van het eigen personeel van de maatschappij worden vaak anders behandeld dan stakingen van derden.",
      "Ook als er geen compensatie is, heb je nog steeds recht op zorg en op terugbetaling of omboeking."
    ] },

    { t: "h2", text: "6. Wat je op de luchthaven doet", id: "at-the-airport" },
    { t: "ol", items: [
      "Vraag bij de balie of in de app van de maatschappij wat er aan de hand is, en indien mogelijk de reden schriftelijk.",
      "Bewaar je instapkaart, boekingsbevestiging en berichten van de maatschappij.",
      "Noteer de geplande en werkelijke tijden van vertrek en aankomst.",
      "Bewaar bonnetjes als je zelf maaltijden, vervoer of een hotel betaalt omdat de maatschappij dat niet regelde.",
      "Maak foto's van de vertrekborden die de vertraging of annulering tonen."
    ] },

    { t: "h2", text: "7. Hoe je een claim indient", id: "how-to-claim" },
    { t: "p", text: "Je kunt rechtstreeks bij de maatschappij claimen, meestal via een formulier op de website. Beschrijf de vlucht, het probleem en de compensatie die je vraagt, en voeg je documenten toe. Bewaar kopieën van alles wat je verstuurt." },
    { t: "ul", items: [
      "Als de maatschappij weigert of niet reageert, kun je meestal escaleren naar de nationale handhavingsinstantie in het land waar het probleem plaatsvond.",
      "Termijnen om te claimen verschillen per land en kunnen in sommige landen meerdere jaren zijn. Wacht niet langer dan nodig.",
      "Claimbureaus regelen de claim voor je, meestal in ruil voor een deel van het bedrag dat je terugkrijgt. Vergelijk hun kosten met de moeite om zelf te claimen."
    ] },
    { t: "callout", title: "Controleer je claim", text: "TicketsJet heeft een pagina waar je je vlucht kunt toetsen aan de compensatieregels en via een partner een claim kunt starten. De partner handelt de claim af en bij een geslaagde claim zijn doorgaans kosten verschuldigd." },

    { t: "h2", text: "Korte checklist", id: "checklist" },
    { t: "ol", items: [
      "Was mijn vlucht gedekt (vertrek uit de EU, of aankomst met een EU-maatschappij)?",
      "Kwam ik drie uur of langer te laat aan, of werd de vlucht geannuleerd of overboekt?",
      "Gaf de maatschappij een reden, en was dat een buitengewone omstandigheid?",
      "Heb ik mijn boeking, instapkaart en bonnetjes?",
      "Heb ik een schriftelijke claim naar de maatschappij gestuurd en een kopie bewaard?"
    ] }
  ],
  faq: [
    { q: "Hoe lang moet een vlucht vertraagd zijn om compensatie te claimen?", a: "Over het algemeen moet je drie uur of langer te laat op je eindbestemming aankomen. De vertraging wordt bij aankomst gemeten, niet bij vertrek. Of je kunt claimen hangt ook af van de oorzaak van de vertraging." },
    { q: "Hoeveel compensatie kan ik krijgen onder EU261?", a: "De vaste bedragen zijn 250, 400 of 600 euro per passagier, afhankelijk van de vluchtafstand. In sommige gevallen bij lange vluchten kunnen de bedragen lager zijn. Extra kosten voor zorg die je zelf betaalde kunnen ook worden vergoed." },
    { q: "Betekent slecht weer dat er geen compensatie is?", a: "Zwaar weer geldt meestal als buitengewone omstandigheid, dus de vaste compensatie is over het algemeen niet verschuldigd. Je hebt nog steeds recht op zorg, en op terugbetaling of omboeking als de vlucht wordt geannuleerd." },
    { q: "Kan ik claimen als ik via een reisbureau heb geboekt?", a: "Ja. De rechten gelden tegenover de maatschappij die de vlucht uitvoerde. Je kunt rechtstreeks bij de maatschappij claimen, ook als je via een bureau hebt geboekt." },
    { q: "Hoe lang heb ik om een claim in te dienen?", a: "Dat hangt af van het land waar je claimt. Termijnen lopen uiteen van ongeveer een jaar tot meerdere jaren. Dien je claim zo snel mogelijk in, zolang de gegevens vers zijn." }
  ],
};
