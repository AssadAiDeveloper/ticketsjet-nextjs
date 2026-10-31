import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Autohuur zonder verrassingen: verzekering, brandstof en borg uitgelegd",
  description: "Hoe autohuurverzekeringen, brandstofregelingen, borg en extra kosten echt werken, plus een eenvoudige checklist om verrassingen bij de verhuurbalie te voorkomen.",
  blocks: [
    { t: "p", text: "De meeste problemen bij autohuur komen niet van de auto, maar van de papieren: een verzekering die je niet verwachtte, een brandstofregeling die je niet las, of een borg die hoger is dan je had gepland. Het goede nieuws is dat bijna al deze verrassingen te voorspellen zijn. Als je weet waar ze zich verstoppen, kun je aanbiedingen goed vergelijken en met vertrouwen naar de balie lopen." },
    { t: "p", text: "Regels verschillen per land en per verhuurder. Gebruik deze gids dus als een kaart van wat je moet controleren, en lees altijd de voorwaarden in je eigen boekingsbevestiging." },

    { t: "h2", text: "1. Begrijp wat de getoonde prijs omvat", id: "headline-price" },
    { t: "p", text: "De dagprijs die je in de zoekresultaten ziet is het beginpunt, niet de eindprijs. Controleer voordat je twee aanbiedingen vergelijkt wat elk omvat. Een goedkoper aanbod dat dingen uitsluit die je nodig hebt, kan uiteindelijk duurder uitpakken." },
    { t: "ul", items: [
      "Kilometers: onbeperkt, of begrensd per dag of per huurperiode?",
      "Basisverzekering: wat is gedekt en hoe hoog is je eigen risico (het bedrag dat je betaalt als er iets misgaat)?",
      "Belastingen en luchthaventoeslagen: zitten ze in de prijs of komen ze er later bij?",
      "Extra bestuurders, toeslagen voor jonge of oudere bestuurders en eenrichtingskosten.",
      "Grensoverschrijdend rijden: sommige verhuurders rekenen extra of verbieden het meenemen van de auto naar bepaalde landen."
    ] },

    { t: "h2", text: "2. Verzekering: wat heb je echt nodig", id: "insurance" },
    { t: "p", text: "Bij verzekeringen ontstaat de meeste verwarring en wordt het meest bijverkocht. Een gewone huurauto bevat meestal al een basisdekking voor schade aan de auto en diefstal, maar met een eigen risico. Dat eigen risico kan hoog zijn, soms honderden of zelfs meer dan duizend euro, en dat betaal je zelf als de auto beschadigd raakt of gestolen wordt." },
    { t: "table", head: ["Dekking", "Wat het doet", "Waar je op moet letten"], rows: [
      ["Collision damage waiver (CDW)", "Beperkt wat je betaalt als de huurauto beschadigd raakt, tot het eigen risico", "Het bedrag van het eigen risico en wat is uitgesloten"],
      ["Diefstalbescherming", "Beperkt wat je betaalt als de auto wordt gestolen", "Het eigen risico en voorwaarden, zoals afgesloten portieren"],
      ["Verlaging eigen risico (supercover)", "Verlaagt of schrapt het eigen risico, verkocht door de verhuurder", "De dagprijs, die aan de balie hoog kan zijn"],
      ["Eigenrisicoverzekering van derden", "Een aparte polis die het eigen risico terugbetaalt nadat je het hebt betaald", "Je betaalt eerst de verhuurder en vraagt later terug"],
      ["Huurdekking via creditcard", "Sommige kaarten bevatten huurverzekering", "Welke landen en autotypes gedekt zijn en onder welke voorwaarden"]
    ] },
    { t: "p", text: "Handig om te weten zijn de gebruikelijke uitsluitingen: banden, ruiten, de onderkant van de auto, het dak en sleutels zijn vaak niet gedekt door de basisdekking en soms zelfs niet door de uitgebreide dekking. Lees de polisvoorwaarden als je volledig gedekt wilt zijn." },
    { t: "callout", title: "Een eenvoudige manier om te beslissen", text: "Vergelijk de prijs van de eigenrisicoverlaging van de verhuurder met het eigen risico zelf. Is de dekking duur en het eigen risico klein, dan heb je haar misschien niet nodig. Is het eigen risico groot en zou je het moeilijk kunnen betalen, dan is dekking het overwegen waard, van de verhuurder, van een derde partij of van een kaart die haar bevat." },

    { t: "h2", text: "3. Brandstofregelingen: kies vol-vol als het kan", id: "fuel" },
    { t: "p", text: "De brandstofregeling bepaalt hoe je benzine of diesel betaalt. Het is een van de makkelijkste manieren waarop een goedkope huur duur wordt, dus het loont om haar vóór het boeken te lezen." },
    { t: "table", head: ["Regeling", "Hoe het werkt", "Let op"], rows: [
      ["Vol-vol", "Je krijgt een volle tank en levert hem vol in", "Tanken vlak bij de inleverplek en het bonnetje bewaren"],
      ["Gelijk-gelijk", "Je levert de auto in met hetzelfde brandstofniveau als bij ontvangst", "Fotografeer de brandstofmeter bij het ophalen"],
      ["Vol-leeg (vooruitbetaald)", "Je betaalt vooraf voor een volle tank en levert hem leeg in", "Vooruitbetaalde brandstof is vaak duurder dan aan de pomp en ongebruikte brandstof wordt meestal niet terugbetaald"]
    ] },
    { t: "p", text: "Vol-vol is meestal de eerlijkste optie, omdat je alleen betaalt voor de brandstof die je gebruikt, tegen de gewone pompprijs. Zoek een tankstation dicht bij het inleverpunt en bewaar het bonnetje als bewijs." },

    { t: "h2", text: "4. De borg: reken op een bedrag dat op je kaart wordt vastgehouden", id: "deposit" },
    { t: "p", text: "De meeste verhuurders reserveren bij het ophalen een borg op je kaart. Het is geen afschrijving, maar het geld wordt vastgehouden en kan niet worden gebruikt totdat het wordt vrijgegeven nadat je de auto hebt ingeleverd." },
    { t: "ul", items: [
      "De borg ligt vaak in de buurt van het eigen risico en kan hoger zijn als je de verzekering van de verhuurder weigert.",
      "Veel verhuurders eisen een creditcard op naam van de hoofdbestuurder. Een betaalpas wordt soms geaccepteerd, maar vaak met beperkingen of extra eisen.",
      "Zorg dat de kaart genoeg beschikbaar limiet heeft voor de reservering, bovenop je gewone reisuitgaven.",
      "Vraag wanneer het bedrag wordt vrijgegeven. Dat kan na het inleveren meerdere dagen duren."
    ] },

    { t: "h2", text: "5. Documenten en eisen aan de bestuurder", id: "documents" },
    { t: "p", text: "Zorg dat je de juiste documenten bij je hebt voordat je reist, want een ontbrekend document aan de balie kan betekenen dat je de auto niet mee kunt nemen." },
    { t: "ul", items: [
      "Een geldig rijbewijs dat je al zo lang bezit als de verhuurder minimaal eist.",
      "Een paspoort of id en de creditcard op naam van de bestuurder.",
      "Een internationaal rijbewijs als het land dat voor jouw type rijbewijs vereist. Controleer dit voor je bestemming.",
      "Je boekingsbevestiging, met de naam van de bestuurder gelijk aan die op het rijbewijs."
    ] },
    { t: "p", text: "Ook leeftijdsregels doen ertoe. Bestuurders onder een bepaalde leeftijd betalen meestal een toeslag voor jonge bestuurders en sommige verhuurders beperken de beschikbare autocategorieën voor hen." },

    { t: "h2", text: "6. Extra kosten om op te letten", id: "extra-fees" },
    { t: "ul", items: [
      "Toeslagen voor ophalen op de luchthaven of het treinstation.",
      "Kosten voor ophalen of inleveren buiten openingstijden.",
      "Kosten voor extra bestuurders.",
      "Eenrichtingskosten als je de auto op een andere locatie inlevert.",
      "Kosten voor grensoverschrijding en regels over meenemen op veerboten.",
      "Kinderzitjes, navigatie en winteruitrusting, vaak per dag geprijsd.",
      "Tol, vignetten en kosten voor milieuzones, waarvoor je meestal zelf verantwoordelijk bent.",
      "Administratiekosten bovenop boetes, als je na je huur een verkeersboete ontvangt."
    ] },
    { t: "p", text: "Een extra van een paar euro per dag lijkt klein, maar over een week kan het meer worden dan het prijsverschil tussen twee aanbiedingen." },

    { t: "h2", text: "7. Ophalen: inspecteer de auto voordat je wegrijdt", id: "pickup" },
    { t: "p", text: "De paar minuten die je bij het ophalen besteedt, kunnen je later een lang geschil besparen. Vertrouw niet op een vluchtige blik op het papieren formulier." },
    { t: "ol", items: [
      "Loop om de auto heen en fotografeer of film elke kant, inclusief dak, wielen en voorruit.",
      "Zorg dat elke bestaande kras, deuk of steenslag op het schadeformulier staat voordat je tekent.",
      "Fotografeer de brandstofmeter en de kilometerstand.",
      "Controleer of banden, verlichting, ruitenwissers en airconditioning werken en of er een reservewiel of reparatieset is.",
      "Vraag welke brandstof de auto gebruikt. Verkeerde brandstof tanken kan heel duur zijn.",
      "Bewaar een kopie van de huurovereenkomst en het noodnummer."
    ] },

    { t: "h2", text: "8. Inleveren: rond het netjes af", id: "return" },
    { t: "ul", items: [
      "Lever de auto op tijd in. Te late inlevering wordt vaak per uur of als een volledige extra dag berekend.",
      "Tank volgens je regeling en bewaar het bonnetje.",
      "Fotografeer de auto opnieuw, met brandstofmeter en kilometerstand, op de inleverplek.",
      "Vraag een medewerker de auto te controleren en schriftelijk te bevestigen dat hij zonder schade is ingeleverd.",
      "Bewaar alle documenten totdat de borg is vrijgegeven en er geen verdere kosten op je afschrift verschijnen."
    ] },

    { t: "h2", text: "Snelle checklist voor je boekt", id: "checklist" },
    { t: "ol", items: [
      "Omvat het aanbod de kilometers en verzekering die ik nodig heb?",
      "Wat is het eigen risico en hoe dek ik het?",
      "Is de brandstofregeling vol-vol?",
      "Heb ik een geschikte kaart voor de borg, op naam van de bestuurder?",
      "Heb ik het juiste rijbewijs en, indien nodig, een internationaal rijbewijs?",
      "Zijn er kosten voor extra bestuurders, jonge bestuurders, eenrichtingsinlevering of grensoverschrijding?",
      "Is gratis annuleren mogelijk als mijn plannen veranderen?"
    ] },
    { t: "p", text: "TicketsJet helpt je autohuuraanbiedingen van meerdere aanbieders op één plek te vergelijken, zodat je de voorwaarden naast elkaar kunt bekijken voordat je boekt. De boeking zelf rond je rechtstreeks af bij de verhuurder, tegen hun prijs." }
  ],
  faq: [
    { q: "Heb ik extra autohuurverzekering nodig?", a: "Dat hangt af van je eigen risico en je risicobereidheid. De basisdekking komt meestal met een hoog eigen risico. Kun je dat bedrag niet gemakkelijk betalen, overweeg dan een verlaging van de verhuurder, een aparte eigenrisicopolis of een creditcard met huurdekking. Lees eerst de uitsluitingen." },
    { q: "Wat is de beste brandstofregeling?", a: "Vol-vol is meestal de eerlijkste, omdat je alleen betaalt voor de brandstof die je gebruikt, tegen de gewone pompprijs. Vooruitbetaalde vol-leeg-opties zijn vaak duurder en ongebruikte brandstof wordt over het algemeen niet terugbetaald." },
    { q: "Kan ik een auto huren met een betaalpas?", a: "Soms, maar veel verhuurders eisen een creditcard op naam van de hoofdbestuurder voor de borg of stellen extra voorwaarden aan betaalpassen. Controleer de voorwaarden van je boeking voordat je reist." },
    { q: "Hoe lang duurt het voor ik de borg terug heb?", a: "Dat verschilt per verhuurder en bank. De reservering wordt vaak binnen enkele dagen na het inleveren vrijgegeven, maar het kan langer duren. Vraag het aan de balie en bewaar je inleverdocumenten." },
    { q: "Wat moet ik doen als ik schade ontdek nadat ik de balie al heb verlaten?", a: "Ga meteen terug en laat het op het schadeformulier zetten als dat kan, of neem contact op met de verhuurder en stuur direct foto's met tijdstempel. Beter is het om dit bij het ophalen te doen, dus inspecteer de auto voordat je wegrijdt." }
  ],
};
