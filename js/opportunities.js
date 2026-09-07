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
 *    confirmed openings. Never relabel an area as "Open Opportunity" to
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
    },
    {
      id: "flexi-time",
      name: "Flexi-Time",
      image: "assets/fwa-time.jpg",
      plain: "When you work",
      officialDefinition:
        "Where employees work flexibly at different timings with no changes to total work hours and workload.",
      examples: "Flexi-hours, staggered hours, flexi-shift, compressed work schedule",
    },
    {
      id: "flexi-load",
      name: "Flexi-Load",
      image: "assets/fwa-load.jpg",
      plain: "How much you take on",
      officialDefinition:
        "Where employees work flexibly with different workloads and with commensurate remuneration.",
      examples: "Job sharing, part-time work",
    },
  ],

  categories: [
    {
      id: "ai-quality-data-ops",
      name: "AI Quality & Data Operations",
      image: "assets/cat-ai-quality.jpg",
      summary:
        "Checking and organising the information that keeps digital and AI systems accurate. This is careful review work rather than a technical AI career path.",
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
        "Typical work in this area: read digital content, hold it against a written guideline, and note clearly where it falls short. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-ai-content-evaluator",
      kind: "opportunity_area",
      title: "AI content evaluation",
      categoryId: "ai-quality-data-ops",
      summary:
        "Typical work in this area: judge whether text, labels, or similar content meets a quality standard, and keep those judgements consistent. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-customer-support-specialist",
      kind: "opportunity_area",
      title: "Customer support",
      categoryId: "customer-experience",
      summary:
        "Typical work in this area: answer customer questions over chat or email using a company’s existing process. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-digital-operations-assistant",
      kind: "opportunity_area",
      title: "Digital operations support",
      categoryId: "digital-operations",
      summary:
        "Typical work in this area: keep everyday digital work moving by updating records, working through task queues, and checking nothing is missing. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-virtual-operations-assistant",
      kind: "opportunity_area",
      title: "Virtual operations support",
      categoryId: "digital-operations",
      summary:
        "Typical work in this area: track requests, keep shared documents tidy, and make sure nothing gets dropped. Any remote or office setup is decided later by a company, if one contacts you. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-content-operations-assistant",
      kind: "opportunity_area",
      title: "Content operations",
      categoryId: "content-operations",
      summary:
        "Typical work in this area: check and prepare content so it matches brand or process guidelines before it goes out. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-ecommerce-support-associate",
      kind: "opportunity_area",
      title: "E-commerce support",
      categoryId: "ecommerce-operations",
      summary:
        "Typical work in this area: check product details, follow up on orders using a set process, and keep listings accurate. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
    {
      id: "dev-role-business-support-coordinator",
      kind: "opportunity_area",
      title: "Business support and coordination",
      categoryId: "business-support",
      summary:
        "Typical work in this area: scheduling, reminders, and keeping shared records up to date. This card is an interest area, not a vacancy.",
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
        "Shown for people who can work in Singapore. Hours, setup, and pay are not stated here and would be decided later by a company, if one gets in touch.",
    },
  ],
};

window.FLEXIKITS.labelsFor = function labelsFor(kind) {
  if (kind === "active_job") {
    return {
      badge: "Open Opportunity",
      cardCta: "View confirmed vacancy",
      detailCta: "Add to my interests",
      typeLabel: "Confirmed vacancy",
    };
  }
  return {
    badge: "Interest area",
    cardCta: "Read about this area",
    detailCta: "Add to my interests",
    typeLabel: "Interest area, not a vacancy",
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
