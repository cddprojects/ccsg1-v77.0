/**
 * Flexikits opportunity catalogue
 * --------------------------------
 * SOURCE: DEVELOPMENT_DATA
 * PRODUCTION READY: false
 *
 * Live vacancy data is not available in this repository or a connected CMS.
 * This file powers reusable listing UI only. It must not be treated as a
 * confirmed job board feed.
 *
 * BEFORE PRODUCTION, REPLACE THIS FILE (or fetch from the backend/CMS) with
 * actual opportunity records. Then:
 *
 * 1. Set `meta.productionReady` to true only after legal/ops sign-off.
 * 2. Use `kind: "active_job"` solely for confirmed, currently open vacancies
 *    provided by a participating company.
 * 3. Keep `kind: "opportunity_area"` for interest categories that are not
 *    confirmed openings. Never relabel an area as "Confirmed opening" to
 *    improve conversion.
 * 4. Omit any field that is not verified (salary, company name, remote
 *    status, vacancy count, employment type, urgency, benefits, posted date).
 * 5. Persist `listing.id` and `category.id` on the candidate profile — do not
 *    save display text alone.
 *
 * ARTWORK: a listing inherits its category's `image`. Set `image` on an individual
 * listing to override it. All card artwork must be authored at 16:9, since the card
 * and drawer slots are pinned to that ratio so nothing is cropped or stretched.
 */
window.FLEXIKITS = window.FLEXIKITS || {};

