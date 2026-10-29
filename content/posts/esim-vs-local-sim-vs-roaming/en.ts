import type { PostContent } from "@/lib/blog/types";

export const content: PostContent = {
  title: "eSIM vs Local SIM vs Roaming: The Best Way to Get Mobile Data Abroad",
  description: "How travel eSIMs, local SIM cards and roaming compare on cost, convenience and coverage, and a simple checklist to choose the right option for your trip.",
  blocks: [
    { t: "p", text: "Mobile data is one of the first things you need when you land: maps, messages, your boarding pass, a ride to the hotel. You have three main options to get it abroad: use your normal plan with roaming, buy a local SIM card, or install a travel eSIM. Each has a place, and the right one depends on where you go, how long you stay and how much data you use." },
    { t: "p", text: "Prices, plans and rules vary a lot between providers and countries, so this guide focuses on how the options differ and what to check, rather than quoting prices that would soon be out of date." },

    { t: "h2", text: "1. Roaming: the easy option", id: "roaming" },
    { t: "p", text: "Roaming means using your normal SIM and plan abroad. It needs no setup, you keep your number, and it works the moment you land." },
    { t: "ul", items: [
      "Inside the EU and EEA, many plans from EU providers let you use data abroad at no extra cost, within a fair-use limit. Check the limit for your plan.",
      "Outside the EU, roaming can be much more expensive and the rates vary by provider and country. Some providers sell daily or weekly roaming passes.",
      "Countries such as the UK and Switzerland are not always included in an EU roaming allowance. Check your provider's list.",
      "Turn off data roaming, or set a spending limit, if you are unsure of your charges."
    ] },

    { t: "h2", text: "2. Local SIM: often the cheapest per gigabyte", id: "local-sim" },
    { t: "p", text: "A local SIM is a card from a provider in the country you are visiting. It usually gives the most data for the money, and it comes with a local phone number you can use for calls and texts." },
    { t: "ul", items: [
      "You may need to show your passport to register the card, and in some countries the rules are strict.",
      "You have to find a shop or kiosk, which can take time on the day you arrive.",
      "You swap your SIM, so your usual number is not active on that phone unless you have a dual-SIM phone.",
      "It is a good choice for long stays or if you need a local number."
    ] },

    { t: "h2", text: "3. Travel eSIM: connected when you land", id: "esim" },
    { t: "p", text: "An eSIM is a digital SIM built into modern phones. A travel eSIM is a data plan you buy online and install by scanning a QR code or using an app, usually before you leave. You turn it on when you arrive." },
    { t: "ul", items: [
      "No physical card to find or swap, and no queue at the airport.",
      "Your normal SIM stays active, so your usual number keeps working for calls, texts and apps like WhatsApp that are linked to it.",
      "Plans are usually data only, so you generally do not get a local phone number.",
      "Many providers offer country, regional or multi-country plans, which are handy for trips through several countries."
    ] },
    { t: "callout", title: "Check your phone first", text: "Your phone must support eSIM and be network-unlocked. Most phones from the last few years do, but check your settings or the manufacturer's website before buying a plan." },

    { t: "h2", text: "Comparison at a glance", id: "comparison" },
    { t: "table", head: ["", "Roaming", "Local SIM", "Travel eSIM"], rows: [
      ["Setup", "None", "Buy and register on arrival", "Buy and install online"],
      ["Cost", "Free in some regions, often high elsewhere", "Often the lowest per gigabyte", "Usually between the other two"],
      ["Keep your number", "Yes", "No, unless dual SIM", "Yes, on your normal SIM"],
      ["Local number", "No", "Yes", "Usually no"],
      ["Best for", "EU trips on a suitable plan", "Long stays, local calls", "Short and medium trips, several countries"]
    ] },

    { t: "h2", text: "4. How much data do you need?", id: "how-much-data" },
    { t: "p", text: "Be realistic about how you use your phone, because plans are sold by the gigabyte." },
    { t: "ul", items: [
      "Light use: messaging, email, maps and the occasional search use relatively little data.",
      "Medium use: photo uploads, social media and some music add up faster.",
      "Heavy use: video calls, streaming video and using your phone as a hotspot for a laptop use much more.",
      "If you are unsure, pick a plan one size up, or choose one that lets you top up."
    ] },

    { t: "h2", text: "5. What to check before you buy an eSIM", id: "what-to-check" },
    { t: "ol", items: [
      "Your phone supports eSIM and is unlocked.",
      "The plan covers every country you will visit, including any transit stops.",
      "How long the plan is valid, and whether the validity starts at purchase, installation or first use.",
      "Whether hotspot or tethering is allowed, if you need it.",
      "The network speed (4G or 5G) and which local networks the plan uses.",
      "Whether you can top up if you run out of data.",
      "The provider's reviews and support options, in case installation fails."
    ] },

    { t: "h2", text: "6. Install it the right way", id: "install" },
    { t: "ol", items: [
      "Buy the plan and install the eSIM while you still have reliable Wi-Fi, before you leave.",
      "Follow the provider's steps. Usually you scan a QR code or tap an installation link.",
      "Label the eSIM clearly in your phone settings so you do not confuse it with your main line.",
      "On arrival, switch on the eSIM for mobile data, and turn data roaming on for that line only if the provider tells you to.",
      "Keep your normal SIM for calls and texts, and turn mobile data off on it to avoid charges."
    ] },

    { t: "h2", text: "Which option should you choose?", id: "which-to-choose" },
    { t: "ul", items: [
      "Short trip inside the EU with a suitable plan: roaming is usually fine.",
      "Short or medium trip outside the EU, or through several countries: a travel eSIM is often the most convenient.",
      "Long stay or you need a local number: a local SIM is usually the best value.",
      "Not sure: check your provider's roaming rates, then compare them with an eSIM plan for your destination."
    ] },
    { t: "p", text: "TicketsJet has an eSIM page where you can compare travel data plans from partner providers. The purchase and installation are handled by the provider, at their price." }
  ],
  faq: [
    { q: "Will I keep my phone number with a travel eSIM?", a: "Yes. Your normal SIM stays active in your phone, and the travel eSIM only provides mobile data. Apps tied to your usual number, such as WhatsApp, keep working. Most travel eSIMs do not include a local phone number." },
    { q: "When should I install my eSIM?", a: "Install it while you have Wi-Fi, before you leave. Then switch it on when you land. Some plans start counting their validity from the first use and others from installation or purchase, so check the details." },
    { q: "Can I use my phone as a hotspot with an eSIM?", a: "It depends on the plan. Some allow tethering and some do not. Check the details of the plan before you buy if you need to share your connection." },
    { q: "What if my phone does not support eSIM?", a: "Then a travel eSIM will not work. Check your settings or the manufacturer's website, or choose a local SIM or a pocket Wi-Fi device instead." },
    { q: "Is roaming in the EU really free?", a: "Many plans from EU providers let you use your data in other EU and EEA countries at no extra cost, within a fair-use limit. Limits and coverage differ by plan and provider, and countries outside the EU are often not included, so check your plan." }
  ],
};
