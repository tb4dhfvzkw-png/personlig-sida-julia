// ==========================================
// 1. VISA MER / VISA MINDRE (OM MIG)
// ==========================================
const knapp = document.querySelector("#visa-mer");
const mer = document.querySelector("#mer");

if (knapp && mer) {
  mer.classList.add("gomd");

  const visaMer = () => {
    mer.classList.toggle("gomd");
    if (mer.classList.contains("gomd")) {
      knapp.textContent = "Visa mer";
      knapp.setAttribute("aria-expanded", "false");
    } else {
      knapp.textContent = "Visa mindre";
      knapp.setAttribute("aria-expanded", "true");
    }
  };

  knapp.addEventListener("click", visaMer);
}

// ==========================================
// 2. KOPIERA MEJLADRESS TILL URKLIPP
// ==========================================
const kopiera = document.querySelector("#kopiera");

if (kopiera) {
  const kopieraMail = () => {
    navigator.clipboard.writeText("Julia.Alvarsson@outlook.com");
    kopiera.textContent = "Kopierat! ✓";
    kopiera.classList.add("kopierad");

    setTimeout(() => {
      kopiera.textContent = "Kopiera mejladress";
      kopiera.classList.remove("kopierad");
    }, 2000);
  };

  kopiera.addEventListener("click", kopieraMail);
}

// ==========================================
// 3. MOBILMENY (RESPONSIV NAVIGATION)
// ==========================================
const mobileToggle = document.querySelector("#mobile-toggle");
const navMeny = document.querySelector("#nav-meny");

if (mobileToggle && navMeny) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = navMeny.classList.toggle("is-open");
    mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Stäng menyn automatiskt när besökaren klickar på en länk
  navMeny.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMeny.classList.remove("is-open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================
// 4. AKTIV MENYLÄNK VID SKROLL (SCROLLSPY)
// ==========================================
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let currentId = "";
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
});

// ==========================================
// 5. FAQ ACCORDION (TILLGÄNGLIGA FRÅGOR & SVAR)
// ==========================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item");
    const isOpen = faqItem.classList.contains("is-open");

    // Stäng eventuellt andra öppna frågor för ett stilrent intryck
    document.querySelectorAll(".faq-item.is-open").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("is-open");
        const otherBtn = item.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Växla aktuell fråga
    faqItem.classList.toggle("is-open");
    button.setAttribute("aria-expanded", !isOpen ? "true" : "false");
  });
});

// ==========================================
// 6. KONTAKTFORMULÄR (KLIENTSIDIG VALIDERING)
// ==========================================
const kontaktForm = document.querySelector("#kontakt-form");
const formFeedback = document.querySelector("#form-feedback");

if (kontaktForm && formFeedback) {
  kontaktForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const namn = document.querySelector("#kontakt-namn").value.trim();
    const epost = document.querySelector("#kontakt-epost").value.trim();
    const meddelande = document.querySelector("#kontakt-meddelande").value.trim();

    // Validera att fälten är ifyllda
    if (!namn || !epost || !meddelande) {
      formFeedback.textContent = "Vänligen fyll i alla obligatoriska fält (*).";
      formFeedback.className = "form-feedback is-error";
      return;
    }

    // Grundläggande formatkontroll för e-post
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!epostRegex.test(epost)) {
      formFeedback.textContent = "Vänligen ange en giltig e-postadress.";
      formFeedback.className = "form-feedback is-error";
      return;
    }

    // Framgångsbekräftelse med personligt tack
    formFeedback.textContent = `Tack för ditt meddelande, ${namn}! Jag återkommer till dig så snart jag kan. ✓`;
    formFeedback.className = "form-feedback is-success";

    // Nollställ formuläret
    kontaktForm.reset();

    // Dölj meddelandet efter 6 sekunder
    setTimeout(() => {
      formFeedback.style.display = "none";
      formFeedback.className = "form-feedback";
      formFeedback.style.display = "";
    }, 6000);
  });
}
