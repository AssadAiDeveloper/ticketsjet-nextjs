import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Cabin Baggage Size Rules: How To Avoid Fees",
  description: "Cabin baggage rules differ by airline and fare. Learn how to read the conditions, measure and weigh at home, and handle a gate charge calmly.",
  blocks: [
    { t: "p", text: "Few travel surprises are as annoying as a bag that was fine on the outbound flight and suddenly costs money on the way back. Cabin baggage rules are not universal. They depend on the airline, the fare and sometimes the route. This guide shows how to check before you pack and what to do if you are asked to pay at the gate." },
    { t: "p", text: "We deliberately do not list dimensions for particular airlines. They change, and a number copied from an old article can cost you more than checking the current conditions." },

    { t: "h2", text: "1. Why the rules differ", id: "why-rules-differ" },
    { t: "p", text: "Each airline decides what it includes in a ticket. A full fare may include a larger cabin bag and a personal item, while a basic fare may include only one small item. Some carriers measure, some weigh, and some check both. The same airline can apply different rules to different fares." },
    { t: "p", text: "Aircraft type and how full the flight is can also matter at the gate. A bag that fits in an overhead locker on a quiet flight may be challenged when the cabin is busy. The written rule is your best guide, even when the practical enforcement varies." },

    { t: "h2", text: "2. Read the fare conditions", id: "read-the-fare-conditions" },
    { t: "p", text: "Before you pay, open the fare details for the exact ticket you are buying. Look for the number of cabin items allowed, their maximum size and weight, and whether a personal item is counted separately. This information is usually in the fare comparison table or the conditions of carriage." },
    { t: "ul", items: [
      "Check whether the allowance is included or sold as an extra.",
      "Check if the same rules apply to the return flight.",
      "Look for the wording about items that must fit under the seat in front of you.",
      "If you are connecting, check the rules of every operating airline on the journey.",
    ] },
    { t: "p", text: "If the conditions are unclear, contact the airline before you travel and save the answer. A screenshot of a clear reply is useful if there is a disagreement later." },

    { t: "h2", text: "3. Measure and weigh at home", id: "measure-and-weigh" },
    { t: "p", text: "A bag that looks small can still be too heavy. Use a tape measure and a set of scales at home, and include wheels, handles and pockets in the measurement. Soft bags can be compressed, but a rigid case cannot." },
    { t: "ol", items: [
      "Measure height, width and depth with the bag fully packed.",
      "Weigh the bag after packing, not when it is empty.",
      "Leave a small margin rather than aiming for the exact limit.",
      "Repeat the check before the return flight, especially after shopping.",
    ] },
    { t: "p", text: "If the bag is slightly over the limit, move a few heavy items into your personal item or into checked baggage. Doing this at home is free. Doing it at the airport is stressful and may not be possible." },

    { t: "h2", text: "4. Personal item versus cabin bag", id: "personal-item-vs-cabin-bag" },
    { t: "p", text: "Many airlines distinguish between a small personal item that goes under the seat and a larger cabin bag for the overhead locker. The personal item is often included in every fare, while the larger bag may not be. Keep the two separate so you can show exactly what each one is." },
    { t: "ul", items: [
      "A handbag, small backpack or laptop bag is usually treated as a personal item.",
      "A wheeled suitcase is usually treated as a cabin bag, even when it is small.",
      "Do not assume that a child's bag is exempt, since rules differ.",
      "Check whether the airline counts a duty free bag as an extra item.",
    ] },

    { t: "h2", text: "5. If you are told to pay at the gate", id: "at-the-gate" },
    { t: "p", text: "Low cost carriers often charge at the gate when a bag is oversize or when an extra item was not bought in advance. Stay calm and ask the staff to explain which rule applies. If you believe the bag meets the published conditions, ask them to show you the measurement." },
    { t: "ul", items: [
      "Ask whether you can repack or move items into another bag.",
      "Ask about the price and the payment options before you agree.",
      "Keep the receipt if you do pay, and note the reason given.",
      "If you think the charge was wrong, raise it with the airline after the flight with your measurements and photos.",
    ] },
    { t: "p", text: "Arguing at the gate rarely helps. A short, factual conversation gives you a better chance of a practical solution and leaves you with a clear record if you want to challenge the charge." },

    { t: "h2", text: "6. Packing tips that help", id: "packing-tips" },
    { t: "ul", items: [
      "Choose the lightest bag that still holds what you need.",
      "Wear bulky clothing rather than packing it.",
      "Use packing cubes to keep items compact and easy to rearrange.",
      "Keep liquids and documents in the personal item so they stay within reach.",
      "Carry a small foldable bag in case you need to separate items quickly.",
    ] },
    { t: "p", text: "If your bag is damaged during the journey, our guide on lost and delayed luggage explains how to report it. Our guide to the first hour after landing has ideas for what to do once you arrive." },

    { t: "p", text: "The safest approach is simple: check the exact fare you bought, measure your bag at home and keep a small margin. Rules can change between the outbound and return flight, especially with basic fares, so repeat the check before you leave for the airport." },
    { t: "ul", items: [
      "Take a photo of your packed bag and the measurements for your own records.",
      "Keep the airline's fare conditions saved on your phone for easy reference.",
    ] },

    { t: "p", text: "Most baggage charges are avoidable with a few minutes of preparation. Check the rules that belong to your ticket, not to a different fare, and keep the answer with your travel documents." },

    { t: "h2", text: "Check the official source", id: "official-source" },
    { t: "p", text: "For exact dimensions, weights and fees, use the airline's fare conditions and conditions of carriage for your specific booking. We have kept this guide general on purpose, because those details change." },
  ],
  faq: [
    { q: "Are cabin bag sizes the same for every airline?", a: "No. They vary by airline, by fare and sometimes by route. Check the conditions for the exact ticket you are buying." },
    { q: "Can I avoid a gate charge by repacking?", a: "Sometimes. If an item can be moved into your personal item or a checked bag, staff may allow it. Ask before paying." },
    { q: "Should I trust a size listed on an old website?", a: "No. Rules change. Check the airline's current fare conditions and save a copy for your trip." },
  ],
};
