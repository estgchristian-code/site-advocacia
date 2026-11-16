(function () {
  "use strict";

  /* ============================================================
     CONFIGURAÇÃO CENTRALIZADA DO WHATSAPP
     Substitua pelo número oficial da Dra. Karen
     (DDI + DDD + Número, somente dígitos)
     ============================================================ */
  const WHATSAPP_NUMBER = "5541999999999";
  const DEFAULT_WA_MESSAGE = "Olá, Dra. Karen! Gostaria de solicitar um atendimento jurídico criminal.";

  const buildWhatsAppUrl = (message) => {
    const text = (message && message.trim()) || DEFAULT_WA_MESSAGE;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  /* ==================== ANO AUTOMÁTICO NO RODAPÉ ==================== */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==================== BARRA DOURADA DE PROGRESSO ==================== */
  const progressBar = document.getElementById("progressBar");

  const updateProgressBar = () => {
    if (!progressBar) return;

    const doc = document.documentElement;
    const scrollableHeight = doc.scrollHeight - doc.clientHeight;

    // Evita divisão por zero
    if (scrollableHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress = (window.scrollY / scrollableHeight) * 100;
    const clamped = Math.min(Math.max(progress, 0), 100);
    progressBar.style.width = `${clamped}%`;
  };

  /* ==================== NAVBAR AO ROLAR ==================== */
  const navbar = document.getElementById("navbar");

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  /* ==================== PARALLAX SUTIL DOS ELEMENTOS DECORATIVOS ==================== */
  const root = document.documentElement;

  const updateParallax = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    root.style.setProperty("--parallax-slow", `${y * 0.08}px`);
    root.style.setProperty("--parallax-fast", `${y * 0.16}px`);
  };

  /* ==================== LOOP DE ROLAGEM (requestAnimationFrame) ==================== */
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateProgressBar();
      handleNavbarScroll();
      updateParallax();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);

  updateProgressBar();
  handleNavbarScroll();
  updateParallax();

  /* ==================== MENU MOBILE ==================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.add("active");
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
    document.body.classList.add("menu-open");
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha ao clicar fora do painel
    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("open")) return;
      if (navLinks.contains(event.target) || menuToggle.contains(event.target)) return;
      closeMenu();
    });

    // Fecha o menu ao voltar para o layout desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 840) closeMenu();
    });
  }

  /* ==================== WHATSAPP: TODOS OS GATILHOS ==================== */
  const waTriggers = document.querySelectorAll(".js-wa-trigger");

  waTriggers.forEach((el) => {
    el.setAttribute("href", buildWhatsAppUrl(el.getAttribute("data-msg")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");

    el.addEventListener("click", (event) => {
      event.preventDefault();
      const url = buildWhatsAppUrl(el.getAttribute("data-msg"));
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  /* ==================== DADOS DAS 6 ÁREAS CRIMINAIS ==================== */
  const areaDetails = {
    flagrante: {
      title: "Prisão em Flagrante e Audiência de Custódia",
      description:
        "Os primeiros momentos após uma prisão são decisivos. Realizamos o acompanhamento presencial em delegacias para assegurar o direito ao silêncio, verificar a legalidade do auto de prisão em flagrante e sustentar, na Audiência de Custódia, o relaxamento da prisão ou a concessão de liberdade provisória.",
      msg: "Olá, Dra. Karen! Preciso de orientação urgente sobre Prisão em Flagrante / Audiência de Custódia."
    },
    inquerito: {
      title: "Inquérito Policial e Investigação Defensiva",
      description:
        "Atuação preventiva e estratégica durante a fase investigativa. Analisamos o inquérito policial, acompanhamos o investigado em oitivas, requeremos diligências essenciais à comprovação da inocência e combatemos indiciamentos desprovidos de justa causa.",
      msg: "Olá, Dra. Karen! Gostaria de atendimento sobre Inquérito Policial / Investigação."
    },
    habeas: {
      title: "Habeas Corpus e Medidas Liberatórias",
      description:
        "Elaboração técnica de Habeas Corpus perante os Tribunais Estaduais, STJ e STF, além de pedidos de revogação de prisão preventiva ou temporária e substituição por medidas cautelares diversas da prisão.",
      msg: "Olá, Dra. Karen! Gostaria de falar sobre Habeas Corpus / Pedido de Liberdade."
    },
    processos: {
      title: "Defesa em Processos Criminais",
      description:
        "Defesa técnica completa em ações penais de rito ordinário, sumário e sumaríssimo, abrangendo delitos patrimoniais, crimes contra a honra, delitos de trânsito, Lei de Drogas, crimes econômicos e violência doméstica.",
      msg: "Olá, Dra. Karen! Preciso de defesa técnica em um Processo Criminal."
    },
    juri: {
      title: "Tribunal do Júri",
      description:
        "Atuação dedicada nos processos de competência do Tribunal do Júri, com preparação rigorosa da tese defensiva desde o sumário da culpa, análise técnica de laudos periciais e sustentação oral combativa perante os jurados.",
      msg: "Olá, Dra. Karen! Gostaria de atendimento referente a um caso do Tribunal do Júri."
    },
    recursos: {
      title: "Recursos Criminais (TJPR, STJ e STF)",
      description:
        "Revisão minuciosa de sentenças e acórdãos condenatórios para interposição de Apelações, Recursos em Sentido Estrito, Revisões Criminais, Recursos Especial e Extraordinário, incluindo realização de sustentação oral.",
      msg: "Olá, Dra. Karen! Gostaria de analisar a possibilidade de Recurso Criminal."
    }
  };

  /* ==================== MODAL DAS ÁREAS ==================== */
  const modal = document.getElementById("areaModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalWaLink = document.getElementById("modalWaLink");
  const modalClose = document.getElementById("modalClose");

  let lastFocusedElement = null;

  const openModal = (key) => {
    const info = areaDetails[key];
    if (!info || !modal) return;

    modalTitle.textContent = info.title;
    modalDescription.textContent = info.description;
    modalWaLink.setAttribute("data-msg", info.msg);
    modalWaLink.setAttribute("href", buildWhatsAppUrl(info.msg));

    lastFocusedElement = document.activeElement;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (modalClose) modalClose.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  document.querySelectorAll(".area-card").forEach((card) => {
    const key = card.getAttribute("data-area");

    card.addEventListener("click", () => openModal(key));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(key);
      }
    });
  });

  if (modal && modalClose) {
    modalClose.addEventListener("click", closeModal);

    // Clique externo fecha o modal
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  /* ==================== TECLA ESC ==================== */
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (modal && modal.classList.contains("active")) closeModal();
    if (navLinks && navLinks.classList.contains("open")) closeMenu();
  });

  /* ==================== REVEAL COM INTERSECTIONOBSERVER ==================== */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }
})();
