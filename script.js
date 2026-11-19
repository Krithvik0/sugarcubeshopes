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
    if (selected === "all") {
      card.hidden = false;
    } else if (selected === "signature") {
      card.hidden = card.dataset.signature !== "true";
    } else {
      const categories = card.dataset.category ? card.dataset.category.split(/\s+/) : [];
      card.hidden = !categories.includes(selected);
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
  });
}

// Front-end demo only: this does not send or store the enquiry.
document.querySelector("#enquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const note = document.querySelector("#form-note");
  note.textContent = `Thank you, ${name}! This demo form is ready to connect to your email or website backend.`;
  event.target.reset();
});

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
