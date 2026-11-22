import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, getImageSrc } from "../api/client";
import ProjectGallery from "./ProjectGallery";
import { buildHighlights } from "../utils/projectHighlights";
import { setPageTitle } from "../utils/pageTitle";

// ── Import all images ──
import Int1 from "../assets/Int-1.jpg.jpeg";
import Int2 from "../assets/Int-2.jpg.jpeg";
import Int3 from "../assets/Int-3.jpg.jpeg";
import Int4 from "../assets/Int-4.jpg.jpeg";
import Int5 from "../assets/Int-5.jpg.jpeg";
import Int6 from "../assets/Int-6.jpg.jpeg";
import Int7 from "../assets/Int-7.jpg.jpeg";
import Int8 from "../assets/Int-8.jpg.jpeg";
import Int9 from "../assets/Int-9.jpg.jpeg";
import Int10 from "../assets/Int-10.jpg.jpeg";
import Int11 from "../assets/Int-11.jpg.jpeg";
import Int12 from "../assets/Int-12.jpg.jpeg";
import Int13 from "../assets/Int-13.jpg.jpeg";
import Int14 from "../assets/Int-14.jpg.jpeg";
import Int15 from "../assets/Int-15.jpg.jpeg";

// ── Full project data ──
const projectsData = {
  1: {
    id: 1,
    title: "The Kapoor Residence",
    subtitle: "A home that breathes tradition and luxury in harmony",
    category: "Residential",
    location: "Nashik, Maharashtra",
    year: "2024",
    area: "2,400 sq ft",
    duration: "5 months",
    budget: "Premium",
    status: "Completed",
    heroImage: Int1,
    accentColor: "#8a9a4a",
    darkColor: "#2a3a14",

    architect: {
      name: "Ar. Priya Samarpan",
      role: "Principal Designer & Architect",
      experience: "12 Years Experience",
      specialization: "Residential & Luxury Interiors",
      quote: "Every home has a soul. Our job is to find it and let it breathe through design.",
    },

    overview:
      "The Kapoor Residence is a masterclass in blending the warmth of traditional Maharashtrian craftsmanship with the clean lines of contemporary luxury. Located in the heart of Nashik, this 2,400 sq ft family home was designed to feel both grand and deeply personal — a space where every corner tells a story of the family who lives there.",

    tags: ["Full Home Interior", "3D Visualization", "Furniture Styling", "Vastu Compliant", "Smart Lighting"],

    highlights: [
      { icon: "🏠", label: "Project Type", value: "Full Home Interior" },
      { icon: "📐", label: "Total Area", value: "2,400 sq ft" },
      { icon: "🗓️", label: "Completed", value: "March 2024" },
      { icon: "⏱️", label: "Duration", value: "5 Months" },
      { icon: "📍", label: "Location", value: "Nashik, MH" },
      { icon: "✨", label: "Style", value: "Contemporary Luxury" },
    ],

    gallery: [
      { image: Int1, caption: "Living Room — Earthy tones with custom walnut paneling" },
      { image: Int2, caption: "Master Bedroom — Soft ivory palette with gold accents" },
      { image: Int3, caption: "Drawing Room — Statement chandelier and marble flooring" },
      { image: Int4, caption: "Dining Area — Bespoke teak furniture with ambient lighting" },
      { image: Int7, caption: "Kitchen — Modular design with Italian marble countertops" },
      { image: Int8, caption: "Study Room — Built-in shelving with warm reading nooks" },
    ],

    beforeAfter: [
      { before: Int9, after: Int1, label: "Living Room Transformation" },
      { before: Int10, after: Int2, label: "Master Bedroom Makeover" },
    ],

    timeline: [
      { phase: "01", title: "Discovery & Consultation", duration: "Week 1–2", desc: "In-depth meeting with the Kapoor family to understand lifestyle, preferences, and Vastu requirements. Mood boards and inspiration decks presented.", status: "done" },
      { phase: "02", title: "Concept Design & 3D Visualization", duration: "Week 3–5", desc: "Full 3D walkthroughs created for every room. Color palettes, material boards, and furniture layouts finalized after two revision rounds.", status: "done" },
      { phase: "03", title: "Material Procurement", duration: "Week 6–8", desc: "Sourcing of Italian marble, teak wood, custom fabric upholstery, and imported light fixtures. All vendors vetted for quality assurance.", status: "done" },
      { phase: "04", title: "Civil & Structural Work", duration: "Week 9–14", desc: "False ceiling, electrical rerouting, plumbing updates, and wall preparation. Daily site supervision by our project manager.", status: "done" },
      { phase: "05", title: "Furniture & Fixtures Installation", duration: "Week 15–18", desc: "Custom furniture delivery and installation, followed by lighting setup, curtains, and all hardware fittings.", status: "done" },
      { phase: "06", title: "Styling & Handover", duration: "Week 19–20", desc: "Final styling with curated decor, art pieces, and plants. Walkthrough with client and punch list resolved. Keys handed over.", status: "done" },
    ],

    testimonial: {
      text: "Samarpan Group transformed our empty house into a home we are deeply in love with. Priya understood our vision from Day 1 and delivered something beyond what we imagined. Every single detail — from the marble inlay to the custom bookshelf — is perfect. We couldn't be happier.",
      author: "Rajesh & Sunita Kapoor",
      role: "Homeowners, Nashik",
      rating: 5,
    },

    designPhilosophy: [
      { title: "Vastu Harmony", desc: "Every room placement respects Vastu Shastra principles while maintaining modern aesthetics." },
      { title: "Natural Materials", desc: "Teak, marble, jute, and cotton — materials that age beautifully and connect to the earth." },
      { title: "Smart Integration", desc: "Hidden wiring, smart switches, and automated lighting seamlessly integrated into the design." },
      { title: "Family-First Layout", desc: "Spaces designed around the actual daily rhythms of a multi-generational Indian family." },
    ],
  },

  2: {
    id: 2,
    title: "Verdant Café & Lounge",
    subtitle: "Where botanicals meet warm wood and golden light",
    category: "Hospitality",
    location: "Nashik, Maharashtra",
    year: "2023",
    area: "980 sq ft",
    duration: "3 months",
    budget: "Mid-Premium",
    status: "Completed",
    heroImage: Int2,
    accentColor: "#b8cc6a",
    darkColor: "#2a3a14",
    architect: {
      name: "Ar. Sameer Kulkarni",
      role: "Commercial Interior Specialist",
      experience: "9 Years Experience",
      specialization: "Hospitality & F&B Spaces",
      quote: "A café should feel like a warm hug — inviting, comforting, and impossible to leave.",
    },
    overview:
      "Verdant Café & Lounge redefines the café experience in Nashik. Drawing inspiration from lush botanical gardens and artisanal coffee culture, this 980 sq ft space is a sanctuary of calm in the city. Every element — from the live plant wall to the hand-thrown ceramic light shades — was curated to create an atmosphere of organic luxury.",
    tags: ["Lighting Design", "Space Planning", "Biophilic Design", "Custom Furniture", "Brand Alignment"],
    highlights: [
      { icon: "☕", label: "Project Type", value: "Café & Lounge" },
      { icon: "📐", label: "Total Area", value: "980 sq ft" },
      { icon: "🗓️", label: "Completed", value: "August 2023" },
      { icon: "⏱️", label: "Duration", value: "3 Months" },
      { icon: "📍", label: "Location", value: "Nashik, MH" },
      { icon: "🌿", label: "Style", value: "Botanical Modern" },
    ],
    gallery: [
      { image: Int2, caption: "Main Seating — Warm wood and hanging botanicals" },
      { image: Int3, caption: "Counter Area — Hand-crafted tile backsplash" },
      { image: Int5, caption: "Plant Wall — 200+ live plants curated by botanist" },
      { image: Int6, caption: "Lounge Corner — Low seating with ambient pendant lights" },
      { image: Int9, caption: "Bar Counter — Reclaimed wood with brass accents" },
      { image: Int11, caption: "Outdoor Extension — Al-fresco seating with garden view" },
    ],
    beforeAfter: [
      { before: Int12, after: Int2, label: "Main Hall Transformation" },
      { before: Int13, after: Int5, label: "Plant Wall Installation" },
    ],
    timeline: [
      { phase: "01", title: "Brand & Concept Alignment", duration: "Week 1", desc: "Sessions with the café owner to understand brand identity, target clientele, and menu concept to align design with overall experience.", status: "done" },
      { phase: "02", title: "Space Planning & Layout", duration: "Week 2–3", desc: "Optimized seating layout for 42 covers within 980 sq ft. Defined zones for counter, lounge, and communal tables.", status: "done" },
      { phase: "03", title: "Material & Furniture Sourcing", duration: "Week 4–5", desc: "Reclaimed teak furniture commissioned. Ceramic pendants, brass fittings, and custom tile work sourced from local artisans.", status: "done" },
      { phase: "04", title: "Civil Work & Lighting", duration: "Week 6–9", desc: "False ceiling for cable management, exposed brick treatment on feature wall, and layered lighting installation with dimmers.", status: "done" },
      { phase: "05", title: "Botanicals & Styling", duration: "Week 10–11", desc: "Live plant wall installation by certified botanist. 200+ plants selected for low-light indoor survival and visual lushness.", status: "done" },
      { phase: "06", title: "Soft Launch & Refinement", duration: "Week 12", desc: "Trial run with the team, final styling adjustments, staff briefing on space guidelines. Grand opening coordinated.", status: "done" },
    ],
    testimonial: {
      text: "Samarpan Group turned my dream café into a reality that exceeded every expectation. The plant wall alone is worth a visit — customers come in, sit for hours, and come back the next day. The design works for the soul of the brand, not just the aesthetics.",
      author: "Anisha Mehta",
      role: "Owner, Verdant Café & Lounge",
      rating: 5,
    },
    designPhilosophy: [
      { title: "Biophilic Design", desc: "Living plants integrated at every level — walls, counters, ceiling — creating a breathing, living space." },
      { title: "Artisan Craft", desc: "Local craftsmen for ceramic shades, hand-thrown pottery, and custom woodwork — supporting Nashik's artisan economy." },
      { title: "Layered Lighting", desc: "Three lighting zones: task, ambient, and accent — each with independent dimmer control for mood management." },
      { title: "Revenue Optimization", desc: "Layout designed to maximize covers-per-sqft while maintaining the intimate, unhurried feel of the brand." },
    ],
  },

  3: {
    id: 3,
    title: "TechNashik HQ",
    subtitle: "A workspace that sparks innovation and deep focus",
    category: "Office Spaces",
    location: "Nashik, Maharashtra",
    year: "2024",
    area: "3,200 sq ft",
    duration: "4 months",
    budget: "Corporate",
    status: "Completed",
    heroImage: Int3,
    accentColor: "#d4e090",
    darkColor: "#1a2a0a",
    architect: {
      name: "Ar. Rahul Deshmukh",
      role: "Corporate Interiors Lead",
      experience: "10 Years Experience",
      specialization: "Tech & Co-working Spaces",
      quote: "The best offices disappear — they create conditions for great work without getting in the way.",
    },
    overview:
      "TechNashik HQ is a 3,200 sq ft corporate headquarters designed for a fast-growing technology company. The brief was clear: create a space that feels both energizing and focused — where collaboration happens naturally but deep work is never compromised. The result is a layered environment with open collaboration zones, private phone booths, and quiet focus alcoves all woven seamlessly together.",
    tags: ["Interior Design", "Space Planning", "Acoustic Design", "Ergonomics", "Smart Office"],
    highlights: [
      { icon: "🏢", label: "Project Type", value: "Corporate HQ" },
      { icon: "📐", label: "Total Area", value: "3,200 sq ft" },
      { icon: "🗓️", label: "Completed", value: "January 2024" },
      { icon: "⏱️", label: "Duration", value: "4 Months" },
      { icon: "📍", label: "Location", value: "Nashik, MH" },
      { icon: "💡", label: "Style", value: "Tech Modern" },
    ],
    gallery: [
      { image: Int3, caption: "Open Workspace — Ergonomic workstations with natural light" },
      { image: Int4, caption: "Collaboration Zone — Standing desks and whiteboard walls" },
      { image: Int6, caption: "Focus Alcoves — Acoustic pods for deep work" },
      { image: Int8, caption: "Meeting Room — Video conference ready with soundproofing" },
      { image: Int10, caption: "Reception — Brand-forward welcome desk" },
      { image: Int12, caption: "Breakout Area — Informal seating with game zone" },
    ],
    beforeAfter: [
      { before: Int14, after: Int3, label: "Open Office Transformation" },
      { before: Int15, after: Int6, label: "Focus Zone Creation" },
    ],
    timeline: [
      { phase: "01", title: "Workplace Strategy", duration: "Week 1–2", desc: "Employee surveys, workflow analysis, and leadership interviews to map space needs against actual work patterns.", status: "done" },
      { phase: "02", title: "Zone Planning", duration: "Week 3–4", desc: "Defined 6 distinct zones: reception, open workspace, collaboration, focus pods, meeting rooms, and breakout. Acoustics mapped per zone.", status: "done" },
      { phase: "03", title: "Design Development", duration: "Week 5–7", desc: "3D renders for all zones, furniture specification, material selection, and brand colour integration into interior palette.", status: "done" },
      { phase: "04", title: "Civil & MEP Work", duration: "Week 8–12", desc: "False ceiling for cable management, server room setup, HVAC zoning, electrical distribution, and acoustic panel installation.", status: "done" },
      { phase: "05", title: "Furniture & Tech", duration: "Week 13–15", desc: "Ergonomic workstations, sit-stand desks, acoustic pods, and AV systems installed and tested.", status: "done" },
      { phase: "06", title: "Handover & Training", duration: "Week 16", desc: "Staff orientation on smart office features, space usage guidelines, and final snagging. Full handover with documentation.", status: "done" },
    ],
    testimonial: {
      text: "Our team's productivity shot up after moving into the new office. The focus pods are genius — our engineers can finally work without distraction. And the collaboration zone actually gets used, which never happened in our old office. Samarpan Group truly understands how tech teams work.",
      author: "Vikram Nair",
      role: "CEO, TechNashik",
      rating: 5,
    },
    designPhilosophy: [
      { title: "Activity-Based Working", desc: "No fixed desks — different zones designed for different types of work throughout the day." },
      { title: "Acoustic Zoning", desc: "Sound levels carefully managed in each zone using panels, soft furnishings, and pod enclosures." },
      { title: "Ergonomics First", desc: "Every workstation height-adjustable; lighting designed to reduce eye strain during long work sessions." },
      { title: "Brand Integration", desc: "Company colors, values, and visual identity woven into materials, graphics, and spatial experience." },
    ],
  },

  4: {
    id: 4,
    title: "The Mehta Villa",
    subtitle: "Palatial grandeur with intimacy at every turn",
    category: "Residential",
    location: "Panchavati, Nashik",
    year: "2023",
    area: "4,100 sq ft",
    duration: "7 months",
    budget: "Ultra Premium",
    status: "Completed",
    heroImage: Int4,
    accentColor: "#c0d880",
    darkColor: "#2a3500",
    architect: {
      name: "Ar. Priya Samarpan",
      role: "Principal Designer & Architect",
      experience: "12 Years Experience",
      specialization: "Luxury Villa & Bungalow Interiors",
      quote: "Luxury is not excess — it is precision. Knowing exactly where to add and where to leave space.",
    },
    overview:
      "The Mehta Villa is our most celebrated residential project — a 4,100 sq ft bungalow in the historic Panchavati neighbourhood of Nashik. The family's brief: palatial, but never cold. Grand, but deeply livable. The result is a home where ivory marble meets dark walnut, where antique brass finds its place beside contemporary art, and where every room feels like a curated chapter of the family's story.",
    tags: ["Full Home Interior", "Color Consultation", "Art Curation", "Landscape Integration", "Smart Home"],
    highlights: [
      { icon: "🏛️", label: "Project Type", value: "Luxury Bungalow" },
      { icon: "📐", label: "Total Area", value: "4,100 sq ft" },
      { icon: "🗓️", label: "Completed", value: "November 2023" },
      { icon: "⏱️", label: "Duration", value: "7 Months" },
      { icon: "📍", label: "Location", value: "Panchavati, Nashik" },
      { icon: "👑", label: "Style", value: "Contemporary Palatial" },
    ],
    gallery: [
      { image: Int4, caption: "Grand Foyer — 18ft ceiling with bespoke chandelier" },
      { image: Int1, caption: "Drawing Room — Italian marble with dark walnut accents" },
      { image: Int5, caption: "Master Suite — Ivory silk and gold leaf headboard" },
      { image: Int7, caption: "Library — Floor-to-ceiling walnut shelving" },
      { image: Int9, caption: "Pooja Room — Hand-carved marble with gold detailing" },
      { image: Int13, caption: "Terrace — Outdoor living with landscape design" },
    ],
    beforeAfter: [
      { before: Int11, after: Int4, label: "Grand Foyer Transformation" },
      { before: Int12, after: Int1, label: "Drawing Room Makeover" },
    ],
    timeline: [
      { phase: "01", title: "Vision Workshop", duration: "Week 1–2", desc: "Extensive family sessions to map aspirations, art preferences, Vastu requirements, and lifestyle patterns across three generations.", status: "done" },
      { phase: "02", title: "Concept & Art Direction", duration: "Week 3–6", desc: "Mood boards per room, art curation shortlist, material palette selection including Italy-sourced marble samples.", status: "done" },
      { phase: "03", title: "Import & Procurement", duration: "Week 7–11", desc: "Italian marble, Belgian linen, French lighting fixtures, and custom furniture commissioned from Delhi's finest craftsmen.", status: "done" },
      { phase: "04", title: "Structural Modifications", duration: "Week 12–18", desc: "Ceiling height modifications in foyer, custom arch creation, smart home wiring infrastructure, and HVAC upgrade.", status: "done" },
      { phase: "05", title: "Finishing & Art Install", duration: "Week 19–26", desc: "All surfaces finished, art pieces installed per curation plan, landscape integration for terrace and garden.", status: "done" },
      { phase: "06", title: "Photoshoot & Handover", duration: "Week 27–28", desc: "Professional photoshoot by architectural photographer, full documentation, and ceremonial handover with the Mehta family.", status: "done" },
    ],
    testimonial: {
      text: "We had worked with designers before, but Samarpan Group is in a different league. They handled everything — from sourcing marble in Italy to training our house staff on the smart home system. Our villa is now featured in two architecture magazines. We are deeply grateful.",
      author: "Deepak & Kavita Mehta",
      role: "Owners, The Mehta Villa",
      rating: 5,
    },
    designPhilosophy: [
      { title: "Generational Design", desc: "Spaces that work for grandparents, parents, and grandchildren — timeless choices that won't date." },
      { title: "Art-Led Interiors", desc: "Curated original artworks by Nashik artists form the emotional core of each room's identity." },
      { title: "Material Provenance", desc: "Every key material has a story — Italian marble, Belgian linen, Rajasthani stone — provenance matters." },
      { title: "Smart & Invisible", desc: "Full Alexa-enabled smart home: lighting, AC, security, music — all controlled silently through the home." },
    ],
  },

  5: {
    id: 5,
    title: "Bloom Boutique Hotel",
    subtitle: "12 rooms, one story — old Nashik reimagined",
    category: "Hospitality",
    location: "Nashik, Maharashtra",
    year: "2022",
    area: "6,500 sq ft",
    duration: "9 months",
    budget: "Hospitality Grade",
    status: "Completed",
    heroImage: Int5,
    accentColor: "#bcd078",
    darkColor: "#1e3010",
    architect: {
      name: "Ar. Sameer Kulkarni",
      role: "Commercial Interior Specialist",
      experience: "9 Years Experience",
      specialization: "Boutique Hotels & Hospitality",
      quote: "A boutique hotel should feel like staying in the home of someone with extraordinary taste.",
    },
    overview:
      "Bloom Boutique Hotel is our landmark hospitality project — a 12-room boutique hotel that channels the old-world charm of Nashik's heritage neighbourhoods. Each room is uniquely themed around a chapter of Nashik's history: the vineyards, the temples, the river, the old city market. The rooftop bar has become one of Nashik's most photographed spaces.",
    tags: ["Interior Design", "Lighting Design", "3D Visualization", "Branding Integration", "FF&E Procurement"],
    highlights: [
      { icon: "🌸", label: "Project Type", value: "Boutique Hotel" },
      { icon: "📐", label: "Total Area", value: "6,500 sq ft" },
      { icon: "🗓️", label: "Completed", value: "December 2022" },
      { icon: "⏱️", label: "Duration", value: "9 Months" },
      { icon: "📍", label: "Location", value: "Nashik, MH" },
      { icon: "🏆", label: "Rooms", value: "12 Unique Suites" },
    ],
    gallery: [
      { image: Int5, caption: "Grand Lobby — Old Nashik heritage aesthetic" },
      { image: Int2, caption: "Vineyard Suite — Wine-country warmth and terrazzo" },
      { image: Int4, caption: "Temple Suite — Stone carvings and saffron palette" },
      { image: Int6, caption: "Rooftop Bar — Nashik skyline and vintage fixtures" },
      { image: Int8, caption: "River Suite — Blues and naturals with balcony view" },
      { image: Int14, caption: "Common Dining — Heritage tiles and brass chandeliers" },
    ],
    beforeAfter: [
      { before: Int10, after: Int5, label: "Lobby Transformation" },
      { before: Int13, after: Int6, label: "Rooftop Bar Creation" },
    ],
    timeline: [
      { phase: "01", title: "Heritage Research", duration: "Week 1–3", desc: "Deep research into Nashik's history, culture, and architectural heritage. 12 story concepts developed — one per room.", status: "done" },
      { phase: "02", title: "Concept Presentation", duration: "Week 4–5", desc: "Full storyboards for all 12 rooms, lobby, rooftop bar, and dining space. Client approved all concepts with minor tweaks.", status: "done" },
      { phase: "03", title: "FF&E Specification", duration: "Week 6–10", desc: "Furniture, Fixtures & Equipment specified for each room. Heritage antiques sourced from Nashik's old dealers and auctions.", status: "done" },
      { phase: "04", title: "Civil Construction", duration: "Week 11–24", desc: "Full renovation of existing structure. False ceilings, arched doorways, heritage tile installation, and plumbing for all 12 rooms.", status: "done" },
      { phase: "05", title: "Rooftop & Dining", duration: "Week 25–32", desc: "Rooftop bar structural work, outdoor furniture installation, dining area tile-work and brass chandelier fitting.", status: "done" },
      { phase: "06", title: "Soft Furnishing & Launch", duration: "Week 33–36", desc: "All linen, curtains, artwork, and decorative accessories installed. Staff training on brand story. Soft launch with press.", status: "done" },
    ],
    testimonial: {
      text: "Samarpan Group didn't just design a hotel — they created an experience. Our occupancy rate hit 94% within six months of opening, and guests repeatedly mention the design as the reason they chose us. Every single room photograph goes viral. Best investment we ever made.",
      author: "Nikhil Joshi",
      role: "Owner, Bloom Boutique Hotel",
      rating: 5,
    },
    designPhilosophy: [
      { title: "Story-Led Rooms", desc: "Each of the 12 rooms tells a distinct chapter of Nashik's cultural and natural heritage." },
      { title: "Instagrammable by Design", desc: "Every corner was composed with a camera in mind — Bloom has become Nashik's most photographed hotel." },
      { title: "Local Artisan Sourcing", desc: "80% of decorative items sourced from Nashik's local artisans, antique dealers, and craftsmen." },
      { title: "Revenue-Aware Design", desc: "Room configurations and F&B layout optimized for revenue per available room and F&B margins." },
    ],
  },

  6: {
    id: 6,
    title: "Sunrise Commercial Plaza",
    subtitle: "Function, footfall, and brand impact at scale",
    category: "Commercial",
    location: "Nashik, Maharashtra",
    year: "2023",
    area: "5,800 sq ft",
    duration: "6 months",
    budget: "Commercial Grade",
    status: "Completed",
    heroImage: Int6,
    accentColor: "#c8dc80",
    darkColor: "#1a2800",
    architect: {
      name: "Ar. Rahul Deshmukh",
      role: "Corporate Interiors Lead",
      experience: "10 Years Experience",
      specialization: "Commercial & Retail Spaces",
      quote: "Commercial design is about people moving through space — every choice should serve that journey.",
    },
    overview:
      "Sunrise Commercial Plaza is a 5,800 sq ft multi-tenant commercial complex designed for maximum footfall, operational efficiency, and strong brand impact for each tenant. The design creates a unified identity for the plaza while giving each tenant space to express their individual brand. Common areas are designed to encourage lingering, discovery, and return visits.",
    tags: ["Space Planning", "Interior Design", "Wayfinding Design", "Tenant Coordination", "Common Area Design"],
    highlights: [
      { icon: "🏗️", label: "Project Type", value: "Commercial Plaza" },
      { icon: "📐", label: "Total Area", value: "5,800 sq ft" },
      { icon: "🗓️", label: "Completed", value: "September 2023" },
      { icon: "⏱️", label: "Duration", value: "6 Months" },
      { icon: "📍", label: "Location", value: "Nashik, MH" },
      { icon: "🏪", label: "Tenants", value: "8 Units" },
    ],
    gallery: [
      { image: Int6, caption: "Main Atrium — Brand-forward entrance with wayfinding" },
      { image: Int3, caption: "Ground Floor — Retail units with unified signage system" },
      { image: Int5, caption: "Food Court — 150-cover seating with natural light" },
      { image: Int7, caption: "First Floor — Professional services zone" },
      { image: Int11, caption: "Common Lounge — Seating and charging stations" },
      { image: Int15, caption: "Parking & Entry — Landscaped approach and branding" },
    ],
    beforeAfter: [
      { before: Int9, after: Int6, label: "Atrium Transformation" },
      { before: Int14, after: Int5, label: "Food Court Creation" },
    ],
    timeline: [
      { phase: "01", title: "Tenant Brief Collection", duration: "Week 1–2", desc: "Individual meetings with all 8 tenants to understand brand, customer profile, and operational requirements per unit.", status: "done" },
      { phase: "02", title: "Master Space Plan", duration: "Week 3–5", desc: "Overall plaza layout, tenant unit sizes, common area allocation, and wayfinding system designed and approved.", status: "done" },
      { phase: "03", title: "Common Area Design", duration: "Week 6–8", desc: "Atrium, food court, lounges, and corridors designed with unified material palette and lighting concept.", status: "done" },
      { phase: "04", title: "Civil Work — Phase 1", duration: "Week 9–16", desc: "Structural work, MEP installation for all units, false ceiling in common areas, and flooring across the plaza.", status: "done" },
      { phase: "05", title: "Tenant Fit-Outs", duration: "Week 17–22", desc: "Individual tenant spaces fit out in parallel with separate teams. Weekly coordination meetings to manage dependencies.", status: "done" },
      { phase: "06", title: "Signage & Launch", duration: "Week 23–24", desc: "Unified signage and wayfinding installed, landscaped entrance completed. Grand opening event coordinated with all tenants.", status: "done" },
    ],
    testimonial: {
      text: "Our plaza footfall exceeded projections by 40% in the first quarter. Samarpan Group's design made the space feel premium — which attracted the right tenants and the right customers. The food court alone does business that rival malls would envy. Exceptional work.",
      author: "Arun Sharma",
      role: "Developer, Sunrise Properties",
      rating: 5,
    },
    designPhilosophy: [
      { title: "Footfall Engineering", desc: "Circulation paths designed to naturally draw visitors past all tenants before reaching destinations." },
      { title: "Unified Identity", desc: "Common material palette creates a premium plaza identity without restricting individual tenant branding." },
      { title: "Dwell-Time Design", desc: "Comfortable seating, good lighting, and charging points encourage customers to stay longer and spend more." },
      { title: "Operational Efficiency", desc: "Service corridors, loading docks, and utility access planned to never disrupt the customer experience." },
    ],
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [beforeAfterIdx, setBeforeAfterIdx] = useState(0);
  const [baViewMode, setBaViewMode] = useState("sideBySide"); // "sideBySide" | "switch"
  const [activeSwitchView, setActiveSwitchView] = useState("after"); // "before" | "after"
  const [baLightbox, setBaLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProject(id)
      .then(({ data }) => {
        const legacy = data.legacyId || parseInt(id);
        const fallback = projectsData[legacy];
        if (fallback) {
          const merged = {
            ...fallback,
            ...data,
            heroImage: data.heroImage || fallback.heroImage,
            overview: data.overview || fallback.overview,
            clientName: data.clientName || fallback.clientName,
            media: data.media?.length ? data.media : [],
            beforeAfter: data.beforeAfter?.length ? data.beforeAfter : fallback.beforeAfter,
            timeline: data.timeline?.length ? data.timeline : fallback.timeline,
            designPhilosophy: data.designPhilosophy?.length ? data.designPhilosophy : fallback.designPhilosophy,
            testimonial: data.testimonial?.text ? data.testimonial : fallback.testimonial,
            architect: data.architect?.name ? data.architect : fallback.architect,
          };
          merged.highlights = buildHighlights(merged);
          setProject(merged);
        } else {
          setProject({ ...data, highlights: buildHighlights(data) });
        }
      })
      .catch(() => {
        const fallback = projectsData[parseInt(id)];
        if (fallback) setProject(fallback);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (project?.title) setPageTitle(project.title);
  }, [project?.title]);

  // Close BA Lightbox on Escape
  useEffect(() => {
    if (!baLightbox) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setBaLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [baLightbox]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", background: "#f5f0e8" }}>
        <p style={{ color: "#8a9a6a" }}>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", background: "#f5f0e8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🏠</div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 32, color: "#2a2a24" }}>Project not found</h2>
          <button onClick={() => navigate("/projects")} style={{ marginTop: 24, padding: "12px 32px", background: "#3d4a1f", color: "#e8d9b5", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 14 }}>
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const ba = project.beforeAfter?.[beforeAfterIdx];
  const resolveImg = (url) => getImageSrc(url) || url || "";
  const heroImage = resolveImg(project.heroImage || project.mainImage);
  const accentColor = project.accentColor || project.accent || "#8a9a4a";

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pd-page {
          font-family: var(--font-sans);
          background: linear-gradient(160deg, #f5f0e8 0%, #ede8d8 40%, #e8e0cc 100%);
          color: #3d3d30;
          min-height: 100vh;
          overflow-x: hidden;
          max-width: 100%;
        }

        /* ── BACK BAR ── */
        .pd-topbar {
          position: sticky; top: 0; z-index: 20;
          background: rgba(245,240,232,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(138,154,74,0.15);
          padding: 0 60px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
          gap: 12px;
          max-width: 100%;
          box-sizing: border-box;
        }
        .pd-back-btn {
          display: flex; align-items: center; gap: 10px;
          background: none; border: none;
          font-family: var(--font-sans);
          font-size: 12px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #4a5a1f;
          cursor: pointer; transition: gap 0.2s ease;
          padding: 0;
        }
        .pd-back-btn:hover { gap: 14px; }
        .pd-back-arrow {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: all 0.25s ease;
        }
        .pd-back-btn:hover .pd-back-arrow {
          background: #3d4a1f; color: #c8d890;
        }
        .pd-topbar-cat {
          font-size: 10px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #8a9a4a;
          padding: 5px 14px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 16px;
        }

        /* ── CONTAINER ── */
        .pd-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 32px 0;
        }

        /* ── PROJECT HEADER ── */
        .pd-header {
          margin-bottom: 24px;
        }

        .pd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #6b7c32;
          margin-bottom: 10px;
        }

        .pd-title {
          font-size: clamp(30px, 3.8vw, 46px);
          font-weight: 600;
          color: #2a2a24;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .pd-subtitle {
          font-size: 15px;
          color: #6a6a52;
          line-height: 1.6;
          margin-bottom: 14px;
          max-width: 760px;
        }

        .pd-meta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #555545;
          padding-top: 4px;
        }

        .pd-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pd-meta-sep {
          color: rgba(138,154,74,0.4);
        }

        /* ── HERO IMAGE SHOWCASE ── */
        .pd-hero-showcase {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #141712;
          border: 1px solid rgba(138,154,74,0.25);
          box-shadow: 0 16px 40px rgba(42,42,36,0.1);
          margin-bottom: 40px;
          cursor: zoom-in;
        }

        .pd-hero-showcase-bar {
          position: absolute;
          top: 16px;
          left: 18px;
          right: 18px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }

        .pd-hero-featured-tag {
          background: rgba(20,28,12,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #e8d9b5;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .pd-hero-zoom-btn {
          pointer-events: auto;
          background: rgba(20,28,12,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .pd-hero-zoom-btn:hover {
          background: #2a3a14;
        }

        .pd-hero-showcase img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .pd-hero-showcase:hover img {
          transform: scale(1.015);
        }

        /* ── SECTION WRAPPER ── */
        .pd-section { max-width: 1300px; margin: 0 auto; padding: 80px 60px; }
        .pd-section-label {
          font-size: 10px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; color: #8a9a4a;
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 16px;
        }
        .pd-section-label::before {
          content: ''; width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #8a9a4a, transparent);
        }
        .pd-section-title {
          font-family: var(--font-sans);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 300; color: #2a2a24;
          letter-spacing: -1px; line-height: 1.1;
          margin-bottom: 28px;
        }
        .pd-section-title em { font-style: normal; font-weight: 600; color: #8a9a4a; }

        /* ── OVERVIEW ── */
        .pd-overview-grid {
          display: grid; grid-template-columns: 1fr 380px; gap: 64px;
          align-items: start;
        }
        .pd-overview-text {
          font-size: 15px; font-weight: 300; line-height: 1.9; color: #4a4a3a;
        }
        .pd-overview-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 28px; }
        .pd-overview-tag {
          padding: 6px 14px;
          background: rgba(138,154,74,0.1);
          border: 1px solid rgba(138,154,74,0.22);
          border-radius: 20px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.8px;
          color: #4a5a1f;
        }

        /* ── SPECS CARD (CLEAN & SOBER) ── */
        .pd-specs-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 8px 24px rgba(42,42,36,0.05);
        }
        .pd-specs-title {
          font-family: var(--font-sans);
          font-size: 18px;
          font-weight: 600;
          color: #2a3a14;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(138,154,74,0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pd-specs-title::before {
          content: '✦';
          color: #8a9a4a;
          font-size: 12px;
        }
        .pd-specs-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pd-specs-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          padding-bottom: 12px;
          border-bottom: 1px dashed rgba(138,154,74,0.18);
        }
        .pd-specs-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .pd-specs-label {
          color: #7a7a68;
          font-weight: 400;
        }
        .pd-specs-val {
          color: #2a2a24;
          font-weight: 600;
          text-align: right;
        }



        /* ── BEFORE / AFTER REDESIGN ── */
        .pd-ba-section {
          background: rgba(42,58,20,0.04);
          border: 1px solid rgba(138,154,74,0.18);
          border-radius: 24px;
          padding: 36px 32px;
        }
        .pd-ba-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }
        .pd-ba-toggle {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .pd-ba-toggle-btn {
          padding: 8px 18px;
          border-radius: 20px;
          border: 1.5px solid rgba(138,154,74,0.3);
          background: rgba(255,255,255,0.7);
          font-family: var(--font-sans);
          font-size: 11.5px; font-weight: 500;
          color: #4a5a2f; cursor: pointer; transition: all 0.2s ease;
        }
        .pd-ba-toggle-btn.active {
          background: #2a3a14; color: #e8d9b5;
          border-color: #2a3a14;
          box-shadow: 0 4px 12px rgba(42,58,20,0.18);
        }
        .pd-ba-mode-switch {
          display: inline-flex;
          align-items: center;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(138,154,74,0.25);
          border-radius: 20px;
          padding: 3px;
          gap: 4px;
        }
        .pd-ba-mode-btn {
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 16px;
          border: none;
          background: transparent;
          color: #5a5a48;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        .pd-ba-mode-btn.active {
          background: #8a9a4a;
          color: #1f2710;
        }

        /* SIDE BY SIDE GRID */
        .pd-ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          position: relative;
        }
        .pd-ba-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 8px 24px rgba(42,42,36,0.06);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .pd-ba-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(42,42,36,0.12);
        }
        .pd-ba-card-header {
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fbf9f4;
          border-bottom: 1px solid rgba(138,154,74,0.15);
        }
        .pd-ba-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 12px;
        }
        .pd-ba-badge.before {
          background: rgba(180,60,40,0.1);
          color: #a43825;
          border: 1px solid rgba(180,60,40,0.25);
        }
        .pd-ba-badge.after {
          background: rgba(138,154,74,0.18);
          color: #3d5018;
          border: 1px solid rgba(138,154,74,0.4);
        }
        .pd-ba-zoom-hint {
          font-size: 11px;
          color: #8a8a7a;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s ease;
        }
        .pd-ba-zoom-hint:hover {
          color: #3d5018;
        }
        .pd-ba-img-frame {
          position: relative;
          background: #1a1a16;
          cursor: pointer;
          overflow: hidden;
          min-height: 280px;
          max-height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-ba-img-frame img {
          width: 100%;
          height: 100%;
          max-height: 440px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .pd-ba-card:hover .pd-ba-img-frame img {
          transform: scale(1.025);
        }
        .pd-ba-card-caption {
          padding: 12px 20px;
          font-size: 12.5px;
          color: #6a6a58;
          background: #ffffff;
        }

        /* FLIP / SWITCH VIEW */
        .pd-ba-switch-card {
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 12px 32px rgba(42,42,36,0.08);
        }
        .pd-ba-switch-bar {
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fbf9f4;
          border-bottom: 1px solid rgba(138,154,74,0.15);
        }
        .pd-ba-switch-btns {
          display: inline-flex;
          gap: 8px;
        }
        .pd-ba-switch-btn {
          padding: 7px 18px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        .pd-ba-switch-btn.active-before {
          background: #a43825;
          color: #ffffff;
        }
        .pd-ba-switch-btn.inactive-before {
          background: rgba(180,60,40,0.08);
          color: #a43825;
          border-color: rgba(180,60,40,0.25);
        }
        .pd-ba-switch-btn.active-after {
          background: #3d5018;
          color: #f5f0e8;
        }
        .pd-ba-switch-btn.inactive-after {
          background: rgba(138,154,74,0.12);
          color: #4a5a1f;
          border-color: rgba(138,154,74,0.3);
        }
        .pd-ba-switch-img {
          min-height: 380px;
          max-height: 520px;
          background: #1a1a16;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }
        .pd-ba-switch-img img {
          width: 100%;
          height: 100%;
          max-height: 520px;
          object-fit: cover;
          display: block;
        }

        /* LIGHTBOX FOR BA IMAGES */
        .pd-ba-modal {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(18,22,14,0.92);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .pd-ba-modal-content {
          max-width: 92vw;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .pd-ba-modal-content img {
          max-width: 90vw;
          max-height: 82vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .pd-ba-modal-close {
          position: absolute;
          top: -36px;
          right: 0;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
        }
        .pd-ba-modal-caption {
          margin-top: 14px;
          color: #e8d9b5;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 768px) {
          .pd-ba-section { padding: 24px 18px; }
          .pd-ba-grid { grid-template-columns: 1fr; gap: 20px; }
          .pd-ba-img-frame { max-height: 320px; }
          .pd-ba-top-bar { flex-direction: column; align-items: flex-start; }
        }

        /* ── SOBER CALL TO ACTION ── */
        .pd-cta-box {
          background: #ffffff;
          border-radius: 24px;
          padding: 48px;
          border: 1px solid rgba(138,154,74,0.22);
          box-shadow: 0 10px 30px rgba(42,42,36,0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 36px;
          flex-wrap: wrap;
        }
        .pd-cta-content {
          max-width: 600px;
        }
        .pd-cta-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8a9a4a;
          display: inline-block;
          margin-bottom: 10px;
        }
        .pd-cta-title {
          font-family: var(--font-sans);
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 300;
          color: #2a2a24;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .pd-cta-title em {
          font-style: normal;
          font-weight: 600;
          color: #8a9a4a;
        }
        .pd-cta-sub {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: #555545;
          margin: 0;
        }
        .pd-cta-buttons {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .pd-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          background: #2a3a14;
          color: #f5f0e8;
          border-radius: 14px;
          border: none;
          font-family: var(--font-sans);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(42,58,20,0.18);
        }
        .pd-cta-btn:hover {
          background: #3d5018;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(42,58,20,0.25);
        }
        .pd-cta-btn svg {
          transition: transform 0.2s ease;
        }
        .pd-cta-btn:hover svg {
          transform: translateX(3px);
        }
        .pd-wa-btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 22px;
          border-radius: 14px;
          border: 1.5px solid rgba(138,154,74,0.35);
          background: #ffffff;
          color: #2a3a14;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pd-wa-btn:hover {
          border-color: #8a9a4a;
          background: rgba(138,154,74,0.08);
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pd-overview-grid { grid-template-columns: 1fr; gap: 40px; }
          .pd-topbar, .pd-container, .pd-section { padding-left: 32px; padding-right: 32px; }
          .pd-gallery-thumbs { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 720px) {
          .pd-topbar, .pd-container, .pd-section { padding-left: 20px; padding-right: 20px; }
          .pd-title { font-size: 30px; }
          .pd-cta-box { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
          .pd-cta-buttons { width: 100%; flex-direction: column; align-items: stretch; }
          .pd-cta-btn, .pd-wa-btn { justify-content: center; }
          .pd-ba-section { padding: 24px 16px; }
        }
      `}</style>

      <div className="pd-page">

        {/* ── TOP NAV BAR ── */}
        <div className="pd-topbar">
          <button
            type="button"
            className="pd-back-btn"
            onClick={() => {
              navigate("/projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="pd-back-arrow">←</div>
            <span>Back to Projects</span>
          </button>
          <span className="pd-topbar-cat">{project.category}</span>
        </div>

        {/* ── CLEAN SOBER PROJECT HEADER & HERO SHOWCASE ── */}
        <div className="pd-container">
          <div className="pd-header">
            <span className="pd-eyebrow">
              ✦ {project.category} · {project.location}
            </span>
            <h1 className="pd-title">{project.title}</h1>
            {project.subtitle && (
              <p className="pd-subtitle">{project.subtitle}</p>
            )}
            <div className="pd-meta-row">
              <span className="pd-meta-item">📍 {project.location}</span>
              {project.area && (
                <>
                  <span className="pd-meta-sep">·</span>
                  <span className="pd-meta-item">📐 {project.area}</span>
                </>
              )}
              {project.year && (
                <>
                  <span className="pd-meta-sep">·</span>
                  <span className="pd-meta-item">🗓️ Completed {project.year}</span>
                </>
              )}
              {project.duration && (
                <>
                  <span className="pd-meta-sep">·</span>
                  <span className="pd-meta-item">⏱️ {project.duration}</span>
                </>
              )}
            </div>
          </div>

          {/* ── MAIN HERO SHOWCASE ── */}
          {heroImage && (
            <div
              className="pd-hero-showcase"
              onClick={() =>
                setBaLightbox({
                  img: heroImage,
                  caption: `${project.title} — Featured Project View (${project.location})`,
                })
              }
            >
              <div className="pd-hero-showcase-bar">
                <span className="pd-hero-featured-tag">
                  ✦ Featured Project View
                </span>
                <span className="pd-hero-zoom-btn">
                  🔍 Click to Zoom
                </span>
              </div>
              <img src={heroImage} alt={project.title} />
            </div>
          )}
        </div>

        {/* ── OVERVIEW ── */}
        <div className="pd-section">
          <div className="pd-section-label">Project Overview</div>
          <div className="pd-overview-grid">
            <div>
              <h2 className="pd-section-title">About this <em>Project</em></h2>
              <p className="pd-overview-text">
                {project.overview ||
                  `A tailored ${project.category?.toLowerCase() || "interior"} execution by Samarpan Group in ${project.location || "Nashik, Maharashtra"}. Designed with attention to spatial optimization, functional efficiency, and bespoke craftsmanship to create an inspiring, long-lasting space.`}
              </p>
              <div className="pd-overview-tags">
                {(project.tags || []).map((t) => (
                  <span key={t} className="pd-overview-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* SPECS CARD */}
            <div className="pd-specs-card">
              <div className="pd-specs-title">Project Summary</div>
              <div className="pd-specs-list">
                <div className="pd-specs-item">
                  <span className="pd-specs-label">Location</span>
                  <span className="pd-specs-val">{project.location}</span>
                </div>
                {project.area && (
                  <div className="pd-specs-item">
                    <span className="pd-specs-label">Total Area</span>
                    <span className="pd-specs-val">{project.area}</span>
                  </div>
                )}
                <div className="pd-specs-item">
                  <span className="pd-specs-label">Category</span>
                  <span className="pd-specs-val">{project.category}</span>
                </div>
                {project.duration && (
                  <div className="pd-specs-item">
                    <span className="pd-specs-label">Timeline</span>
                    <span className="pd-specs-val">{project.duration}</span>
                  </div>
                )}
                <div className="pd-specs-item">
                  <span className="pd-specs-label">Scope</span>
                  <span className="pd-specs-val">Civil & Interior</span>
                </div>
                <div className="pd-specs-item">
                  <span className="pd-specs-label">Execution Firm</span>
                  <span className="pd-specs-val">Samarpan Group, Nashik</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GALLERY ── */}
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Project Gallery</div>
          <h2 className="pd-section-title">Visual <em>Walkthrough</em></h2>
          <ProjectGallery media={project.media || []} gallery={project.gallery} accentColor={accentColor} />
        </div>

        {/* ── BEFORE / AFTER ── */}
        {project.beforeAfter?.length > 0 && ba && (
          <div className="pd-section" style={{ paddingTop: 0 }}>
            <div className="pd-section-label">Real Transformation</div>
            <h2 className="pd-section-title">Before & <em>After</em></h2>

            <div className="pd-ba-section">
              {/* TOP CONTROLS: Space Tabs + View Mode Toggle */}
              <div className="pd-ba-top-bar">
                {/* Space Selector Tabs */}
                <div className="pd-ba-toggle">
                  {project.beforeAfter.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`pd-ba-toggle-btn ${i === beforeAfterIdx ? "active" : ""}`}
                      onClick={() => setBeforeAfterIdx(i)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* View Mode Toggle: Side-by-side or Quick Switch */}
                <div className="pd-ba-mode-switch">
                  <button
                    type="button"
                    className={`pd-ba-mode-btn ${baViewMode === "sideBySide" ? "active" : ""}`}
                    onClick={() => setBaViewMode("sideBySide")}
                  >
                    Side-by-Side
                  </button>
                  <button
                    type="button"
                    className={`pd-ba-mode-btn ${baViewMode === "switch" ? "active" : ""}`}
                    onClick={() => setBaViewMode("switch")}
                  >
                    Direct Switch
                  </button>
                </div>
              </div>

              {/* MODE 1: SIDE BY SIDE */}
              {baViewMode === "sideBySide" ? (
                <div className="pd-ba-grid">
                  {/* BEFORE CARD */}
                  <div className="pd-ba-card">
                    <div className="pd-ba-card-header">
                      <span className="pd-ba-badge before">
                        <span>●</span> Before / Initial Site
                      </span>
                      <span
                        className="pd-ba-zoom-hint"
                        onClick={() =>
                          setBaLightbox({
                            img: resolveImg(ba.before),
                            caption: `${ba.label} — Before (Initial Site)`,
                          })
                        }
                      >
                        🔍 View Full
                      </span>
                    </div>
                    <div
                      className="pd-ba-img-frame"
                      onClick={() =>
                        setBaLightbox({
                          img: resolveImg(ba.before),
                          caption: `${ba.label} — Before (Initial Site)`,
                        })
                      }
                    >
                      <img
                        src={resolveImg(ba.before)}
                        alt={`Before - ${ba.label}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="pd-ba-card-caption">
                      Original raw space before Samarpan Group renovation
                    </div>
                  </div>

                  {/* AFTER CARD */}
                  <div className="pd-ba-card">
                    <div className="pd-ba-card-header">
                      <span className="pd-ba-badge after">
                        <span>✦</span> After / Transformation
                      </span>
                      <span
                        className="pd-ba-zoom-hint"
                        onClick={() =>
                          setBaLightbox({
                            img: resolveImg(ba.after),
                            caption: `${ba.label} — After (Finished Space)`,
                          })
                        }
                      >
                        🔍 View Full
                      </span>
                    </div>
                    <div
                      className="pd-ba-img-frame"
                      onClick={() =>
                        setBaLightbox({
                          img: resolveImg(ba.after),
                          caption: `${ba.label} — After (Finished Space)`,
                        })
                      }
                    >
                      <img
                        src={resolveImg(ba.after)}
                        alt={`After - ${ba.label}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="pd-ba-card-caption">
                      Completed execution with bespoke finishes & styling
                    </div>
                  </div>
                </div>
              ) : (
                /* MODE 2: DIRECT SWITCH */
                <div className="pd-ba-switch-card">
                  <div className="pd-ba-switch-bar">
                    <div className="pd-ba-switch-btns">
                      <button
                        type="button"
                        className={`pd-ba-switch-btn ${
                          activeSwitchView === "before"
                            ? "active-before"
                            : "inactive-before"
                        }`}
                        onClick={() => setActiveSwitchView("before")}
                      >
                        ● View Before
                      </button>
                      <button
                        type="button"
                        className={`pd-ba-switch-btn ${
                          activeSwitchView === "after"
                            ? "active-after"
                            : "inactive-after"
                        }`}
                        onClick={() => setActiveSwitchView("after")}
                      >
                        ✦ View After
                      </button>
                    </div>

                    <span
                      className="pd-ba-zoom-hint"
                      onClick={() =>
                        setBaLightbox({
                          img: resolveImg(
                            activeSwitchView === "before" ? ba.before : ba.after
                          ),
                          caption: `${ba.label} — ${
                            activeSwitchView === "before"
                              ? "Before (Initial Site)"
                              : "After (Finished Space)"
                          }`,
                        })
                      }
                    >
                      🔍 Click to Zoom
                    </span>
                  </div>

                  <div
                    className="pd-ba-switch-img"
                    onClick={() =>
                      setBaLightbox({
                        img: resolveImg(
                          activeSwitchView === "before" ? ba.before : ba.after
                        ),
                        caption: `${ba.label} — ${
                          activeSwitchView === "before"
                            ? "Before (Initial Site)"
                            : "After (Finished Space)"
                        }`,
                      })
                    }
                  >
                    <img
                      src={resolveImg(
                        activeSwitchView === "before" ? ba.before : ba.after
                      )}
                      alt={activeSwitchView === "before" ? "Before" : "After"}
                      loading="lazy"
                    />
                  </div>
                  <div className="pd-ba-card-caption" style={{ textAlign: "center" }}>
                    Showing:{" "}
                    <strong>
                      {activeSwitchView === "before"
                        ? "Initial Raw Site"
                        : "Samarpan Transformation"}
                    </strong>{" "}
                    ({ba.label})
                  </div>
                </div>
              )}

              <p
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 12,
                  color: "#6a7a50",
                  letterSpacing: 0.5,
                }}
              >
                💡 Click on any photo to view and zoom the full high-resolution image.
              </p>
            </div>
          </div>
        )}

        {/* ── CALL TO ACTION BANNER ── */}
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-cta-box">
            <div className="pd-cta-content">
              <span className="pd-cta-tag">✦ Let's Discuss Your Project</span>
              <h2 className="pd-cta-title">
                Inspired by this <em>project?</em>
              </h2>
              <p className="pd-cta-sub">
                Connect with our team to discuss your floor plan, civil construction, or bespoke interior requirements.
              </p>
            </div>

            <div className="pd-cta-buttons">
              <button
                type="button"
                className="pd-cta-btn"
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span>Book Free Consultation</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://wa.me/918055587237"
                target="_blank"
                rel="noopener noreferrer"
                className="pd-wa-btn"
              >
                WhatsApp Us
              </a>

              <button
                type="button"
                className="pd-wa-btn"
                onClick={() => {
                  navigate("/projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                ← All Projects
              </button>
            </div>
          </div>
        </div>

      </div>


      {/* ── BEFORE / AFTER LIGHTBOX ── */}
      {baLightbox && (
        <div className="pd-ba-modal" onClick={() => setBaLightbox(null)}>
          <div
            className="pd-ba-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="pd-ba-modal-close"
              onClick={() => setBaLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={baLightbox.img} alt={baLightbox.caption} />
            <div className="pd-ba-modal-caption">{baLightbox.caption}</div>
          </div>
        </div>
      )}
    </>
  );
}