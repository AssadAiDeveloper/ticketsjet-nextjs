import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Baggage Fees Explained: Cabin Bags, Checked Bags and How to Avoid Surprise Charges",
  description: "How airline baggage rules and fees work, what 'personal item' really means, how to compare the true price of a fare, and practical ways to avoid paying more at the airport.",
  blocks: [
    { t: "p", text: "A cheap fare can stop being cheap at the check-in desk. Baggage is one of the most common reasons the price you paid is not the price you end up paying, and the rules differ between airlines, between fare types, and even between routes of the same airline." },
    { t: "p", text: "This guide explains how baggage allowances are structured, where the extra charges come from, and how to compare fares fairly. We do not quote exact fees, because airlines change them often. Instead you will learn what to check, so you can confirm the current rules for your own flight." },

    { t: "h2", text: "1. The three kinds of baggage", id: "kinds" },
    { t: "p", text: "Almost every airline sorts bags into three groups. Knowing which group your bag falls into is the first step to avoiding a charge." },
    { t: "table", head: ["Type", "Where it travels", "Typical rule"], rows: [
      ["Personal item", "Under the seat in front of you", "A small bag such as a handbag, laptop bag or small backpack. Often free, but with strict size limits."],
      ["Cabin bag (carry-on)", "In the overhead locker", "A larger bag that may be free, paid, or only included in higher fares, depending on the airline."],
      ["Checked bag", "In the hold", "Usually has a weight limit. May be included, sold as an extra, or not offered on the cheapest fares."]
    ] },
    { t: "callout", title: "Check your exact fare", text: "Two tickets on the same flight can have different baggage rules. Always read the baggage line for the fare you are buying, not for the airline in general." },

    { t: "h2", text: "2. Why fares are split into bundles", id: "bundles" },
    { t: "p", text: "Many airlines, especially low-cost carriers, sell a basic fare and add services separately. The basic fare is the headline price you see in search results. Bags, seat choice and priority boarding are optional extras, and they are priced separately." },
    { t: "p", text: "Full-service airlines often do something similar on short and medium routes. Their lowest fare may include only a small cabin bag, while a slightly higher fare adds a checked bag and changes. On long-haul routes a checked bag is more often included, but this is not universal." },
    { t: "ul", items: [
      "Basic or light fares: lowest price, fewest inclusions, often only a personal item.",
      "Standard or classic fares: usually add a cabin bag or a checked bag, and sometimes seat selection.",
      "Flex fares: more inclusions plus more flexible change and refund conditions."
    ] },

    { t: "h2", text: "3. What counts as a personal item?", id: "personal-item" },
    { t: "p", text: "Airlines set a maximum size for the free under-seat bag, and the limits are not the same everywhere. A bag that is allowed by one airline may be too big for another. If your bag is even slightly over the limit, you can be asked to pay, sometimes a high fee at the gate." },
    { t: "ul", items: [
      "Measure your bag including handles, wheels and outside pockets.",
      "A soft bag that can be squeezed is safer than a rigid one at the limit.",
      "Do not count on being allowed an extra jacket or shopping bag. Rules about additional items differ.",
      "If the bag is too tight to fit, move heavy items into pockets only if that is allowed, or consider paying for a larger allowance online."
    ] },

    { t: "h2", text: "4. Cabin bag rules: size and weight", id: "cabin-bag" },
    { t: "p", text: "Cabin bags have both a size limit and, on many airlines, a weight limit. The weight limit is often what catches people out, because the bag may fit in the overhead locker but still be too heavy." },
    { t: "ul", items: [
      "Check both numbers on your airline's baggage page: dimensions in centimetres and maximum weight in kilograms.",
      "If you are connecting between two airlines on separate tickets, the stricter limit applies to that leg.",
      "On full flights, airlines may ask passengers to place cabin bags in the hold at the gate. Keep valuables, medication and documents in your personal item.",
      "Do not assume that a bag sold as 'cabin size' by the manufacturer fits every airline's limit."
    ] },

    { t: "h2", text: "5. Checked bags: weight, price and timing", id: "checked-bag" },
    { t: "p", text: "A checked bag has a weight allowance, often expressed in kilograms. Going over costs more, usually per kilogram or per step of extra weight. This is typically the most expensive way to add baggage." },
    { t: "p", text: "The cheapest moment to add a bag is when you book. Adding it later through manage booking is usually more expensive, and paying at the airport is often the most expensive of all." },
    { t: "table", head: ["When you add the bag", "Typical cost level", "Comment"], rows: [
      ["During booking", "Lowest", "The best price for most airlines."],
      ["After booking, online", "Moderate", "Price often depends on how close you are to departure."],
      ["At the airport or gate", "Highest", "Avoid if possible. Payment may also be limited to cards."]
    ] },
    { t: "p", text: "Weigh your bag at home with a luggage scale or a bathroom scale. Being a kilogram over at the desk is an expensive mistake that is easy to avoid." },

    { t: "h2", text: "6. Compare the true price of a flight", id: "true-price" },
    { t: "p", text: "The honest way to compare two flights is to add the extras you will actually need. A flight that looks 30 euros cheaper may cost more once you add a bag." },
    { t: "ol", items: [
      "Decide what you need: personal item only, a cabin bag, or a checked bag.",
      "Find the price of that bag on each airline for your exact flight.",
      "Add seat selection if you need to sit together.",
      "Compare the total price per person, not the headline fare.",
      "Consider the return leg. Some airlines charge for bags in each direction."
    ] },
    { t: "callout", title: "Travelling light is worth it", text: "If you can fit your trip into a personal item, you avoid baggage fees completely and skip the baggage belt at arrival. For a weekend trip this is often realistic." },

    { t: "h2", text: "7. Connecting flights and separate tickets", id: "connections" },
    { t: "p", text: "If you book a journey with connections on a single ticket, your bag can usually be checked through to the final destination. If you book separate tickets, each airline treats its flight on its own. You may have to collect and re-check your bag, and each ticket has its own baggage rules and fees." },
    { t: "ul", items: [
      "On a single ticket, ask at check-in whether your bag is tagged to the final airport.",
      "On separate tickets, allow much more connection time, since you may need to clear immigration and check in again.",
      "A missed connection on separate tickets is generally not covered by the first airline."
    ] },

    { t: "h2", text: "8. Items that are limited or restricted", id: "restricted" },
    { t: "p", text: "Some items are limited in cabin bags regardless of the fare you chose. Liquids, power banks and certain sporting equipment all have specific rules. Security rules differ by country, so check the airport's guidance before you travel." },
    { t: "ul", items: [
      "Liquids in the cabin are usually limited to small containers inside a transparent bag. Larger amounts go in the hold.",
      "Spare lithium batteries and power banks normally have to travel in the cabin, not in checked baggage.",
      "Bulky items such as musical instruments or sports gear may need advance booking and a special fee.",
      "Duty-free purchases are typically allowed if they stay sealed, but connecting flights can change this."
    ] },

    { t: "h2", text: "9. If your bag is damaged, delayed or lost", id: "problems" },
    { t: "p", text: "Report any problem before you leave the baggage hall. Airlines have a lost and delayed baggage desk, and you will usually be asked to complete a property irregularity report. Keep the report reference number." },
    { t: "ul", items: [
      "Photograph the damage and keep your baggage tag.",
      "Keep receipts for essential items you have to buy while your bag is missing. Airlines may reimburse reasonable costs.",
      "There are time limits for written claims, often counted in days from receiving the bag. Do not wait.",
      "Travel insurance can cover items beyond the airline's liability."
    ] },

    { t: "h2", text: "10. Quick baggage checklist", id: "checklist" },
    { t: "ul", items: [
      "Did I read the baggage details for my exact fare?",
      "Did I measure and weigh my bag?",
      "Did I add a bag online, during booking, if I need one?",
      "Are valuables, medication and documents in my personal item?",
      "If I have separate tickets, do I have time to collect and re-check my bag?"
    ] },
    { t: "p", text: "TicketsJet lets you compare flights from many providers. Remember to check the baggage terms of the fare you choose on the airline or travel agent's booking page before you pay." }
  ],
  faq: [
    { q: "What is the difference between a personal item and a cabin bag?", a: "A personal item is a small bag that fits under the seat in front of you. A cabin bag is a larger carry-on that goes in the overhead locker. Many cheap fares include only the personal item, while the cabin bag may need to be added or is included in a higher fare." },
    { q: "Is it cheaper to pay for a bag when I book?", a: "Usually yes. Most airlines charge the least during booking, more after booking through manage booking, and the most at the airport or gate." },
    { q: "Do I need to pay again for baggage on the return flight?", a: "It depends on how the fare and bag were sold. Some airlines price baggage per direction, so check whether your bag purchase covers both flights before you pay." },
    { q: "Can I bring a power bank in checked baggage?", a: "Generally no. Spare lithium batteries and power banks are normally required to travel in the cabin. Check the airline's dangerous goods rules before you fly." },
    { q: "What should I do if my checked bag does not arrive?", a: "Report it at the baggage desk before leaving the airport, get a written report with a reference number, and keep receipts for essential items you buy while waiting. Then follow the airline's claim process within the time limit." }
  ],
};
