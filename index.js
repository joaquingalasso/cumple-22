// index.tsx
import React5 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState4, useEffect as useEffect3, useRef } from "react";

// types.ts
var Attendance = /* @__PURE__ */ ((Attendance2) => {
  Attendance2["YES"] = "S\xED";
  Attendance2["NO"] = "No";
  Attendance2["MAYBE"] = "Capaz";
  return Attendance2;
})(Attendance || {});
var Schedule = /* @__PURE__ */ ((Schedule2) => {
  Schedule2["SNACKS"] = "Merienda";
  Schedule2["DINNER"] = "Cena";
  Schedule2["ALL_DAY"] = "Todo el d\xEDa";
  return Schedule2;
})(Schedule || {});
var Sleepover = /* @__PURE__ */ ((Sleepover2) => {
  Sleepover2["YES"] = "S\xED";
  Sleepover2["NO"] = "No";
  return Sleepover2;
})(Sleepover || {});

// components/Countdown.tsx
import { useState, useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +/* @__PURE__ */ new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1e3 * 60 * 60 * 24)),
        hours: Math.floor(difference / (1e3 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1e3 / 60 % 60),
        seconds: Math.floor(difference / 1e3 % 60)
      };
    }
    return null;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1e3);
    return () => clearTimeout(timer);
  });
  if (!timeLeft) {
    return /* @__PURE__ */ jsx("div", { className: "text-center my-8 p-6 bg-green-500 rounded-xl shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-white animate-pulse", children: "\xA1LLEG\xD3 EL D\xCDA! \xA1A FESTEJAR!" }) });
  }
  const timeParts = [
    { label: "D\xEDas", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "countdown", className: "my-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-[var(--color-pink)] mb-6", children: "\xA1Falta poco!" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto", children: timeParts.map((part) => /* @__PURE__ */ jsxs("div", { className: "bg-[var(--color-dark)]/50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 border border-transparent hover:border-[var(--color-pink)]", children: [
      /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-black text-white tracking-tighter", children: String(part.value).padStart(2, "0") }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[var(--color-pink)] uppercase", children: part.label })
    ] }, part.label)) })
  ] });
};
var Countdown_default = Countdown;

