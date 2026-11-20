import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Eindhoven Airport Guide: Getting There and What To Expect",
  description: "A practical guide to Eindhoven Airport: which routes you will find there, how to get to the terminal by bus or car, how much time to allow and what arriving looks like.",
  blocks: [
    { t: "p", text: "Eindhoven Airport is a smaller airport in the south of the Netherlands. It is used mainly by low cost airlines and serves a growing number of European routes. Because it is smaller than Amsterdam Schiphol, many travellers find it calmer and quicker to use. It still pays to prepare, especially if you are flying at a busy time." },
    { t: "p", text: "Airports change routes, facilities and procedures. This guide describes what to expect in general terms, and the official Eindhoven Airport website and your airline are the places to check current details." },

    { t: "h2", text: "1. Who flies from here", id: "who-flies-from-here" },
    { t: "p", text: "Eindhoven is mainly a base for low cost carriers, with flights to a range of European leisure and city destinations. You will not find the same long haul network as at the larger Dutch hub, so check carefully whether your destination is served before you plan the rest of the trip." },
    { t: "p", text: "If you live in the southern Netherlands or nearby parts of Belgium, a short journey to Eindhoven can save a lot of time compared with travelling to Schiphol. If you are connecting from a long haul flight, though, remember that a separate ticket means you carry the risk of a missed connection yourself." },

    { t: "h2", text: "2. Getting to the airport", id: "getting-there" },
    { t: "p", text: "The airport has good road links and is also reachable by public transport. Most rail travellers arrive at Eindhoven Centraal station and continue by bus to the terminal. Check the current bus services and journey times on the official transport or airport website before you set out, because routes and frequency can change." },
    { t: "ul", items: [
      "By bus from the station: look for the airport service and check the departure time in the timetable or a journey planner.",
      "By car: follow the signs for the airport and allow time for parking and the walk to the terminal.",
      "By taxi or ride hailing: useful with heavy luggage or late arrivals, but check how the fare is calculated before the ride.",
      "By bicycle: some travellers cycle to the station first and continue from there, which avoids airport parking altogether.",
    ] },
    { t: "p", text: "If you are driving, decide in advance whether you want short stay or long stay parking. The official airport site explains the current options and how to book. Parking prices and availability change, so do not rely on figures from an old article." },

    { t: "h2", text: "3. How much time to allow", id: "time-to-allow" },
    { t: "p", text: "Start with your airline's recommended check in time. That is the most reliable figure, because it depends on the carrier and the route. As a general approach, arrive early enough to check in, drop a bag if needed, go through security and walk to your gate without rushing." },
    { t: "ul", items: [
      "Allow more time at school holidays, early mornings and other busy periods.",
      "If you need to drop checked baggage, leave extra time for the queue at the desk.",
      "Check whether online check in is available and what the airline requires at the airport.",
      "Remember that the walk from the terminal to the gate takes time, even at a smaller airport.",
    ] },
    { t: "p", text: "Low cost airlines often have strict check in deadlines and may close the desk before departure. Read the fare conditions and the airline's instructions rather than assuming that the same rule applies on every flight." },

    { t: "h2", text: "4. Security and gates", id: "security-and-gates" },
    { t: "p", text: "Security screening follows European rules, but the details of what you can carry can change. Check the current guidance on liquids, electronics and restricted items on the airport website before you pack." },
    { t: "ul", items: [
      "Have your boarding pass and travel document ready when you enter the security area.",
      "Follow the instructions about laptops and liquids at the checkpoint, since these can differ over time.",
      "Look at the screens for your gate and keep an eye on them while you wait.",
      "If you need special assistance, tell your airline and the airport in advance.",
    ] },
    { t: "p", text: "Because the airport is compact, the distance to the gate is usually modest. That is one of its advantages, but it is still worth leaving time for a coffee or a toilet stop before boarding begins." },

    { t: "h2", text: "5. Arriving at Eindhoven", id: "arriving" },
    { t: "ol", items: [
      "Follow the signs from the aircraft to passport control if your route requires it.",
      "Collect checked bags from the reclaim area and check the tags before you leave.",
      "Pass through customs using the correct lane for your goods.",
      "Exit to the arrivals area, where you will find signs for buses, taxis and car hire.",
    ] },
    { t: "p", text: "If you plan to continue by train, check the bus connection from the terminal before you land. A little planning here avoids a long wait with luggage. Our guide to the first hour after landing has more ideas for a smooth onward journey." },

    { t: "h2", text: "6. Tips for a smoother trip", id: "tips" },
    { t: "ul", items: [
      "Check in online where possible and save the boarding pass on your phone.",
      "Measure and weigh your cabin bag at home, because rules differ between airlines and fares.",
      "Bring a refillable bottle and fill it after security.",
      "Download the airline app for gate and delay updates.",
      "Keep your booking reference handy in case you need help at the airport.",
    ] },
    { t: "callout", title: "If plans change", text: "Long delays and cancellations can bring rights to care, rerouting or compensation. Keep your boarding pass and any airline messages, and read our guide to cancelled flight rights." },

    { t: "p", text: "Before you travel, take a few minutes to read the airline's own instructions and the airport pages that apply to your flight. A quick check now prevents most of the small surprises that otherwise appear at the terminal." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For current routes, bus services, parking and opening details, use the official Eindhoven Airport website together with your airline's instructions. We have deliberately kept this guide general because times, prices and facilities change." },
  ],
  faq: [
    { q: "Is Eindhoven a busy airport?", a: "It is smaller than Amsterdam Schiphol and often feels calmer, but it can still be busy at holiday periods and early mornings. Arrive with enough time for check in and security." },
    { q: "How do I get from Eindhoven Centraal to the airport?", a: "Most travellers take a bus from the station. Check the current service and timetable on the official airport or transport website before travelling." },
    { q: "Do I need to print my boarding pass?", a: "That depends on your airline. Many carriers accept a digital boarding pass, while others ask for a printed document. Check your airline's instructions." },
  ],
};
