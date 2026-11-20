import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Eindhoven Airport gids: bereikbaarheid en wat je verwacht",
  description: "Een praktische gids voor Eindhoven Airport: welke routes je vindt, hoe je met de bus of auto bij de terminal komt, hoeveel tijd je neemt en wat aankomst inhoudt.",
  blocks: [
    { t: "p", text: "Eindhoven Airport is een kleiner vliegveld in het zuiden van Nederland. Het wordt vooral gebruikt door lowcostmaatschappijen en bedient een groeiend aantal Europese bestemmingen. Omdat het kleiner is dan Schiphol, vinden veel reizigers het rustiger en sneller. Toch loont voorbereiding, zeker als je op een druk moment vliegt." },
    { t: "p", text: "Luchthavens veranderen routes, faciliteiten en procedures. Deze gids beschrijft algemeen wat je kunt verwachten. De officiële website van Eindhoven Airport en je luchtvaartmaatschappij zijn de plekken om actuele details te controleren." },

    { t: "h2", text: "1. Wie vliegt vanaf Eindhoven", id: "who-flies-from-here" },
    { t: "p", text: "Eindhoven is vooral een basis van lowcostmaatschappijen, met vluchten naar uiteenlopende Europese vakantie- en stadsbestemmingen. Je vindt er niet hetzelfde langeafstandsnetwerk als op de grote Nederlandse hub. Controleer dus goed of je bestemming wordt bediend voordat je de rest van de reis plant." },
    { t: "p", text: "Woon je in het zuiden van Nederland of in aangrenzende delen van België, dan kan een korte rit naar Eindhoven veel tijd schelen ten opzichte van Schiphol. Als je echter overstapt van een langeafstandsvlucht, bedenk dan dat een apart ticket betekent dat je het risico op een gemiste aansluiting zelf draagt." },

    { t: "h2", text: "2. Hoe kom je er", id: "getting-there" },
    { t: "p", text: "Het vliegveld is goed bereikbaar via de weg en ook met openbaar vervoer. De meeste treinreizigers komen aan op station Eindhoven Centraal en reizen daarna per bus naar de terminal. Controleer de huidige buslijnen en reistijden op de officiële website van het vervoer of het vliegveld voordat je vertrekt, want routes en frequentie veranderen." },
    { t: "ul", items: [
      "Met de bus vanaf het station: zoek de luchthavenlijn en controleer het vertrektijdstip in de dienstregeling of een reisplanner.",
      "Met de auto: volg de borden naar het vliegveld en houd rekening met parkeertijd en de loop naar de terminal.",
      "Met een taxi of ride hailing service: handig bij zware bagage of late aankomst, maar vraag vooraf hoe de prijs wordt berekend.",
      "Met de fiets: sommige reizigers fietsen eerst naar het station en reizen vandaar verder, waardoor parkeren op het vliegveld niet nodig is.",
    ] },
    { t: "p", text: "Als je met de auto gaat, beslis dan vooraf of je kortparkeergarage of langparkeren wilt. De officiële website legt de huidige opties en het boekingsproces uit. Parkeerprijzen en beschikbaarheid veranderen, dus ga niet af op cijfers uit een oud artikel." },

    { t: "h2", text: "3. Hoeveel tijd neem je", id: "time-to-allow" },
    { t: "p", text: "Ga uit van de door je maatschappij aanbevolen inchecktijd. Dat is het meest betrouwbare getal, want het hangt af van de maatschappij en de route. Als algemene aanpak: kom vroeg genoeg om in te checken, zo nodig een tas af te geven, door de beveiliging te gaan en rustig naar je gate te lopen." },
    { t: "ul", items: [
      "Neem meer tijd rond vakanties, vroege ochtenden en andere drukke momenten.",
      "Als je ruimbagage afgeeft, houd dan extra rekening met de rij bij de balie.",
      "Controleer of online inchecken mogelijk is en wat de maatschappij op het vliegveld verwacht.",
      "Vergeet niet dat de loop van terminal naar gate tijd kost, ook op een kleiner vliegveld.",
    ] },
    { t: "p", text: "Lowcostmaatschappijen hanteren vaak strenge incheckdeadlines en sluiten de balie mogelijk ruim voor vertrek. Lees de vervoersvoorwaarden en de instructies van de maatschappij in plaats van aan te nemen dat dezelfde regel op elke vlucht geldt." },

    { t: "h2", text: "4. Beveiliging en gates", id: "security-and-gates" },
    { t: "p", text: "De beveiliging volgt Europese regels, maar wat je precies mee mag nemen kan veranderen. Controleer de actuele richtlijnen voor vloeistoffen, elektronica en verboden voorwerpen op de website van het vliegveld voordat je pakt." },
    { t: "ul", items: [
      "Houd je instapkaart en reisdocument klaar als je het beveiligingsgebied ingaat.",
      "Volg de aanwijzingen over laptops en vloeistoffen bij het controlepunt, want die kunnen in de loop van tijd verschillen.",
      "Kijk op de schermen naar je gate en houd die in de gaten terwijl je wacht.",
      "Als je speciale hulp nodig hebt, meld dat dan vooraf bij de maatschappij en het vliegveld.",
    ] },
    { t: "p", text: "Omdat het vliegveld compact is, is de afstand naar de gate meestal beperkt. Dat is een van de voordelen, maar het is toch verstandig tijd over te houden voor een koffie of een toiletbezoek voordat het instappen begint." },

    { t: "h2", text: "5. Aankomst op Eindhoven", id: "arriving" },
    { t: "ol", items: [
      "Volg vanaf het vliegtuig de borden naar de paspoortcontrole als je route dat vereist.",
      "Haal je ruimbagage op en controleer de labels voordat je vertrekt.",
      "Ga door de douane via de juiste rij voor je goederen.",
      "Ga naar de aankomsthal, waar je borden vindt voor bussen, taxi's en autoverhuur.",
    ] },
    { t: "p", text: "Als je daarna met de trein verdergaat, controleer dan voor de landing de busverbinding vanaf de terminal. Zo voorkom je lang wachten met bagage. Onze gids over het eerste uur na de landing geeft meer ideeën voor een soepele reis verder." },

    { t: "h2", text: "6. Tips voor een soepele reis", id: "tips" },
    { t: "ul", items: [
      "Check waar mogelijk online in en bewaar je instapkaart op je telefoon.",
      "Meet en weeg je handbagage thuis, want de regels verschillen per maatschappij en tarief.",
      "Neem een hervulbare fles mee en vul die na de beveiliging.",
      "Download de app van je maatschappij voor meldingen over gate en vertraging.",
      "Houd je boekingsreferentie bij de hand als je hulp nodig hebt op het vliegveld.",
    ] },
    { t: "callout", title: "Als plannen veranderen", text: "Lange vertragingen en annuleringen kunnen recht geven op verzorging, omboeken of vergoeding. Bewaar je instapkaart en berichten van de maatschappij en lees onze gids over geannuleerde vluchten." },

    { t: "p", text: "Neem voor vertrek een paar minuten de tijd om de instructies van je maatschappij en de relevante pagina's van het vliegveld te lezen. Een snelle controle nu voorkomt de meeste kleine verrassingen die anders pas op de terminal verschijnen." },

    { t: "h2", text: "Controleer de officiële bron", id: "official-source" },
    { t: "p", text: "Voor actuele routes, busverbindingen, parkeren en openingstijden gebruik je de officiële website van Eindhoven Airport en de instructies van je maatschappij. We hebben deze gids bewust algemeen gehouden omdat tijden, prijzen en faciliteiten veranderen." },
  ],
  faq: [
    { q: "Is Eindhoven een druk vliegveld?", a: "Het is kleiner dan Schiphol en voelt vaak rustiger, maar rond vakanties en vroege ochtenden kan het druk zijn. Kom met genoeg tijd voor inchecken en beveiliging." },
    { q: "Hoe ga ik van station Eindhoven Centraal naar het vliegveld?", a: "De meeste reizigers nemen de bus vanaf het station. Controleer de huidige lijn en dienstregeling op de officiële website van het vliegveld of de vervoerder." },
    { q: "Moet ik mijn instapkaart printen?", a: "Dat hangt af van je maatschappij. Veel maatschappijen accepteren een digitale instapkaart, andere vragen om papier. Controleer de instructies van je maatschappij." },
  ],
};
