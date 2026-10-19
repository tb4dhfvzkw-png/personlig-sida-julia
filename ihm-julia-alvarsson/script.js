// ==========================================
// 2. KOPIERA MEJLADRESS TILL URKLIPP
// ==========================================
const kopiera = document.querySelector("#kopiera");

if (kopiera) {
  const kopieraMail = async () => {
    try {
      await navigator.clipboard.writeText("Julia.Alvarsson@outlook.com");
    } catch {
      kopiera.textContent = "Markera och kopiera adressen manuellt";
      return;
    }
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
