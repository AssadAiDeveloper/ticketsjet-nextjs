import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "How to Find Cheap Flights in 2026: 9 Tactics That Actually Work",
  description: "Nine practical ways to lower your airfare, from flexible dates and nearby airports to baggage costs and booking timing, without falling for common myths.",
  blocks: [
    { t: "p", text: "Cheap flights are rarely luck. In most cases they come from a handful of repeatable habits: searching in the right way, being flexible about the right things, and reading the real price instead of the headline price. This guide covers nine tactics that work in practice, plus a few popular myths worth ignoring." },
    { t: "p", text: "A quick note before we start. Airline pricing changes constantly and differs by route, season and carrier, so treat every timing rule below as a starting point, not a law. The goal is to compare more options in less time, so you can see for yourself what a fair price looks like for your trip." },

    { t: "h2", text: "1. Be flexible with your dates", id: "flexible-dates" },
    { t: "p", text: "Flexibility is the biggest single lever on airfare. The same route can cost very different amounts from one day to the next, and shifting your trip by a day or two is often enough to change the price noticeably." },
    { t: "ul", items: [
      "Use a calendar or price-by-day view instead of searching one fixed date.",
      "Compare departures in the middle of the week with Friday and Sunday. Mid-week days are often cheaper because fewer people want to travel then, though this varies by route.",
      "Check what happens if you add or remove one night. A shorter or longer stay sometimes lands on a much cheaper return day.",
      "Avoid public holidays and school-holiday weekends if you can. Everyone wants the same flights, and prices reflect it."
    ] },

    { t: "h2", text: "2. Search 'Everywhere' when the destination is open", id: "search-everywhere" },
    { t: "p", text: "If you mainly want a trip and care less about where, let the prices pick the destination. Searching from your home airport to 'Everywhere' (or browsing a price map) shows the cheapest places to fly right now, which is often a list you would never have thought of." },
    { t: "p", text: "This flips the usual process. Instead of choosing a city and paying whatever it costs, you start with your budget and your dates and see what fits. Many of the best-value trips begin this way." },

    { t: "h2", text: "3. Compare nearby airports", id: "nearby-airports" },
    { t: "p", text: "Big cities often have more than one airport, and smaller regional airports can be served by low-cost airlines with very different prices. Check the alternatives at both ends of your trip." },
    { t: "ul", items: [
      "Search a city code (such as 'all airports in London') to compare every airport at once.",
      "Look at airports within a reasonable train or drive of home, including across a border.",
      "Add the cost and time of getting to a farther airport before you decide it is cheaper. A saving of 20 euros disappears quickly with a 40 euro taxi."
    ] },

    { t: "h2", text: "4. Book in the sweet spot, not too early and not too late", id: "booking-timing" },
    { t: "p", text: "Fares tend to be highest very far in advance (before an airline has sold many seats) and again in the last days before departure. The cheapest period usually sits in between." },
    { t: "p", text: "As a rule of thumb, many travellers find the best prices for short-haul flights a few weeks to a few months ahead, and for long-haul flights a few months ahead. For peak periods such as summer holidays or Christmas, book earlier. These are patterns, not guarantees, so compare the price you see with what the same route cost in previous weeks." },
    { t: "callout", title: "Last-minute deals", text: "Waiting for a last-minute bargain on a popular route is usually a gamble that goes the wrong way. Last-minute prices can drop on quiet routes, but they rarely do on busy ones." },

    { t: "h2", text: "5. Compare the real total, not the headline fare", id: "real-total" },
    { t: "p", text: "A low fare is only a good deal if it still looks good once you add what you actually need. Low-cost airlines in particular often sell a basic seat and charge separately for everything else. Always check the final total on the provider's page before you pay." },
    { t: "table", head: ["Extra", "Often included in the cheapest fare?", "What to check"], rows: [
      ["Small personal bag", "Usually yes", "Maximum size and weight"],
      ["Cabin bag (trolley)", "Not always", "Whether it is allowed free or costs extra"],
      ["Checked bag", "Often no", "Price online versus price at the airport"],
      ["Seat selection", "Often no", "Whether you need to pay to sit together"],
      ["Airport check-in", "Sometimes extra", "Online check-in deadline and any fee"],
      ["Payment fees", "Sometimes", "Extra charge for certain cards"]
    ] },
    { t: "p", text: "When you compare two fares, compare them with the same baggage. A fare that is 30 euros cheaper but excludes a bag you need can end up costing more than the 'expensive' option that includes it." },

    { t: "h2", text: "6. Compare two one-way tickets with a return", id: "one-way-vs-return" },
    { t: "p", text: "Return tickets are not always the cheapest way to travel a round trip. On some routes, especially with low-cost airlines, two one-way tickets (sometimes on different airlines) cost less than a return. It is worth checking both options when the price matters." },
    { t: "p", text: "Keep the details in mind: two separate tickets mean two separate bookings, two sets of baggage rules, and no protection if you miss the second flight because the first one is late." },

    { t: "h2", text: "7. Be careful with separate tickets on connections", id: "separate-tickets" },
    { t: "p", text: "Combining flights on separate tickets (sometimes called a self-transfer) can lower the price, but it moves the risk onto you. If your first flight is delayed and you miss the second, the second airline owes you nothing, and you may have to rebook at full price." },
    { t: "ul", items: [
      "Leave generous time between flights, and remember you may need to collect and re-check bags.",
      "Check whether you need a visa or transit permission to leave the airport area.",
      "Consider buying the whole journey on one ticket if the price difference is small. Then the airline is responsible for rebooking you."
    ] },

    { t: "h2", text: "8. Use price calendars and alerts", id: "price-alerts" },
    { t: "p", text: "You do not need to check prices every day. Look at the price calendar for your route to see what is normal, then decide whether today's price is good. If it is not, watch the route for a few days, and buy when it falls into the range you set for yourself." },
    { t: "p", text: "Decide your target price before you start. People who set a limit tend to buy at a fair price. People who keep waiting for a lower one often end up paying more." },

    { t: "h2", text: "9. Count the cost of getting to the airport", id: "airport-costs" },
    { t: "p", text: "The cheapest ticket can be the more expensive trip once you add transport. Early flights may mean a taxi because public transport has not started. Late arrivals may need a pre-booked transfer." },
    { t: "p", text: "Before booking, check how you will reach the airport at both ends and how much it costs. If you arrive late at night in a new city, booking a transfer in advance is often cheaper and calmer than looking for a taxi on arrival." },

    { t: "h2", text: "Myths to ignore", id: "myths" },
    { t: "ul", items: [
      "'Searching in incognito mode lowers prices.' Evidence that airlines raise prices because you searched before is weak. Price changes are mostly caused by seats selling out and fares being updated.",
      "'Tuesday is always the cheapest day to buy.' Fares change all the time and there is no single magic day. What matters is when you travel, not when you click buy.",
      "'The cheapest search result is always the best deal.' Not if it excludes baggage, has a tight connection, or lands at an inconvenient airport."
    ] },

    { t: "h2", text: "A quick checklist before you book", id: "checklist" },
    { t: "ol", items: [
      "Did I compare at least three different dates?",
      "Did I check nearby airports at both ends?",
      "Does the fare include the baggage I actually need?",
      "Is there enough time for any connection, and is it on one ticket?",
      "Do I know how I will get to and from the airport, and what it costs?",
      "Is the final total on the provider's page the price I expected?"
    ] },
    { t: "p", text: "TicketsJet compares many airlines and travel agencies in one search and never adds booking fees. You always complete your booking directly with the airline or agency, at their price." }
  ],
  faq: [
    { q: "When is the best time to book a flight?", a: "There is no single answer, but many travellers find good prices a few weeks to a few months before a short-haul flight and a few months before a long-haul one. Book earlier for school holidays and Christmas. Compare the price you see with recent prices for the same route." },
    { q: "Are mid-week flights really cheaper?", a: "Often, yes. Tuesday, Wednesday and Thursday departures tend to be cheaper than Friday and Sunday on many routes because fewer people want to fly then. It is a pattern, so check the price calendar for your own route." },
    { q: "Is it cheaper to book two one-way tickets?", a: "Sometimes. On some routes, especially with low-cost airlines, two one-way tickets cost less than a return. Compare both, and remember that separate bookings mean separate baggage rules and no protection if one flight is delayed." },
    { q: "Does clearing cookies or using incognito mode lower flight prices?", a: "There is little reliable evidence that it does. Fares move mainly because seats sell out and airlines update prices. A better use of your time is to compare dates, airports and providers." },
    { q: "Why does the price change when I click through to book?", a: "Fares are updated constantly, and the price shown in a search can be a few minutes old. The price on the airline's or agency's booking page is the one you will pay, so always check the final total there." }
  ],
};
