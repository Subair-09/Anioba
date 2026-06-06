import { Service, Testimonial, Stat, WhyChooseUsFeature, ProcessStep, Founder } from "./types";

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "House & Industrial Wiring",
    description: "End-to-end safe, modern, and compliant electrical wiring solutions for custom residential builds & high-capacity heavy industries.",
    detailedDescription: "Our certified electrical engineers provide comprehensive wiring installations. From architectural planning and cable tray designs to final smart board fittings, termination, and live testing. We adhere strictly to national code standards and use premium, fire-resistant insulation materials.",
    iconName: "Zap",
    image: "https://imgur.com/hSkz64y.png",
    features: [
      "Residential Smart Home Integration",
      "Industrial Power Distribution Systems",
      "Compliance Testing & Fire hazard Audits",
      "Emergency Power Panel Upgrades"
    ]
  },
  {
    id: 2,
    title: "House & Industrial Solar Setup",
    description: "Sophisticated hybrid and off-grid solar energy systems utilizing premium photovoltaic cells and clean smart inverter storage cells.",
    detailedDescription: "Empower your home or warehouse with absolute energy independence. We design, install, and align high-efficiency premium solar panels coupled with smart lithium-ion storage arrays (Tesla, Huawei certified). Say goodbye to billing shocks and rolling grid outages with real-time solar yield tracking.",
    iconName: "Sun",
    image: "https://imgur.com/x8X7Lys.png",
    features: [
      "High-Yield PV Panel Alignments",
      "Off-Grid & Grid-Tied Hybrid Storage",
      "IoT Mobile Yield Trackers",
      "Net Metering Setup & Approvals"
    ]
  },
  {
    id: 3,
    title: "Supply of Premium Equipment",
    description: "Direct elite sourcing of high-durability industrial cables, heavy switchgears, circuit breakers, smart appliances, and premium fixtures.",
    detailedDescription: "As licensed distributors, we supply certified heavy electrical switchgear, high-efficiency lighting arrays, power relays, custom conduits, and top-tier consumer appliances. All products feature direct manufacturer warrantees, ensuring complete reliability, long-term support, and superior stress resistance.",
    iconName: "Cpu",
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "OEM Certified Heavy Switchgear",
      "High-Voltage armored copper cabling",
      "Commercial LED & Ambient Fixtures",
      "Standard Manufacturer-backed Warranties"
    ]
  },
  {
    id: 4,
    title: "Construction Consulting",
    description: "Expert engineering consultations, structural blueprint analysis, cost estimates, material selection guidance, and regulatory compliance checks.",
    detailedDescription: "Avoid costly mistakes before turning the sod. Our team of certified construction consultants, architects, and quantity surveyors evaluates feasibility plans, soil models, green building energy designs, structural metrics, and permits to build a bulletproof structural blueprint that is built to last.",
    iconName: "HardHat",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Comprehensive Architectural Feasibilities",
      "BIM Modeling & Stress Simulations",
      "SLA Cost & Quantity Surveying",
      "Local Code Compliance & Permitting"
    ]
  },
  {
    id: 5,
    title: "Elite Contractor Services",
    description: "Turnkey structural execution, foundation-to-finish masonry, premium steel works, modern architectural concrete, and site management.",
    detailedDescription: "Whether erecting custom estate villas, warehouse depots, or corporate offices, we handle physical construction with meticulous precision. Our operations bring together master masonries, structural steel erections, premium plumbing assemblies, and precise spatial planning and project tracking.",
    iconName: "Briefcase",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Rigid Structural Frame Assemblies",
      "Precision Foundations & Retaining Walls",
      "Superb Finishing & Millwork",
      "Rigorous On-Site Safety Controls"
    ]
  },
  {
    id: 6,
    title: "Mechanic & Electrical Engineering (M&E)",
    description: "Full mechanical and electrical installations, high-capacity ventilation, HVAC, industrial piping networks, and load-balanced panel arrays.",
    detailedDescription: "Our elite M&E engineering division designs and delivers comprehensive industrial mechanical and electrical integration models. This includes building automation systems, complex heavy fluid hydraulic pumps, custom duct routing, commercial fire alarms, and optimized thermal ventilation schematics.",
    iconName: "Wrench",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Industrial HVAC & Mechanical Cooling Systems",
      "Heavy Load-Balanced Power Panels & Switchboards",
      "Plumbing, Sump Pumps & Hydraulic Distribution Networks",
      "Routine Technical Performance Audits & Safety Certifications"
    ]
  },
  {
    id: 7,
    title: "Architectural Drawings & Designs",
    description: "Custom blueprints, precise CAD drafting, standard 3D structural rendering, architectural plans, and load-bearing calculations.",
    detailedDescription: "We provide modern architectural drafts customized to your exact spatial and load requirements. Utilizing advanced BIM modeling, we translate initial aesthetic sketches into detailed construction sheets with concrete reinforcement details, scale elevations, and spatial configurations.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Elite Architectural CAD Blueprints & Renderings",
      "3D Building Information Modeling (BIM) Renderings",
      "Structural Steel & Reinforced Concrete Detail Sheets",
      "Building Code Compliance & Standard Approval Documentation"
    ]
  },
  {
    id: 8,
    title: "Real Estate Development",
    description: "Property planning, secure physical land sourcing, luxury modern finishes, and turnkey commercial & residential asset construction.",
    detailedDescription: "We identify, secure, and transform premium land corridors into high-yield commercial hubs or residential properties. Anioba manages zoning regulations, executes high-specification luxury finishings, and hands over secure assets with vetted legal titles.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Symmetrical Subdivisions & Commercial Hub Siting",
      "Legal Title Sourcing, Verification, and Land Acquisition",
      "Luxury Hand-Finished Custom Residential Units",
      "Turnkey Mixed-Use Real Estate Developments"
    ]
  },
  {
    id: 9,
    title: "Real Estate Supervision & Elite Contracting Services",
    description: "Professional site supervision, materials quality checking, rigorous progress monitoring, and everything related to elite technical & contracting services.",
    detailedDescription: "For discerning developers and luxury homeowners, we supervise physical site executions, manage material specifications, inspect concrete slump metrics, and provide overarching contracting administration. Our expert supervision ensures perfect building safety, strict adherence to blueprints, and full alignment with elite technical standards.",
    iconName: "Eye",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Continuous On-Site Supervision & Contractor Coordination",
      "Rigorous Material Stress Testing & Delivery Verification",
      "Building Code Compliance & Standard Environmental Auditing",
      "Comprehensive Turnkey Technical & Contracting Project Management"
    ]
  }
];

