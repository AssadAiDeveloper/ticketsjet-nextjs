import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Flight Delayed or Cancelled? Your Rights and Compensation Under EU261",
  description: "What you can claim when a flight is delayed, cancelled or overbooked: care, refunds, rerouting and fixed compensation under EU Regulation 261/2004, and how to make a claim.",
  blocks: [
    { t: "p", text: "A delayed or cancelled flight is stressful enough without having to work out what you are owed. In Europe, a regulation known as EU261 gives passengers clear rights, and many travellers never claim what they are entitled to. This guide explains the main rules in plain language and what to do at the airport and afterwards." },
    { t: "p", text: "This is general information, not legal advice. Rules have conditions and exceptions, and the details can change, so check the official EU or national authority pages and your airline's terms for your own case." },

    { t: "h2", text: "1. When does EU261 apply to your flight?", id: "when-it-applies" },
    { t: "p", text: "EU261 protects passengers on flights within the European Union, Iceland, Norway and Switzerland, and on flights that depart from an airport in those countries. It also covers flights arriving in the EU from outside the EU, but only when the airline is registered in the EU." },
    { t: "table", head: ["Your flight", "Covered by EU261?"], rows: [
      ["Departs from an EU airport, any airline", "Yes"],
      ["Arrives in the EU from outside the EU, on an EU airline", "Yes"],
      ["Arrives in the EU from outside the EU, on a non-EU airline", "Generally no"],
      ["Departs from outside the EU, on a non-EU airline, to a non-EU destination", "No"]
    ] },
    { t: "p", text: "The United Kingdom has its own similar rules (often called UK261) for flights departing from UK airports and some arriving on UK airlines. The principles are comparable, but check which rules apply to your flight." },

    { t: "h2", text: "2. Your rights if your flight is delayed", id: "delays" },
    { t: "p", text: "For a delay, there are two separate things to know: the care the airline must give you while you wait, and the compensation you may be owed afterwards." },
    { t: "h3", text: "Care and assistance while you wait" },
    { t: "p", text: "If your departure is delayed beyond a certain time (which depends on the flight distance), the airline must offer meals and refreshments, a way to make two phone calls or send messages, and, when the delay lasts overnight, hotel accommodation and transport to it." },
    { t: "h3", text: "Compensation for a long delay" },
    { t: "p", text: "You may be entitled to fixed compensation if you reach your final destination three hours or more late. What counts is the delay at your final arrival, not at departure." },
    { t: "table", head: ["Flight distance", "Compensation per passenger"], rows: [
      ["Up to 1,500 km", "250 euros"],
      ["Within the EU, over 1,500 km, and other flights between 1,500 and 3,500 km", "400 euros"],
      ["Other flights over 3,500 km", "600 euros"]
    ] },
    { t: "p", text: "For long-haul flights, the compensation can be reduced by half if the delay at arrival is under four hours. The amount is per passenger, so a family of four may be owed four times as much." },
    { t: "p", text: "If your delay is more than five hours, you can also choose to give up the trip and ask for a refund of the unused ticket instead." },

    { t: "h2", text: "3. Your rights if your flight is cancelled", id: "cancellations" },
    { t: "p", text: "When an airline cancels your flight, you have a choice that does not depend on the reason for the cancellation." },
    { t: "ol", items: [
      "A full refund of the ticket (and a flight back to your first departure point if you are already on a connecting journey).",
      "Rerouting to your destination as soon as possible, on comparable conditions.",
      "Rerouting at a later date that suits you, if seats are available."
    ] },
    { t: "p", text: "While you wait, the airline must also provide meals, communication and hotel accommodation if needed, as in the case of a delay." },
    { t: "p", text: "You may also be owed the fixed compensation shown above, unless you were told about the cancellation well in advance (generally at least two weeks before departure), or the airline offered a suitable alternative flight with only a small difference in timing, or the cancellation was caused by extraordinary circumstances." },

    { t: "h2", text: "4. Denied boarding and overbooking", id: "denied-boarding" },
    { t: "p", text: "Airlines sometimes sell more tickets than there are seats. If you are refused boarding against your will, even though you checked in on time, you are entitled to care, a choice between refund and rerouting, and the same fixed compensation as for long delays and cancellations. Airlines usually ask for volunteers first and offer something in return, which you can negotiate." },

    { t: "h2", text: "5. When you may not get compensation", id: "exceptions" },
    { t: "p", text: "The airline does not have to pay the fixed compensation if the delay or cancellation was caused by extraordinary circumstances that could not have been avoided even if all reasonable measures had been taken. Examples often include severe weather, air traffic control restrictions, security risks, political instability or strikes by airport staff outside the airline's control." },
    { t: "ul", items: [
      "Technical faults in the aircraft are generally not treated as extraordinary, though there are exceptions.",
      "Strikes by the airline's own staff are often treated differently from strikes by third parties.",
      "Even when there is no compensation, you are still entitled to care and to a refund or rerouting."
    ] },

    { t: "h2", text: "6. What to do at the airport", id: "at-the-airport" },
    { t: "ol", items: [
      "Ask the airline desk or app what is happening, and for the reason in writing if you can.",
      "Keep your boarding pass, booking confirmation and any messages from the airline.",
      "Note the scheduled and actual times for departure and arrival.",
      "Keep receipts if you pay for meals, transport or a hotel because the airline did not provide them.",
      "Take photos of departure boards that show the delay or cancellation."
    ] },

    { t: "h2", text: "7. How to make a claim", id: "how-to-claim" },
    { t: "p", text: "You can claim directly from the airline, usually through a form on its website. Describe the flight, the problem and the compensation you are asking for, and attach your documents. Keep copies of everything you send." },
    { t: "ul", items: [
      "If the airline refuses or does not reply, you can usually escalate to the national enforcement body in the country where the problem happened.",
      "Time limits to claim differ by country, and can be several years in some countries. Do not wait longer than necessary.",
      "Compensation claim services handle claims for you, typically in exchange for a share of the money you recover. Compare their fees with the effort of claiming yourself."
    ] },
    { t: "callout", title: "Check your claim", text: "TicketsJet has a page where you can check your flight against the compensation rules and start a claim through a partner service. The booking and any claim are handled by the partner, and a fee usually applies if the claim is successful." },

    { t: "h2", text: "Quick checklist", id: "checklist" },
    { t: "ol", items: [
      "Was my flight covered (departure from the EU, or arrival on an EU airline)?",
      "Did I arrive three hours or more late, or was the flight cancelled or overbooked?",
      "Did the airline give a reason, and was it an extraordinary circumstance?",
      "Do I have my booking, boarding pass and receipts?",
      "Have I sent a written claim to the airline, and kept a copy?"
    ] }
  ],
  faq: [
    { q: "How long must a flight be delayed to claim compensation?", a: "Generally you must arrive at your final destination three hours or more late. The delay is measured at arrival, not at departure. Whether you can claim also depends on the cause of the delay." },
    { q: "How much compensation can I get under EU261?", a: "The fixed amounts are 250, 400 or 600 euros per passenger, depending on the flight distance. The amounts can be reduced in some long-haul cases. Extra costs for care you had to pay for yourself may also be reimbursed." },
    { q: "Does bad weather mean no compensation?", a: "Severe weather is usually treated as an extraordinary circumstance, so fixed compensation is generally not owed. You are still entitled to care, and to a refund or rerouting if the flight is cancelled." },
    { q: "Can I claim if I booked through a travel agent?", a: "Yes. The rights are against the airline that operated the flight. You can claim directly from the airline even if you booked through an agency." },
    { q: "How long do I have to make a claim?", a: "It depends on the country where you claim. Time limits can range from about one year to several years. Make your claim as soon as you can, while the records are fresh." }
  ],
};
