import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "Amsterdam Schiphol Airport Guide: Getting There, Getting Through and Getting Around",
  description: "A practical guide to Amsterdam Schiphol (AMS): how to get to the airport, how long to allow, how security and passport control work, and tips for connections and arrivals.",
  blocks: [
    { t: "p", text: "Amsterdam Airport Schiphol (AMS) is one of the busiest airports in Europe and a major connection hub. It is compact and easy to navigate once you know the layout, but it can be busy, and a few small decisions, like when you arrive and where you queue, make a big difference to your day." },
    { t: "p", text: "Airports change their procedures, opening hours and facilities from time to time. Use this guide to know what to look for, and check the official Schiphol website and your airline's instructions for current details before you travel." },

    { t: "h2", text: "1. Understand the layout", id: "layout" },
    { t: "p", text: "Schiphol is organised as a single terminal building with a shared arrivals area and several departure halls. Departures and arrivals are connected, and you can walk between most areas." },
    { t: "ul", items: [
      "Check your airline and flight on your booking or the airline app to see where to check in.",
      "Schiphol Plaza, in front of the main arrivals area, has shops, restaurants and the train station underneath.",
      "Gates are grouped in piers. Some are a long walk from the central area, so allow time to reach yours."
    ] },

    { t: "h2", text: "2. How to get to Schiphol", id: "getting-there" },
    { t: "table", head: ["Option", "Good for", "Things to know"], rows: [
      ["Train", "Most travellers, from Amsterdam and across the Netherlands", "The station is directly under the terminal. Check the timetable for your route and buy a ticket at a machine or in the NS app."],
      ["Bus", "Some city and regional connections", "Several lines serve the airport, including services to central Amsterdam. Check routes and times."],
      ["Taxi or ride-hailing", "Heavy luggage, late nights, groups", "Usually the most expensive option. Check the price method before you ride."],
      ["Car", "Travellers from areas without a good rail link", "Parking costs vary a lot by product and booking time. Book in advance if you plan to park."]
    ] },
    { t: "p", text: "For most travellers from Amsterdam, the train is the fastest and simplest way to reach the airport, as it avoids traffic and drops you at the terminal." },

    { t: "h2", text: "3. How early should you arrive?", id: "how-early" },
    { t: "p", text: "Follow your airline's recommended check-in time first. As a general guide, many travellers allow around two hours before a flight within Europe, and around three hours before an intercontinental flight, especially at busy times." },
    { t: "ul", items: [
      "Security queues can be long at peak times, such as early mornings, Friday afternoons and holiday periods.",
      "Allow extra time if you need to drop off checked bags, or have special assistance needs.",
      "If you are flying outside the Schengen area, remember that you also need time for passport control.",
      "Use online check-in and your airline's app to save time, and check whether a bag drop-off is available."
    ] },

    { t: "h2", text: "4. Security and passport control", id: "security" },
    { t: "p", text: "After check-in, everyone goes through security screening. Rules for liquids, electronics and other items can change, so check the current rules on the airport and airline websites." },
    { t: "ul", items: [
      "Have your boarding pass ready, and take out electronics or liquids if the current rules ask for it.",
      "Flights to destinations outside the Schengen area also include passport control, which can take extra time.",
      "Check whether your passport or ID is valid for your destination, and whether you need a visa or an entry authorisation.",
      "Keep time for a walk to your gate. Gate numbers are often shown on the boards later than you expect, and walking distances can be long."
    ] },

    { t: "h2", text: "5. Arriving at Schiphol", id: "arriving" },
    { t: "ol", items: [
      "Follow the signs to passport control if you arrive from outside the Schengen area. Travellers from within Schengen go straight towards baggage reclaim.",
      "Collect your bags at baggage reclaim. The belt number is shown on the screens.",
      "Go through customs. Use the correct lane for goods to declare or nothing to declare.",
      "Exit to the arrivals hall and Schiphol Plaza, where you can find the train station, buses, taxis and information desks."
    ] },
    { t: "p", text: "If you arrive late at night in a new country, check how you will get to your accommodation before you land. A booked transfer can save time and stress after a long flight." },

    { t: "h2", text: "6. Connecting flights at Schiphol", id: "connections" },
    { t: "p", text: "Schiphol is a popular connecting hub. A connection can be quick and easy, or stressful, depending on the time you have." },
    { t: "ul", items: [
      "If your journey is on one ticket, the airline is responsible for rebooking you if your first flight is late and you miss the connection.",
      "On separate tickets, you carry the risk yourself, and you may need to collect and re-check your bags. Allow plenty of time.",
      "Check whether you need to pass through security or passport control again between flights. This depends on where you come from and where you are going.",
      "Look at the walking distance between your arrival and departure gates, which can be considerable."
    ] },

    { t: "h2", text: "7. Useful tips for a smoother day", id: "tips" },
    { t: "ul", items: [
      "Download the airline and airport apps for gate and delay updates.",
      "Pack liquids and electronics where you can reach them quickly.",
      "Bring a refillable water bottle, and fill it after security.",
      "Look for charging points and quiet areas if you have a long wait.",
      "Know where the airport information desks are, in case plans change."
    ] },
    { t: "callout", title: "If your flight is delayed or cancelled", text: "You may be entitled to care, a refund or rerouting, and sometimes compensation, under EU rules. Read our guide to flight delay compensation, and keep your boarding pass and any messages from the airline." },

    { t: "h2", text: "Quick checklist for departure day", id: "checklist" },
    { t: "ol", items: [
      "Do I know my airline's check-in and bag drop-off times?",
      "Have I planned how I get to Schiphol, with time to spare?",
      "Is my passport or ID valid for my destination?",
      "Are liquids and electronics easy to reach for security?",
      "Do I have the airline app and my boarding pass ready?",
      "Do I know how I will get to my accommodation on arrival?"
    ] },
    { t: "p", text: "TicketsJet helps you compare flights from Amsterdam and many other airports, so you can find a price that suits your trip. The booking itself is completed directly with the airline or travel agent." }
  ],
  faq: [
    { q: "How early should I arrive at Schiphol?", a: "Follow your airline's recommendation. Many travellers allow about two hours for flights within Europe and about three hours for intercontinental flights, and more at busy times such as early mornings, Friday afternoons and holidays." },
    { q: "How do I get from Schiphol to Amsterdam city centre?", a: "The train from the station under the terminal is usually the quickest and simplest option, and runs frequently to Amsterdam Centraal and other stations. Buses and taxis are also available. Check current timetables and prices before you travel." },
    { q: "Is Schiphol one terminal?", a: "Schiphol is a single terminal building with a shared arrivals area and several departure halls. You can walk between most areas, but distances to some gates can be long, so allow enough time." },
    { q: "Do I need passport control when I fly from Schiphol?", a: "Flights to destinations outside the Schengen area include passport control, which can add time. Flights within the Schengen area generally do not, though you should always carry valid identification." },
    { q: "What should I do if I miss a connecting flight at Schiphol?", a: "Go to your airline's transfer or service desk straight away. If both flights were on one ticket, the airline is responsible for rebooking you. On separate tickets you may have to buy a new ticket yourself." }
  ],
};
