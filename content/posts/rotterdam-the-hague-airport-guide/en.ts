import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Rotterdam The Hague Airport Guide: A Calm Alternative",
  description: "What to expect at Rotterdam The Hague Airport: routes, transport links, how early to arrive, security and arrivals, with tips for a straightforward trip.",
  blocks: [
    { t: "p", text: "Rotterdam The Hague Airport is a compact airport serving the south west of the Netherlands. For travellers who live closer to Rotterdam or The Hague than to Amsterdam, it can be a sensible alternative to a much longer journey north. This guide covers the practical details so you can plan with confidence." },
    { t: "p", text: "Airlines and airports adjust routes and procedures from time to time. The information here is general, and the official Rotterdam The Hague Airport website and your airline should be checked for current details." },

    { t: "h2", text: "1. Who flies from here", id: "who-flies-from-here" },
    { t: "p", text: "The airport focuses mainly on European routes, with a mix of city breaks and leisure destinations. It is smaller than Amsterdam Schiphol, which means fewer flights but often a simpler experience on the day. Check the route network before you compare prices, because your destination may not be served." },
    { t: "p", text: "A shorter transfer to the airport can matter more than a small difference in ticket price. If you travel with children, heavy luggage or limited time, the extra hours spent reaching a large hub may outweigh the apparent saving." },

    { t: "h2", text: "2. Getting to the airport", id: "getting-there" },
    { t: "p", text: "Rotterdam The Hague Airport sits close to the city and is reachable by road and public transport. Travellers arriving by train usually continue by bus or taxi from the nearby station. Check the current connections on the official airport or transport website before you leave, since services and timings change." },
    { t: "ul", items: [
      "By public transport: take a train to Rotterdam and continue with the airport bus or a local service as indicated in a journey planner.",
      "By car: follow the airport signs and allow time for parking and the short walk to the terminal.",
      "By taxi or ride hailing: convenient for groups or late flights, but confirm the price method first.",
      "By bicycle: the airport is close enough that some travellers combine cycling with public transport.",
    ] },
    { t: "p", text: "If you plan to park, look at the official airport website for the current products and booking options. Rates and availability change, so this guide does not quote prices or timetables." },

    { t: "h2", text: "3. How much time to allow", id: "time-to-allow" },
    { t: "p", text: "The best starting point is always your airline's recommended check in time. Low cost carriers in particular set their own deadlines and may charge for changes at the airport. Arrive early enough to complete check in, drop bags, pass security and reach the gate calmly." },
    { t: "ul", items: [
      "Allow extra time during school holidays and at the start and end of the day.",
      "If you need to check a bag, leave a margin for the queue at the desk.",
      "Check online check in rules and what the airline expects you to bring to the airport.",
      "Remember that gate changes happen, so keep looking at the screens after security.",
    ] },
    { t: "p", text: "A smaller terminal makes the whole process shorter, but it does not remove the need for punctuality. A late arrival at the airport can still mean missing your flight." },

    { t: "h2", text: "4. Security and gates", id: "security-and-gates" },
    { t: "p", text: "Security follows European rules. What you may carry, especially liquids and electronic devices, can change over time, so check the airport guidance shortly before you travel." },
    { t: "ul", items: [
      "Have your boarding pass and travel document ready before the security point.",
      "Follow staff instructions about laptops, tablets and liquids.",
      "Check the departure boards for your gate and any changes.",
      "Ask at the information desk if you need help with accessibility or a special request.",
    ] },
    { t: "p", text: "Because the terminal is small, walking distances are usually short. That makes it easier to spend the last minutes before boarding near your gate instead of rushing across a large building." },

    { t: "h2", text: "5. Arriving at the airport", id: "arriving" },
    { t: "ol", items: [
      "Follow the signs to passport control if your flight requires it.",
      "Collect checked luggage and check that the tag matches your receipt.",
      "Pass through customs using the correct channel.",
      "Leave the terminal and follow signs for buses, taxis or the car park.",
    ] },
    { t: "p", text: "If you are continuing to Rotterdam or The Hague after a flight, check the onward connection before you land. Our guide to the first hour after landing offers a general checklist for that moment." },

    { t: "h2", text: "6. Tips for a straightforward day", id: "tips" },
    { t: "ul", items: [
      "Check in online where the airline allows it and keep a digital copy of the boarding pass.",
      "Measure your cabin bag at home against the rules of your specific fare.",
      "Bring a water bottle to fill after security.",
      "Keep essential items and documents in your personal bag.",
      "Save the airline's contact details in case you need to change something at short notice.",
    ] },
    { t: "callout", title: "If the flight is disrupted", text: "Care, refunds, rerouting or compensation may apply when plans go wrong. Keep your boarding pass and all airline messages, and read our guide to cancelled flight rights." },

    { t: "h2", text: "7. Before you set off", id: "before-you-go" },
    { t: "p", text: "A final check the day before your flight will remove most uncertainty. Confirm the departure time in the airline app, look at the weather and the likely traffic conditions, and decide when you will leave home. If you are relying on a bus, check that the service still runs at the time you need." },
    { t: "p", text: "Also check your documents and your baggage against the rules of your fare. A bag that was accepted in the past is not a guarantee for this trip. If something is unclear, contact the airline now rather than at the terminal, where your options will be much narrower." },
    { t: "ul", items: [
      "Confirm the terminal and check in area on the airport website.",
      "Save your booking and transfer details offline.",
      "Check whether online check in has opened and complete it if possible.",
    ] },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For current routes, transport links, parking and terminal information, use the official Rotterdam The Hague Airport website and your airline's instructions. Times, prices and facilities change, so the official source is the final reference." },
  ],
  faq: [
    { q: "Is Rotterdam The Hague Airport small?", a: "Yes, it is a compact airport compared with Amsterdam Schiphol. That often means shorter walks and a calmer terminal, though fewer routes are available." },
    { q: "How do I travel from Rotterdam to the airport?", a: "Most travellers use a train to Rotterdam followed by a bus or taxi. Check the current connection in a journey planner or on the airport website before you travel." },
    { q: "Do all airlines use the same cabin bag rules here?", a: "No. Rules depend on the airline and the fare you bought. Check the fare conditions before you pack or pay at the airport." },
  ],
};
