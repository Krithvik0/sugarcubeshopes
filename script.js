// Always return to Home page on refresh / page reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
if (window.location.hash && window.location.hash !== '#home') {
  history.replaceState(null, '', window.location.pathname);
}
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Smooth scroll to top when clicking home brand links
document.querySelectorAll('a[href="#home"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll Spy: highlight active nav link as user scrolls through sections
const spySections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollPosition = window.pageYOffset + 140;

  spySections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  if (current) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
}, { passive: true });

// Dessert category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const dessertCards = document.querySelectorAll(".dessert-card");
const showAllBtn = document.querySelector(".show-all-btn");

function applyFilter(selected) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === selected);
  });
  dessertCards.forEach((card) => {
    let willShow = false;
    if (selected === "all") {
      willShow = true;
    } else if (selected === "signature") {
      willShow = card.dataset.signature === "true";
    } else {
      const categories = card.dataset.category ? card.dataset.category.split(/\s+/) : [];
      willShow = categories.includes(selected);
    }
    card.hidden = !willShow;
    if (willShow) {
      card.style.animation = "none";
      card.offsetHeight; // trigger reflow
      card.style.animation = "cardPopIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }
  });
  if (showAllBtn) {
    showAllBtn.style.display = selected === "signature" ? "inline-flex" : "none";
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });
});

if (showAllBtn) {
  showAllBtn.addEventListener("click", () => {
    applyFilter("all");
  });
}

// Dessert details dialog
const detailsDialog = document.querySelector("#details-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogEyebrow = document.querySelector("#dialog-eyebrow");
const dialogEnquireBtn = document.querySelector(".dialog-enquire-btn");

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    dialogTitle.textContent = button.dataset.dessert;
    if (dialogEyebrow) {
      dialogEyebrow.textContent = button.dataset.signature === "true" ? "★ Must Try Signature" : "Sugar Cubes Hopes";
    }
    detailsDialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => detailsDialog.close());
document.querySelector(".dialog-ok")?.addEventListener("click", () => detailsDialog.close());
if (dialogEnquireBtn) {
  dialogEnquireBtn.addEventListener("click", () => {
    detailsDialog.close();
    const dessertName = dialogTitle ? dialogTitle.textContent : "";
    const messageInput = document.querySelector("#message");
    if (messageInput && dessertName) {
      messageInput.value = `Hi, I would like to enquire about ${dessertName}.`;
    }
  });
}

// WhatsApp enquiry form handler
const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();
    const note = document.querySelector("#form-note");

    const phoneNumber = "919698970896";
    const text = `Hello Sugar Cubes Hopes!\n\nI have an enquiry:\n• *Name:* ${name}\n• *Email:* ${email}\n• *Message:* ${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    if (note) {
      note.textContent = "Opening WhatsApp to send your enquiry...";
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      enquiryForm.reset();
      if (note) {
        note.textContent = "Thank you! Your enquiry has been forwarded to WhatsApp (+91 96989 70896).";
      }
    }, 800);
  });
}

// Update the active navigation item while scrolling through sections.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

// Footer menu category filter links
document.querySelectorAll("[data-footer-filter]").forEach((item) => {
  item.addEventListener("click", () => {
    const filter = item.dataset.footerFilter;
    if (typeof applyFilter === "function") {
      applyFilter(filter);
    }
  });
});

// Header blur & shrink on scroll
const siteHeader = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", window.scrollY > 25);
  }
}, { passive: true });

// Scroll Reveal observer
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

document.querySelectorAll(
  ".section-heading, .dessert-card, .about-photo, .about-copy, .custom-image, .custom-copy, .gallery-grid img, .promise, .contact-detail, .contact-form, .about-map-action"
).forEach((el) => {
  el.classList.add("reveal-item");
  revealObserver.observe(el);
});

// Grand Door Slide Preloader & Welcome Animation Sequence
const sitePreloader = document.querySelector("#site-preloader");
const stageLoader = document.querySelector("#stage-loader");
const stageWelcome = document.querySelector("#stage-welcome");
const loaderBar = document.querySelector("#loader-bar");

let doorAnimationStarted = false;

function runGrandDoorSequence() {
  if (doorAnimationStarted || !sitePreloader) return;
  doorAnimationStarted = true;

  // Step 1: Animate progress bar filling to 100%
  if (loaderBar) {
    loaderBar.style.width = "100%";
  }

  // Step 2: Reveal "Welcome to Sugar Cubes Hopes" after loading progress
  setTimeout(() => {
    if (stageLoader) {
      stageLoader.classList.add("hide");
    }
    if (stageWelcome) {
      stageWelcome.classList.add("visible");
    }

    // Step 3: Keep Welcome visible, then slide open the grand boutique doors!
    setTimeout(() => {
      sitePreloader.classList.add("doors-open");

      // Step 4: After doors slide fully off-screen, remove preloader from DOM
      setTimeout(() => {
        sitePreloader.classList.add("doors-completed");
        sitePreloader.remove();
      }, 1000);
    }, 1100);

  }, 750);
}

// Trigger sequence when page loads or after fallback timeout
window.addEventListener("load", () => {
  setTimeout(runGrandDoorSequence, 150);
});
setTimeout(runGrandDoorSequence, 2000);

// PWA: Service Worker Registration & Install App handling
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.log("Service Worker registration failed:", err);
    });
  });
}

let deferredInstallPrompt = null;
const installAppBtn = document.querySelector("#install-app-btn");
const footerInstallBtn = document.querySelector("#footer-install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (installAppBtn) installAppBtn.hidden = false;
  if (footerInstallBtn) footerInstallBtn.hidden = false;
});

const handleInstallClick = async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === "accepted") {
    if (installAppBtn) installAppBtn.hidden = true;
    if (footerInstallBtn) footerInstallBtn.hidden = true;
  }
  deferredInstallPrompt = null;
};

if (installAppBtn) {
  installAppBtn.addEventListener("click", handleInstallClick);
}
if (footerInstallBtn) {
  footerInstallBtn.addEventListener("click", handleInstallClick);
}

window.addEventListener("appinstalled", () => {
  if (installAppBtn) installAppBtn.hidden = true;
  if (footerInstallBtn) footerInstallBtn.hidden = true;
  deferredInstallPrompt = null;
});
