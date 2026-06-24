const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll("[data-publication-list] .publication");
const copyEmailButton = document.querySelector("[data-copy-email]");
const languageButtons = document.querySelectorAll("[data-lang-set]");
const toast = document.querySelector("[data-toast]");
const year = document.querySelector("[data-year]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
};

const setLanguage = (language) => {
  document.body.dataset.lang = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.langSet === language);
  });
  localStorage.setItem("site-language", language);
};

setHeaderState();
year.textContent = new Date().getFullYear();
setLanguage(localStorage.getItem("site-language") || "en");

window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.langSet);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      const shouldShow = filter === "all" || publication.dataset.type === filter;
      publication.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

copyEmailButton.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.copyEmail;
  const isChinese = document.body.dataset.lang === "zh";

  try {
    await navigator.clipboard.writeText(email);
    showToast(isChinese ? `已复制：${email}` : `Copied: ${email}`);
  } catch {
    showToast(email);
  }
});
