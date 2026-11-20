import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Denied Boarding Compensation: What To Do At The Gate",
  description: "If an airline refuses to let you board, you may have strong rights. Learn the difference between volunteering and being denied boarding, and what to collect at the gate.",
  blocks: [
    { t: "p", text: "Standing at the gate and hearing that there is no seat for you is a stressful moment. If it happens against your will, European passenger rules give you a clear set of rights. This guide explains what denied boarding means, what you can claim and how to act before you leave the airport." },
    { t: "p", text: "This is general information, not legal advice. Check the official sources at the end of the article for the exact position in your case." },

    { t: "h2", text: "1. What denied boarding means", id: "what-is-denied-boarding" },
    { t: "p", text: "Denied boarding happens when an airline refuses to carry a passenger who has a valid ticket and is ready to travel. Overbooking is a common reason. The key point is that the decision is against your will." },
    { t: "p", text: "The rules apply to flights departing from an EU airport and to flights arriving in the EU on an EU airline. If you are connecting, check which operating carrier is responsible for the segment where the problem happened." },

    { t: "h2", text: "2. Voluntary or involuntary", id: "voluntary-or-involuntary" },
    { t: "p", text: "If the gate staff ask for volunteers to give up a seat, you can agree and negotiate your own terms. Once you volunteer, you have made an agreement with the airline, so read any offer carefully before you sign." },
    { t: "p", text: "If you do not volunteer and the airline still refuses to board you, that is involuntary denied boarding. The compensation rights described below apply to that situation. Saying clearly that you wish to travel helps avoid confusion." },

    { t: "h2", text: "3. What you are owed", id: "what-you-are-owed" },
    { t: "p", text: "For involuntary denied boarding you can claim compensation, plus a choice between refund and rerouting, plus care while you wait. The compensation uses the same distance bands used for long delays." },
    { t: "table", head: ["Flight distance", "Possible compensation per passenger"], rows: [
      ["Up to 1,500 km", "250 EUR"],
      ["1,500 to 3,500 km", "400 EUR"],
      ["Longer intra EU flights", "400 EUR"],
      ["Over 3,500 km", "600 EUR"],
    ] },
    { t: "p", text: "Care means meals and refreshments, help with communication and hotel accommodation when an overnight stay is needed, within the limits of the rule. Keep receipts if you end up paying for anything yourself." },

    { t: "h2", text: "4. What to do at the gate", id: "at-the-gate" },
    { t: "ol", items: [
      "Say clearly that you want to travel and that you are not volunteering.",
      "Ask why you are being denied boarding and request the reason in writing.",
      "Ask for the written statement that airlines use for this situation.",
      "Tell the airline whether you want a refund or rerouting, and ask about care.",
      "Stay near the gate until the paperwork is done. Do not board a different flight without asking what happens to your claim.",
    ] },
    { t: "p", text: "If the gate is busy, ask to speak to a supervisor. Remain polite and keep your own notes. A short, factual record is more useful than a long argument." },

    { t: "h2", text: "5. Proof to collect", id: "proof-to-collect" },
    { t: "ul", items: [
      "Your booking confirmation and ticket.",
      "Your boarding pass if one was issued, and your passport or ID.",
      "The airline's written explanation and any denied boarding statement.",
      "Names of staff you spoke to and the time of the conversation.",
      "Receipts for meals, hotels or transport you had to arrange.",
    ] },
    { t: "p", text: "Photograph the gate screen if it shows your flight and the boarding status. Screens change quickly, so do this while you are still there." },

    { t: "h2", text: "6. After you arrive", id: "after-you-arrive" },
    { t: "p", text: "Send a claim to the operating airline with your documents and keep copies. If the reply is not useful, you can contact the national enforcement body of the country where the flight started." },
    { t: "p", text: "Our EU261 calculator helps you see which band applies. For related reading, see our guides to flight delay compensation and cancelled flight rights." },

    { t: "h2", text: "7. Common pitfalls to avoid", id: "pitfalls" },
    { t: "p", text: "The easiest mistake to make at the gate is accepting a voucher before you understand what it covers. A voucher for a future trip is not the same as a refund of the ticket you did not use. Read the conditions, ask about expiry dates and ask whether cash is still available. If you are unsure, say that you need a moment to think." },
    { t: "p", text: "Another pitfall is leaving the airport with only a verbal promise. Ask for the reference number, the written reason and the name of the person who assisted you. If the airline arranges a hotel or a later flight, take the confirmation with you. These details become useful when you submit the claim from home." },
    { t: "p", text: "Be careful with the word volunteer. If a member of staff asks whether anyone will give up a seat and you agree, you may be treated as a volunteer even if you did not fully understand the offer. A clear sentence such as I want to travel on this flight removes any doubt." },
    { t: "ul", items: [
      "Do not sign a document before reading it, even if the gate is busy.",
      "Do not hand over your boarding pass or ID unless staff need to scan it.",
      "Do not agree that the matter is closed until you have the written paperwork.",
      "Do not throw away the boarding pass if one was printed before the refusal.",
    ] },
    { t: "p", text: "None of this requires an argument. Calm, repeated requests for the standard documents are usually enough, and they leave you with a much clearer record." },

    { t: "ul", items: [
      "Write down the flight number, the scheduled departure time and the gate you were at.",
      "Keep a copy of the airline's message even if it is only a short notification in the app.",
      "Ask whether the reason for the refusal will be recorded on your booking.",
      "If you are travelling with someone, ask them to note the same events as a second record.",
      "Keep your phone charged so you can photograph screens and save messages while you are still at the airport.",
    ] },

    { t: "p", text: "Every airline handles the paperwork a little differently, but the underlying rights are the same. If anything in the response you receive is unclear, ask the airline to point to the rule it is applying. You can then compare that with the official guidance before deciding what to do next." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For the full rule and current guidance, use the EU Your Europe website and the national enforcement body for your country. Airline procedures can change, and the official source is the final reference." },
  ],
  faq: [
    { q: "What if I volunteered to give up my seat?", a: "Volunteers negotiate their own terms with the airline. If you did not volunteer and were refused against your will, the compensation rights described here apply." },
    { q: "Do I still get a new flight?", a: "Yes. You can choose between a refund and rerouting to your final destination, in addition to any compensation and care." },
    { q: "Do I need a written statement from the gate?", a: "It helps a lot. Ask the airline for its written explanation and keep your own notes and receipts as backup." },
  ],
};
