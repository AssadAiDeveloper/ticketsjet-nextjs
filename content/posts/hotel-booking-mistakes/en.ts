import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 Hotel Booking Mistakes That Cost You Money",
  description: "Free cancellation traps, resort fees, and the map trick most travellers miss. Here's how to book smarter stays.",
  blocks: [
    { t: "p", text: "Mistake one: booking on the first price you see. Hotel rates vary widely between platforms for the exact same room. A comparison search across providers routinely finds differences of 10–25% per night." },
    { t: "p", text: "Mistake two: ignoring the total price. Resort fees, city taxes and cleaning charges can add 15–30% to the headline rate. Always compare the final checkout price, not the nightly teaser." },
    { t: "p", text: "Mistake three: booking non-refundable too early. If your plans have any chance of changing, a free-cancellation rate a few euros higher is almost always the better bet. You can rebook if prices drop." },
    { t: "p", text: "Use the map view. Hotels one metro stop outside the tourist core are often 30–40% cheaper for an identical standard of room, and the commute is usually minutes." }
  ],
};