// components/FaqItem.tsx
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ChevronDownIcon = ({ className }) => /* @__PURE__ */ jsx2("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", className, children: /* @__PURE__ */ jsx2("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) });
var FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState2(false);
  return /* @__PURE__ */ jsxs2("div", { className: "border-b-2 border-[var(--color-dark)] py-4", children: [
    /* @__PURE__ */ jsxs2(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-[var(--color-sky)] transition-colors duration-200 focus:outline-none",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx2("span", { children: question }),
          /* @__PURE__ */ jsx2(ChevronDownIcon, { className: `w-5 h-5 text-[var(--color-sky)] shrink-0 transform transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsx2(
      "div",
      {
        className: `grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`,
        children: /* @__PURE__ */ jsx2("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx2("p", { className: "text-[var(--color-beige)] pr-6", children: answer }) })
      }
    )
  ] });
};
var FaqItem_default = FaqItem;

// components/BackToTopButton.tsx
import { useState as useState3, useEffect as useEffect2 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState3(false);
  useEffect2(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx3(
    "button",
    {
      onClick: scrollToTop,
      className: `fixed bottom-6 right-6 bg-[var(--color-pink)] text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[var(--color-violet)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-dark)] focus:ring-[var(--color-pink)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`,
      "aria-label": "Volver arriba",
      children: /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) })
    }
  );
};
var BackToTopButton_default = BackToTopButton;

// App.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var config = {
  eventName: "Juacofest 22",
  eventTagline: "\u201CCumplo 22 y lo celebro el D\xEDa del Amigo como se debe\u201D",
  eventDate: "2024-07-20T16:00:00-03:00",
  // Target date: July 20, 2024, 16:00 Argentina Time (UTC-3)
  googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbwN9tXO3etFUGUmD_OboZT3Ae74237nzWjZMOK9ep6zjhM2bvolyvyZqLv3jAA038zMyw/execE",
  // Paste the URL from your deployed Google Apps Script
  location: "Calle 64 n\xB0231 (e/ 115 y 116), La Plata",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.748399583471!2d-57.94521038476204!3d-34.9126931803799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e63c0a5d4dbd%3A0x6b8c9d1a3dc31113!2sC.%2064%20231%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2s!4v1652726359531!5m2!1sen!2s",
  dateText: "Domingo 20 de julio",
  gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY0Y2ZjanF6ajZyZWRsMDRzbXRwYjZ4NHB4cmhibmNrbzhvZndpZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s2qXK8s2qHTO/giphy.gif",
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID?si=SHARE_TOKEN",
  whatsAppShareMessage: "\xA1Nos vemos en el Juacofest 22 este 20/07! \u{1F389} Mir\xE1 la invitaci\xF3n y confirmame: [URL_DEL_SITIO]",
  faqData: [
    { question: "\xBFPuedo llegar m\xE1s tarde?", answer: "\xA1S\xED, por supuesto! Lleg\xE1 cuando quieras/puedas, la puerta est\xE1 abierta toda la jornada." },
    { question: "\xBFQu\xE9 llevo?", answer: "Nada es obligatorio. Habr\xE1 comida y bebida, pero si quer\xE9s traer algo para compartir (esa birra artesanal que te gusta, unas papitas, etc.), \xA1suma un mont\xF3n!" },
    { question: "\xBFD\xF3nde toco si no anda el timbre?", answer: "\xA1Buena pregunta! Chiflame, golpe\xE1 la ventana del living (la que da a la calle) o mandame un WhatsApp. El celu lo voy a tener a mano." },
    { question: "\xBFPuedo quedarme a dormir?", answer: "\xA1Claro que s\xED! Hay lugar en el piso, sillones... tra\xE9 bolsa de dormir si ten\xE9s. Dormimos como podamos, pero con buena onda." }
  ]
};
var App = () => {
  const mainRef = useRef(null);
  const [formState, setFormState] = useState4({
    name: "",
    attendance: "S\xED" /* YES */,
    schedule: "Todo el d\xEDa" /* ALL_DAY */,
    sleepover: "No" /* NO */,
    contribution: "",
    songSuggestion: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState4(false);
  const [isSubmitted, setIsSubmitted] = useState4(false);
  const [isError, setIsError] = useState4(false);
  useEffect3(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".header-title", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
      gsap.from(".header-subtitle", { opacity: 0, y: -30, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".logo-container", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.4, ease: "elastic.out(1, 0.75)" });
      const sections = gsap.utils.toArray("section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (config.googleSheetsScriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      alert("Error: La URL de Google Apps Script no est\xE1 configurada.");
      return;
    }
    setIsSubmitting(true);
    setIsError(false);
    try {
      const response = await fetch(config.googleSheetsScriptUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  const shareOnWhatsApp = () => {
    const url = window.location.href.replace(/#.*$/, "");
    const message = encodeURIComponent(config.whatsAppShareMessage.replace("[URL_DEL_SITIO]", url));
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("main", { ref: mainRef, className: "container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center", children: [
      /* @__PURE__ */ jsxs3("header", { className: "grid md:grid-cols-2 gap-8 items-center mb-16", children: [
        /* @__PURE__ */ jsxs3("div", { className: "text-center md:text-left", children: [
          /* @__PURE__ */ jsxs3("h1", { className: "header-title text-6xl md:text-8xl font-black text-[var(--color-white)] drop-shadow-lg", children: [
            config.eventName,
            " ",
            /* @__PURE__ */ jsx4("span", { className: "inline-block animate-bounce", children: "\u{1F388}" })
          ] }),
          /* @__PURE__ */ jsx4("p", { className: "header-subtitle text-xl md:text-2xl text-[var(--color-beige)] mt-4 font-semibold", children: config.eventTagline })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "logo-container flex justify-center items-center", children: /* @__PURE__ */ jsx4("div", { className: "w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl animated-border", children: /* @__PURE__ */ jsx4("img", { src: config.gifUrl, alt: "Juacofest Logo GIF", className: "w-full h-full object-cover" }) }) })
      ] }),
      /* @__PURE__ */ jsx4(Countdown_default, { targetDate: config.eventDate }),
      /* @__PURE__ */ jsxs3("section", { id: "details", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx4("h2", { className: "text-3xl font-bold text-[var(--color-pink)] mb-6", children: "Info Clave" }),
        /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-lg text-white", children: [
            "\u{1F4C5} Fecha: ",
            /* @__PURE__ */ jsx4("span", { className: "font-normal text-[var(--color-blue-pastel)]", children: config.dateText })
          ] }),
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-lg text-white", children: [
            "\u{1F4CD} Lugar: ",
            /* @__PURE__ */ jsx4("span", { className: "font-normal text-[var(--color-blue-pastel)]", children: config.location })
          ] }),
          /* @__PURE__ */ jsx4(
            "iframe",
            {
              src: config.googleMapsEmbedUrl,
              className: "w-full max-w-lg h-64 mt-2 rounded-xl border-2 border-[var(--color-dark)]",
              allowFullScreen: false,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "Ubicaci\xF3n del evento en Google Maps"
            }
          ),
          /* @__PURE__ */ jsxs3("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsx4("p", { className: "font-bold text-lg text-white", children: "\u23F0 Horarios:" }),
            /* @__PURE__ */ jsxs3("div", { className: "mt-2 text-[var(--color-blue-pastel)] space-y-1", children: [
              /* @__PURE__ */ jsxs3("p", { children: [
                /* @__PURE__ */ jsx4("span", { className: "font-semibold text-white", children: "Merienda (16 a 19hs):" }),
                " Torta, galletitas, dulzuras varias \u{1F36A}\u{1F382}"
              ] }),
              /* @__PURE__ */ jsxs3("p", { children: [
                /* @__PURE__ */ jsx4("span", { className: "font-semibold text-white", children: "Cena y Fiesta (19hs en adelante):" }),
                " Hamburguesas y m\xE1s \u{1F389}\u{1F354}"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "mt-6 p-4 bg-[var(--color-red)]/80 rounded-lg text-white font-bold text-xl animate-pulse", children: "\u{1F6A8} \xA1ATENCI\xD3N! EL TIMBRE NO FUNCA \u{1F6A8}" })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "playlist", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx4("h2", { className: "text-3xl font-bold text-[var(--color-mustard)] mb-4", children: "Sum\xE1 tu canci\xF3n" }),
        /* @__PURE__ */ jsx4("p", { className: "text-[var(--color-beige)] mb-6", children: "La m\xFAsica la hacemos entre todxs. Agreg\xE1 esos temas que no pueden faltar." }),
        /* @__PURE__ */ jsx4("a", { href: config.spotifyPlaylistUrl, target: "_blank", rel: "noopener noreferrer", title: "Abrir playlist en una nueva pesta\xF1a", className: "inline-block bg-[var(--color-sky)] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-[var(--color-violet)] transition-all duration-300 transform hover:scale-105", children: "Ir a la Playlist" })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "rsvp", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx4("h2", { className: "text-3xl font-bold text-[var(--color-violet)] mb-6", children: "Confirm\xE1 tu asistencia" }),
        isSubmitted ? /* @__PURE__ */ jsxs3("div", { className: "text-center p-8 bg-green-500/20 border border-green-500 rounded-lg", children: [
          /* @__PURE__ */ jsx4("h3", { className: "text-2xl font-bold text-white", children: "\xA1Gracias por confirmar! \u{1F604}" }),
          /* @__PURE__ */ jsx4("p", { className: "text-green-300 mt-2", children: "\xA1Tus datos fueron enviados! Te espero para festejar." })
        ] }) : /* @__PURE__ */ jsxs3("form", { onSubmit: handleSubmit, className: "space-y-6 text-left", children: [
          /* @__PURE__ */ jsxs3("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("label", { htmlFor: "name", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Tu Nombre:" }),
              /* @__PURE__ */ jsx4("input", { type: "text", id: "name", name: "name", value: formState.name, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", required: true })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("label", { htmlFor: "attendance", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFVas a venir?" }),
              /* @__PURE__ */ jsx4("select", { id: "attendance", name: "attendance", value: formState.attendance, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", children: Object.values(Attendance).map((val) => /* @__PURE__ */ jsx4("option", { value: val, children: val }, val)) })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("label", { htmlFor: "schedule", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFEn qu\xE9 horario ven\xEDs?" }),
              /* @__PURE__ */ jsx4("select", { id: "schedule", name: "schedule", value: formState.schedule, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", children: Object.values(Schedule).map((val) => /* @__PURE__ */ jsx4("option", { value: val, children: val }, val)) })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("label", { htmlFor: "sleepover", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFTe qued\xE1s a dormir?" }),
              /* @__PURE__ */ jsx4("select", { id: "sleepover", name: "sleepover", value: formState.sleepover, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", children: Object.values(Sleepover).map((val) => /* @__PURE__ */ jsx4("option", { value: val, children: val }, val)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx4("label", { htmlFor: "contribution", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFTra\xE9s algo para compartir? (Opcional)" }),
            /* @__PURE__ */ jsx4("input", { type: "text", id: "contribution", name: "contribution", value: formState.contribution, onChange: handleInputChange, placeholder: "Ej: Una birra, unas papitas, tu presencia", className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx4("label", { htmlFor: "songSuggestion", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Suger\xED una canci\xF3n para la playlist:" }),
            /* @__PURE__ */ jsx4("input", { type: "text", id: "songSuggestion", name: "songSuggestion", value: formState.songSuggestion, onChange: handleInputChange, placeholder: "Nombre del tema o link de Spotify", className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx4("label", { htmlFor: "message", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Dejale un mensaje a Joaco:" }),
            /* @__PURE__ */ jsx4("textarea", { id: "message", name: "message", rows: 3, value: formState.message, onChange: handleInputChange, placeholder: "\xA1Feliz cumple!", className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" })
          ] }),
          isError && /* @__PURE__ */ jsx4("p", { className: "text-center text-red-400 font-bold", children: "Hubo un error al enviar. Por favor, intent\xE1 de nuevo." }),
          /* @__PURE__ */ jsx4("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsx4("button", { type: "submit", disabled: isSubmitting, className: "bg-[var(--color-pink)] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-[var(--color-red)] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--color-pink)] disabled:bg-gray-500 disabled:cursor-not-allowed", children: isSubmitting ? "Enviando..." : "Enviar Confirmaci\xF3n" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "extras", className: "section-card my-16 text-left", children: [
        /* @__PURE__ */ jsx4("h2", { className: "text-3xl font-bold text-[var(--color-orange)] mb-6 text-center", children: "Extras a tener en cuenta" }),
        /* @__PURE__ */ jsxs3("ul", { className: "space-y-4 text-[var(--color-beige)]", children: [
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx4("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F379}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("span", { className: "font-bold text-white", children: "Bebidas:" }),
              " Se puede traer algo especial si quieren (habr\xE1 gaseosa, agua, t\xE9, mate, cerveza, fernet)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx4("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F355}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("span", { className: "font-bold text-white", children: "Comida:" }),
              " Comida extra siempre es bienvenida, nunca est\xE1 de m\xE1s."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx4("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F552}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("span", { className: "font-bold text-white", children: "Horarios:" }),
              " Se puede llegar a cualquier hora, la idea es que vengan c\xF3modxs."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx4("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1FAE0}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx4("span", { className: "font-bold text-white", children: "Para valientes que se quedan a dormir:" }),
              " Paciencia el lunes, se me funde la bater\xEDa social."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "faq", className: "my-16 text-left", children: [
        /* @__PURE__ */ jsx4("h2", { className: "text-3xl font-bold text-[var(--color-sky)] mb-6 text-center", children: "Preguntas Frecuentes" }),
        /* @__PURE__ */ jsx4("div", { className: "section-card", children: config.faqData.map((item, index) => /* @__PURE__ */ jsx4(FaqItem_default, { question: item.question, answer: item.answer }, index)) })
      ] }),
      /* @__PURE__ */ jsxs3("footer", { className: "mt-16 py-8 border-t border-gray-700", children: [
        /* @__PURE__ */ jsx4("p", { className: "text-gray-400 mb-4", children: "\xA1Compart\xED la invitaci\xF3n con lxs colgadxs!" }),
        /* @__PURE__ */ jsx4("button", { onClick: shareOnWhatsApp, className: "bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105", children: "Compartir por WhatsApp" }),
        /* @__PURE__ */ jsx4("p", { className: "text-lg text-gray-600 mt-12 font-bold", children: /* @__PURE__ */ jsx4("span", { className: "rainbow-text-animated", children: "Made with \u{1F49B} por Joaco" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx4(BackToTopButton_default, {})
  ] });
};
var App_default = App;

// index.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx5(React5.StrictMode, { children: /* @__PURE__ */ jsx5(App_default, {}) })
);
