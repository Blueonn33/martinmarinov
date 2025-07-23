i18next.use(i18nextHttpBackend).init(
  {
    lng: localStorage.getItem("lang") || "bg",
    fallbackLng: "bg",
    debug: true,
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
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
    localStorage.setItem("lang", lang);
    updateContent();
    updateActiveLanguageButton(lang);
  });
}

function updateActiveLanguageButton(activeLang) {
  document.querySelectorAll(".changeLanguageButton").forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang");
    if (btnLang === activeLang) {
      btn.classList.add("activeLanguage");
    } else {
      btn.classList.remove("activeLanguage");
    }
  });
}

function setTheme(id) {
  if (id == "sun") {
    document.getElementById(id).classList.add("activeTheme");
    document.getElementById("moon").classList.remove("activeTheme");
  } else if (id == "moon") {
    document.getElementById(id).classList.add("activeTheme");
    document.getElementById("sun").classList.remove("activeTheme");
  }
}