window.FLEXIKITS.DATA = {
  meta: {
    source: "DEVELOPMENT_DATA",
    productionReady: false,
    lastReviewed: "2026-08-28",
    notice:
      "Development data for layout and interest-capture testing. These are opportunity areas, not confirmed active vacancies. Replace this catalogue with CMS or backend records before production.",
  },

  /**
   * The three official Flexible Work Arrangement categories from Singapore's
   * Tripartite Guidelines on Flexible Work Arrangement Requests (in force 1 Dec 2024).
   * Definitions follow MOM's wording. Do not reword the `officialDefinition`
   * strings without checking them against the current guidelines.
   * https://www.mom.gov.sg/employment-practices/good-work-practices/flexible-work-arrangements
   *
   * These are captured as CANDIDATE PREFERENCES, not as listing attributes. We do not
   * know what arrangement any given employer offers, so we never tag a listing with a
   * flexibility type. The candidate says what they need; the employer confirms what it
   * can offer.
   */
  flexibilityTypes: [
    {
      id: "flexi-place",
      name: "Flexi-Place",
      image: "assets/fwa-place.jpg",
      plain: "Where you work from",
      officialDefinition:
        "Where employees work flexibly from different locations aside from their usual office location.",
      examples: "Telecommuting, work-from-home",
      askFor:
        "Choose this if location is the issue. Fully remote is less common than it was. Hybrid or occasional work from home sits here.",
    },
    {
      id: "flexi-time",
      name: "Flexi-Time",
      image: "assets/fwa-time.jpg",
      plain: "When you work",
      officialDefinition:
        "Where employees work flexibly at different timings with no changes to total work hours and workload.",
      examples: "Flexi-hours, staggered hours, flexi-shift, compressed work schedule",
      askFor:
        "Choose this if you need a later start, staggered hours, or a compressed week, without reducing your total hours.",
    },
    {
      id: "flexi-load",
      name: "Flexi-Load",
      image: "assets/fwa-load.jpg",
      plain: "How much you take on",
      officialDefinition:
        "Where employees work flexibly with different workloads and with commensurate remuneration.",
      examples: "Job sharing, part-time work",
      askFor:
        "Choose this if you need part-time, fewer hours, or a shared role, with pay that matches the load.",
    },
  ],

  categories: [
    {
      id: "ai-quality-data-ops",
      name: "AI Quality & Data Operations",
      image: "assets/cat-ai-quality.jpg",
      summary:
        "Checking and organising the information that keeps digital and AI systems accurate. Careful review work that follows a written guideline.",
    },
    {
      id: "customer-experience",
      name: "Customer Experience",
      image: "assets/cat-customer.jpg",
      summary:
        "Helping customers over chat, email, and other digital channels.",
    },
    {
      id: "digital-operations",
      name: "Digital Operations",
      image: "assets/cat-digital.jpg",
      summary:
        "Keeping online records, tasks, and daily workflows running properly.",
    },
    {
      id: "content-operations",
      name: "Content Operations",
      image: "assets/cat-content.jpg",
      summary:
        "Preparing and checking content so it stays consistent and correct.",
    },
    {
      id: "ecommerce-operations",
      name: "E-Commerce Operations",
      image: "assets/cat-ecommerce.jpg",
      summary:
        "Supporting online stores with listings, orders, and product details.",
    },
    {
      id: "business-support",
      name: "Business Support & Coordination",
      image: "assets/cat-business.jpg",
      summary:
        "Scheduling, coordination, and admin support that keeps a team organised.",
    },
  ],

  listings: [
    {
      id: "dev-role-ai-quality-reviewer",
      kind: "opportunity_area",
      title: "AI quality review",
      categoryId: "ai-quality-data-ops",
      summary:
        "Read digital content, hold it against a written guideline, and flag clearly where it falls short. Suits people who are precise and patient.",
      typicalWork: [
        "Reading the material and the output it produced",
        "Checking it against the guideline you are given",
        "Writing clear notes when something is wrong or missing",
      ],
      capabilitiesOftenRelevant: [
        "Careful written English",
        "Comfortable working from a checklist",
        "Patience with repetitive, detailed work",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-ai-content-evaluator",
      kind: "opportunity_area",
      title: "AI content evaluation",
      categoryId: "ai-quality-data-ops",
      summary:
        "Judge whether text, labels, or similar content meets a quality standard, and keep those judgements consistent from one item to the next.",
      typicalWork: [
        "Comparing each piece of content against a quality standard",
        "Marking errors, gaps, and unclear wording",
        "Keeping your judgements consistent from one item to the next",
      ],
      capabilitiesOftenRelevant: [
        "Content review",
        "English communication",
        "An eye for small differences in wording",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-customer-support-specialist",
      kind: "opportunity_area",
      title: "Customer support",
      categoryId: "customer-experience",
      summary:
        "Answer customer questions over chat or email using a company’s existing process. Suits people who stay calm and write clearly.",
      typicalWork: [
        "Answering common questions in a professional tone",
        "Working from a support playbook or help centre",
        "Passing on anything that needs another team",
      ],
      capabilitiesOftenRelevant: [
        "Clear written communication",
        "Calm, courteous tone",
        "Comfortable with digital support tools",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-digital-operations-assistant",
      kind: "opportunity_area",
      title: "Digital operations support",
      categoryId: "digital-operations",
      summary:
        "Keep everyday digital work moving: updating records, working through task queues, and checking nothing is missing.",
      typicalWork: [
        "Updating records in online systems",
        "Moving tasks through a set workflow",
        "Checking that nothing required is missing",
      ],
      capabilitiesOftenRelevant: [
        "Digital tools",
        "Organised follow-through",
        "Happy with routine, steady tasks",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-virtual-operations-assistant",
      kind: "opportunity_area",
      title: "Virtual operations support",
      categoryId: "digital-operations",
      summary:
        "Support work that can be done away from a usual office. Tracking requests, keeping shared documents tidy, and making sure nothing gets dropped.",
      typicalWork: [
        "Tracking incoming requests and what happens next",
        "Putting together simple summaries or checklists",
        "Keeping shared documents and trackers up to date",
      ],
      capabilitiesOftenRelevant: [
        "Written coordination",
        "Reliable with recurring tasks",
        "Basic documents and spreadsheets",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-content-operations-assistant",
      kind: "opportunity_area",
      title: "Content operations",
      categoryId: "content-operations",
      summary:
        "Check and prepare content so it matches the brand or process guidelines before it goes out.",
      typicalWork: [
        "Checking copy or images against a style guide",
        "Keeping files and content trackers organised",
        "Spotting missing information before something goes out",
      ],
      capabilitiesOftenRelevant: [
        "Content review",
        "English communication",
        "Comfortable working from guidelines",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-ecommerce-support-associate",
      kind: "opportunity_area",
      title: "E-commerce support",
      categoryId: "ecommerce-operations",
      summary:
        "Help an online store run smoothly: product details, order follow-up, and keeping listings accurate.",
      typicalWork: [
        "Checking product details are complete and correct",
        "Following up on orders or customers using a set process",
        "Keeping listings in line with the source information",
      ],
      capabilitiesOftenRelevant: [
        "Detail checking",
        "Writing to customers clearly",
        "Comfortable with online store tools",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
    {
      id: "dev-role-business-support-coordinator",
      kind: "opportunity_area",
      title: "Business support and coordination",
      categoryId: "business-support",
      summary:
        "Scheduling, reminders, and keeping shared records up to date so a team stays organised.",
      typicalWork: [
        "Handling scheduling and reminders",
        "Keeping shared records up to date",
        "Coordinating requests between people and tools",
      ],
      capabilitiesOftenRelevant: [
        "Organisation",
        "Writing clear updates",
        "Comfortable with calendars and shared documents",
      ],
      singaporeRelevance:
        "Listed for Singapore. Hours, setup, and pay are decided by the company if they get in touch.",
    },
  ],
};

window.FLEXIKITS.labelsFor = function labelsFor(kind) {
  if (kind === "active_job") {
    return {
      badge: "Confirmed opening",
      cardCta: "View this opening",
      detailCta: "Add to profile",
      typeLabel: "Confirmed opening",
    };
  }
  return {
    badge: "Area of interest",
    cardCta: "View this area",
    detailCta: "Add to profile",
    typeLabel: "Area of interest",
  };
};

window.FLEXIKITS.skillSuggestions = [
  "Content Review",
  "English Communication",
  "Digital Tools",
  "Customer Support",
  "Data Accuracy",
  "Scheduling",
  "E-Commerce Operations",
  "Written Coordination",
];
