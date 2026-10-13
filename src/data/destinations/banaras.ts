import type { LandingConfig } from "../landing";
import hero from "@/assets/images/hero-varanasi-ghats.webp";
import varanasiBoat from "@/assets/images/varanasi-boat-ride.webp";
import aartiPriest from "@/assets/images/ganga-aarti-priest.webp";
import aarti from "@/assets/images/ganga-aarti.webp";
import sarnath from "@/assets/images/sarnath-dhamek-stupa.webp";
import kashiCorridor from "@/assets/images/kashi-vishwanath-corridor.webp";
import ayodhyaMandir from "@/assets/images/ayodhya-ram-mandir.webp";
import assiGhat from "@/assets/images/assi-ghat.webp";
import prayagraj from "@/assets/images/prayagraj-yamuna-bridge.webp";
import vrindavan from "@/assets/images/vrindavan-prem-mandir.webp";
import ghatsSunset from "@/assets/images/varanasi-ghats-sunset.webp";
import ramLalla from "@/assets/images/ayodhya-ram-lalla.webp";

// The first package mirrors the live listing on srivastavaroute.in (price,
// itinerary, inclusions copied from it). The rest are a suggested range for
// the client to confirm — check prices with Srivastava Route before launch.

export const banaras: LandingConfig = {
  slug: "banaras",
  path: "/",
  name: "Banaras",
  tripLabel: "Kashi yatra",
  specialist: "Kashi specialist",
  seo: {
    title: "Banaras Tour Packages from ₹5,499 | Varanasi Kashi Tour – Srivastava Route",
    description:
      "Book Banaras (Varanasi) tour packages with Ganga Aarti, Kashi Vishwanath darshan, Sarnath, Prayagraj & Ayodhya. Hotels, private cab & guide included. Customise your Kashi yatra with Srivastava Route.",
    keywords: [
      "Banaras tour packages",
      "Varanasi tour package",
      "Kashi tour package",
      "Varanasi Prayagraj Ayodhya tour",
      "Kashi Vishwanath darshan package",
      "Ganga Aarti Varanasi",
      "Varanasi Sarnath tour",
      "Kashi yatra",
    ],
    ogImage: "/og-banaras-tour-packages.jpg",
    ogAlt: "Banaras Tour Packages by Srivastava Route",
  },
  offer: { name: "Kashi Festive Sale", endsAt: null },
  hero: {
    eyebrow: "Kashi · Ayodhya · Prayagraj · Sarnath",
    titleLead: "Banaras Tour",
    titleAccent: "Packages",
    sub: "Ganga Aarti from the river, peaceful Kashi Vishwanath darshan and sunrise on the ghats — curated Varanasi journeys crafted by Srivastava Route.",
    image: hero,
    imageAlt: "Historic ghats and boats on the Ganga at Munshi Ghat, Varanasi",
    trust: ["Tailor-made itineraries", "Verified hotels & cabs", "24/7 on-trip support"],
    cardTitle: "Plan Your Kashi Yatra",
    cardSub: "Free itinerary · best price · no obligation",
  },
  priceUnit: "/person",
  packageTypes: [
    { key: "pilgrimage", label: "Pilgrimage" },
    { key: "family", label: "Family" },
    { key: "weekend", label: "Weekend Getaways" },
    { key: "heritage", label: "Heritage & Culture" },
    { key: "premium", label: "Premium" },
  ],
  categoryRows: [
    { type: "pilgrimage", eyebrow: "Darshan & Devotion", title: "Pilgrimage Packages" },
    { type: "family", eyebrow: "Travel Together", title: "Family Packages" },
  ],
  packagesSection: {
    eyebrow: "Handpicked",
    title: "All Varanasi Tour Packages",
    lead: "Every itinerary is planned by our Kashi specialists — comfortable stays, private cabs, local guides and darshan timings sorted for you. Pick one as it is, or let us tailor it.",
  },
  dealsLead: "Our best prices on the most-loved Kashi itineraries.",
  packages: [
    {
      id: "varanasi-prayagraj-ayodhya",
      title: "Varanasi Prayagraj Ayodhya Tour",
      route: ["Varanasi", "Prayagraj", "Ayodhya"],
      nights: 3,
      price: 11999,
      oldPrice: 15999,
      image: varanasiBoat,
      imageAlt: "Pilgrim on a boat ride along the Varanasi ghats at sunrise",
      types: ["pilgrimage", "family"],
      highlights: ["Ganga Aarti at Dashashwamedh", "Triveni Sangam", "Ram Janmabhoomi darshan"],
      badge: "Bestseller",
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "guide"],
      detailsUrl: "https://srivastavaroute.in/package/varanasi-prayagraj-ayodhya-package",
      itinerary: [
        {
          title: "Arrival in Varanasi",
          detail:
            "Arrival at Varanasi. Check-in at hotel and relax. In the evening, witness the divine Ganga Aarti at Dashashwamedh Ghat. Overnight stay in Varanasi.",
        },
        {
          title: "Varanasi Sightseeing – Prayagraj",
          detail:
            "Early morning boat ride on River Ganga. Visit Kashi Vishwanath Temple, Annapurna Temple and Sankat Mochan Temple. Later drive to Prayagraj with en-route sightseeing. Overnight stay in Prayagraj.",
        },
        {
          title: "Prayagraj – Ayodhya",
          detail:
            "Visit Triveni Sangam, Hanuman Mandir and Anand Bhawan. After sightseeing, drive to Ayodhya. Visit Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan. Overnight stay in Ayodhya.",
        },
        {
          title: "Ayodhya Departure",
          detail: "Morning temple visits and local sightseeing. Tour ends with departure from Ayodhya.",
        },
      ],
      inclusions: [
        "Airport / railway pickup & drop",
        "All sightseeing by private vehicle",
        "Hotel stay with breakfast",
        "Local guide",
        "Wheelchair assistance, tolls & parking",
      ],
      exclusions: ["Lunch & dinner", "Boat ride charges", "Personal expenses"],
    },
    {
      id: "kashi-darshan-weekend",
      title: "Kashi Darshan Weekend",
      route: ["Varanasi"],
      nights: 1,
      price: 5499,
      oldPrice: 7499,
      image: aartiPriest,
      imageAlt: "Priest performing the evening Ganga Aarti with fire lamps in Varanasi",
      types: ["weekend", "pilgrimage"],
      highlights: ["Kashi Vishwanath darshan", "Evening Ganga Aarti", "Sunrise boat ride"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
    },
    {
      id: "varanasi-sarnath-heritage",
      title: "Varanasi & Sarnath Heritage Tour",
      route: ["Varanasi", "Sarnath"],
      nights: 2,
      price: 7999,
      oldPrice: 10499,
      image: sarnath,
      imageAlt: "Dhamek Stupa at Sarnath where the Buddha gave his first sermon",
      types: ["heritage", "weekend"],
      highlights: ["Dhamek Stupa & museum", "Old city lanes walk", "Ramnagar Fort"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "guide"],
    },
    {
      id: "kashi-vishwanath-spiritual",
      title: "Kashi Vishwanath Spiritual Retreat",
      route: ["Varanasi"],
      nights: 2,
      price: 8999,
      oldPrice: 11999,
      image: kashiCorridor,
      imageAlt: "Ganga Dwar gateway of the Kashi Vishwanath corridor in Varanasi",
      types: ["pilgrimage"],
      highlights: ["Kashi Vishwanath corridor", "Mangla Aarti assistance", "Kaal Bhairav temple"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
    },
    {
      id: "kashi-ayodhya-darshan",
      title: "Kashi Ayodhya Darshan",
      route: ["Varanasi", "Ayodhya"],
      nights: 3,
      price: 10499,
      oldPrice: 13999,
      image: ayodhyaMandir,
      imageAlt: "Shri Ram Janmabhoomi Mandir in Ayodhya",
      types: ["pilgrimage", "family"],
      highlights: ["Ram Lalla darshan", "Saryu Aarti", "Kashi Vishwanath temple"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
    },
    {
      id: "banaras-family-holiday",
      title: "Banaras Family Holiday",
      route: ["Varanasi", "Sarnath"],
      nights: 3,
      price: 13999,
      oldPrice: 17999,
      image: assiGhat,
      imageAlt: "Temples and steps of Assi Ghat on the Ganga in Banaras",
      types: ["family", "heritage"],
      highlights: ["Subah-e-Banaras at Assi Ghat", "Sarnath day trip", "Banarasi food trail"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "guide"],
    },
    {
      id: "kashi-prayagraj-sangam",
      title: "Kashi Prayagraj Sangam Yatra",
      route: ["Varanasi", "Prayagraj"],
      nights: 2,
      price: 8499,
      oldPrice: 10999,
      image: prayagraj,
      imageAlt: "New Yamuna Bridge over the river at Prayagraj at sunset",
      types: ["pilgrimage", "weekend"],
      highlights: ["Triveni Sangam snan", "Bade Hanuman ji", "Ganga Aarti in Kashi"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
    },
    {
      id: "dev-deepawali-luxury",
      title: "Luxury Banaras with Ganga Aarti Cruise",
      route: ["Varanasi", "Sarnath"],
      nights: 3,
      price: 18999,
      oldPrice: 24999,
      image: aarti,
      imageAlt: "Crowds watching the grand evening Ganga Aarti on the ghats of Varanasi",
      types: ["premium", "heritage"],
      highlights: ["Heritage riverside hotel", "Private aarti cruise", "VIP darshan assistance"],
      badge: "Premium",
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "cruise"],
    },
    {
      id: "grand-uttar-pradesh-pilgrimage",
      title: "Kashi Ayodhya Prayagraj Vrindavan Yatra",
      route: ["Varanasi", "Prayagraj", "Ayodhya", "Vrindavan"],
      nights: 6,
      price: 24999,
      oldPrice: 32999,
      image: vrindavan,
      imageAlt: "White marble Prem Mandir in Vrindavan",
      types: ["pilgrimage", "family", "premium"],
      highlights: ["Four holy cities", "Prem Mandir light show", "Private AC cab throughout"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
    },
  ],
  spotlight: {
    packageId: "varanasi-prayagraj-ayodhya",
    intro:
      "The spiritual heart of India in 3 nights & 4 days — Ganga Aarti in Varanasi, the sacred Triveni Sangam in Prayagraj and Lord Ram's birthplace in Ayodhya.",
  },
  places: {
    eyebrow: "Top Picks",
    title: "Sacred Places We'll Take You",
    lead: "Combine Kashi with the holiest cities of Uttar Pradesh — we handle the drives, stays and temple timings.",
    cta: "Build My Custom Yatra",
    items: [
      { name: "Varanasi", tagline: "84 ghats on the Ganga", image: ghatsSunset, alt: "Varanasi ghats and boats at sunset" },
      { name: "Kashi Vishwanath", tagline: "Jyotirlinga & the new corridor", image: kashiCorridor, alt: "Kashi Vishwanath corridor gateway" },
      { name: "Ayodhya", tagline: "Shri Ram Janmabhoomi", image: ramLalla, alt: "Ram Lalla idol at Ayodhya" },
      { name: "Prayagraj", tagline: "Triveni Sangam", image: prayagraj, alt: "Prayagraj river bridge at sunset" },
      { name: "Sarnath", tagline: "Where the Buddha first taught", image: sarnath, alt: "Dhamek Stupa in Sarnath" },
      { name: "Vrindavan", tagline: "Leela bhoomi of Krishna", image: vrindavan, alt: "Prem Mandir in Vrindavan" },
    ],
  },
  why: {
    eyebrow: "Why Srivastava Route",
    title: "We Craft Journeys, Not Just Trips",
    lead: "Travel should be transformative. Our planners combine local insight with personal service so your Kashi yatra is seamless, comfortable and deeply memorable.",
    main: aarti,
    mainAlt: "Evening Ganga Aarti on the ghats of Varanasi",
    inset: kashiCorridor,
    insetAlt: "Kashi Vishwanath corridor gateway",
    stamp: ["Har Har", "Mahadev"],
    items: [
      { title: "Tailor-Made", text: "Custom itineraries built around your dates, pace and budget — never a fixed bus tour.", icon: "compass" },
      { title: "Trusted & Safe", text: "24/7 on-trip support, verified hotels and drivers, wheelchair help on request.", icon: "shield" },
      { title: "Expert Local Guides", text: "Banaras-born guides who bring the ghats, lanes and legends to life.", icon: "guide" },
      { title: "Darshan Made Easy", text: "We plan temple timings, queues and aarti spots so you spend time in devotion, not in lines.", icon: "temple" },
    ],
  },
  steps: [
    { title: "Share your plan", text: "Tell us your dates, group size and the temples you wish to visit." },
    { title: "Get a free itinerary", text: "A Kashi specialist calls you with a personalised day-by-day plan and best price." },
    { title: "Travel worry-free", text: "Pickup, hotels, cab, guide and darshan help — all arranged before you arrive." },
  ],
  plan: {
    image: varanasiBoat,
    eyebrow: "Ready to start your yatra?",
    title: "Let Our Kashi Experts Plan It For You",
    lead: "Tell us your dates and wishes — we'll design a personalised itinerary with transparent pricing. No hidden fees, just unforgettable memories.",
    formTitle: "Make an Enquiry",
  },
  faq: {
    title: "Banaras Trip FAQs",
    lead: "Quick answers to what travellers ask us most. Still unsure? Our specialists are a call away.",
    items: [
      {
        q: "What is the best time to visit Varanasi?",
        a: "October to March is the most pleasant season, with cool mornings ideal for boat rides and ghat walks. Dev Deepawali (Kartik Purnima, usually November) is the most spectacular time, while the monsoon months bring fewer crowds and lower hotel rates.",
      },
      {
        q: "How many days are enough for a Banaras tour?",
        a: "Two days cover the essentials — Kashi Vishwanath, Ganga Aarti, a sunrise boat ride and Sarnath. With 3–4 days you can comfortably add Prayagraj's Triveni Sangam and Ayodhya's Ram Janmabhoomi temple.",
      },
      {
        q: "What time is the Ganga Aarti at Dashashwamedh Ghat?",
        a: "The evening Ganga Aarti starts around sunset — roughly 6:30–7:00 PM in summer and 5:30–6:00 PM in winter. Our team reserves a good viewing spot or a boat so you can watch it from the river.",
      },
      {
        q: "Can I customise a Banaras tour package?",
        a: "Yes. Every package is a starting point — you can change hotels, add or remove cities, extend your stay or travel as a large family or group. Your specialist will rework the itinerary and price for you.",
      },
      {
        q: "What is included in the package price?",
        a: "Packages generally include hotel stay with breakfast, pickup and drop, sightseeing by private vehicle, a local guide, tolls and parking. Meals other than breakfast, boat-ride tickets and personal expenses are usually extra — exact inclusions are listed in your itinerary.",
      },
      {
        q: "Is the tour suitable for senior citizens?",
        a: "Absolutely. We plan a relaxed pace, choose hotels close to the ghats and arrange wheelchair assistance, short-walk routes and help with temple queues for elderly travellers.",
      },
    ],
  },
  seoCopy: {
    title: "Banaras Tour Packages — Plan Your Kashi Yatra",
    paragraphs: [
      "Varanasi, also called Banaras or Kashi, is one of the oldest living cities in the world and the spiritual capital of India. Our **Banaras tour packages** start at ₹5,499 per person and cover everything you need for a comfortable pilgrimage or holiday — hotel stays close to the ghats, private AC cab, local guide and help with darshan at **Kashi Vishwanath Temple**.",
      "Witness the evening **Ganga Aarti at Dashashwamedh Ghat**, take a sunrise boat ride past Manikarnika and Assi Ghat, explore the narrow lanes of the old city and visit **Sarnath**, where the Buddha gave his first sermon. Many travellers extend their **Varanasi tour package** to include the Triveni Sangam in **Prayagraj** and the Shri Ram Janmabhoomi Mandir in **Ayodhya** — our bestselling Varanasi Prayagraj Ayodhya tour covers all three in four days.",
      "Whether you are planning a family trip, a weekend escape or a yatra with senior citizens, Srivastava Route tailors every itinerary to your dates, pace and budget. Call or WhatsApp us for the best price on Kashi tour packages from Lucknow, Delhi, Mumbai, Bengaluru, Kolkata and anywhere in India.",
    ],
  },
  credits: [
    { what: "Munshi Ghat, Varanasi", who: "Marcin Białek", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Varanasi_Munshi_Ghat3.jpg" },
    { what: "Ganga Aarti in the evening", who: "Vimalinarc", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti_at_Varanasi_in_the_evening.jpg" },
    { what: "Ganga Aarti priest", who: "Philip Nalangan", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti_Varanasi.jpg" },
    { what: "Kashi Vishwanath corridor", who: "Ashvin Kaitabhya / Abhishek Pandey", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Dwar,_Gateway_of_Corridor_of_Kashi_Vishwanath_Temple,_Varanasi.webp" },
    { what: "Shri Ram Janmabhoomi Mandir", who: "Prime Minister's Office", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Shri_Ram_Janambhoomi_Mandir,_Ayodhya.jpg" },
    { what: "Assi Ghat", who: "Akshay8090", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Assi_ghat_banaras_mandiro_ka_seher.jpg" },
    { what: "Dhamek Stupa, Sarnath", who: "Hardy Explorer", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Dhamek_Stupa,_2025.jpg" },
  ],
  whatsapp: {
    greeting: "Hi! I'm interested in your Banaras tour packages.",
    teasers: ["Namaste! Planning a Kashi trip? 🙏", "Need help picking the right package?", "Chat with a Banaras expert now →"],
  },
  messagePlaceholder: "Temples you wish to visit, hotel preference, senior citizens travelling…",
};
