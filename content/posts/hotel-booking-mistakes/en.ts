import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "7 Hotel Booking Mistakes That Cost You Money (and How to Avoid Them)",
  description: "Hidden fees, misread cancellation rules, a bad location and more: seven common hotel booking mistakes and the simple checks that prevent them.",
  blocks: [
    { t: "p", text: "Hotel prices look simple until you reach the final page. A low nightly rate can grow with taxes and fees, a free cancellation badge can expire sooner than you think, and a great score can hide a room that is nothing like the photos. None of this is rocket science, but it is easy to miss when you are comparing many options on a small screen." },
    { t: "p", text: "These are seven mistakes travellers make again and again, with a quick fix for each. They take only a few minutes to check, and they can save real money and stress." },

    { t: "h2", text: "1. Looking at the nightly rate instead of the total price", id: "total-price" },
    { t: "p", text: "The price shown in large type is often the room rate only. Taxes, city tax, cleaning fees and resort fees can be added later, and in some places fees are paid at the property rather than at booking. Two hotels with the same nightly rate can have very different totals." },
    { t: "ul", items: [
      "Look for a total price for your whole stay before comparing.",
      "Read the price breakdown for taxes, service charges and cleaning fees.",
      "Check whether a city or tourist tax is paid at the property, and how much it is per person per night.",
      "In some destinations, resort or facility fees apply even if you do not use the facilities. Look for them in the property details."
    ] },

    { t: "h2", text: "2. Misreading free cancellation", id: "cancellation" },
    { t: "p", text: "Free cancellation is valuable, but it comes with a deadline. Many travellers see the badge and assume they can cancel at any time. In reality the free period often ends a day or more before arrival, and after that you may lose the first night or the full amount." },
    { t: "ul", items: [
      "Read the exact date and time until which cancellation is free, and note the time zone of the property.",
      "Compare the refundable rate with the non-refundable rate. A non-refundable rate is cheaper because you take on the risk.",
      "If your plans may change, a slightly higher refundable rate can be the cheaper choice overall.",
      "Put the cancellation deadline in your calendar so you do not miss it."
    ] },

    { t: "h2", text: "3. Booking without checking the location on a map", id: "location" },
    { t: "p", text: "A cheap hotel that is far from where you want to be often costs more in transport and time. The name of a neighbourhood in the listing can also be generous, so check the real position." },
    { t: "ul", items: [
      "Open the hotel on a map and look at the distance to the places you will visit most.",
      "Check the walking distance to the nearest metro or train station, and how late it runs.",
      "Look at the surroundings. A quiet street and a street above a busy bar are very different at night.",
      "If you arrive late or travel with luggage, factor in the transfer from the airport or station."
    ] },
    { t: "callout", title: "The map trick", text: "Instead of searching only by city, view all results on the map and compare price and position together. Often a hotel a few minutes beyond the centre is much cheaper and just as convenient." },

    { t: "h2", text: "4. Trusting the score and ignoring recent reviews", id: "reviews" },
    { t: "p", text: "A score is an average over a long time. The hotel may have been renovated, or may have declined, since many of the reviews were written. Read the newest reviews, not just the number." },
    { t: "ul", items: [
      "Sort reviews by newest, and read at least a handful from the last few months.",
      "Read the low and middle ratings. They show what actually goes wrong, such as noise or cleanliness.",
      "Filter by traveller type. A hotel loved by couples might not suit families or business travellers.",
      "Look for patterns. One complaint is an opinion, five similar complaints are a problem."
    ] },

    { t: "h2", text: "5. Skipping the details of the room", id: "room-details" },
    { t: "p", text: "The photo on the listing is usually of the best room. Check what you are actually booking: the room type, bed setup, size and floor, and what is and is not included." },
    { t: "ul", items: [
      "Check the bed configuration. Two single beds and one double bed are not the same thing.",
      "Look at the room size in square metres, especially in big cities where rooms can be small.",
      "Check if breakfast, Wi-Fi, air conditioning and parking are included, and whether they cost extra.",
      "If quiet matters, read about the street noise and consider asking for a higher floor."
    ] },

    { t: "h2", text: "6. Overlooking payment and currency details", id: "payment" },
    { t: "p", text: "How and when you pay can change the real cost. Some bookings are paid at the property, others in advance. Paying in a different currency from your card can add conversion costs." },
    { t: "ul", items: [
      "Check whether you pay now, later or at the property, and which payment methods are accepted.",
      "If the price is in a foreign currency, check your bank's exchange rate and any card fees.",
      "Some properties take a deposit or a card hold at check-in. Make sure your card has room for it.",
      "Keep your booking confirmation and the payment terms in case you need to dispute a charge."
    ] },

    { t: "h2", text: "7. Forgetting the practical arrival details", id: "arrival" },
    { t: "p", text: "A cheap room is not a good deal if you cannot get in when you arrive. Many hotels have fixed check-in hours, and some small properties have no night reception." },
    { t: "ul", items: [
      "Check the check-in and check-out times, and whether the front desk is open when you arrive.",
      "If you arrive late, tell the property in advance and keep their contact number.",
      "Ask whether luggage storage is available if your flight is before check-in or after check-out.",
      "Check the access instructions for self check-in properties before you travel."
    ] },

    { t: "h2", text: "A quick checklist before you book", id: "checklist" },
    { t: "ol", items: [
      "Do I know the total price including taxes and fees?",
      "Until when is cancellation free, and in which time zone?",
      "Is the hotel on the map where I want to be, with good transport nearby?",
      "Do the recent reviews match the score and the photos?",
      "Is the room and bed type right for my group?",
      "Do I know how and when I pay, and in which currency?",
      "Can I check in when I arrive?"
    ] },
    { t: "p", text: "TicketsJet's Stays search takes you to Booking.com, where you can compare hotels on a map, filter by price and rating, and read reviews. The booking itself is completed on Booking.com, at their price and under their cancellation terms." }
  ],
  faq: [
    { q: "What is the cheapest day to book a hotel?", a: "There is no single day that is always cheapest. Prices depend on demand for your dates, the season and local events. Comparing a few dates, and booking a refundable rate early so you can rebook if the price falls, is a more reliable approach." },
    { q: "Is it better to book a refundable or a non-refundable rate?", a: "Non-refundable rates are cheaper but carry the risk. If your plans are certain, they can save money. If your plans may change, a refundable rate is often the better value overall." },
    { q: "Why is the price different when I get to the booking page?", a: "Taxes, fees and options can be added at the final step, and prices can change with demand. Always check the total price for your whole stay before you confirm." },
    { q: "Do I pay a city tax in addition to the room price?", a: "In many destinations, yes. Some cities charge a tourist or city tax per person per night, sometimes collected at the property. It is usually listed in the price details or the property policies." },
    { q: "What should I do if the hotel is not as described?", a: "Raise it politely with the front desk straight away so they can fix it or move you, and take photos. If it is not resolved, contact the booking platform with your evidence as soon as possible." }
  ],
};
