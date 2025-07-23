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
  const body = document.body;
  const text = document.getElementsByClassName("headingText");
  const card = document.getElementsByClassName("card");

  if (id === "sun") {
    document.getElementById("sun").classList.add("activeTheme");
    document.getElementById("moon").classList.remove("activeTheme");

    for (let i = 0; i < text.length; i++) {
      text[i].classList.remove("darkThemeText");
    }
    document.getElementById("socialsLightTheme").style.display = "block";
    document.getElementById("socialsDarkTheme").style.display = "none";
    document.getElementById("socialsLightTheme").classList.add("socials");
    body.classList.remove("darkTheme");
    body.classList.remove("darkThemeText");
    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = "#fff";
    }
  } else if (id === "moon") {
    document.getElementById("moon").classList.add("activeTheme");
    document.getElementById("sun").classList.remove("activeTheme");

    for (let i = 0; i < text.length; i++) {
      text[i].classList.add("darkThemeText");
    }
    document.getElementById("socialsLightTheme").style.display = "none";
    document.getElementById("socialsDarkTheme").style.display = "block";
    document.getElementById("socialsDarkTheme").classList.add("socials");
    body.classList.add("darkTheme");
    body.classList.add("darkThemeText");
    for (let i = 0; i < text.length; i++) {
      card[i].style.backgroundColor = "#222";
    }
  }

  localStorage.setItem("theme", id);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "sun";
  setTheme(savedTheme);
});
