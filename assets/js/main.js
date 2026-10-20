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
    this.setupPaymentLinks();
    this.setupSellerDetails();
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

    // Update Document Title and Meta Description if provided
    if (lang === "ru") {
      document.title = "MUT-3 Connector — Настройка J2534 адаптеров для Mitsubishi MUT-III SE";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Официальный сайт MUT-3 Connector. Автоматическая конфигурация J2534 адаптеров (Сканматик 2 ПРО, Dialink, OpenPort 2.0) для Mitsubishi MUT-III SE. Персональная лицензия $15.");
      }
    } else {
      document.title = "MUT-3 Connector — J2534 Pass-Thru Setup for Mitsubishi MUT-III SE";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Official landing page for MUT-3 Connector. Effortlessly configure universal J2534 adapters (Scanmatik 2 PRO, Dialink, OpenPort 2.0) for Mitsubishi MUT-III SE. Personal license US$15.");
      }
    }

    // Update Language Toggle Button label
    document.querySelectorAll("[data-action='toggle-lang'] .lang-label").forEach((el) => {
      el.textContent = lang === "en" ? "RU" : "EN";
    });
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  /**
   * Point all checkout CTA buttons to the centralized Robokassa link
   */
  setupPaymentLinks() {
    const paymentUrl = CONFIG.payment.robokassaUrl;
    document.querySelectorAll("[data-buy-btn]").forEach((btn) => {
      btn.setAttribute("href", paymentUrl);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    });
  }

  /**
   * Populate seller legal information in footer and seller card
   */
  setupSellerDetails() {
    const s = CONFIG.seller;
    document.querySelectorAll("[data-seller-name]").forEach((el) => el.textContent = s.nameEn);
    document.querySelectorAll("[data-seller-inn]").forEach((el) => el.textContent = s.inn);
    document.querySelectorAll("[data-seller-city]").forEach((el) => el.textContent = s.cityEn);
    document.querySelectorAll("[data-seller-email]").forEach((el) => {
      el.textContent = s.email;
      if (el.tagName === "A") el.setAttribute("href", `mailto:${s.email}`);
    });
    document.querySelectorAll("[data-seller-phone]").forEach((el) => {
      el.textContent = s.phone;
      if (el.tagName === "A") el.setAttribute("href", `tel:${s.phone.replace(/[^+\d]/g, "")}`);
    });
    document.querySelectorAll("[data-seller-telegram]").forEach((el) => {
      el.textContent = s.telegram;
      if (el.tagName === "A") el.setAttribute("href", `https://t.me/${s.telegram.replace("@", "")}`);
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
