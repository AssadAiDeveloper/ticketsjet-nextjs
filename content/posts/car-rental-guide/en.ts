import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "The No-Surprises Car Rental Guide: Insurance, Fuel and Deposits Explained",
  description: "How car rental insurance, fuel policies, deposits and extra fees really work, and a simple checklist to avoid the surprises at the rental counter.",
  blocks: [
    { t: "p", text: "Most car rental problems do not come from the car. They come from the paperwork: an insurance upsell you did not expect, a fuel policy you did not read, or a deposit larger than you planned for. The good news is that nearly all of these surprises are predictable. Once you know where they hide, you can compare offers properly and walk up to the counter with confidence." },
    { t: "p", text: "Rules differ between countries and between rental companies, so use this guide as a map of what to check, and always read the terms in your own booking confirmation." },

    { t: "h2", text: "1. Understand what the headline price includes", id: "headline-price" },
    { t: "p", text: "The daily price you see in search results is the starting point, not the final cost. Before comparing two offers, check what each one includes. A cheaper offer that excludes things you need can cost more in the end." },
    { t: "ul", items: [
      "Mileage: is it unlimited, or capped per day or per rental?",
      "Basic insurance: what is covered, and what is your excess (the amount you pay if something goes wrong)?",
      "Taxes and airport fees: are they in the price or added later?",
      "Extra drivers, young or senior driver fees, and one-way fees.",
      "Cross-border travel: some companies charge extra or forbid taking the car to certain countries."
    ] },

    { t: "h2", text: "2. Insurance: what you actually need", id: "insurance" },
    { t: "p", text: "Insurance is where most of the confusion and most of the upselling happens. A typical rental already includes basic cover for damage to the car and theft, but with an excess. The excess can be high, sometimes hundreds or even over a thousand euros, and it is what you would pay out of pocket if the car were damaged or stolen." },
    { t: "table", head: ["Cover", "What it does", "What to check"], rows: [
      ["Collision damage waiver (CDW)", "Limits what you pay if the rental car is damaged, up to the excess", "The excess amount, and what is excluded"],
      ["Theft protection", "Limits what you pay if the car is stolen", "The excess, and any conditions such as locked doors"],
      ["Excess reduction (super cover)", "Lowers or removes the excess, sold by the rental company", "The daily price, which can be high at the counter"],
      ["Third-party excess insurance", "A separate policy that refunds the excess after you pay it", "You pay the company first and claim back later"],
      ["Credit card rental cover", "Some cards include rental insurance", "Which countries and car types are covered, and the conditions"]
    ] },
    { t: "p", text: "Common exclusions are worth knowing: tyres, glass, the underside of the car, the roof, and keys are often not covered by basic or even by extended cover. Check the policy wording if you want to be fully covered." },
    { t: "callout", title: "A simple way to decide", text: "Compare the price of the rental company's excess reduction with the excess itself. If the cover is expensive and the excess is small, you may not need it. If the excess is large and you would struggle to pay it, cover is worth considering, whether from the company, a third party or a card that includes it." },

    { t: "h2", text: "3. Fuel policies: choose full to full when you can", id: "fuel" },
    { t: "p", text: "The fuel policy decides how you pay for petrol or diesel. It is one of the easiest ways for a cheap rental to become expensive, so it is worth reading before you book." },
    { t: "table", head: ["Policy", "How it works", "Watch out for"], rows: [
      ["Full to full", "You receive a full tank and return it full", "Refuelling near the drop-off, and keeping the receipt"],
      ["Same to same", "You return the car with the same fuel level you received", "Photograph the fuel gauge at pick-up"],
      ["Full to empty (prepaid)", "You pay for a full tank upfront and return it empty", "Prepaid fuel is often priced above the pump, and unused fuel is usually not refunded"]
    ] },
    { t: "p", text: "Full to full is usually the fairest option because you only pay for the fuel you use, at the normal pump price. Look for a petrol station close to the return point, and keep the receipt as proof." },

    { t: "h2", text: "4. The deposit: plan for the hold on your card", id: "deposit" },
    { t: "p", text: "Most companies place a deposit on your card at pick-up. It is not a charge, but the money is held and cannot be used until it is released after you return the car." },
    { t: "ul", items: [
      "The deposit is often similar to the excess, and can be larger if you decline the company's insurance.",
      "Many companies require a credit card in the main driver's name. Debit cards are sometimes accepted, but often with limits or extra requirements.",
      "Make sure the card has enough available limit for the hold, on top of your normal travel spending.",
      "Ask when the hold will be released. It can take several days after return."
    ] },

    { t: "h2", text: "5. Documents and driver requirements", id: "documents" },
    { t: "p", text: "Have the right documents ready before you travel, because a missing item at the counter can mean you cannot take the car." },
    { t: "ul", items: [
      "A valid driving licence held for the minimum time the company requires.",
      "A passport or ID, and the credit card in the driver's name.",
      "An international driving permit if the country requires one for your licence type. Check this for your destination.",
      "Your booking confirmation, with the driver's name matching the licence."
    ] },
    { t: "p", text: "Age rules matter too. Drivers under a certain age usually pay a young driver fee, and some companies limit the car categories available to them." },

    { t: "h2", text: "6. Extra fees to watch for", id: "extra-fees" },
    { t: "ul", items: [
      "Airport or railway station surcharges.",
      "Out-of-hours pick-up or drop-off fees.",
      "Additional driver fees.",
      "One-way fees when you return the car to a different location.",
      "Cross-border fees, and rules about taking the car on ferries.",
      "Child seats, GPS units and winter equipment, often priced per day.",
      "Tolls, vignettes and low-emission zone charges, which you are usually responsible for.",
      "Administration fees on top of fines, if you receive a traffic fine after your rental."
    ] },
    { t: "p", text: "An extra of a few euros per day looks small, but over a week it can add up to more than the price difference between two offers." },

    { t: "h2", text: "7. Pick-up: inspect the car before you drive away", id: "pickup" },
    { t: "p", text: "The few minutes you spend at pick-up can save you a long dispute later. Do not rely on a quick glance at the paper form." },
    { t: "ol", items: [
      "Walk around the car and photograph or film every side, including the roof, wheels and windscreen.",
      "Make sure every existing scratch, dent or chip is written on the damage form before you sign.",
      "Photograph the fuel gauge and the mileage.",
      "Check that the tyres, lights, wipers and air conditioning work, and that a spare wheel or repair kit is present.",
      "Ask which fuel the car takes. Putting the wrong fuel in can be very expensive.",
      "Keep a copy of the rental agreement and the emergency contact number."
    ] },

    { t: "h2", text: "8. Return: finish cleanly", id: "return" },
    { t: "ul", items: [
      "Return the car on time. Late returns are often charged by the hour or as a full extra day.",
      "Refuel according to your policy, and keep the receipt.",
      "Photograph the car again, with the fuel gauge and mileage, in the return bay.",
      "Ask a staff member to check the car and confirm in writing that it is returned without damage.",
      "Keep all documents until the deposit is released and no further charges appear on your statement."
    ] },

    { t: "h2", text: "Quick checklist before you book", id: "checklist" },
    { t: "ol", items: [
      "Does the offer include the mileage and insurance I need?",
      "What is the excess, and how will I cover it?",
      "Is the fuel policy full to full?",
      "Do I have a suitable card for the deposit, in the driver's name?",
      "Do I have the right licence and, if needed, an international driving permit?",
      "Are there fees for extra drivers, young drivers, one-way returns or crossing borders?",
      "Is free cancellation available if my plans change?"
    ] },
    { t: "p", text: "TicketsJet helps you compare car rental offers from several providers in one place, so you can check the conditions side by side before you book. The booking itself is completed directly with the rental provider, at their price." }
  ],
  faq: [
    { q: "Do I need extra car rental insurance?", a: "It depends on your excess and your comfort with risk. Basic cover usually comes with a high excess. If you could not easily pay that amount, consider excess reduction from the rental company, a separate excess policy, or a credit card that includes rental cover. Read the exclusions first." },
    { q: "What is the best fuel policy?", a: "Full to full is usually the fairest, because you pay only for the fuel you use at the normal pump price. Prepaid full to empty options are often more expensive, and unused fuel is generally not refunded." },
    { q: "Can I rent a car with a debit card?", a: "Sometimes, but many companies require a credit card in the main driver's name for the deposit, or place extra conditions on debit cards. Check the terms of your booking before you travel." },
    { q: "How long does it take to get the deposit back?", a: "It varies by company and bank. The hold is often released within a few days after the car is returned, but it can take longer. Ask at the counter and keep your return documents." },
    { q: "What should I do if I find damage after I have already left the counter?", a: "Go back and have it written on the damage form straight away if you can, or contact the company and send time-stamped photos immediately. Doing this at pick-up is much better, so inspect the car before you drive away." }
  ],
};
