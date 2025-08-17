/* 
  JavaScript Utility File 
  ? Created especially for you – ملكيتك الكاملة 100% 
  - يحتوي على أهم الخصائص التي تحتاجها غالباً في أي موقع 
  - منظم بشكل Modular و قابل للتوسيع 
*/

// ========== ?? أداة لاختيار العناصر ==========
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// ========== ?? مبدل القائمة (Menu Toggle) ==========
function toggleMenu(btnSelector, menuSelector) {
  const btn = $(btnSelector);
  const menu = $(menuSelector);

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
}

// ========== ?? سكرول سلس (Smooth Scroll) ==========
function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = $(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ========== ?? نافذة منبثقة (Modal) ==========
function modal(modalSelector, triggerSelector, closeSelector) {
  const modal = $(modalSelector);
  const trigger = $(triggerSelector);
  const closeBtn = $(closeSelector);

  if (modal && trigger && closeBtn) {
    trigger.addEventListener("click", () => modal.classList.add("open"));
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    window.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
}

// ========== ?? تبويبات (Tabs) ==========
function tabs(tabSelector, contentSelector, activeClass = "active") {
  const tabs = $$(tabSelector);
  const contents = $$(contentSelector);

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove(activeClass));
      contents.forEach(c => c.classList.remove(activeClass));

      tab.classList.add(activeClass);
      contents[i].classList.add(activeClass);
    });
  });
}

// ========== ?? مبدل الوضع الليلي (Dark Mode) ==========
function enableDarkMode(toggleSelector) {
  const toggle = $(toggleSelector);
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  // استرجاع الوضع من التخزين
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
}

// ========== ?? تنبيه Toast ==========
function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
}

// ========== ?? تحميل عند التمرير (Lazy Loading) ==========
function enableLazyLoading() {
  const lazyImages = $$("img[data-src]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => observer.observe(img));
}

// ========== ?? مشغل أنيميشن عند التمرير ==========
function animateOnScroll(selector, className = "visible") {
  const elements = $$(selector);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
}

// ========== ?? تشغيل جميع الخصائص بسهولة ==========
function initGlobalFeatures() {
  enableSmoothScroll();
  enableLazyLoading();
  animateOnScroll(".animate");
  enableDarkMode("#darkModeToggle");
}

// ?? تشغيل بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", initGlobalFeatures);
