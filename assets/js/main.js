/**
 * MUT-3 Connector Landing Page Scripts
 * Handles i18n localization, payment URLs, tab previews, FAQ accordions, and mobile navigation.
 */

import { CONFIG } from "./config.js";
import { I18N, detectBrowserLanguage } from "./i18n.js";

class App {
  constructor() {
    this.currentLang = detectBrowserLanguage();
    this.init();
  }

  init() {
    this.bindDomEvents();
    this.applyLocalization(this.currentLang);
    this.setupScrollEffects();
  }

  /**
   * Bind event listeners for UI interactions
   */
  bindDomEvents() {
    // Language Switcher Button(s)
    document.querySelectorAll("[data-action='toggle-lang']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextLang = this.currentLang === "en" ? "ru" : "en";
        this.setLanguage(nextLang);
      });
    });

    // Mobile Hamburger Menu
    const mobileBtn = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      // Close mobile menu when a nav link is clicked
      navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });

      // Close mobile menu when clicking outside or pressing Escape
      document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
          navMenu.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // FAQ Accordion
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          // Close others for clean accordion feel
          document.querySelectorAll(".faq-item").forEach((other) => {
            if (other !== item) {
              other.classList.remove("open");
              const otherBtn = other.querySelector(".faq-question");
              if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            }
          });
          item.classList.toggle("open", !isOpen);
          question.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        });
      }
    });

    // Product Proof Tabs
    document.querySelectorAll(".proof-tab-btn").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        const targetId = tabBtn.getAttribute("data-target");
        document.querySelectorAll(".proof-tab-btn").forEach((btn) => btn.classList.remove("active"));
        document.querySelectorAll(".proof-slide").forEach((slide) => slide.classList.remove("active"));

        tabBtn.classList.add("active");
        const targetSlide = document.getElementById(targetId);
        if (targetSlide) targetSlide.classList.add("active");
      });
    });
  }

  /**
   * Switch and apply current language
   */
  setLanguage(lang) {
    if (lang !== "en" && lang !== "ru") return;
    this.currentLang = lang;
    localStorage.setItem("mut3_lang", lang);
    this.applyLocalization(lang);
  }

  /**
   * Apply translations to all DOM elements with data-i18n
   */
  applyLocalization(lang) {
    document.documentElement.lang = lang;
    const dictionary = I18N[lang] || I18N.en;

    // Update text content based on dot-notation key (e.g. 'hero.title')
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n");
      const val = this.getNestedValue(dictionary, keyPath);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });

    // Update HTML content where tags might be used
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n-html");
      const val = this.getNestedValue(dictionary, keyPath);
      if (val !== undefined && val !== null) {
        el.innerHTML = val;
      }
    });

    // Update Document Title and Meta Description
    if (lang === "ru") {
      document.title = "MUT-3 Connector v1.9.0 — Настройка J2534 адаптеров для Mitsubishi MUT-III SE";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Официальный сайт MUT-3 Connector v1.9.0. Автоматическая конфигурация J2534 адаптеров (Сканматик 2 ПРО, Dialink, OpenPort 2.0) для Mitsubishi MUT-III SE. Поддержка Windows 11, 10, 8.1 и 7 SP1. Персональная лицензия 1 500 ₽.");
      }
    } else {
      document.title = "MUT-3 Connector v1.9.0 — J2534 Pass-Thru Setup for Mitsubishi MUT-III SE";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Official landing page for MUT-3 Connector v1.9.0. Effortlessly configure universal J2534 adapters (Scanmatik 2 PRO, Dialink, OpenPort 2.0) for Mitsubishi MUT-III SE. Supports Windows 11, 10, 8.1 & 7 SP1. Personal license US$15.");
      }
    }

    // Switch image assets between English and Russian versions
    const heroPreviewImg = document.querySelector(".hero-preview img");
    const proofManageImg = document.querySelector("#slide-manage img");
    const proofDiagImg = document.querySelector("#slide-diag img");

    if (lang === "ru") {
      if (heroPreviewImg) heroPreviewImg.src = "assets/img/app-ui-manage-ru.svg";
      if (proofManageImg) proofManageImg.src = "assets/img/app-ui-manage-ru.svg";
      if (proofDiagImg) proofDiagImg.src = "assets/img/app-ui-diag-ru.svg";
    } else {
      if (heroPreviewImg) heroPreviewImg.src = "assets/img/app-ui-manage.svg";
      if (proofManageImg) proofManageImg.src = "assets/img/app-ui-manage.svg";
      if (proofDiagImg) proofDiagImg.src = "assets/img/app-ui-diag.svg";
    }

    // Update Language Toggle Button label (shows the OTHER language option)
    document.querySelectorAll("[data-action='toggle-lang'] .lang-label").forEach((el) => {
      el.textContent = lang === "en" ? "RU" : "EN";
    });

    this.setupPaymentLinks(lang);
    this.setupSellerDetails(lang);
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  /**
   * Point all checkout CTA buttons to mailto link with localized subject
   */
  setupPaymentLinks(lang) {
    const email = CONFIG.payment?.purchaseEmail || CONFIG.seller?.email || "alfaslash@gmail.com";
    const subject = (lang === "ru")
      ? (CONFIG.payment?.emailSubjectRu || "Приобретение лицензии  MUT- 3 Connector")
      : (CONFIG.payment?.emailSubjectEn || "Purchase MUT-3 Connector License");

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    document.querySelectorAll("[data-buy-btn]").forEach((btn) => {
      btn.setAttribute("href", mailtoUrl);
      btn.removeAttribute("target");
      btn.removeAttribute("rel");
    });
  }

  /**
   * Populate seller legal information in footer and seller card
   */
  setupSellerDetails(lang) {
    const s = CONFIG.seller || {};
    const name = lang === "ru" ? s.nameRu : s.nameEn;
    const city = lang === "ru" ? s.cityRu : s.cityEn;
    const status = lang === "ru" ? s.taxStatusRu : s.taxStatusEn;

    document.querySelectorAll("[data-seller-status]").forEach((el) => el.textContent = status || "");
    document.querySelectorAll("[data-seller-name]").forEach((el) => el.textContent = name || "");
    document.querySelectorAll("[data-seller-city]").forEach((el) => el.textContent = city || "");

    // INN block check: if null / undefined / empty, do not display the block
    const isInnEmpty = s.inn === null || s.inn === undefined || s.inn === "";
    document.querySelectorAll("[data-seller-inn-block]").forEach((block) => {
      block.style.display = isInnEmpty ? "none" : "";
    });
    document.querySelectorAll("[data-seller-inn]").forEach((el) => {
      const parentBlock = el.closest(".seller-info-item");
      if (parentBlock && !parentBlock.hasAttribute("data-seller-inn-block")) {
        parentBlock.style.display = isInnEmpty ? "none" : "";
      }
      if (!isInnEmpty) {
        el.textContent = s.inn;
      }
    });

    // Telegram block check: if null / undefined / empty, do not display the block
    const isTelegramEmpty = s.telegram === null || s.telegram === undefined || s.telegram === "";
    document.querySelectorAll("[data-seller-telegram-block]").forEach((block) => {
      block.style.display = isTelegramEmpty ? "none" : "";
    });
    document.querySelectorAll("[data-seller-telegram]").forEach((el) => {
      const parentBlock = el.closest(".support-card");
      if (parentBlock && !parentBlock.hasAttribute("data-seller-telegram-block")) {
        parentBlock.style.display = isTelegramEmpty ? "none" : "";
      }
      if (!isTelegramEmpty) {
        el.textContent = s.telegram;
        if (el.tagName === "A") el.setAttribute("href", `https://t.me/${s.telegram.replace("@", "")}`);
      }
    });

    // Email
    document.querySelectorAll("[data-seller-email]").forEach((el) => {
      el.textContent = s.email || "";
      if (el.tagName === "A") el.setAttribute("href", `mailto:${s.email || ""}`);
    });

    // Phone
    const isPhoneEmpty = s.phone === null || s.phone === undefined || s.phone === "";
    document.querySelectorAll("[data-seller-phone-block]").forEach((block) => {
      block.style.display = isPhoneEmpty ? "none" : "";
    });
    document.querySelectorAll("[data-seller-phone]").forEach((el) => {
      const parentBlock = el.closest(".seller-info-item");
      if (parentBlock && !parentBlock.hasAttribute("data-seller-phone-block")) {
        parentBlock.style.display = isPhoneEmpty ? "none" : "";
      }
      if (!isPhoneEmpty) {
        el.textContent = s.phone;
        if (el.tagName === "A") el.setAttribute("href", `tel:${s.phone.replace(/[^+\d]/g, "")}`);
      }
    });
  }

  /**
   * Header background blur and shadow when scrolled
   */
  setupScrollEffects() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.mut3App = new App();
});
