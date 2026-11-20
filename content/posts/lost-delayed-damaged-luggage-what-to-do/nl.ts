import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Bagage kwijt, vertraagd of beschadigd: wat te doen",
  description: "Als je bagage niet komt of beschadigd is, tellen de eerste uren. Lees over de PIR, de termijnen voor schriftelijke klachten en de bonnen die je bewaart.",
  blocks: [
    { t: "p", text: "De band stopt en jouw tas is er niet. Wat je de komende minuten doet, maakt echt verschil. In deze gids leggen we uit hoe je het probleem meldt, welke termijnen voor schriftelijke klachten gelden en hoe je je claim overzichtelijk houdt." },
    { t: "p", text: "Dit is algemene informatie, geen juridisch advies. Regels en procedures van maatschappijen kunnen verschillen, dus controleer de officiële bron voor jouw reis." },

    { t: "h2", text: "1. Voordat je de bagagehal verlaat", id: "before-you-leave-the-hall" },
    { t: "p", text: "Ga meteen naar de bagagebalie van de maatschappij zodra je iets merkt. Doe dit voordat je door de douane gaat of het bagagegebied verlaat. Medewerkers kunnen de bagagelabels controleren en direct een opsporing starten." },
    { t: "p", text: "Vertel of de tas niet is aangekomen, beschadigd is, of te laat na een vertraging is geleverd. Elke situatie wordt iets anders behandeld, en de eerste aantekening bepaalt de toon van alles wat volgt." },

    { t: "h2", text: "2. De Property Irregularity Report", id: "the-pir" },
    { t: "p", text: "Vraag de maatschappij om een Property Irregularity Report, afgekort PIR. Dit is het referentienummer van je zaak. Bewaar het goed, want de maatschappij gebruikt het bij elke statusvraag." },
    { t: "ul", items: [
      "Je naam en contactgegevens, inclusief een telefoonnummer dat je opneemt.",
      "Je vluchtnummer en de reisdatum.",
      "Het bagagelabelnummer van je incheckbon.",
      "Een korte beschrijving van de tas en de inhoud.",
      "Je afleveradres als de maatschappij de tas later moet opsturen.",
    ] },
    { t: "p", text: "Maak een foto van het rapport en bewaar het papier. Als de tas beschadigd is, fotografeer de schade voordat iemand de tas verplaatst." },

    { t: "h2", text: "3. Termijnen voor schriftelijke klachten", id: "deadlines" },
    { t: "p", text: "Volgens het Verdrag van Montreal gelden er termijnen voor schriftelijke klachten. Voor beschadigde bagage is dat zeven dagen na aflevering. Voor vertraagde bagage is het eenentwintig dagen vanaf de dag waarop de tas aan jou is geleverd." },
    { t: "table", head: ["Situatie", "Termijn schriftelijke klacht"], rows: [
      ["Beschadigde bagage", "7 dagen na aflevering"],
      ["Vertraagde bagage", "21 dagen na aflevering"],
    ] },
    { t: "p", text: "Dit zijn algemene termijnen voor bagageclaims volgens dat verdrag. De manier waarop je de klacht indient, verschilt per maatschappij. Vraag hoe de maatschappij het wil ontvangen en bewaar bewijs van verzending." },

    { t: "h2", text: "4. Wat je bewaart", id: "what-to-keep" },
    { t: "ul", items: [
      "Je PIR-nummer en alle berichten van de maatschappij.",
      "Je ticket, instapkaart en bon van het bagagelabel.",
      "Foto's van de tas, het label en eventuele schade.",
      "Een lijst van de inhoud, vooral waardevolle spullen.",
      "Bonnen van alles wat je tijdens het wachten koopt.",
    ] },
    { t: "p", text: "Noteer de namen van de medewerkers met wie je sprak en de tijdstippen. Een korte tijdlijn is handig als de zaak naar een andere afdeling gaat." },

    { t: "h2", text: "5. Benodigdheden en bonnen", id: "essentials-and-receipts" },
    { t: "p", text: "Als je tas vertraagd is, moet je waarschijnlijk basisdingen kopen zoals toiletspullen en een andere outfit. Bewaar elke bon. Vraag de maatschappij wat ze kan vergoeden en of er een limiet is voordat je meer uitgeeft dan nodig." },
    { t: "p", text: "Er bestaan vergoedingslimieten voor bagageclaims en die verschillen per maatschappij en route. Controleer de vervoersvoorwaarden van de maatschappij voor de precieze limiet. Ga er niet van uit dat elke aankoop wordt vergoed." },

    { t: "h2", text: "6. De zaak opvolgen", id: "escalating" },
    { t: "ol", items: [
      "Gebruik je PIR-nummer om op vaste momenten om een update te vragen.",
      "Dien binnen de juiste termijn een schriftelijke klacht in.",
      "Bewaar kopieën van elk bericht en elk antwoord.",
      "Als de maatschappij niets oplost, vraag welke klachteninstantie jouw zaak behandelt.",
    ] },
    { t: "p", text: "Als je na een late vlucht in een nieuwe stad aankomt, helpt onze gids over het eerste uur na de landing je bij de reis verder. Onze gids over handbagageregels legt uit hoe je bij de volgende reis problemen bij de gate voorkomt." },

    { t: "h2", text: "7. Over reisverzekering", id: "insurance-note" },
    { t: "p", text: "Een reisverzekering kan in sommige situaties helpen, maar polissen verschillen sterk. Controleer je eigen polis op dekking voor bagage, eigen risico en meldingsregels voordat je erop vertrouwt. Wij verkopen geen verzekering en dit is geen aanbeveling voor een aanbieder." },

    { t: "h2", text: "8. Een paar praktische details", id: "practical-details" },
    { t: "p", text: "Als de maatschappij de tas bij je accommodatie aflevert, controleer hem dan goed voordat je iets ondertekent. Noteer de toestand van de tas en het tijdstip van aflevering. Is de tas bij aflevering beschadigd, maak dan direct foto's en neem opnieuw contact op met de bagagebalie. Een afleveringsbon waarop staat dat de tas in goede staat aankwam, maakt een latere schadeclaim moeilijker." },
    { t: "p", text: "Neem altijd essentiële spullen mee in je handbagage als je een koffer incheckt. Medicijnen, reisdocumenten, sleutels en een eenvoudige set kleding zijn de moeite waard om bij je te houden. Dat neemt de verantwoordelijkheid van de maatschappij niet weg, maar een vertraagde koffer wordt er veel minder storend door." },
    { t: "p", text: "Gebruik bij contact met de maatschappij het PIR-nummer in het onderwerp van e-mails en noem het aan het begin van telefoongesprekken. Medewerkers vinden de zaak dan sneller, en de kans dat een bericht in een andere wachtrij belandt wordt kleiner. Houd een eenvoudige map bij, op je telefoon of op papier, met alle berichten op volgorde van datum." },
    { t: "ul", items: [
      "Controleer het nummer van het bagagelabel op je bon voordat je de incheckbalie verlaat.",
      "Maak voor de vlucht een foto van de tas, zodat je de eerdere toestand kunt tonen.",
      "Geef de maatschappij een telefoonnummer dat op je bestemming werkt.",
      "Vraag om een verwachte afleveringstijd en noteer wie die gaf.",
    ] },
    { t: "p", text: "Deze stappen garanderen geen bepaalde uitkomst. Ze maken het wel veel eenvoudiger om met feiten te beschrijven wat er gebeurde, in plaats van met je geheugen." },

    { t: "ul", items: [
      "Bewaar het PIR-nummer ergens waar je het snel kunt vinden, ook zonder internet.",
      "Sla berichten van de maatschappij op in plaats van alleen op het telefoongesprek te vertrouwen.",
      "Vraag je accommodatie of een aflevering in ontvangst mag worden genomen als je niet aanwezig bent.",
      "Noteer de datum waarop je de schriftelijke klacht verstuurt en bewaar het verzendbewijs.",
    ] },

    { t: "p", text: "Een bagageclaim draait grotendeels om duidelijke administratie en regelmatige opvolging. Meld het probleem op het vliegveld, bewaar het referentienummer, dien de schriftelijke klacht op tijd in en houd je bonnen. Als je die vier dingen doet, sta je veel sterker, ongeacht wat de maatschappij besluit." },

    { t: "h2", text: "Controleer de officiële bron", id: "official-source" },
    { t: "p", text: "Voor de exacte regels en actuele procedures kijk je naar de vervoersvoorwaarden van de maatschappij en de officiële richtlijnen voor jouw route. Termijnen en limieten kunnen verschillen, dus de officiële bron blijft de uiteindelijke referentie." },
  ],
  faq: [
    { q: "Wat is een PIR?", a: "Het is een Property Irregularity Report, het nummer dat de maatschappij je geeft bij een bagageprobleem. Bewaar het voor elk later contact." },
    { q: "Wanneer moet ik schriftelijk klagen?", a: "Volgens het Verdrag van Montreal zijn de algemene termijnen zeven dagen voor beschadigde bagage en eenentwintig dagen voor vertraagde bagage, beide vanaf aflevering." },
    { q: "Vergoedt de maatschappij alles wat ik koop?", a: "Er zijn vergoedingslimieten die per maatschappij en route verschillen. Vraag naar de limieten en bewaar je bonnen." },
  ],
};
