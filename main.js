i18next.use(i18nextHttpBackend).init(
  {
    lng: "bg", // Начален език
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  },
  function (err, t) {
    updateContent();
  }
);

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((elem) => {
    const key = elem.getAttribute("data-i18n");
    elem.innerHTML = i18next.t(key);
  });
}

function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    updateContent();
  });
}
