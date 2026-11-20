import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Cancelled Flight Rights Europe: What You Can Choose",
  description: "When a flight is cancelled in Europe you have choices. Learn about refunds, rerouting, the fourteen day notice rule and the care the airline must provide.",
  blocks: [
    { t: "p", text: "A cancellation message just before a trip can feel like the end of the plan. In Europe it usually is not, because passengers have a clear set of rights. This guide sets out the choices you have, when a payment can be added and how to document everything." },
    { t: "p", text: "This is general information, not legal advice. Individual situations differ, so check the official sources at the end of the article." },

    { t: "h2", text: "1. Your two choices", id: "two-choices" },
    { t: "p", text: "When an airline cancels a flight, you can choose between a full refund of your ticket and rerouting to your final destination. The choice is yours, not the airline's, provided the cancellation is handled under the European rule." },
    { t: "p", text: "A refund covers the ticket price. Rerouting means the airline gets you to your destination under comparable conditions, which may mean a different flight or a later date. If you choose a refund, ask how long the payment takes and whether it goes back to the original payment method." },
    { t: "p", text: "When the airline offers rerouting, check that it actually suits your trip. A connection that arrives a day late may not be useful for a wedding or a work commitment. Say so clearly and ask for alternatives." },

    { t: "h2", text: "2. When compensation may also apply", id: "when-compensation-applies" },
    { t: "p", text: "On top of the refund or rerouting, you may be entitled to a compensation payment. The usual distance bands apply, from 250 EUR for short flights up to 600 EUR for the longest flights. The amount depends on the flight, not on the price you paid." },
    { t: "p", text: "Compensation is not automatic in every cancellation. Two important exceptions are described below. If the airline refuses, ask for the reason in writing so you can check it with an official source." },

    { t: "h2", text: "3. The fourteen day rule", id: "fourteen-day-rule" },
    { t: "p", text: "If the airline tells you about the cancellation at least fourteen days before departure, it generally does not have to pay compensation. The refund or rerouting choice still stands, and care duties still apply where relevant." },
    { t: "p", text: "This is why the date of the message matters. Keep the email, text or app notification with its timestamp. A short notice period is one of the main reasons a compensation claim can succeed." },
    { t: "p", text: "The other common exception is extraordinary circumstances that could not have been avoided, even with all reasonable measures. We do not make specific claims about which events qualify. The airline must explain its reasoning, and national enforcement bodies can review it." },

    { t: "h2", text: "4. What the airline must provide", id: "care-and-help" },
    { t: "p", text: "While you are waiting for a new flight or a refund, the airline has duties of care. These apply in addition to your choice of refund or rerouting." },
    { t: "ul", items: [
      "Meals and refreshments while you wait, within the limits of the rule.",
      "Help with communication, such as messages to family or work.",
      "Hotel accommodation if an overnight stay is needed, within the limits of the rule.",
      "Transport between the airport and the accommodation when a hotel is arranged.",
    ] },
    { t: "p", text: "If you are offered a voucher instead of cash, read the terms carefully. A voucher is not the same as a refund, and you can ask for the money back instead." },

    { t: "h2", text: "5. What to write down", id: "what-to-write-down" },
    { t: "p", text: "A good record makes any follow up much easier. Capture these details as soon as you can." },
    { t: "ul", items: [
      "The time and date when you learned about the cancellation.",
      "The exact wording of the airline's message and the reason it gave.",
      "Your booking reference, flight number and scheduled route.",
      "Any alternative flights the airline offered, with their arrival times.",
      "Receipts for costs you had to cover yourself.",
    ] },

    { t: "h2", text: "6. How to follow up", id: "how-to-follow-up" },
    { t: "p", text: "Start with the operating airline. Tell it which of the two choices you want, and keep the request short and clear. If the airline does not reply usefully, you can contact the national enforcement body of the country involved." },
    { t: "p", text: "Our EU261 calculator can help you see which distance band applies. For related reading, see our guide to flight delay compensation and our guide to denied boarding rights." },

    { t: "h2", text: "7. Making the best of a disrupted trip", id: "plan-b" },
    { t: "p", text: "Once you have made your choice, ask the airline to confirm it in writing. A refund should be processed, and rerouting should come with a new booking reference or a clear confirmation in the airline app. If you are connecting to another flight or a pre booked transfer, tell the airline that the arrival time matters to you." },
    { t: "p", text: "Keep your original ticket details even after you accept a new flight. Some airlines need the original booking reference to process a refund, and you may be asked for it again when you claim compensation. It also helps to save the cancellation message, because it shows exactly when you were informed." },
    { t: "ul", items: [
      "Ask whether the new flight leaves from the same terminal and whether your bags will be checked through.",
      "Check if your travel insurance or card cover has its own rules for cancelled trips.",
      "If you accept a hotel, ask who pays for it and keep the confirmations.",
      "Write down the name of the person who helped you and the time you spoke.",
    ] },
    { t: "p", text: "None of these steps change your basic rights. They simply make it easier to show what happened if the airline's first answer is incomplete." },

    { t: "ul", items: [
      "Ask for the exact date and time the cancellation was announced.",
      "Ask whether the refund goes back to the original payment method and roughly how long it takes.",
      "Ask for a written confirmation of the option you chose, even if the conversation felt clear.",
    ] },

    { t: "p", text: "A cancellation creates several small decisions at once, and it is easy to forget one of them. Work through the list slowly, keep copies of everything and give yourself time to check the details. The airline's own customer service pages and the official guidance can confirm the steps that apply to your particular booking." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For the exact wording of the rule and the latest guidance, use the EU Your Europe website and the national enforcement body in your country. Procedures and airline policies can change, so the official source is the final reference." },
  ],
  faq: [
    { q: "Can I choose a refund instead of a new flight?", a: "Yes. Under the European rule you can choose between a full refund and rerouting to your final destination. Tell the airline which option you want." },
    { q: "Do I get compensation if I was told early?", a: "If the airline informed you at least fourteen days before departure, compensation is generally not due. Your refund or rerouting rights remain." },
    { q: "Does care apply when the cancellation is extraordinary?", a: "Duties of care such as meals and, where needed, accommodation apply while you wait. Ask the airline for the current arrangements." },
  ],
};
