import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Bagagekosten uitgelegd: handbagage, ruimbagage en hoe je verrassende kosten voorkomt",
  description: "Hoe bagageregels en -kosten van luchtvaartmaatschappijen werken, wat een 'persoonlijk item' echt is, hoe je de werkelijke prijs van een ticket vergelijkt en praktische manieren om niet extra te betalen op de luchthaven.",
  blocks: [
    { t: "p", text: "Een goedkope prijs kan aan de incheckbalie ineens niet meer goedkoop zijn. Bagage is een van de meest voorkomende redenen waarom de prijs die je betaalt niet de prijs is die je zag, en de regels verschillen per maatschappij, per tarief en zelfs per route van dezelfde maatschappij." },
    { t: "p", text: "Deze gids legt uit hoe bagagetoeslagen zijn opgebouwd, waar extra kosten vandaan komen en hoe je tarieven eerlijk vergelijkt. We noemen geen exacte bedragen, omdat maatschappijen die vaak wijzigen. In plaats daarvan leer je waar je op moet letten, zodat je de actuele regels voor je eigen vlucht kunt bevestigen." },

    { t: "h2", text: "1. De drie soorten bagage", id: "kinds" },
    { t: "p", text: "Vrijwel elke maatschappij deelt tassen in drie groepen in. Weten in welke groep jouw tas valt is de eerste stap om extra kosten te voorkomen." },
    { t: "table", head: ["Soort", "Waar het reist", "Gebruikelijke regel"], rows: [
      ["Persoonlijk item", "Onder de stoel voor je", "Een kleine tas, zoals een handtas, laptoptas of kleine rugzak. Vaak gratis, maar met strenge maatlimieten."],
      ["Handbagage (cabinebagage)", "In het bagagevak boven je", "Een grotere tas die gratis, tegen betaling of alleen bij hogere tarieven inbegrepen kan zijn, afhankelijk van de maatschappij."],
      ["Ruimbagage", "In het ruim", "Heeft meestal een gewichtslimiet. Kan inbegrepen zijn, als extra worden verkocht of in de goedkoopste tarieven niet worden aangeboden."]
    ] },
    { t: "callout", title: "Controleer je exacte tarief", text: "Twee tickets op dezelfde vlucht kunnen verschillende bagageregels hebben. Lees altijd de bagageregel van het tarief dat je koopt, niet die van de maatschappij in het algemeen." },

    { t: "h2", text: "2. Waarom tarieven in bundels zijn opgesplitst", id: "bundles" },
    { t: "p", text: "Veel maatschappijen, vooral lagekostenmaatschappijen, verkopen een basistarief en voegen diensten apart toe. Het basistarief is de prijs die je in de zoekresultaten ziet. Bagage, stoelkeuze en voorrang bij het instappen zijn optionele extra's met aparte prijzen." },
    { t: "p", text: "Traditionele maatschappijen doen op korte en middellange routes vaak iets vergelijkbaars. Hun laagste tarief kan alleen een kleine handbagage bevatten, terwijl een iets hoger tarief ruimbagage en wijzigingen toevoegt. Op lange vluchten is ruimbagage vaker inbegrepen, maar dat is niet universeel." },
    { t: "ul", items: [
      "Basis- of lighttarieven: laagste prijs, minste inbegrepen, vaak alleen een persoonlijk item.",
      "Standaard- of classictarieven: voegen meestal handbagage of ruimbagage toe, en soms stoelkeuze.",
      "Flextarieven: meer inbegrepen plus flexibelere wijzigings- en annuleringsvoorwaarden."
    ] },

    { t: "h2", text: "3. Wat telt als persoonlijk item?", id: "personal-item" },
    { t: "p", text: "Maatschappijen stellen een maximale afmeting voor de gratis tas onder de stoel vast, en die limieten zijn niet overal gelijk. Een tas die bij de ene maatschappij mag, kan bij de andere te groot zijn. Als je tas zelfs maar iets over de limiet gaat, kan je gevraagd worden te betalen, soms een hoog bedrag bij de gate." },
    { t: "ul", items: [
      "Meet je tas inclusief handvatten, wielen en buitenzakken.",
      "Een zachte tas die je kunt samendrukken is veiliger dan een stijve tas op de limiet.",
      "Reken er niet op dat een extra jas of tas met inkopen mag. Regels over extra items verschillen.",
      "Past de tas maar net, overweeg dan online te betalen voor een grotere toeslag in plaats van het risico bij de gate te nemen."
    ] },

    { t: "h2", text: "4. Regels voor handbagage: afmeting en gewicht", id: "cabin-bag" },
    { t: "p", text: "Handbagage heeft een maatlimiet en bij veel maatschappijen ook een gewichtslimiet. Die gewichtslimiet speelt reizigers vaak parten, omdat de tas misschien wel in het bagagevak past maar toch te zwaar is." },
    { t: "ul", items: [
      "Controleer beide getallen op de bagagepagina van je maatschappij: afmetingen in centimeters en maximaal gewicht in kilogram.",
      "Als je overstapt tussen twee maatschappijen op losse tickets, geldt voor dat traject de strengste limiet.",
      "Op volle vluchten kunnen maatschappijen passagiers vragen handbagage bij de gate in het ruim te plaatsen. Bewaar waardevolle spullen, medicijnen en documenten in je persoonlijke item.",
      "Ga er niet van uit dat een tas die de fabrikant 'cabineformaat' noemt aan de limiet van elke maatschappij voldoet."
    ] },

    { t: "h2", text: "5. Ruimbagage: gewicht, prijs en timing", id: "checked-bag" },
    { t: "p", text: "Ruimbagage heeft een gewichtslimiet, vaak uitgedrukt in kilogram. Overschrijden kost meer, meestal per kilogram of per stap extra gewicht. Dit is doorgaans de duurste manier om bagage toe te voegen." },
    { t: "p", text: "Het goedkoopste moment om een tas toe te voegen is bij het boeken. Later toevoegen via je boeking kost meestal meer en betalen op de luchthaven is vaak het duurst." },
    { t: "table", head: ["Wanneer je de tas toevoegt", "Gebruikelijk kostenniveau", "Opmerking"], rows: [
      ["Tijdens het boeken", "Laagst", "De beste prijs bij de meeste maatschappijen."],
      ["Na het boeken, online", "Gemiddeld", "De prijs hangt vaak af van hoe dicht je bij vertrek bent."],
      ["Op de luchthaven of bij de gate", "Hoogst", "Vermijd dit als het kan. Betalen kan ook beperkt zijn tot kaarten."]
    ] },
    { t: "p", text: "Weeg je tas thuis met een bagageweegschaal of een personenweegschaal. Een kilo te zwaar zijn aan de balie is een dure fout die makkelijk te voorkomen is." },

    { t: "h2", text: "6. Vergelijk de werkelijke prijs van een vlucht", id: "true-price" },
    { t: "p", text: "De eerlijke manier om twee vluchten te vergelijken is de extra's meetellen die je echt nodig hebt. Een vlucht die 30 euro goedkoper lijkt, kan duurder uitkomen zodra je een tas toevoegt." },
    { t: "ol", items: [
      "Bepaal wat je nodig hebt: alleen een persoonlijk item, handbagage of ruimbagage.",
      "Zoek de prijs van die tas bij elke maatschappij voor je exacte vlucht.",
      "Voeg stoelkeuze toe als je naast elkaar wilt zitten.",
      "Vergelijk het totaal per persoon, niet het getoonde tarief.",
      "Denk aan de terugvlucht. Sommige maatschappijen rekenen bagage per richting."
    ] },
    { t: "callout", title: "Licht reizen loont", text: "Als je je reis in een persoonlijk item kwijt kunt, voorkom je bagagekosten volledig en sla je de bagageband bij aankomst over. Voor een weekendtrip is dat vaak haalbaar." },

    { t: "h2", text: "7. Overstappen en losse tickets", id: "connections" },
    { t: "p", text: "Als je een reis met overstappen op één ticket boekt, kan je bagage meestal doorgelabeld worden naar de eindbestemming. Boek je losse tickets, dan behandelt elke maatschappij haar eigen vlucht apart. Je moet je tas mogelijk ophalen en opnieuw inchecken, en elk ticket heeft eigen bagageregels en kosten." },
    { t: "ul", items: [
      "Vraag bij het inchecken op één ticket of je tas naar de eindluchthaven is gelabeld.",
      "Reken bij losse tickets veel meer overstaptijd, want je moet mogelijk door de douane en opnieuw inchecken.",
      "Een gemiste overstap op losse tickets wordt over het algemeen niet gedekt door de eerste maatschappij."
    ] },

    { t: "h2", text: "8. Beperkte of verboden voorwerpen", id: "restricted" },
    { t: "p", text: "Sommige voorwerpen zijn in handbagage beperkt, ongeacht het tarief dat je koos. Vloeistoffen, powerbanks en bepaalde sportuitrusting hebben specifieke regels. Beveiligingsregels verschillen per land, dus bekijk de richtlijnen van de luchthaven voor je reist." },
    { t: "ul", items: [
      "Vloeistoffen in de cabine zijn meestal beperkt tot kleine verpakkingen in een doorzichtige tas. Grotere hoeveelheden gaan in het ruim.",
      "Reserve-lithiumbatterijen en powerbanks moeten normaal gesproken in de cabine mee, niet in ruimbagage.",
      "Grote voorwerpen zoals muziekinstrumenten of sportuitrusting kunnen vooraf boeken en een speciale toeslag vragen.",
      "Duty-freeaankopen zijn meestal toegestaan zolang ze verzegeld blijven, maar overstapvluchten kunnen dat veranderen."
    ] },

    { t: "h2", text: "9. Als je bagage beschadigd, vertraagd of kwijt is", id: "problems" },
    { t: "p", text: "Meld elk probleem voordat je de bagagehal verlaat. Maatschappijen hebben een balie voor verloren en vertraagde bagage en meestal moet je een schadeformulier (property irregularity report) invullen. Bewaar het referentienummer." },
    { t: "ul", items: [
      "Maak foto's van de schade en bewaar je bagagelabel.",
      "Bewaar bonnetjes voor essentiële spullen die je moet kopen terwijl je tas weg is. Maatschappijen kunnen redelijke kosten vergoeden.",
      "Voor schriftelijke claims gelden termijnen, vaak in dagen geteld vanaf ontvangst van de tas. Wacht niet.",
      "Een reisverzekering kan zaken dekken die boven de aansprakelijkheid van de maatschappij uitgaan."
    ] },

    { t: "h2", text: "10. Korte bagagechecklist", id: "checklist" },
    { t: "ul", items: [
      "Heb ik de bagagegegevens van mijn exacte tarief gelezen?",
      "Heb ik mijn tas gemeten en gewogen?",
      "Heb ik online tijdens het boeken een tas toegevoegd als ik die nodig heb?",
      "Zitten waardevolle spullen, medicijnen en documenten in mijn persoonlijke item?",
      "Heb ik bij losse tickets tijd om mijn tas op te halen en opnieuw in te checken?"
    ] },
    { t: "p", text: "Met TicketsJet vergelijk je vluchten van veel aanbieders. Controleer voor je betaalt de bagagevoorwaarden van het tarief dat je kiest op de boekingspagina van de maatschappij of het reisbureau." }
  ],
  faq: [
    { q: "Wat is het verschil tussen een persoonlijk item en handbagage?", a: "Een persoonlijk item is een kleine tas die onder de stoel voor je past. Handbagage is een grotere tas die in het bagagevak boven je gaat. Veel goedkope tarieven bevatten alleen het persoonlijke item, terwijl handbagage extra kan kosten of in een hoger tarief zit." },
    { q: "Is het goedkoper om bagage bij het boeken te betalen?", a: "Meestal wel. De meeste maatschappijen rekenen het minst tijdens het boeken, meer na het boeken via je boeking en het meest op de luchthaven of bij de gate." },
    { q: "Moet ik op de terugvlucht opnieuw voor bagage betalen?", a: "Dat hangt af van hoe het tarief en de tas zijn verkocht. Sommige maatschappijen rekenen bagage per richting, dus controleer of je aankoop beide vluchten dekt voordat je betaalt." },
    { q: "Mag ik een powerbank in ruimbagage meenemen?", a: "Over het algemeen niet. Reserve-lithiumbatterijen en powerbanks moeten normaal in de cabine mee. Bekijk de regels voor gevaarlijke stoffen van je maatschappij voordat je vliegt." },
    { q: "Wat moet ik doen als mijn ruimbagage niet aankomt?", a: "Meld het bij de bagagebalie voordat je de luchthaven verlaat, vraag een schriftelijk rapport met referentienummer en bewaar bonnetjes van essentiële aankopen terwijl je wacht. Volg daarna binnen de termijn de claimprocedure van de maatschappij." }
  ],
};
