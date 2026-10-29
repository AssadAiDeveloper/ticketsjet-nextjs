import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Your First Hour After Landing: A Step-by-Step Arrival Checklist",
  description: "What to do between the plane door and your accommodation: passport control, baggage, getting online, money, transport and common mistakes to avoid on arrival.",
  blocks: [
    { t: "p", text: "The first hour after landing sets the tone for your trip. You are tired, in an unfamiliar place, and need to do several things in the right order. A little planning before you fly makes this hour calm instead of stressful." },
    { t: "p", text: "This checklist follows the real order of an arrival, from the aircraft door to the street. Airports and countries differ, so use it as a framework and check the official guidance for your destination." },

    { t: "h2", text: "1. Before you land: prepare on the plane", id: "on-the-plane" },
    { t: "p", text: "Much of the work can be done before you reach the ground. Use the last part of the flight to get ready." },
    { t: "ul", items: [
      "Fill in any arrival or customs form if one is handed out, using your accommodation address.",
      "Put your passport, boarding pass and any entry documents in one easy pocket.",
      "Switch your phone to flight mode until you land, then download offline maps while you still have Wi-Fi or data.",
      "Check the arrival terminal and the transport plan you made at home.",
      "Note the address of your accommodation in text you can show a driver, in the local script if possible."
    ] },

    { t: "h2", text: "2. Off the plane and to passport control", id: "passport-control" },
    { t: "p", text: "Follow the signs for arrivals or immigration. If you have a connection, follow the transfer signs instead. Walk at a steady pace, since being near the front of a long queue can save a lot of time." },
    { t: "ul", items: [
      "Have your passport open at the photo page, and any visa or electronic authorisation ready.",
      "Be ready to answer simple questions: where you are staying and how long you will stay.",
      "Many countries use electronic gates and biometric registration. Entry systems in Europe and elsewhere are changing, so check the current rules for your destination before you travel.",
      "Keep your phone away while queuing unless the border authority allows its use."
    ] },
    { t: "callout", title: "Check entry rules before you fly", text: "Entry requirements such as visas and electronic travel authorisations can change. Always confirm them on the official government website of your destination, and do it before you book." },

    { t: "h2", text: "3. Collect your baggage", id: "baggage" },
    { t: "p", text: "Look at the screens for your flight number and belt. Stand a little back from the belt so you can see bags coming and move easily." },
    { t: "ul", items: [
      "Check the baggage tag number against your receipt before you leave.",
      "If a bag is missing or damaged, report it at the airline desk in the baggage hall before you leave the airport and get a written report.",
      "Keep your boarding pass until you have all your bags, since the airline may ask for it."
    ] },
    { t: "p", text: "Our baggage guide explains how to handle delays and damage in more detail." },

    { t: "h2", text: "4. Customs and the arrivals hall", id: "customs" },
    { t: "p", text: "After baggage you usually pass customs. If you have nothing to declare, follow the green or nothing-to-declare signs, where they exist. Check the allowances for items such as cash, alcohol, tobacco and food before you travel, as limits differ widely." },
    { t: "p", text: "Once you are through, you will enter the arrivals hall. This is where people try to sell you taxis and tours. Walk past them calmly and follow the signs to official transport." },

    { t: "h2", text: "5. Get online", id: "online" },
    { t: "p", text: "Staying connected makes everything easier, from maps to ride apps. Decide before you land how you will do it." },
    { t: "ul", items: [
      "An eSIM can be installed before you travel and activated on arrival. See our guide on eSIM, local SIM and roaming.",
      "A local SIM can be bought at the airport, but prices there are often higher than in town.",
      "Airport Wi-Fi often requires registration and is usually not secure. Avoid logging in to banking while on it.",
      "Download offline maps of your destination before you leave, in case you have no signal at first."
    ] },

    { t: "h2", text: "6. Money and payments", id: "money" },
    { t: "p", text: "Most places accept cards, but it is still useful to have a small amount of local currency for transport and small purchases." },
    { t: "ul", items: [
      "An ATM in the airport is usually convenient, but check the fees. Decline the option to be charged in your home currency and choose the local currency instead.",
      "Currency exchange desks at airports usually have poor rates. Exchange only a small amount if you must.",
      "Notify your bank if you expect card problems abroad, and keep a backup payment method separate from your main one.",
      "Contactless payments and phone wallets work in many countries, but check what is common at your destination."
    ] },

    { t: "h2", text: "7. Transport to your accommodation", id: "transport" },
    { t: "p", text: "The best transport is the one you planned before you arrived. Compare these common options and choose before you are tired." },
    { t: "table", head: ["Option", "Pros", "Cons"], rows: [
      ["Train or metro", "Usually cheapest and avoids traffic", "Can be crowded with luggage; check the last service time"],
      ["Airport bus or shuttle", "Direct to central areas, simple", "Fixed timetable and stops"],
      ["Official taxi", "Door to door, easy with luggage", "Costs more; use the official taxi rank and check how the price works"],
      ["Ride-hailing app", "Price shown upfront in many cities", "Pick-up points can be hard to find; needs data"],
      ["Pre-booked transfer", "Driver waits for you, fixed price", "Costs more than public transport; confirm details in advance"]
    ] },
    { t: "p", text: "Avoid unofficial drivers who approach you inside the terminal. They may overcharge, and you will have no protection if something goes wrong." },

    { t: "h2", text: "8. Common mistakes on arrival", id: "mistakes" },
    { t: "ul", items: [
      "Taking the first taxi offered without checking how the price will be calculated.",
      "Exchanging a large amount of cash at the airport.",
      "Arriving at your accommodation without checking the check-in time. If you land early, ask whether you can store bags.",
      "Not having your accommodation address available offline.",
      "Using public Wi-Fi for sensitive accounts."
    ] },

    { t: "h2", text: "9. If something goes wrong", id: "problems" },
    { t: "p", text: "Delays, lost bags and missed connections happen. Go to your airline's desk first for flight and baggage problems. For lost documents, contact your embassy or consulate. Keep a copy of your passport and booking details separately from the originals, either on paper or saved offline." },
    { t: "p", text: "If your flight was delayed or cancelled, you may have rights to care or compensation. See our guide on flight delay compensation in the EU." },

    { t: "h2", text: "10. Your arrival checklist", id: "checklist" },
    { t: "ul", items: [
      "Passport and entry documents ready before landing.",
      "Offline maps and accommodation address saved.",
      "eSIM or data plan sorted.",
      "A small amount of local currency or a card that works abroad.",
      "A transport plan chosen in advance.",
      "Baggage collected and checked."
    ] },
    { t: "p", text: "TicketsJet helps you compare flights so you can find a good arrival time as well as a good price. Landing in daylight with an easy transfer can be worth a few extra euros." }
  ],
  faq: [
    { q: "How long does it take to get out of the airport after landing?", a: "It varies by airport and time of day. Allow roughly one to two hours between landing and leaving the building, more at busy times or when immigration queues are long." },
    { q: "Should I exchange money at the airport?", a: "Usually only a small amount, if needed. Airport exchange desks often have less favourable rates. Withdrawing local currency at an ATM or paying by card is often better, but check the fees." },
    { q: "What is the safest way to get from the airport to the city?", a: "Use official public transport, an official taxi rank, a ride-hailing app or a transfer you booked in advance. Avoid unofficial drivers who approach you inside the terminal." },
    { q: "What should I do if my luggage does not arrive?", a: "Go to the airline's baggage desk before leaving the airport and file a written report. Keep the reference number and receipts for essential purchases while you wait for your bag." },
    { q: "Do I need to check entry requirements before I fly?", a: "Yes. Visa rules and electronic travel authorisations vary by nationality and destination and can change. Check the official government website of your destination before you book and again before you travel." }
  ],
};
