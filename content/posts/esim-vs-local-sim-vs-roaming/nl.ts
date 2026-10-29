import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "eSIM, lokale simkaart of roaming: de beste manier om mobiel internet in het buitenland te krijgen",
  description: "Hoe reis-eSIM's, lokale simkaarten en roaming zich verhouden qua kosten, gemak en dekking, plus een eenvoudige checklist om de juiste optie voor je reis te kiezen.",
  blocks: [
    { t: "p", text: "Mobiele data heb je als een van de eerste dingen nodig na aankomst: kaarten, berichten, je instapkaart, een rit naar het hotel. Je hebt drie hoofdopties om dat in het buitenland te regelen: je gewone abonnement met roaming gebruiken, een lokale simkaart kopen of een reis-eSIM installeren. Elke optie heeft zijn plek en de juiste hangt af van waar je heen gaat, hoe lang je blijft en hoeveel data je gebruikt." },
    { t: "p", text: "Prijzen, abonnementen en regels verschillen sterk per aanbieder en land. Deze gids richt zich daarom op hoe de opties verschillen en waar je op moet letten, in plaats van prijzen te noemen die snel verouderd zijn." },

    { t: "h2", text: "1. Roaming: de makkelijke optie", id: "roaming" },
    { t: "p", text: "Roaming betekent je gewone simkaart en abonnement in het buitenland gebruiken. Het vraagt geen voorbereiding, je houdt je nummer en het werkt zodra je landt." },
    { t: "ul", items: [
      "Binnen de EU en de EER laten veel abonnementen van EU-aanbieders je zonder extra kosten data gebruiken in het buitenland, binnen een redelijk-gebruiklimiet. Controleer de limiet van je abonnement.",
      "Buiten de EU kan roaming veel duurder zijn en verschillen de tarieven per aanbieder en land. Sommige aanbieders verkopen dagelijkse of wekelijkse roamingbundels.",
      "Landen als het Verenigd Koninkrijk en Zwitserland vallen niet altijd onder een EU-roamingtegoed. Bekijk de lijst van je aanbieder.",
      "Zet dataroaming uit of stel een bestedingslimiet in als je de kosten niet zeker weet."
    ] },

    { t: "h2", text: "2. Lokale simkaart: vaak het goedkoopst per gigabyte", id: "local-sim" },
    { t: "p", text: "Een lokale simkaart komt van een aanbieder in het land dat je bezoekt. Meestal krijg je er de meeste data voor je geld mee, en je krijgt een lokaal telefoonnummer voor bellen en sms'en." },
    { t: "ul", items: [
      "Mogelijk moet je je paspoort tonen om de kaart te registreren, en in sommige landen zijn de regels streng.",
      "Je moet een winkel of kiosk vinden, wat op de dag van aankomst tijd kan kosten.",
      "Je wisselt je simkaart, dus je gewone nummer is op die telefoon niet actief, tenzij je een dual-sim-toestel hebt.",
      "Een goede keuze voor lange verblijven of als je een lokaal nummer nodig hebt."
    ] },

    { t: "h2", text: "3. Reis-eSIM: verbonden zodra je landt", id: "esim" },
    { t: "p", text: "Een eSIM is een digitale simkaart die in moderne telefoons is ingebouwd. Een reis-eSIM is een databundel die je online koopt en installeert door een QR-code te scannen of een app te gebruiken, meestal voordat je vertrekt. Je zet hem aan bij aankomst." },
    { t: "ul", items: [
      "Geen fysieke kaart om te zoeken of te wisselen en geen rij op de luchthaven.",
      "Je gewone simkaart blijft actief, dus je gewone nummer blijft werken voor bellen, sms en apps als WhatsApp die eraan gekoppeld zijn.",
      "Bundels zijn meestal alleen data, dus je krijgt over het algemeen geen lokaal telefoonnummer.",
      "Veel aanbieders hebben bundels voor een land, een regio of meerdere landen, handig voor reizen door meerdere landen."
    ] },
    { t: "callout", title: "Controleer eerst je telefoon", text: "Je telefoon moet eSIM ondersteunen en netwerkvrij zijn. De meeste telefoons van de laatste jaren kunnen dit, maar controleer je instellingen of de website van de fabrikant voordat je een bundel koopt." },

    { t: "h2", text: "Vergelijking in één oogopslag", id: "comparison" },
    { t: "table", head: ["", "Roaming", "Lokale simkaart", "Reis-eSIM"], rows: [
      ["Instellen", "Niets nodig", "Kopen en registreren bij aankomst", "Online kopen en installeren"],
      ["Kosten", "In sommige regio's gratis, elders vaak hoog", "Vaak het laagst per gigabyte", "Meestal tussen de andere twee"],
      ["Je nummer houden", "Ja", "Nee, tenzij dual-sim", "Ja, op je gewone simkaart"],
      ["Lokaal nummer", "Nee", "Ja", "Meestal niet"],
      ["Het best voor", "Reizen binnen de EU met een geschikt abonnement", "Lange verblijven, lokaal bellen", "Korte en middellange reizen, meerdere landen"]
    ] },

    { t: "h2", text: "4. Hoeveel data heb je nodig?", id: "how-much-data" },
    { t: "p", text: "Wees realistisch over hoe je je telefoon gebruikt, want bundels worden per gigabyte verkocht." },
    { t: "ul", items: [
      "Licht gebruik: berichten, e-mail, kaarten en af en toe zoeken kosten relatief weinig data.",
      "Gemiddeld gebruik: foto's uploaden, sociale media en wat muziek lopen sneller op.",
      "Zwaar gebruik: videobellen, video streamen en je telefoon als hotspot voor een laptop gebruiken kost veel meer.",
      "Als je het niet zeker weet, kies dan een maatje groter of een bundel die je kunt opwaarderen."
    ] },

    { t: "h2", text: "5. Waar je op let voordat je een eSIM koopt", id: "what-to-check" },
    { t: "ol", items: [
      "Je telefoon ondersteunt eSIM en is netwerkvrij.",
      "De bundel dekt elk land dat je bezoekt, ook eventuele transitstops.",
      "Hoe lang de bundel geldig is en of de geldigheid ingaat bij aankoop, installatie of eerste gebruik.",
      "Of hotspot of tethering is toegestaan, als je dat nodig hebt.",
      "De netwerksnelheid (4G of 5G) en welke lokale netwerken de bundel gebruikt.",
      "Of je kunt opwaarderen als je data op is.",
      "De reviews van de aanbieder en de supportmogelijkheden, voor het geval de installatie mislukt."
    ] },

    { t: "h2", text: "6. Installeer hem op de juiste manier", id: "install" },
    { t: "ol", items: [
      "Koop de bundel en installeer de eSIM terwijl je nog betrouwbaar wifi hebt, voordat je vertrekt.",
      "Volg de stappen van de aanbieder. Meestal scan je een QR-code of tik je op een installatielink.",
      "Geef de eSIM een duidelijke naam in je telefooninstellingen zodat je hem niet verwart met je hoofdlijn.",
      "Zet bij aankomst de eSIM aan voor mobiele data en zet dataroaming alleen voor die lijn aan als de aanbieder dat zegt.",
      "Houd je gewone simkaart voor bellen en sms'en en zet mobiele data erop uit om kosten te voorkomen."
    ] },

    { t: "h2", text: "Welke optie kies je?", id: "which-to-choose" },
    { t: "ul", items: [
      "Korte reis binnen de EU met een geschikt abonnement: roaming is meestal prima.",
      "Korte of middellange reis buiten de EU, of door meerdere landen: een reis-eSIM is vaak het gemakkelijkst.",
      "Lang verblijf of je hebt een lokaal nummer nodig: een lokale simkaart is meestal de beste waarde.",
      "Niet zeker: bekijk de roamingtarieven van je aanbieder en vergelijk ze met een eSIM-bundel voor je bestemming."
    ] },
    { t: "p", text: "TicketsJet heeft een eSIM-pagina waar je reisdatabundels van partneraanbieders kunt vergelijken. Aankoop en installatie worden door de aanbieder afgehandeld, tegen hun prijs." }
  ],
  faq: [
    { q: "Houd ik mijn telefoonnummer met een reis-eSIM?", a: "Ja. Je gewone simkaart blijft actief in je telefoon en de reis-eSIM levert alleen mobiele data. Apps die aan je gewone nummer gekoppeld zijn, zoals WhatsApp, blijven werken. De meeste reis-eSIM's bevatten geen lokaal telefoonnummer." },
    { q: "Wanneer moet ik mijn eSIM installeren?", a: "Installeer hem als je wifi hebt, voordat je vertrekt. Zet hem aan zodra je landt. Bij sommige bundels gaat de geldigheid in bij het eerste gebruik en bij andere bij installatie of aankoop, dus controleer de details." },
    { q: "Kan ik mijn telefoon als hotspot gebruiken met een eSIM?", a: "Dat hangt af van de bundel. Sommige staan tethering toe en andere niet. Controleer de details van de bundel voordat je koopt als je je verbinding wilt delen." },
    { q: "Wat als mijn telefoon geen eSIM ondersteunt?", a: "Dan werkt een reis-eSIM niet. Controleer je instellingen of de website van de fabrikant, of kies een lokale simkaart of een pocket-wifi-apparaat." },
    { q: "Is roaming in de EU echt gratis?", a: "Veel abonnementen van EU-aanbieders laten je zonder extra kosten data gebruiken in andere EU- en EER-landen, binnen een redelijk-gebruiklimiet. Limieten en dekking verschillen per abonnement en aanbieder en landen buiten de EU zijn vaak niet inbegrepen, dus controleer je abonnement." }
  ],
};
