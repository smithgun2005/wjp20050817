const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const publications = document.querySelectorAll("[data-publication-list] .publication");
const copyEmailButton = document.querySelector("[data-copy-email]");
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

setHeaderState();
year.textContent = new Date().getFullYear();

window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "打开导航");
  }
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

  try {
    await navigator.clipboard.writeText(email);
    showToast(`已复制：${email}`);
  } catch {
    showToast(email);
  }
});
