(function () {
  const DATA = window.FLEXIKITS && window.FLEXIKITS.DATA;
  if (!DATA) return;

  const INTEREST_KEY = "flexikits.interests";
  const PROFILE_KEY = "flexikits.profile";
  const LISTINGS_INITIAL = 6;

  const COUNTRIES = [
    { iso: "SG", name: "Singapore", dial: "65", flag: "🇸🇬", nationalLength: [8], leading: /^[3689]/ },
    { iso: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾", nationalLength: [8, 9, 10] },
    { iso: "ID", name: "Indonesia", dial: "62", flag: "🇮🇩", nationalLength: [9, 10, 11, 12] },
    { iso: "PH", name: "Philippines", dial: "63", flag: "🇵🇭", nationalLength: [10] },
    { iso: "IN", name: "India", dial: "91", flag: "🇮🇳", nationalLength: [10] },
    { iso: "HK", name: "Hong Kong", dial: "852", flag: "🇭🇰", nationalLength: [8] },
    { iso: "AU", name: "Australia", dial: "61", flag: "🇦🇺", nationalLength: [9] },
    { iso: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧", nationalLength: [10] },
    { iso: "US", name: "United States", dial: "1", flag: "🇺🇸", nationalLength: [10] },
    { iso: "CN", name: "China", dial: "86", flag: "🇨🇳", nationalLength: [11] },
  ];

  const state = {
    categoryId: "all",
    listingIds: [],
    categoryIds: [],
    flexibilityIds: [],
    listingsExpanded: false,
    country: COUNTRIES[0],
    drawerListingId: null,
  };

  const FLEX_TYPES = DATA.flexibilityTypes || [];

  function flexibilityById(id) {
    return FLEX_TYPES.find((item) => item.id === id);
  }

  function categoryById(id) {
    return DATA.categories.find((c) => c.id === id);
  }

  function listingById(id) {
    return DATA.listings.find((item) => item.id === id);
  }

  function labelsFor(kind) {
    return window.FLEXIKITS.labelsFor(kind);
  }

  function loadInterests() {
    try {
      const raw = sessionStorage.getItem(INTEREST_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      state.listingIds = Array.isArray(parsed.listingIds) ? parsed.listingIds : [];
      state.categoryIds = Array.isArray(parsed.categoryIds) ? parsed.categoryIds : [];
      state.flexibilityIds = Array.isArray(parsed.flexibilityIds) ? parsed.flexibilityIds : [];
    } catch {
      /* ignore malformed session data */
    }
  }

  function saveInterests() {
    sessionStorage.setItem(
      INTEREST_KEY,
      JSON.stringify({
        listingIds: state.listingIds,
        categoryIds: state.categoryIds,
        flexibilityIds: state.flexibilityIds,
      })
    );
    renderInterestSummary();
    syncCategoryCheckboxes();
    syncFlexibilityCheckboxes();
  }

  function addListingInterest(listing) {
    if (!state.listingIds.includes(listing.id)) state.listingIds.push(listing.id);
    if (listing.categoryId && !state.categoryIds.includes(listing.categoryId)) {
      state.categoryIds.push(listing.categoryId);
    }
    saveInterests();
  }

  function removeListingInterest(id) {
    state.listingIds = state.listingIds.filter((item) => item !== id);
    saveInterests();
  }

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value == null || value === false) return;
        if (key === "class") node.className = value;
        else if (key === "dataset") Object.assign(node.dataset, value);
        else if (key.startsWith("on") && typeof value === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === "text") node.textContent = value;
        else node.setAttribute(key, value === true ? "" : String(value));
      });
    }
    children.flat().forEach((child) => {
      if (child == null) return;
      node.append(child.nodeType ? child : document.createTextNode(child));
    });
    return node;
  }

  // The placeholder-data warning is aimed at the team, not at visitors. It always
  // reaches the console; the on-screen banner only appears with ?dev=1.
  function announcePlaceholderData() {
    if (DATA.meta.productionReady) return;
    const message =
      "Flexikits: opportunity catalogue is DEVELOPMENT_DATA, not live vacancies. " +
      "Replace js/opportunities.js with CMS or backend records before launch. " +
      "See README.md 'Before production'. Append ?dev=1 to show the on-screen notice.";
    if (window.console && console.warn) console.warn(message);

    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") !== "1") return;
    const slot = document.getElementById("dev-banner-slot");
    if (!slot) return;
    slot.append(
      el(
        "div",
        { class: "dev-banner", role: "note" },
        el(
          "p",
          null,
          el("strong", { text: "Development data" }),
          " These are placeholder opportunity areas, not confirmed vacancies. Replace ",
          el("code", { text: "js/opportunities.js" }),
          " with CMS or backend records before launch."
        )
      )
    );
  }

  function renderCategories() {
    const bar = document.getElementById("category-bar");
    if (!bar) return;
    bar.replaceChildren();
    const chips = [
      { id: "all", name: "All areas" },
      ...DATA.categories,
    ];
    chips.forEach((cat) => {
      bar.append(
        el("button", {
          type: "button",
          class: "cat-chip",
          "aria-pressed": cat.id === state.categoryId ? "true" : "false",
          text: cat.name,
          onclick: () => {
            state.categoryId = cat.id;
            state.listingsExpanded = false;
            renderCategories();
            renderListings();
          },
        })
      );
    });
  }

  function buildListingCard(item) {
    const cat = categoryById(item.categoryId);
    const labels = labelsFor(item.kind);
    const art = item.image || (cat && cat.image);
    const media = art
      ? el(
          "figure",
          { class: "listing-media" },
          el("img", { src: art, alt: "", width: "960", height: "540", loading: "lazy" })
        )
      : null;
    return el(
      "article",
      {
        class: "listing-card",
        tabindex: "0",
        role: "button",
        "aria-label": `${item.title}. ${labels.badge}. ${labels.cardCta}`,
        onclick: () => openDrawer(item.id),
        onkeydown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDrawer(item.id);
          }
        },
      },
      media,
      el(
        "div",
        { class: "listing-body" },
        el(
          "div",
          { class: "badge-row" },
          cat ? el("span", { class: "badge badge-cat", text: cat.name }) : null,
          item.kind === "active_job"
            ? el("span", { class: "badge badge-open", text: labels.badge })
            : null
        ),
        el("h3", { text: item.title }),
        el("p", { text: item.summary }),
        el("span", { class: "listing-cta", text: `${labels.cardCta} →` })
      )
    );
  }

  function renderListings() {
    const grid = document.getElementById("listing-grid");
    const moreWrap = document.getElementById("listing-more");
    if (!grid) return;
    const items = DATA.listings.filter(
      (item) => state.categoryId === "all" || item.categoryId === state.categoryId
    );
    grid.replaceChildren();
    if (!items.length) {
      if (moreWrap) moreWrap.hidden = true;
      grid.append(el("p", { class: "empty-listings", text: "Nothing in this area yet. Try another category." }));
      return;
    }

    const canCollapse = items.length > LISTINGS_INITIAL;
    const visible = canCollapse && !state.listingsExpanded
      ? items.slice(0, LISTINGS_INITIAL)
      : items;

    visible.forEach((item) => grid.append(buildListingCard(item)));

    if (!moreWrap) return;
    moreWrap.replaceChildren();
    if (!canCollapse) {
      moreWrap.hidden = true;
      return;
    }

    moreWrap.hidden = false;
    const btn = el("button", {
      type: "button",
      class: "btn secondary listing-more-btn",
      "aria-expanded": state.listingsExpanded ? "true" : "false",
      text: state.listingsExpanded ? "Show fewer" : "Show more",
      onclick: () => {
        state.listingsExpanded = !state.listingsExpanded;
        renderListings();
        if (!state.listingsExpanded) {
          document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
    });
    moreWrap.append(btn);
  }

  function listBlock(title, items) {
    if (!items || !items.length) return null;
    return el(
      "div",
      null,
      el("h3", { text: title }),
      el(
        "ul",
        null,
        ...items.map((item) => el("li", { text: item }))
      )
    );
  }

  function openDrawer(listingId) {
    const listing = listingById(listingId);
    if (!listing) return;
    const cat = categoryById(listing.categoryId);
    const labels = labelsFor(listing.kind);
    state.drawerListingId = listingId;

    const drawer = document.getElementById("opportunity-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    const badge = document.getElementById("drawer-badge");
    const title = document.getElementById("drawer-title");
    const category = document.getElementById("drawer-category");
    const body = document.getElementById("drawer-body");

    badge.className = `badge ${listing.kind === "active_job" ? "badge-open" : "badge-cat"}`;
    badge.textContent = cat ? cat.name : labels.badge;
    title.textContent = listing.title;
    category.textContent = labels.typeLabel;

    const kindNote =
      listing.kind === "active_job"
        ? "This is a confirmed opening from a participating company. Choosing I'm Interested attaches it to your profile so they can see you put your name to it. It is not an application that we review or approve."
        : "This is an opportunity area, not a confirmed opening. Choosing I'm Interested puts it on your profile so companies working in this area can see it. It does not mean someone is hiring for it right now.";

    const omitted = DATA.meta.productionReady
      ? null
      : el(
          "p",
          { class: "hint" },
          "Pay, company name, and working arrangement are shown only when a company has confirmed them."
        );

    const drawerArt = listing.image || (cat && cat.image);
    const drawerMedia = drawerArt
      ? el(
          "figure",
          { class: "drawer-media" },
          el("img", { src: drawerArt, alt: "", width: "960", height: "540" })
        )
      : null;

    const bodyNodes = [
      drawerMedia,
      el("p", { text: listing.summary }),
      el("p", { class: "kind-note", text: kindNote }),
      listing.singaporeRelevance
        ? el("div", null, el("h3", { text: "Where this applies" }), el("p", { text: listing.singaporeRelevance }))
        : null,
      listBlock(
        listing.kind === "active_job" ? "Key responsibilities" : "What the work usually involves",
        listing.typicalWork || listing.responsibilities
      ),
      listBlock(
        listing.kind === "active_job" ? "Skills or capabilities valued" : "Skills that help",
        listing.capabilitiesOftenRelevant || listing.skillsValued
      ),
      listing.workArrangement ? el("div", null, el("h3", { text: "Work arrangement" }), el("p", { text: listing.workArrangement })) : null,
      listing.employmentType ? el("div", null, el("h3", { text: "Engagement type" }), el("p", { text: listing.employmentType })) : null,
      listing.companyName ? el("div", null, el("h3", { text: "Participating company" }), el("p", { text: listing.companyName })) : null,
      listing.compensation ? el("div", null, el("h3", { text: "Compensation" }), el("p", { text: listing.compensation })) : null,
      listing.postedAt ? el("div", null, el("h3", { text: "Date posted" }), el("p", { text: listing.postedAt })) : null,
      omitted,
      el(
        "div",
        { class: "drawer-actions" },
        el("button", {
          type: "button",
          class: "btn",
          text: labels.detailCta,
          onclick: () => {
            addListingInterest(listing);
            closeDrawer();
            document.getElementById("profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
            document.getElementById("fullName")?.focus();
          },
        }),
        el("a", {
          class: "btn secondary",
          href: "#profile",
          text: "Create profile",
          onclick: () => closeDrawer(),
        })
      ),
    ].filter(Boolean);

    body.replaceChildren(...bodyNodes);

    drawer.hidden = false;
    backdrop.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      drawer.classList.add("open");
      backdrop.classList.add("open");
    });
    document.body.classList.add("drawer-open");
    document.getElementById("drawer-close")?.focus();
  }

  function closeDrawer() {
    const drawer = document.getElementById("opportunity-drawer");
    const backdrop = document.getElementById("drawer-backdrop");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.classList.remove("drawer-open");
    drawer.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      if (!drawer.classList.contains("open")) {
        drawer.hidden = true;
        backdrop.hidden = true;
      }
    }, 220);
    state.drawerListingId = null;
  }

  function renderInterestSummary() {
    const pinned = document.getElementById("pinned-interests");
    const empty = document.getElementById("interest-summary-empty");
    if (!pinned || !empty) return;
    pinned.replaceChildren();
    const listings = state.listingIds.map(listingById).filter(Boolean);
    if (!listings.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    listings.forEach((listing) => {
      const cat = categoryById(listing.categoryId);
      pinned.append(
        el(
          "div",
          { class: "pinned-role" },
          el(
            "div",
            null,
            el("strong", { text: listing.title }),
            el("div", { class: "hint", text: cat ? cat.name : labelsFor(listing.kind).typeLabel })
          ),
          el("button", {
            type: "button",
            "aria-label": `Remove ${listing.title}`,
            text: "Remove",
            onclick: () => removeListingInterest(listing.id),
          })
        )
      );
    });
  }

  function renderCategoryCheckboxes() {
    const wrap = document.getElementById("interest-categories");
    if (!wrap) return;
    wrap.replaceChildren();
    DATA.categories.forEach((cat) => {
      const input = el("input", {
        type: "checkbox",
        name: "categoryIds",
        value: cat.id,
        id: `cat-${cat.id}`,
      });
      input.addEventListener("change", () => {
        if (input.checked) {
          if (!state.categoryIds.includes(cat.id)) state.categoryIds.push(cat.id);
        } else {
          state.categoryIds = state.categoryIds.filter((id) => id !== cat.id);
        }
        saveInterests();
      });
      wrap.append(
        el("label", null, input, el("span", null, el("strong", { text: cat.name }), el("div", { class: "hint", text: cat.summary })))
      );
    });
    syncCategoryCheckboxes();
  }

  function syncCategoryCheckboxes() {
    DATA.categories.forEach((cat) => {
      const input = document.getElementById(`cat-${cat.id}`);
      if (input) input.checked = state.categoryIds.includes(cat.id);
    });
  }

  function renderFlexibilityGrid() {
    const grid = document.getElementById("flexibility-grid");
    if (!grid) return;
    grid.replaceChildren();
    FLEX_TYPES.forEach((type) => {
      grid.append(
        el(
          "article",
          { class: "flex-card reveal show" },
          type.image
            ? el(
                "figure",
                { class: "flex-media" },
                el("img", { src: type.image, alt: "", width: "960", height: "540" })
              )
            : null,
          el(
            "div",
            { class: "flex-body" },
            el("p", { class: "flex-plain", text: type.plain }),
            el("h3", { text: type.name }),
            el("p", { text: type.officialDefinition }),
            el("p", { class: "flex-examples" }, el("strong", { text: "For example: " }), type.examples)
          )
        )
      );
    });
  }

  function renderFlexibilityCheckboxes() {
    const wrap = document.getElementById("flexibility-options");
    if (!wrap) return;
    wrap.replaceChildren();
    FLEX_TYPES.forEach((type) => {
      const input = el("input", {
        type: "checkbox",
        name: "flexibilityIds",
        value: type.id,
        id: `flex-${type.id}`,
      });
      input.addEventListener("change", () => {
        if (input.checked) {
          if (!state.flexibilityIds.includes(type.id)) state.flexibilityIds.push(type.id);
        } else {
          state.flexibilityIds = state.flexibilityIds.filter((id) => id !== type.id);
        }
        saveInterests();
      });
      wrap.append(
        el(
          "label",
          null,
          input,
          el(
            "span",
            null,
            el("strong", { text: `${type.name} ` }),
            el("span", { class: "hint", text: type.plain })
          )
        )
      );
    });
    syncFlexibilityCheckboxes();
  }

  function syncFlexibilityCheckboxes() {
    FLEX_TYPES.forEach((type) => {
      const input = document.getElementById(`flex-${type.id}`);
      if (input) input.checked = state.flexibilityIds.includes(type.id);
    });
  }

  function renderSkillChips() {
    const wrap = document.getElementById("skill-chips");
    if (!wrap) return;
    wrap.replaceChildren();
    (window.FLEXIKITS.skillSuggestions || []).forEach((skill) => {
      const id = `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      wrap.append(
        el(
          "label",
          { for: id },
          el("input", { type: "checkbox", name: "skills", value: skill, id }),
          el("span", { text: skill })
        )
      );
    });
  }

  function fillCountryMenu() {
    const menu = document.getElementById("country-menu");
    const btn = document.getElementById("country-btn");
    if (!menu || !btn) return;
    menu.replaceChildren();
    COUNTRIES.forEach((country) => {
      menu.append(
        el("button", {
          type: "button",
          role: "option",
          "aria-selected": country.iso === state.country.iso ? "true" : "false",
          text: `${country.flag} ${country.name} +${country.dial}`,
          onclick: () => {
            state.country = country;
            btn.textContent = `${country.flag} +${country.dial}`;
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
            fillCountryMenu();
          },
        })
      );
    });
    btn.textContent = `${state.country.flag} +${state.country.dial}`;
  }

  function bindCountrySelect() {
    const menu = document.getElementById("country-menu");
    const btn = document.getElementById("country-btn");
    if (!menu || !btn) return;
    fillCountryMenu();
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".country-select")) {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function formatSgNumber(digits) {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
  }

  function validPhone(country, national) {
    const digits = digitsOnly(national);
    if (!country.nationalLength.includes(digits.length)) return false;
    if (country.leading && !country.leading.test(digits)) return false;
    return true;
  }

  function setFieldError(id, on) {
    const input = document.getElementById(id);
    const field = input?.closest(".field") || input?.closest("fieldset");
    if (field) field.classList.toggle("error", Boolean(on));
    if (id === "phoneNational") {
      document.getElementById("phone-field")?.classList.toggle("error", Boolean(on));
    }
  }

  function selectedSkills() {
    return Array.from(document.querySelectorAll('input[name="skills"]:checked')).map((input) => input.value);
  }

  function checkedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  }

  // Read the checkboxes rather than trusting accumulated change events. Browser
  // autofill, form restore, and programmatic checks all set `checked` without
  // firing `change`, which would otherwise silently drop the selection.
  function syncStateFromForm() {
    const categoryIds = checkedValues("categoryIds");
    const flexibilityIds = checkedValues("flexibilityIds");
    if (document.getElementById("interest-categories")) state.categoryIds = categoryIds;
    if (document.getElementById("flexibility-options")) state.flexibilityIds = flexibilityIds;
  }

  function validateForm() {
    syncStateFromForm();
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phoneNational").value.trim();
    const consent = document.getElementById("companyContactConsent").checked;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasInterest = state.listingIds.length > 0 || state.categoryIds.length > 0;

    setFieldError("fullName", name.length < 2);
    setFieldError("email", !emailOk);
    setFieldError("phoneNational", !validPhone(state.country, phone));

    const interestError = document.getElementById("interest-error");
    if (interestError) interestError.style.display = hasInterest ? "none" : "block";
    const consentError = document.getElementById("consent-error");
    if (consentError) consentError.style.display = consent ? "none" : "block";

    return name.length >= 2 && emailOk && validPhone(state.country, phone) && hasInterest && consent;
  }

  function buildProfilePayload() {
    syncStateFromForm();
    const national = digitsOnly(document.getElementById("phoneNational").value);
    const listings = state.listingIds.map(listingById).filter(Boolean).map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.kind,
      categoryId: item.categoryId,
    }));
    const categories = state.categoryIds.map(categoryById).filter(Boolean).map((item) => ({
      id: item.id,
      name: item.name,
    }));
    const flexibility = state.flexibilityIds.map(flexibilityById).filter(Boolean).map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return {
      source: DATA.meta.source,
      productionReady: false,
      createdAt: new Date().toISOString(),
      candidate: {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: {
          countryIso: state.country.iso,
          dialCode: `+${state.country.dial}`,
          nationalNumber: national,
          e164: `+${state.country.dial}${national}`,
        },
        skills: selectedSkills(),
      },
      interests: {
        listingIds: state.listingIds.slice(),
        listings,
        categoryIds: state.categoryIds.slice(),
        categories,
      },
      // Candidate-declared flexibility need, using the official Singapore FWA
      // categories. This is what the candidate wants, not what any employer offers.
      flexibilityNeeds: {
        ids: state.flexibilityIds.slice(),
        types: flexibility,
      },
      consents: {
        participatingCompanyContact: document.getElementById("companyContactConsent").checked,
        marketing: document.getElementById("marketingConsent").checked,
      },
      companyTalentView: {
        candidate: document.getElementById("fullName").value.trim(),
        interestedPositions: listings.map((item) => item.title),
        relevantInterests: categories.map((item) => item.name),
        flexibilityNeeded: flexibility.map((item) => item.name),
        skills: selectedSkills(),
        contact: ["Email", "WhatsApp / Mobile"],
      },
    };
  }

  function bindForm() {
    const form = document.getElementById("profile-form");
    const phone = document.getElementById("phoneNational");
    if (phone) {
      phone.addEventListener("input", () => {
        if (state.country.iso === "SG") {
          const digits = digitsOnly(phone.value).slice(0, 8);
          phone.value = formatSgNumber(digits);
        }
      });
    }
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm()) {
        const firstError = form.querySelector(".field.error input, .field.error textarea, #interest-error");
        if (firstError && firstError.scrollIntoView) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const payload = buildProfilePayload();
      sessionStorage.setItem(PROFILE_KEY, JSON.stringify(payload));
      // TODO: POST payload to the candidate-profile API before production.
      // Do not treat sessionStorage as a production store.
      window.location.href = "/thank-you";
    });
  }

  function bindChrome() {
    // Header / footer / mobile menu: js/site-chrome.js

    document.querySelectorAll(".faq-card").forEach((card, index) => {
      if (index === 0) card.classList.add("open");
      card.querySelector(".faq-q")?.addEventListener("click", () => {
        const wasOpen = card.classList.contains("open");
        document.querySelectorAll(".faq-card").forEach((item) => item.classList.remove("open"));
        if (!wasOpen) card.classList.add("open");
      });
    });

    const header = document.querySelector(".site-header");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealItems = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("show"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("show");
          });
        },
        { threshold: 0.12 }
      );
      revealItems.forEach((item) => observer.observe(item));
    }

    document.getElementById("drawer-close")?.addEventListener("click", closeDrawer);
    document.getElementById("drawer-backdrop")?.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });
  }

  function applyQueryListing() {
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("listing") || params.get("interest");
    if (listingId && listingById(listingId)) openDrawer(listingId);
    if (window.location.hash === "#profile") {
      document.getElementById("profile")?.scrollIntoView();
    }
  }

  loadInterests();
  announcePlaceholderData();
  renderCategories();
  renderListings();
  renderCategoryCheckboxes();
  renderFlexibilityGrid();
  renderFlexibilityCheckboxes();
  renderSkillChips();
  bindCountrySelect();
  renderInterestSummary();
  bindForm();
  bindChrome();
  applyQueryListing();
})();
