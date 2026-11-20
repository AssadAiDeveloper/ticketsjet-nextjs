import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Lost Luggage What To Do: A Step By Step Guide",
  description: "If your bag is late, damaged or missing, the first hours matter. Learn about the PIR, the written complaint deadlines and the receipts to keep.",
  blocks: [
    { t: "p", text: "The belt has stopped and your bag is not on it. What you do in the next few minutes makes a real difference. This guide explains how to report the problem, which deadlines apply to written complaints and how to keep your claim in good shape." },
    { t: "p", text: "This is general information, not legal advice. Rules and airline procedures can differ, so check the official source for your journey." },

    { t: "h2", text: "1. Before you leave the baggage hall", id: "before-you-leave-the-hall" },
    { t: "p", text: "Go straight to the airline's baggage service desk as soon as you notice a problem. Do it before you pass through customs or leave the baggage area. Staff can check the bag tags and start a trace immediately." },
    { t: "p", text: "Tell them whether the bag has not arrived, has arrived damaged, or has arrived late after a delay. Each situation is handled slightly differently, and the first record sets the tone for everything that follows." },

    { t: "h2", text: "2. The Property Irregularity Report", id: "the-pir" },
    { t: "p", text: "Ask the airline to issue a Property Irregularity Report, often shortened to PIR. This is the reference number for your case. Keep it safe, because the airline will use it when you ask for updates." },
    { t: "ul", items: [
      "Your name and contact details, including a phone number you can answer.",
      "Your flight number and the date of travel.",
      "The bag tag number from your check-in receipt.",
      "A short description of the bag and its contents.",
      "Your delivery address if the airline needs to send the bag later.",
    ] },
    { t: "p", text: "Take a photo of the report and keep the paper copy. If the bag is damaged, photograph the damage before anyone moves it." },

    { t: "h2", text: "3. Deadlines for written complaints", id: "deadlines" },
    { t: "p", text: "Under the Montreal Convention, written complaints have time limits. For damaged baggage the deadline is seven days from delivery. For delayed baggage the deadline is twenty one days from the day the bag is delivered to you." },
    { t: "table", head: ["Situation", "Written complaint deadline"], rows: [
      ["Damaged baggage", "7 days from delivery"],
      ["Delayed baggage", "21 days from delivery"],
    ] },
    { t: "p", text: "These are general deadlines for baggage claims under that convention. Airline procedures for making the complaint vary, so ask the airline how it wants the complaint submitted and keep proof that you sent it." },

    { t: "h2", text: "4. What to keep", id: "what-to-keep" },
    { t: "ul", items: [
      "Your PIR reference and all messages from the airline.",
      "Your ticket, boarding pass and bag tag receipt.",
      "Photos of the bag, the tag and any damage.",
      "A list of the contents, especially high value items.",
      "Receipts for anything you buy while you wait.",
    ] },
    { t: "p", text: "Write down the names of the staff you spoke to and the times. A short timeline is useful if the case is passed to another department." },

    { t: "h2", text: "5. Essentials and receipts", id: "essentials-and-receipts" },
    { t: "p", text: "If your bag is delayed, you will probably need to buy basic items such as toiletries and a change of clothes. Keep every receipt. Ask the airline what it can cover and whether there is a limit before you spend more than necessary." },
    { t: "p", text: "Compensation limits exist for baggage claims and they differ by carrier and by route. Check the airline's conditions of carriage for the exact limit that applies. Do not assume that every purchase will be reimbursed." },

    { t: "h2", text: "6. Escalating the case", id: "escalating" },
    { t: "ol", items: [
      "Use the PIR number to ask for an update at regular intervals.",
      "Send a written complaint within the relevant deadline.",
      "Keep copies of every message and every reply.",
      "If the airline does not resolve it, ask which complaints body or enforcement body handles your case.",
    ] },
    { t: "p", text: "If you are arriving in a new city after a late flight, our guide to the first hour after landing can help you plan the onward journey. Our guide to cabin baggage rules explains how to reduce the chance of a gate bag problem on the next trip." },

    { t: "h2", text: "7. Travel insurance note", id: "insurance-note" },
    { t: "p", text: "Travel insurance may help in some situations, but policies differ widely. Check your own policy for baggage cover, excess amounts and reporting requirements before you rely on it. We do not sell insurance and this is not a recommendation for a particular provider." },

    { t: "h2", text: "8. A few practical details", id: "practical-details" },
    { t: "p", text: "If the airline delivers the bag to your accommodation, check it carefully before signing anything. Note the condition of the bag and the time of delivery. If the bag is damaged on arrival, photograph it straight away and contact the baggage desk again. A delivery receipt that says the bag arrived in good condition can make a later damage claim harder." },
    { t: "p", text: "Keep essential items with you whenever you fly with checked baggage. Medicine, travel documents, keys and a basic change of clothing are worth carrying in your cabin bag. This does not remove the airline's responsibilities, but it makes a delayed bag far less disruptive while you wait." },
    { t: "p", text: "When you contact the airline, use the PIR number in the subject line of emails and give it at the start of phone calls. Staff can find the case faster, and you reduce the chance that a message ends up in a different queue. Keep a simple folder, either on your phone or on paper, with every message in date order." },
    { t: "ul", items: [
      "Check the bag tag number on your receipt before you leave the check-in desk.",
      "Take a photo of the bag before the flight so you can show its previous condition.",
      "Give the airline a phone number that will work at your destination.",
      "Ask for an estimated delivery time and write down who gave it.",
    ] },
    { t: "p", text: "None of these steps guarantee a particular outcome. They do make it much easier to describe what happened with facts rather than memory." },

    { t: "ul", items: [
      "Keep the PIR reference somewhere you can find it quickly, even offline.",
      "Save the airline's messages instead of relying only on the phone call.",
      "Check whether your accommodation can accept a delivery when you are out.",
      "Write down the date you send the written complaint and keep the delivery confirmation.",
    ] },

    { t: "p", text: "A baggage claim is mostly a matter of clear records and steady follow up. Report the problem at the airport, keep the reference number, send the written complaint on time and keep your receipts. If you do those four things, you will be in a much stronger position whatever the airline decides." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For the exact rules and current procedures, check the airline's conditions of carriage and the official guidance for your route. Deadlines and limits can vary, so the official source is always the final reference." },
  ],
  faq: [
    { q: "What is a PIR?", a: "It is a Property Irregularity Report, the reference the airline gives you when you report a baggage problem. Keep the number for every later contact." },
    { q: "When must I complain in writing?", a: "Under the Montreal Convention the general deadlines are seven days for damaged baggage and twenty one days for delayed baggage, both measured from delivery." },
    { q: "Will the airline pay for everything I buy?", a: "Compensation limits exist and vary by airline and route. Ask the airline about its limits and keep your receipts." },
  ],
};
