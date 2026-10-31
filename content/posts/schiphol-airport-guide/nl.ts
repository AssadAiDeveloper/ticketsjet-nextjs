import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Gids voor Schiphol: erheen reizen, de procedures doorlopen en je weg vinden",
  description: "Een praktische gids voor Amsterdam Schiphol (AMS): hoe je bij de luchthaven komt, hoeveel tijd je nodig hebt, hoe beveiliging en paspoortcontrole werken en tips voor overstappen en aankomst.",
  blocks: [
    { t: "p", text: "Amsterdam Airport Schiphol (AMS) is een van de drukste luchthavens van Europa en een belangrijke overstaphub. Het is compact en gemakkelijk te overzien zodra je de indeling kent, maar het kan druk zijn, en een paar kleine keuzes, zoals wanneer je aankomt en in welke rij je staat, maken een groot verschil voor je dag." },
    { t: "p", text: "Luchthavens passen hun procedures, openingstijden en voorzieningen van tijd tot tijd aan. Gebruik deze gids om te weten waar je op moet letten, en controleer de officiële website van Schiphol en de instructies van je maatschappij voor de actuele gegevens voordat je reist." },

    { t: "h2", text: "1. Begrijp de indeling", id: "layout" },
    { t: "p", text: "Schiphol is opgezet als één terminalgebouw met een gedeelde aankomsthal en meerdere vertrekhallen. Vertrek en aankomst zijn met elkaar verbonden en je kunt tussen de meeste gebieden lopen." },
    { t: "ul", items: [
      "Kijk in je boeking of in de app van de maatschappij waar je moet inchecken.",
      "Schiphol Plaza, voor de hoofdaankomsthal, heeft winkels en restaurants, met het treinstation eronder.",
      "Gates zijn gegroepeerd in pieren. Sommige liggen ver van het centrale gedeelte, dus reken tijd om je gate te bereiken."
    ] },

    { t: "h2", text: "2. Hoe kom je bij Schiphol", id: "getting-there" },
    { t: "table", head: ["Optie", "Geschikt voor", "Goed om te weten"], rows: [
      ["Trein", "De meeste reizigers, vanuit Amsterdam en de rest van Nederland", "Het station ligt direct onder de terminal. Controleer de dienstregeling voor je route en koop een kaartje bij een automaat of in de NS-app."],
      ["Bus", "Sommige stads- en regionale verbindingen", "Meerdere lijnen bedienen de luchthaven, waaronder verbindingen naar het centrum van Amsterdam. Controleer routes en tijden."],
      ["Taxi of ritdienst", "Zware bagage, late avonden, groepen", "Meestal de duurste optie. Controleer hoe de prijs wordt bepaald voordat je instapt."],
      ["Auto", "Reizigers uit gebieden zonder goede treinverbinding", "Parkeerkosten verschillen sterk per product en boekingstijdstip. Boek vooraf als je wilt parkeren."]
    ] },
    { t: "p", text: "Voor de meeste reizigers vanuit Amsterdam is de trein de snelste en eenvoudigste manier om bij de luchthaven te komen, want je vermijdt het verkeer en wordt bij de terminal afgezet." },

    { t: "h2", text: "3. Hoe vroeg moet je er zijn?", id: "how-early" },
    { t: "p", text: "Volg eerst de aanbevolen inchecktijd van je maatschappij. Als algemene richtlijn rekenen veel reizigers ongeveer twee uur voor een vlucht binnen Europa en ongeveer drie uur voor een intercontinentale vlucht, vooral op drukke momenten." },
    { t: "ul", items: [
      "Rijen bij de beveiliging kunnen op piekmomenten lang zijn, zoals vroege ochtenden, vrijdagmiddagen en vakantieperiodes.",
      "Reken extra tijd als je ruimbagage moet afgeven of speciale hulp nodig hebt.",
      "Als je buiten het Schengengebied vliegt, heb je ook tijd nodig voor de paspoortcontrole.",
      "Gebruik online inchecken en de app van je maatschappij om tijd te besparen, en kijk of zelf bagage afgeven mogelijk is."
    ] },

    { t: "h2", text: "4. Beveiliging en paspoortcontrole", id: "security" },
    { t: "p", text: "Na het inchecken gaat iedereen door de beveiligingscontrole. Regels voor vloeistoffen, elektronica en andere spullen kunnen veranderen, dus controleer de actuele regels op de websites van de luchthaven en de maatschappij." },
    { t: "ul", items: [
      "Houd je instapkaart bij de hand en haal elektronica of vloeistoffen uit je tas als de actuele regels dat vragen.",
      "Vluchten naar bestemmingen buiten het Schengengebied omvatten ook paspoortcontrole, wat extra tijd kan kosten.",
      "Controleer of je paspoort of id geldig is voor je bestemming en of je een visum of inreisvergunning nodig hebt.",
      "Reken tijd voor de wandeling naar je gate. Gatenummers verschijnen vaak later op de borden dan je verwacht en de loopafstanden kunnen groot zijn."
    ] },

    { t: "h2", text: "5. Aankomst op Schiphol", id: "arriving" },
    { t: "ol", items: [
      "Volg de borden naar de paspoortcontrole als je van buiten het Schengengebied aankomt. Reizigers uit het Schengengebied lopen direct door naar de bagageband.",
      "Haal je koffers op bij de bagageafhandeling. Het banden-nummer staat op de schermen.",
      "Ga door de douane. Gebruik de juiste rij: goederen aan te geven of niets aan te geven.",
      "Loop naar de aankomsthal en Schiphol Plaza, waar je het treinstation, bussen, taxi's en informatiebalies vindt."
    ] },
    { t: "p", text: "Kom je laat in de nacht aan in een nieuw land, bekijk dan vóór de landing hoe je bij je accommodatie komt. Een vooraf geboekte transfer kan na een lange vlucht tijd en stress besparen." },

    { t: "h2", text: "6. Overstappen op Schiphol", id: "connections" },
    { t: "p", text: "Schiphol is een populaire overstaphub. Een overstap kan snel en makkelijk zijn, of stressvol, afhankelijk van de tijd die je hebt." },
    { t: "ul", items: [
      "Als je reis op één ticket staat, is de maatschappij verantwoordelijk voor het omboeken als je eerste vlucht te laat is en je de aansluiting mist.",
      "Bij losse tickets draag je het risico zelf en moet je mogelijk je bagage ophalen en opnieuw inchecken. Reken royaal tijd.",
      "Controleer of je tussen de vluchten opnieuw door de beveiliging of paspoortcontrole moet. Dat hangt af van waar je vandaan komt en waar je heen gaat.",
      "Kijk naar de loopafstand tussen je aankomst- en vertrekgate, die aanzienlijk kan zijn."
    ] },

    { t: "h2", text: "7. Handige tips voor een soepelere dag", id: "tips" },
    { t: "ul", items: [
      "Download de apps van de maatschappij en de luchthaven voor updates over gates en vertragingen.",
      "Pak vloeistoffen en elektronica zo in dat je er snel bij kunt.",
      "Neem een bidon mee en vul die na de beveiliging.",
      "Zoek oplaadpunten en rustige plekken als je lang moet wachten.",
      "Weet waar de informatiebalies van de luchthaven zijn, voor het geval plannen veranderen."
    ] },
    { t: "callout", title: "Als je vlucht vertraagd of geannuleerd is", text: "Onder de EU-regels heb je mogelijk recht op verzorging, terugbetaling of omboeking, en soms compensatie. Lees onze gids over compensatie bij vertraagde vluchten en bewaar je instapkaart en berichten van de maatschappij." },

    { t: "h2", text: "Snelle checklist voor de vertrekdag", id: "checklist" },
    { t: "ol", items: [
      "Ken ik de incheck- en bagage-afgiftetijden van mijn maatschappij?",
      "Heb ik gepland hoe ik bij Schiphol kom, met tijd over?",
      "Is mijn paspoort of id geldig voor mijn bestemming?",
      "Kan ik vloeistoffen en elektronica makkelijk pakken voor de beveiliging?",
      "Heb ik de app van de maatschappij en mijn instapkaart klaar?",
      "Weet ik hoe ik na aankomst bij mijn accommodatie kom?"
    ] },
    { t: "p", text: "TicketsJet helpt je vluchten vanaf Amsterdam en veel andere luchthavens te vergelijken, zodat je een prijs vindt die bij je reis past. De boeking zelf rond je rechtstreeks af bij de maatschappij of het reisbureau." }
  ],
  faq: [
    { q: "Hoe vroeg moet ik op Schiphol zijn?", a: "Volg het advies van je maatschappij. Veel reizigers rekenen ongeveer twee uur voor vluchten binnen Europa en ongeveer drie uur voor intercontinentale vluchten, en meer op drukke momenten zoals vroege ochtenden, vrijdagmiddagen en vakanties." },
    { q: "Hoe kom ik van Schiphol naar het centrum van Amsterdam?", a: "De trein vanaf het station onder de terminal is meestal de snelste en eenvoudigste optie en rijdt vaak naar Amsterdam Centraal en andere stations. Ook bussen en taxi's zijn beschikbaar. Controleer de actuele dienstregeling en prijzen voordat je reist." },
    { q: "Is Schiphol één terminal?", a: "Schiphol is één terminalgebouw met een gedeelde aankomsthal en meerdere vertrekhallen. Je kunt tussen de meeste gebieden lopen, maar de afstanden naar sommige gates kunnen groot zijn, dus reken genoeg tijd." },
    { q: "Heb ik paspoortcontrole nodig als ik vanaf Schiphol vlieg?", a: "Vluchten naar bestemmingen buiten het Schengengebied omvatten paspoortcontrole, wat extra tijd kan kosten. Vluchten binnen het Schengengebied hebben die over het algemeen niet, al moet je altijd een geldig identiteitsbewijs bij je hebben." },
    { q: "Wat moet ik doen als ik een aansluitende vlucht op Schiphol mis?", a: "Ga meteen naar de transfer- of servicebalie van je maatschappij. Staan beide vluchten op één ticket, dan is de maatschappij verantwoordelijk voor het omboeken. Bij losse tickets moet je mogelijk zelf een nieuw ticket kopen." }
  ],
};
