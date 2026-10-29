import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Multi-City and Open-Jaw Flights: How to Plan a Trip That Does Not Go Back and Forth",
  description: "Learn the difference between return, one-way, open-jaw and multi-city tickets, when each one saves money, and the practical risks to check before you book.",
  blocks: [
    { t: "p", text: "Most people search for flights the same way: from home to a destination and back again. But many trips do not work like that. You might arrive in one city and leave from another, or visit several cities in a row. For these journeys, the way you book can change the price, the route and your flexibility." },
    { t: "p", text: "This guide explains the main ticket types in plain language, when each one makes sense, and what to check before you book. Airline rules vary, so confirm the conditions of your specific fare." },

    { t: "h2", text: "1. The four ticket types", id: "types" },
    { t: "table", head: ["Ticket type", "What it is", "Best for"], rows: [
      ["Return (round trip)", "Out and back between the same two places", "Simple trips with one destination"],
      ["One-way", "A single flight from A to B", "Moving, flexible plans, or combining airlines yourself"],
      ["Open-jaw", "Fly into one city and out of another, with a gap you cover by land", "Trips along a coast or a route, such as arriving in Rome and leaving from Venice"],
      ["Multi-city", "Several separate flights on one booking, such as A to B, B to C, C to A", "Trips with more than two points"]
    ] },
    { t: "p", text: "The names vary a little between websites, but the idea is the same. The difference is whether you are returning to your start point, and whether you want one booking or several." },

    { t: "h2", text: "2. Open-jaw: land in one city, leave from another", id: "open-jaw" },
    { t: "p", text: "An open-jaw ticket removes the need to go back to where you started. You fly into one place, travel by train, bus or car, and fly home from somewhere else. This saves time and often avoids the cost of a rental car drop-off fee." },
    { t: "ul", items: [
      "Good for road trips and rail trips where doubling back wastes a day.",
      "Often priced similarly to a standard return, and sometimes slightly more. Compare both.",
      "You are responsible for the transport between the two points, so budget for it.",
      "If you skip a flight on a ticket, the rest of the ticket can be cancelled. Do not skip a segment unless the airline's terms allow it."
    ] },

    { t: "h2", text: "3. Multi-city: one booking, several stops", id: "multi-city" },
    { t: "p", text: "In a multi-city search you enter each flight yourself. The system prices them together and gives you a single booking. This is useful when you want to visit several places and keep everything under one reference." },
    { t: "p", text: "Pricing can go either way. Sometimes the combined price is lower than booking each leg separately. Sometimes it is higher. Always test both, then compare the total including baggage." },
    { t: "ul", items: [
      "One booking means one set of baggage rules and one place to manage changes.",
      "If one flight is changed or cancelled by the airline, the rest of the booking is usually protected and the airline can rebook you.",
      "Changing one segment can cost more than changing a simple return. Check the change fee before you book."
    ] },

    { t: "h2", text: "4. Two one-way tickets can be cheaper", id: "one-ways" },
    { t: "p", text: "On many routes, especially with low-cost airlines, two one-way tickets cost the same as a return or less. This lets you mix airlines, use different airports for each direction, and pick the best time for each leg." },
    { t: "ul", items: [
      "Mixing airlines may give you a cheaper trip, but each ticket has its own baggage rules.",
      "If the first flight is delayed, the second airline has no obligation to help. Leave generous time between separate tickets.",
      "Check entry rules. Some countries want proof that you will leave, such as an onward ticket."
    ] },

    { t: "h2", text: "5. How to search a multi-city trip", id: "how-to-search" },
    { t: "ol", items: [
      "List your stops in order and the rough dates for each.",
      "Search the full route in multi-city mode and note the total price.",
      "Search each leg again as a one-way and add them up.",
      "Compare the total with a simple return, if a return makes sense for your route.",
      "Add baggage costs to every option before deciding."
    ] },
    { t: "p", text: "Also try nearby airports. A small change, such as flying out of a second airport in the same region, can save a surprising amount." },

    { t: "h2", text: "6. Dates and order matter", id: "dates" },
    { t: "p", text: "Prices change by day of the week and by season, and the order of your stops can change the price. Try reversing the route, or swapping which city you visit first. If your dates are flexible, check the cheapest days on each leg separately." },
    { t: "callout", title: "Use the calendar view", text: "A price calendar shows which dates are cheapest for each segment. Moving a single flight by a day can lower the total more than moving the whole trip." },

    { t: "h2", text: "7. Baggage on multi-leg trips", id: "baggage" },
    { t: "p", text: "Check your baggage allowance for every flight. A booking with several airlines can have a different allowance on each leg, and a bag that is included on the first flight may cost extra on the second. If you need a checked bag on every leg, add it to the price you compare." },
    { t: "p", text: "Our baggage guide explains how to compare the true price of fares with different inclusions." },

    { t: "h2", text: "8. Risks to check before you book", id: "risks" },
    { t: "ul", items: [
      "Separate tickets are not protected if you miss a connection.",
      "Some airlines cancel the rest of your itinerary if you do not use an earlier segment.",
      "Visa and entry rules apply for every country you pass through, including transit.",
      "Open-jaw trips need transport between the two cities. Check train or bus prices and times.",
      "Leave enough time at each stop, since cities often need longer than you expect."
    ] },

    { t: "h2", text: "9. Is it worth the effort?", id: "worth-it" },
    { t: "p", text: "For a simple trip to one place, a return is usually the easiest. If your plan covers a region, a route or a few cities, open-jaw and multi-city tickets can save a day or more and avoid doubling back. The price difference is often small, so decide based on your plan first and price second." },

    { t: "h2", text: "10. Quick checklist", id: "checklist" },
    { t: "ul", items: [
      "Did I compare multi-city, one-way pairs and a return?",
      "Did I add baggage costs to each option?",
      "Did I plan and price the transport between cities?",
      "Do I have enough time between connections on separate tickets?",
      "Did I check entry and visa rules for every country?"
    ] },
    { t: "p", text: "TicketsJet can compare flights across many providers, so you can test different routes and dates quickly. Booking is completed on the provider's site." }
  ],
  faq: [
    { q: "What is an open-jaw ticket?", a: "An open-jaw ticket is a return-style booking where you fly into one city and out of another, or start your return from a different city. You cover the journey between the two points yourself, for example by train." },
    { q: "Is a multi-city ticket more expensive than a return?", a: "Sometimes, but not always. Multi-city pricing depends on the route, dates and airlines. Compare the multi-city total with the cost of one-way tickets and a standard return before you decide." },
    { q: "Can I skip one flight on a multi-city ticket?", a: "Usually the airline can cancel the remaining flights if you miss an earlier one. Check the fare rules before you decide to skip a segment." },
    { q: "Are two one-way tickets riskier than a return?", a: "If they are on different tickets, you are not protected if the first flight is delayed and you miss the second. Allow generous time and consider insurance." },
    { q: "Do I need a visa for a transit stop?", a: "It depends on the country, your passport and whether you leave the airport. Check the official entry rules for every stop on your route before you book." }
  ],
};
