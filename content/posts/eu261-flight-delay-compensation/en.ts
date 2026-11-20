import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Flight Delay Compensation EU261: Am I Owed Money?",
  description: "A practical guide to EU261 flight delay compensation: who is covered, the three-hour arrival rule, the payment bands and the documents to keep.",
  blocks: [
    { t: "p", text: "A long delay at the gate is frustrating enough. Finding out that you might also be owed money makes it worth keeping a few documents. EU261 is the common name for the European rule that sets out rights for air passengers. This guide explains when a delay can lead to compensation, how the amounts are worked out and what to do next." },
    { t: "p", text: "This is general information, not legal advice. Rules and individual cases can differ, so check the official sources listed at the end of this article." },

    { t: "h2", text: "1. Who is covered", id: "who-is-covered" },
    { t: "p", text: "The rule applies to flights that depart from an airport in the European Union. It also applies to flights arriving in the EU when the airline is an EU airline. A flight between two non EU countries on a non EU carrier is generally outside the rule, even if you are an EU resident." },
    { t: "p", text: "The protection is attached to the flight, not to your passport. What matters is where the flight starts or ends and which airline operates it. If you booked through an agency, the operating airline is still the organisation you deal with for delay rights." },

    { t: "h2", text: "2. The three-hour rule", id: "three-hour-rule" },
    { t: "p", text: "Compensation for a delay is based on your arrival time at the destination, not the time you left the departure airport. If you reach your final destination three hours or more later than scheduled, you may be entitled to a payment." },
    { t: "p", text: "The clock stops when the door opens at your destination, so a flight that leaves late but makes up time in the air may not qualify. Keep the original booking confirmation as well as your boarding pass, because you will need to show the scheduled arrival time." },

    { t: "h2", text: "3. How much could you get", id: "amounts" },
    { t: "table", head: ["Flight distance", "Possible compensation per passenger"], rows: [
      ["Up to 1,500 km", "250 EUR"],
      ["1,500 to 3,500 km", "400 EUR"],
      ["Longer intra EU flights", "400 EUR"],
      ["Over 3,500 km", "600 EUR"],
    ] },
    { t: "p", text: "The distance is measured for the flight as a whole. Airlines and enforcement bodies use the scheduled route to place a journey in one of these bands. The figure is per passenger, so two travellers on the same booking may each have a claim." },

    { t: "h2", text: "4. When compensation is not owed", id: "extraordinary-circumstances" },
    { t: "p", text: "An airline does not have to pay if the long delay was caused by extraordinary circumstances that could not have been avoided, even with all reasonable measures. Weather, air traffic control restrictions and security issues are examples of situations often discussed in this context." },
    { t: "p", text: "We are not going to make specific claims about what counts in your case. The airline must explain its decision, and national enforcement bodies can help if you disagree. Ask for the reason in writing and keep any messages you receive." },

    { t: "h2", text: "5. Care while you wait", id: "care-while-you-wait" },
    { t: "p", text: "Separate from any compensation, airlines have duties to look after passengers while they wait. These duties apply even when a delay is caused by extraordinary circumstances." },
    { t: "ul", items: [
      "Meals and refreshments when the wait is long enough.",
      "Help with communication, for example messages home.",
      "Hotel accommodation when an overnight stay becomes necessary, within the limits set by the rule.",
      "Transport between the airport and the accommodation when a hotel is provided.",
    ] },

    { t: "h2", text: "6. Documents to keep", id: "documents" },
    { t: "p", text: "A claim is much easier when you can show what was promised and what actually happened. Try to collect the following while the events are fresh." },
    { t: "ul", items: [
      "Your booking confirmation, including the scheduled departure and arrival times.",
      "Your boarding pass or electronic boarding record.",
      "Screenshots of the departure boards and any app notifications.",
      "Written messages from the airline about the reason for the delay.",
      "Receipts for meals, hotels or transport that you had to arrange yourself.",
    ] },

    { t: "h2", text: "7. How to make a claim", id: "how-to-claim" },
    { t: "p", text: "Start with the airline. Most carriers have an online form, and the exact process changes from one airline to another. Give the flight number, the date, your booking reference and a short account of what happened." },
    { t: "ol", items: [
      "Check that your flight is covered by the rule using the test in section one.",
      "Work out whether you arrived three hours or more after the scheduled time.",
      "Send the claim to the operating airline with your supporting documents.",
      "Keep a copy of everything you send and note the date.",
      "If you get no useful reply, contact the national enforcement body in the country where the flight started or ended.",
    ] },
    { t: "p", text: "Our EU261 calculator can help you see which payment band a journey falls into before you start. You can also read our companion guide to cancelled flights and our guide to denied boarding rights." },

    { t: "h2", text: "8. A simple timeline to follow", id: "timeline" },
    { t: "p", text: "Once the immediate travel is over, work through the claim in stages. First, gather the documents you already have, including the booking and the boarding pass. Second, write down the scheduled and actual arrival times, because that difference decides whether the three hour test is met. Third, send a short claim to the operating airline and keep proof of the date you sent it." },
    { t: "ul", items: [
      "Early stage: collect documents, note the arrival times and send the first claim.",
      "While you wait: keep copies of every reply and note any deadlines the airline mentions.",
      "If there is no useful reply: contact the national enforcement body with the same documents.",
    ] },
    { t: "p", text: "A calm, organised claim is easier for everyone to handle. Avoid sending long accounts of the experience and focus on the flight details, the times and what you are asking for." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For the full text of the rule and the current guidance, look at the EU Your Europe website and the national enforcement body for your country. Airline policies and local procedures can change, and the official source is always the final reference." },
  ],
  faq: [
    { q: "Does a two hour delay qualify for compensation?", a: "Compensation for delay is based on arriving at your destination three hours or more later than scheduled. Care rights while you wait can apply earlier." },
    { q: "Does the rule apply to flights outside the EU?", a: "It covers flights departing from an EU airport and flights arriving in the EU on an EU airline. Check the details with the official source for your journey." },
    { q: "What if the airline says the delay was extraordinary?", a: "Ask for the reason in writing. You can contact the relevant national enforcement body if you disagree with the decision." },
  ],
};
