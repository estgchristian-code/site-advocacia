(function () {
  "use strict";

  /* ============================================================
     CONFIGURAÇÃO CENTRALIZADA DO WHATSAPP
     Substitua pelo número oficial da Dra. Karen
     (DDI + DDD + Número, somente dígitos)
     ============================================================ */
  const WHATSAPP_NUMBER = "5541997435254";
  const DEFAULT_WA_MESSAGE = "Olá, Dra. Karen Priscila. Gostaria de realizar um agendamento online para orientação jurídica.";

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

  /* ==================== DADOS DAS 6 ÁREAS DE ATUAÇÃO ==================== */
  const areaDetails = {
    civel: {
      title: "Direito Cível e Contratos",
      description:
        "Assessoria jurídica preventiva e contenciosa em questões civis e empresariais: elaboração, revisão e negociação de contratos, ações de indenização por danos materiais e morais, cobranças, execuções e ações possessórias e de usucapião, com atuação orientada à segurança jurídica e à proteção patrimonial do cliente.",
      msg: "Olá, Dra. Karen! Gostaria de atendimento sobre Direito Cível e Contratos."
    },
    familia: {
      title: "Direito de Família e Sucessões",
      description:
        "Atuação sensível e estratégica em divórcio consensual e litigioso, fixação e revisão de pensão alimentícia, guarda e regime de convivência, reconhecimento e dissolução de união estável, inventários, arrolamento de bens e partilha, sempre com discrição e foco na preservação dos vínculos familiares.",
      msg: "Olá, Dra. Karen! Gostaria de atendimento sobre Direito de Família e Sucessões."
    },
    flagrante: {
      title: "Prisão em Flagrante e Audiência de Custódia",
      description:
        "Os primeiros momentos após uma prisão são decisivos. Realizamos o acompanhamento imediato em delegacias, verificamos a legalidade do auto de prisão em flagrante e atuamos com defesa técnica na Audiência de Custódia, sustentando o relaxamento da prisão ou a concessão de liberdade provisória.",
      msg: "Olá, Dra. Karen! Preciso de orientação urgente sobre Prisão em Flagrante / Audiência de Custódia."
    },
    habeas: {
      title: "Habeas Corpus e Inquéritos Policiais",
      description:
        "Impetração de Habeas Corpus com pedido liminar perante os Tribunais Estaduais, o STJ e o STF, pedidos de revogação de prisão preventiva ou temporária, acompanhamento de depoimentos e oitivas e trancamento de inquérito policial desprovido de justa causa.",
      msg: "Olá, Dra. Karen! Gostaria de falar sobre Habeas Corpus / Inquérito Policial."
    },
    processos: {
      title: "Processos Criminais e Tribunal do Júri",
      description:
        "Defesa técnica em ações penais de rito ordinário, sumário e sumaríssimo, com arguição de nulidades processuais, atuação no Tribunal do Júri nos crimes dolosos contra a vida, acordo de não persecução penal (ANPP) e acompanhamento de execução penal.",
      msg: "Olá, Dra. Karen! Preciso de defesa técnica em um Processo Criminal / Tribunal do Júri."
    },
    tribunais: {
      title: "Recursos no TJPR, STJ e STF",
      description:
        "Atuação recursal estratégica nas áreas Cível, de Família e Criminal, com revisão minuciosa de sentenças e acórdãos para interposição de apelações, agravos, recursos especial e extraordinário, elaboração de memoriais e realização de sustentação oral nos tribunais.",
      msg: "Olá, Dra. Karen! Gostaria de analisar a possibilidade de Recurso no TJPR, STJ ou STF."
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
