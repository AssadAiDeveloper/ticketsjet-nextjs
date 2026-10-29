import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "The No-Surprises Car Rental Guide: Insurance, Fuel and Deposits Explained",
  description: "What full-to-full really means, when extra insurance is worth it, and how to avoid the counter upsell.",
  blocks: [
    { t: "p", text: "Fuel policy is the first thing to check. 'Full-to-full'. Pick up full, return full. Is almost always the fairest deal. 'Full-to-empty' policies charge premium fuel rates and refund nothing for what you don't use." },
    { t: "p", text: "On insurance: the basic rate usually includes Collision Damage Waiver with a high excess (deductible). Third-party excess insurance bought online in advance is typically far cheaper than the same cover sold at the rental counter." },
    { t: "p", text: "Hold a credit card in the main driver's name. Most rental desks require one for the security deposit; debit cards are frequently refused or trigger forced insurance purchases." },
    { t: "p", text: "Photograph the car. Every panel, wheels, windscreen and fuel gauge. At pickup and at return. It takes ninety seconds and it is the single best protection against damage disputes." }
  ],
};