export const STATS: Stat[] = [
  {
    id: 1,
    value: "450+",
    numericVal: 450,
    suffix: "+",
    label: "Projects Completed",
    description: "Impeccably delivered complex projects across diverse sectors"
  },
  {
    id: 2,
    value: "99.4%",
    numericVal: 99.4,
    suffix: "%",
    label: "Satisfied Clients",
    description: "Consistently highly rated for meticulous engineering and trust"
  },
  {
    id: 3,
    value: "1.2MW",
    numericVal: 1.2,
    suffix: "MW",
    label: "Solar Installed",
    description: "Renewable energy solutions helping build clean, resilient setups"
  },
  {
    id: 4,
    value: "12+",
    numericVal: 12,
    suffix: "Yrs",
    label: "Years Experience",
    description: "Deep technical industry mastery and professional contracting"
  }
];

export const WHY_CHOOSE_US: WhyChooseUsFeature[] = [
  {
    id: 1,
    title: "Registered & Certified",
    description: "Fully licensed engineering and contracting firm. We hold certified status with standard construction regulators.",
    iconName: "ShieldCheck"
  },
  {
    id: 2,
    title: "Uncompromising Quality",
    description: "We use top-tier materials: gold-standard fire-retardant cabling, certified concrete standards, and premium solar panels.",
    iconName: "Award"
  },
  {
    id: 3,
    title: "Tailored Solutions",
    description: "No templated blueprints. Every wiring diagram, inverter battery capacity, or foundation layout is engineered for your budget.",
    iconName: "Sliders"
  },
  {
    id: 4,
    title: "Experienced Professionals",
    description: "Our on-site supervisors, electricians, and civil engineers boast decades of combined experience in extreme engineering setups.",
    iconName: "Users"
  },
  {
    id: 5,
    title: "Reliable Support",
    description: "We provide true operational warranties and prompt 24/7 post-installation maintenance and troubleshooting support lists.",
    iconName: "Activity"
  },
  {
    id: 6,
    title: "Modern Equipment",
    description: "We operate laser-guided surveying gear, precision insulation detectors, state-of-the-art power testers, and high-safety toolkits.",
    iconName: "Wrench"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Strategic Consultation",
    subtitle: "Understanding Needs",
    description: "We host an in-depth session discussing your energy goals, construction blueprints, specific preferences, and absolute budget boundaries.",
    iconName: "MessageSquare"
  },
  {
    stepNumber: 2,
    title: "Technical Site Inspection",
    subtitle: "Acreage & Infrastructure",
    description: "Our engineers analyze architectural frameworks, test soil density, check roof exposure limits, and measure existing electrical capacities.",
    iconName: "Compass"
  },
  {
    stepNumber: 3,
    title: "Precision Planning",
    subtitle: "Custom Engineering",
    description: "We design detailed CAD layouts, formulate wiring line charts, model PV system layouts, and compile clear timeline spreadsheets.",
    iconName: "DraftingCompass"
  },
  {
    stepNumber: 4,
    title: "Clean Installation",
    subtitle: "Meticulous Execution",
    description: "We deploy qualified personnel, manage heavy structural works, install high-efficiency distribution boxes, and finish masonry cleanly.",
    iconName: "Play"
  },
  {
    stepNumber: 5,
    title: "Premium Completion",
    subtitle: "Testing & Handover",
    description: "We execute dynamic load testing, clear waste materials, configure mobile app tracking, and hand over certifications.",
    iconName: "CheckCircle2"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Joshua Alao",
    role: "Chief Developer",
    company: "Alao Estates Ltd",
    quote: "ANIOBA Multipurpose Global Ltd designed and executed our off-grid solar installation for a 16-villa estate. I was structural-engineering inspector on the project, and the cable layout, smart inverter battery bank housing, and total system synchronization were absolutely pristine. A masterclass in technical excellence.",
    rating: 5,
    avatar: "https://imgur.com/rE9N5Cq.png"
  },
  {
    id: 2,
    name: "Engr Fatima Adeoba",
    role: "Lead Architect",
    company: "Vanguard Designs",
    quote: "We partnered with Anioba on two modern commercial construction sites. Their consultation, soil assessment, concrete structure density tests, and heavy industrial electrical wiring exceeded expectations. Truly outstanding work, on time, and completely transparent with pricing.",
    rating: 5,
    avatar: "https://imgur.com/SIkVcTm.png"
  },
  {
    id: 3,
    name: "Mr. Gregory Thompson",
    role: "Director of Operations",
    company: "Apex Warehousing Systems",
    quote: "Our industrial warehouse required heavy duty wiring, automated switchgears, and power backup. Anioba delivered the hardware supply and installation flawlessly. The load-balancing diagnostics they ran saved us thousands in potential equipment damage. Highly recommended!",
    rating: 5,
    avatar: "https://imgur.com/kVqYjby.png"
  }
];

export const FOUNDERS: Founder[] = [
  {
    id: 1,
    name: "Engr. Adebayo Olalekan Abubakar (Chairman, CEO, Director)",
    designation: "Founder & Managing Director",
    image: "https://imgur.com/7GU4ozM.png",
    bio: "A visionary leader with over 15 years of standard-certified expertise in high-voltage electrical procurement, commercial logistics, and heavy infrastructure management. He guides the general strategic trajectory and ensures perfect engineering sourcing."
  },
  {
    id: 2,
    name: "Mr. Ismail Ayoyinka Adebayo (Planning and Technical Director)",
    designation: "Planning & Technical Director",
    image: "https://imgur.com/lfuM8Up.png",
    bio: "An elite power and structural systems specialist who oversees major mechanical blueprint validations, structural load calculations, and comprehensive safety auditing across all of our sites."
  },
  {
    id: 3,
    name: "Mr. Shuaib Abiodun Adebayo (Operation Manager)",
    designation: "Operation Manager",
    image: "https://imgur.com/ZVbZbb3.png",
    bio: "A seasoned field operator directing physical site supervision, subcontractor scheduling, dynamic inspections, and turnkey contracting project completions for high-profile developers."
  }
];
