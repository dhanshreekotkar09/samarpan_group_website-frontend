import { useState, useEffect, useRef } from "react";
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
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const sliderRef = useRef(null);

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

  // Before/After slider logic
  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
      setSliderPos(pct);
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

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

        /* ── HERO ── */
        .pd-hero {
          height: 70vh; min-height: 500px;
          position: relative; overflow: hidden;
        }
        .pd-hero img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .pd-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(20,28,10,0.88) 0%, rgba(20,28,10,0.3) 50%, transparent 100%);
        }
        .pd-hero-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 60px;
          max-width: 1300px; margin: 0 auto;
        }
        .pd-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 5px 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.8); margin-bottom: 20px;
          backdrop-filter: blur(8px);
          max-width: 100%;
          flex-wrap: wrap;
        }
        .pd-hero-chip { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
        .pd-hero-meta { opacity: 0.85; }
        .pd-hero-title {
          font-family: var(--font-sans);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 300; line-height: 1.05;
          color: #f5f0e8; letter-spacing: -2px;
          margin-bottom: 12px; max-width: 700px;
        }
        .pd-hero-title em { font-style: normal; font-weight: 600; color: #c8d890; }
        .pd-hero-subtitle {
          font-size: 14px; font-weight: 300; color: rgba(245,240,232,0.7);
          max-width: 500px; line-height: 1.8;
        }

        /* ── HIGHLIGHTS BAR ── */
        .pd-highlights {
          background: #2a3a14;
          padding: 28px 60px;
          display: flex; align-items: center; justify-content: center;
          gap: 0; flex-wrap: wrap;
          overflow-x: hidden;
          max-width: 100%;
          box-sizing: border-box;
        }
        .pd-highlight-item {
          display: flex; align-items: center; gap: 12px;
          padding: 0 36px;
          border-right: 1px solid rgba(184,204,106,0.2);
          min-width: 0;
        }
        .pd-highlight-item:last-child { border-right: none; }
        .pd-highlight-icon { font-size: 20px; }
        .pd-highlight-label {
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #8a9a4a; margin-bottom: 2px;
        }
        .pd-highlight-value {
          font-family: var(--font-sans);
          font-size: 16px; font-weight: 400; color: #e0ecb0;
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

        /* ARCHITECT CARD */
        .pd-architect-card {
          background: linear-gradient(145deg, #2a3a14, #3d4a1f);
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(184,204,106,0.15);
          position: relative; overflow: hidden;
        }
        .pd-architect-card::before {
          content: '';
          position: absolute; top: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(184,204,106,0.06);
        }
        .pd-architect-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(184,204,106,0.15);
          border: 2px solid rgba(184,204,106,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin-bottom: 16px;
        }
        .pd-architect-name {
          font-family: var(--font-sans);
          font-size: 22px; font-weight: 500; color: #e0ecb0;
          margin-bottom: 4px;
        }
        .pd-architect-role {
          font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: #8aaa60; margin-bottom: 4px;
        }
        .pd-architect-exp {
          font-size: 11px; color: #6a8a4a; margin-bottom: 20px;
        }
        .pd-architect-sep {
          height: 1px; background: rgba(184,204,106,0.15); margin: 16px 0;
        }
        .pd-architect-quote {
          font-family: var(--font-sans);
          font-size: 15px; font-weight: 300;
          color: #c0d890; line-height: 1.7;
        }
        .pd-architect-quote::before { content: '"'; font-size: 24px; color: #8a9a4a; }

        /* ── GALLERY ── */
        .pd-gallery-main {
          border-radius: 20px; overflow: hidden;
          height: 480px; margin-bottom: 16px;
          position: relative; cursor: zoom-in;
          background: #1a2810;
        }
        .pd-gallery-main img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .pd-gallery-main:hover img { transform: scale(1.03); }
        .pd-gallery-main-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 24px;
          background: linear-gradient(to top, rgba(20,28,10,0.85) 0%, transparent 100%);
          font-size: 12px; font-weight: 300; color: rgba(245,240,232,0.85);
          letter-spacing: 0.3px;
        }
        .pd-gallery-thumbs {
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;
        }
        .pd-gallery-thumb {
          border-radius: 12px; overflow: hidden;
          height: 80px; cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          background: #1a2810;
        }
        .pd-gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pd-gallery-thumb.active {
          border-color: #8a9a4a;
          box-shadow: 0 0 0 3px rgba(138,154,74,0.2);
        }
        .pd-gallery-thumb:hover { border-color: rgba(138,154,74,0.5); }

        /* ── BEFORE / AFTER ── */
        .pd-ba-section { background: rgba(42,58,20,0.04); border-radius: 24px; padding: 48px; }
        .pd-ba-toggle {
          display: flex; gap: 10px; margin-bottom: 32px; flex-wrap: wrap;
        }
        .pd-ba-toggle-btn {
          padding: 8px 20px;
          border-radius: 20px;
          border: 1.5px solid rgba(138,154,74,0.28);
          background: transparent;
          font-family: var(--font-sans);
          font-size: 11px; font-weight: 500; letter-spacing: 0.8px;
          color: #5a5a4a; cursor: pointer; transition: all 0.2s ease;
        }
        .pd-ba-toggle-btn.active {
          background: #2a3a14; color: #c8d890;
          border-color: transparent;
        }
        .pd-ba-slider {
          border-radius: 16px; overflow: hidden;
          height: 400px; position: relative;
          cursor: ew-resize; user-select: none;
        }
        .pd-ba-after {
          position: absolute; inset: 0;
          overflow: hidden;
        }
        .pd-ba-after img { width: 100%; height: 100%; object-fit: cover; }
        .pd-ba-before {
          position: absolute; inset: 0;
          overflow: hidden;
        }
        .pd-ba-before img {
          width: 100%; height: 100%; object-fit: cover;
          position: absolute; top: 0; left: 0;
        }
        .pd-ba-handle {
          position: absolute; top: 0; bottom: 0;
          width: 3px; background: #fff;
          cursor: ew-resize; z-index: 10;
          display: flex; align-items: center; justify-content: center;
        }
        .pd-ba-handle-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          font-size: 16px; color: #2a3a14;
          font-weight: 700;
        }
        .pd-ba-label {
          position: absolute; top: 16px;
          background: rgba(0,0,0,0.6);
          color: #fff; font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 5px 12px; border-radius: 12px;
          backdrop-filter: blur(6px);
        }

        /* ── TIMELINE ── */
        .pd-timeline { position: relative; }
        .pd-timeline::before {
          content: '';
          position: absolute; left: 28px; top: 0; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, #8a9a4a, rgba(138,154,74,0.1));
        }
        .pd-timeline-item {
          display: flex; gap: 32px;
          margin-bottom: 40px; position: relative;
        }
        .pd-timeline-dot {
          width: 58px; height: 58px; flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a3a14, #3d4a1f);
          border: 2px solid rgba(184,204,106,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-sans);
          font-size: 18px; font-weight: 300; color: #c8d890;
          position: relative; z-index: 1;
          box-shadow: 0 0 0 6px rgba(245,240,232,1);
        }
        .pd-timeline-content {
          flex: 1; padding-top: 10px;
        }
        .pd-timeline-header {
          display: flex; align-items: baseline;
          gap: 12px; margin-bottom: 8px;
        }
        .pd-timeline-title {
          font-family: var(--font-sans);
          font-size: 20px; font-weight: 500; color: #2a2a24;
        }
        .pd-timeline-duration {
          font-size: 10px; font-weight: 600; letter-spacing: 1px;
          color: #8a9a4a;
          padding: 3px 10px;
          background: rgba(138,154,74,0.1);
          border-radius: 10px;
        }
        .pd-timeline-desc {
          font-size: 13px; font-weight: 300;
          color: #5a5a4a; line-height: 1.8;
        }

        /* ── DESIGN PHILOSOPHY ── */
        .pd-philosophy-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .pd-philosophy-card {
          background: rgba(255,252,245,0.7);
          border: 1px solid rgba(138,154,74,0.15);
          border-radius: 16px; padding: 28px;
          transition: all 0.3s ease;
        }
        .pd-philosophy-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(42,42,36,0.1);
          border-color: rgba(138,154,74,0.3);
        }
        .pd-philosophy-num {
          font-family: var(--font-sans);
          font-size: 36px; font-weight: 300; color: rgba(138,154,74,0.3);
          line-height: 1; margin-bottom: 8px;
        }
        .pd-philosophy-title {
          font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
          color: #2a2a24; margin-bottom: 10px;
        }
        .pd-philosophy-desc {
          font-size: 12.5px; font-weight: 300;
          color: #5a5a4a; line-height: 1.8;
        }

        /* ── TESTIMONIAL ── */
        .pd-testimonial {
          background: linear-gradient(145deg, #2a3a14, #3d4a1f);
          border-radius: 24px; padding: 56px;
          position: relative; overflow: hidden;
          text-align: center;
        }
        .pd-testimonial::before {
          content: '"';
          position: absolute; top: -20px; left: 40px;
          font-family: var(--font-sans);
          font-size: 200px; font-weight: 300;
          color: rgba(184,204,106,0.06); line-height: 1;
          pointer-events: none;
        }
        .pd-testimonial-stars {
          font-size: 20px; margin-bottom: 24px; letter-spacing: 4px;
        }
        .pd-testimonial-text {
          font-family: var(--font-sans);
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 400;
          color: #e0ecb0; line-height: 1.8;
          max-width: 760px; margin: 0 auto 32px;
          position: relative; z-index: 1;
        }
        .pd-testimonial-author {
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.5px; color: #c8d890;
        }
        .pd-testimonial-role {
          font-size: 11px; font-weight: 300; color: #8aaa60;
          margin-top: 4px;
        }

        /* ── ENQUIRY CTA ── */
        .pd-enquiry-band {
          background: #f5f0e8;
          border-top: 1px solid rgba(138,154,74,0.15);
          padding: 72px 60px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
        }
        .pd-enquiry-left h2 {
          font-family: var(--font-sans);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 300; color: #2a2a24;
          letter-spacing: -1px; margin-bottom: 10px;
        }
        .pd-enquiry-left h2 em { font-style: normal; font-weight: 600; color: #8a9a4a; }
        .pd-enquiry-left p {
          font-size: 13px; font-weight: 300; color: #5a5a4a;
          line-height: 1.8; max-width: 420px;
        }
        .pd-enquiry-btns { display: flex; gap: 14px; flex-shrink: 0; flex-wrap: wrap; }
        .pd-enquiry-primary {
          padding: 16px 36px;
          background: linear-gradient(135deg, #2a3a14, #3d4a1f);
          color: #c8d890; font-family: var(--font-sans);
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; border: none; border-radius: 12px;
          cursor: pointer; box-shadow: 0 8px 24px rgba(42,58,20,0.25);
          transition: all 0.3s ease;
        }
        .pd-enquiry-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(42,58,20,0.35); }
        .pd-enquiry-secondary {
          padding: 16px 36px;
          background: transparent;
          border: 1.5px solid rgba(138,154,74,0.35);
          color: #4a5a1f; font-family: var(--font-sans);
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; border-radius: 12px;
          cursor: pointer; transition: all 0.3s ease;
        }
        .pd-enquiry-secondary:hover { border-color: rgba(138,154,74,0.7); background: rgba(138,154,74,0.06); }

        /* ── ENQUIRY MODAL ── */
        .pd-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(20,28,10,0.88);
          backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pd-modal {
          background: #f5f0e8;
          border-radius: 24px; overflow: hidden;
          max-width: 560px; width: 100%;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pd-modal-header {
          background: linear-gradient(135deg, #2a3a14, #3d4a1f);
          padding: 32px 36px;
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .pd-modal-header h3 {
          font-family: var(--font-sans);
          font-size: 28px; font-weight: 300; color: #e0ecb0;
          letter-spacing: -0.5px;
        }
        .pd-modal-header p {
          font-size: 12px; font-weight: 300; color: #8aaa60;
          margin-top: 4px;
        }
        .pd-modal-close {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%; color: #e0ecb0;
          font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s ease;
        }
        .pd-modal-close:hover { background: rgba(255,255,255,0.2); }
        .pd-modal-body { padding: 36px; }
        .pd-modal-field { margin-bottom: 20px; }
        .pd-modal-label {
          display: block; font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #6a7a4a; margin-bottom: 8px;
        }
        .pd-modal-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,252,245,0.9);
          border: 1.5px solid rgba(138,154,74,0.2);
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 13px; font-weight: 300; color: #2a2a24;
          outline: none; transition: border-color 0.2s ease;
        }
        .pd-modal-input:focus { border-color: rgba(138,154,74,0.55); }
        .pd-modal-textarea { min-height: 90px; resize: vertical; }
        .pd-modal-submit {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #2a3a14, #3d4a1f);
          color: #c8d890; font-family: var(--font-sans);
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; border: none; border-radius: 12px;
          cursor: pointer; margin-top: 8px;
          transition: all 0.25s ease;
        }
        .pd-modal-submit:hover { background: linear-gradient(135deg, #3d4a1f, #4d5a2f); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pd-overview-grid { grid-template-columns: 1fr; gap: 40px; }
          .pd-topbar, .pd-hero-content, .pd-section, .pd-highlights, .pd-enquiry-band { padding-left: 32px; padding-right: 32px; }
          .pd-gallery-thumbs { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 720px) {
          .pd-hero { height: 58vh; min-height: 380px; }
          .pd-topbar, .pd-hero-content, .pd-section, .pd-highlights, .pd-enquiry-band { padding-left: 20px; padding-right: 20px; }
          .pd-hero-content { padding-bottom: 32px; padding-top: 28px; }
          .pd-hero-eyebrow {
            flex-direction: column; align-items: flex-start; gap: 8px;
            padding: 0; margin-bottom: 14px;
            background: none; border: none; backdrop-filter: none; border-radius: 0;
          }
          .pd-hero-chip {
            padding: 6px 12px;
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 999px;
            backdrop-filter: blur(8px);
            font-size: 8px; letter-spacing: 1.6px;
          }
          .pd-hero-meta {
            padding-left: 2px;
            font-size: 10px; letter-spacing: 1.4px;
            color: rgba(255,255,255,0.72);
            line-height: 1.5;
          }
          .pd-hero-title { font-size: 32px; letter-spacing: -0.6px; line-height: 1.12; }
          .pd-highlights { gap: 8px; }
          .pd-highlight-item { padding: 0 16px; border-right: none; border-bottom: 1px solid rgba(184,204,106,0.15); padding-bottom: 16px; }
          .pd-philosophy-grid { grid-template-columns: 1fr; }
          .pd-gallery-thumbs { grid-template-columns: repeat(3, 1fr); }
          .pd-testimonial { padding: 36px 28px; }
          .pd-enquiry-band { flex-direction: column; }
          .pd-timeline::before { left: 22px; }
          .pd-timeline-dot { width: 46px; height: 46px; font-size: 14px; }
          .pd-ba-section { padding: 28px 20px; }
        }
      `}</style>

      <div className="pd-page">

        {/* ── TOP NAV BAR ── */}
        <div className="pd-topbar">
          <button className="pd-back-btn" onClick={() => navigate("/projects")}>
            <div className="pd-back-arrow">←</div>
            All Projects
          </button>
          <span className="pd-topbar-cat">{project.category}</span>
        </div>

        {/* ── HERO ── */}
        <div className="pd-hero">
          <img src={heroImage} alt={project.title} />
          <div className="pd-hero-overlay" />
          <div className="pd-hero-content">
            <div className="pd-hero-eyebrow">
              <span className="pd-hero-chip">✦ {project.category}</span>
              <span className="pd-hero-meta">
                {[project.year, project.location].filter(Boolean).join("  ·  ")}
              </span>
            </div>
            <h1 className="pd-hero-title">
              {project.title.split(" ").slice(0, -1).join(" ")}{" "}
              <em>{project.title.split(" ").slice(-1)}</em>
            </h1>
            <p className="pd-hero-subtitle">{project.subtitle}</p>
          </div>
        </div>

        {/* ── HIGHLIGHTS BAR ── */}
        <div className="pd-highlights">
          {(project.highlights || []).map((h, i) => (
            <div key={i} className="pd-highlight-item">
              <div className="pd-highlight-icon">{h.icon}</div>
              <div>
                <div className="pd-highlight-label">{h.label}</div>
                <div className="pd-highlight-value">{h.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        <div className="pd-section">
          <div className="pd-section-label">Project Overview</div>
          <div className="pd-overview-grid">
            <div>
              <h2 className="pd-section-title">About this <em>Project</em></h2>
              <p className="pd-overview-text">{project.overview}</p>
              <div className="pd-overview-tags">
                {(project.tags || []).map((t) => (
                  <span key={t} className="pd-overview-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* ARCHITECT CARD */}
            {project.architect?.name && (
            <div className="pd-architect-card">
              <div className="pd-architect-avatar">👷</div>
              <div className="pd-architect-name">{project.architect.name}</div>
              <div className="pd-architect-role">{project.architect.role}</div>
              <div className="pd-architect-exp">{project.architect.experience} · {project.architect.specialization}</div>
              <div className="pd-architect-sep" />
              <div className="pd-architect-quote">{project.architect.quote}</div>
            </div>
            )}
          </div>
        </div>

        {/* ── GALLERY ── */}
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Project Gallery</div>
          <h2 className="pd-section-title">Visual <em>Walkthrough</em></h2>
          {heroImage && (
            <div className="pd-gallery-main" style={{ marginBottom: 24 }}>
              <img src={heroImage} alt={project.title} />
              <div className="pd-gallery-main-caption">{project.title}</div>
            </div>
          )}
          <ProjectGallery media={project.media || []} gallery={project.gallery} accentColor={accentColor} />
        </div>

        {/* ── BEFORE / AFTER ── */}
        {(project.beforeAfter?.length > 0) && (
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Transformation</div>
          <h2 className="pd-section-title">Before & <em>After</em></h2>
          <div className="pd-ba-section">
            <div className="pd-ba-toggle">
              {project.beforeAfter.map((ba, i) => (
                <button
                  key={i}
                  className={`pd-ba-toggle-btn ${i === beforeAfterIdx ? "active" : ""}`}
                  onClick={() => { setBeforeAfterIdx(i); setSliderPos(50); }}
                >
                  {ba.label}
                </button>
              ))}
            </div>
            <div
              className="pd-ba-slider"
              ref={sliderRef}
              onMouseDown={handleSliderMouseDown}
              onTouchStart={handleSliderMouseDown}
            >
              {/* AFTER (base) */}
              <div className="pd-ba-after">
                <img src={resolveImg(ba.after)} alt="After" />
              </div>
              {/* BEFORE (clipped) */}
              <div className="pd-ba-before" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <img src={resolveImg(ba.before)} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* HANDLE */}
              <div className="pd-ba-handle" style={{ left: `${sliderPos}%` }}>
                <div className="pd-ba-handle-circle">⇔</div>
              </div>
              {/* LABELS */}
              <div className="pd-ba-label" style={{ left: 16 }}>Before</div>
              <div className="pd-ba-label" style={{ right: 16 }}>After</div>
            </div>
            <p style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#8a9a6a", letterSpacing: 1 }}>
              ← Drag the slider to compare →
            </p>
          </div>
        </div>
        )}

        {/* ── DESIGN PHILOSOPHY ── */}
        {(project.designPhilosophy?.length > 0) && (
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Design Approach</div>
          <h2 className="pd-section-title">Our Design <em>Philosophy</em></h2>
          <div className="pd-philosophy-grid">
            {project.designPhilosophy.map((p, i) => (
              <div key={i} className="pd-philosophy-card">
                <div className="pd-philosophy-num">0{i + 1}</div>
                <div className="pd-philosophy-title">{p.title}</div>
                <div className="pd-philosophy-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* ── TIMELINE ── */}
        {(project.timeline?.length > 0) && (
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Project Journey</div>
          <h2 className="pd-section-title">How We <em>Worked</em></h2>
          <div className="pd-timeline">
            {project.timeline.map((step, i) => (
              <div key={i} className="pd-timeline-item">
                <div className="pd-timeline-dot">{step.phase}</div>
                <div className="pd-timeline-content">
                  <div className="pd-timeline-header">
                    <div className="pd-timeline-title">{step.title}</div>
                    <div className="pd-timeline-duration">{step.duration}</div>
                  </div>
                  <div className="pd-timeline-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* ── TESTIMONIAL ── */}
        {project.testimonial?.text && (
        <div className="pd-section" style={{ paddingTop: 0 }}>
          <div className="pd-section-label">Client Voice</div>
          <h2 className="pd-section-title">What Our <em>Client Said</em></h2>
          <div className="pd-testimonial">
            <div className="pd-testimonial-stars">
              {"★".repeat(project.testimonial.rating || 5)}
            </div>
            <p className="pd-testimonial-text">"{project.testimonial.text}"</p>
            <div className="pd-testimonial-author">{project.testimonial.author}</div>
            <div className="pd-testimonial-role">{project.testimonial.role}</div>
          </div>
        </div>
        )}

        {/* ── ENQUIRY CTA ── */}
        <div className="pd-enquiry-band">
          <div className="pd-enquiry-left">
            <h2>Inspired by this <em>Project?</em></h2>
            <p>Let's talk about how we can create something equally special — or even better — for your space.</p>
          </div>
          <div className="pd-enquiry-btns">
            <button className="pd-enquiry-primary" onClick={() => setEnquiryOpen(true)}>
              Enquire About This Style →
            </button>
            <button className="pd-enquiry-secondary" onClick={() => navigate("/projects")}>
              ← See All Projects
            </button>
          </div>
        </div>

      </div>

      {/* ── ENQUIRY MODAL ── */}
      {enquiryOpen && (
        <div className="pd-modal-overlay" onClick={() => setEnquiryOpen(false)}>
          <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">
              <div>
                <h3>Start Your Project</h3>
                <p>Inspired by {project.title} — tell us about your space</p>
              </div>
              <button className="pd-modal-close" onClick={() => setEnquiryOpen(false)}>✕</button>
            </div>
            <div className="pd-modal-body">
              <div className="pd-modal-field">
                <label className="pd-modal-label">Your Name</label>
                <input
                  className="pd-modal-input"
                  placeholder="e.g. Rajesh Sharma"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                />
              </div>
              <div className="pd-modal-field">
                <label className="pd-modal-label">Phone Number</label>
                <input
                  className="pd-modal-input"
                  placeholder="+91 98765 43210"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                />
              </div>
              <div className="pd-modal-field">
                <label className="pd-modal-label">Email Address</label>
                <input
                  className="pd-modal-input"
                  placeholder="your@email.com"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                />
              </div>
              <div className="pd-modal-field">
                <label className="pd-modal-label">Tell Us About Your Space</label>
                <textarea
                  className="pd-modal-input pd-modal-textarea"
                  placeholder="e.g. 3BHK flat in Nashik, looking for a similar style to this project..."
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                />
              </div>
              <button
                className="pd-modal-submit"
                onClick={() => {
                  alert("Thank you! We'll contact you within 24 hours. 🌿");
                  setEnquiryOpen(false);
                  setEnquiryForm({ name: "", phone: "", email: "", message: "" });
                }}
              >
                Send Enquiry →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}