// index.tsx
import React6 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState5, useEffect as useEffect4, useRef as useRef2 } from "react";
import Typewriter from "https://esm.sh/typewriter-effect";

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
import { useState, useEffect, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Countdown = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
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
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1e3);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft]);
  if (!timeLeft) {
    return /* @__PURE__ */ jsx("div", { className: "text-center my-8 p-6 bg-green-500 rounded-xl shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-white animate-pulse", children: "\xA1LLEG\xD3 EL D\xCDA! \xA1A FESTEJAR!" }) });
  }
  const timeParts = [
    { label: "D\xEDas", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "countdown", className: "my-16 section-card", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-[var(--color-pink)] mb-6", children: "\xA1Falta poco!" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto", children: timeParts.map((part) => /* @__PURE__ */ jsxs("div", { className: "bg-[var(--color-dark)]/50 p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 border border-transparent hover:border-[var(--color-pink)]", children: [
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
      className: `fixed bottom-6 right-6 bg-[var(--color-pink)] text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[var(--color-violet)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-dark)] focus:ring-[var(--color-pink)] z-50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`,
      "aria-label": "Volver arriba",
      children: /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx3("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) })
    }
  );
};
var BackToTopButton_default = BackToTopButton;

// components/FloatingNames.tsx
import { useState as useState4, useEffect as useEffect3, useRef } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var createNameState = (text) => {
  const scale = Math.random() * 0.4 + 0.9;
  const rotation = Math.random() * 50 - 25;
  return {
    id: `${text}-${Math.random()}`,
    text,
    top: `${Math.random() * 95}%`,
    // Posición vertical aleatoria
    left: `${Math.random() * 95}%`,
    // Posición horizontal aleatoria
    transform: `rotate(${rotation}deg) scale(${scale})`,
    fontSize: `${Math.random() * 1.2 + 1.2}rem`,
    // Tamaño de fuente entre 1.2rem y 2.4rem
    opacity: Math.random() * 0.3 + 0.1
    // Opacidad entre 0.2 y 0.5
  };
};
var FloatingNames = ({ guests }) => {
  const [names, setNames] = useState4([]);
  const [visible, setVisible] = useState4(false);
  const animationTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const updateNames = () => {
    setNames(guests.map(createNameState));
  };
  useEffect3(() => {
    if (guests.length === 0) {
      setVisible(false);
      return;
    }
    const runAnimationCycle = () => {
      setVisible(false);
      animationTimeoutRef.current = window.setTimeout(() => {
        updateNames();
        setVisible(true);
      }, 1e3);
    };
    updateNames();
    setVisible(true);
    animationIntervalRef.current = window.setInterval(runAnimationCycle, 1e4);
    window.addEventListener("resize", updateNames);
    return () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      window.removeEventListener("resize", updateNames);
    };
  }, [guests]);
  if (!guests.length) {
    return null;
  }
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: "fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden pointer-events-none",
      "aria-hidden": "true",
      children: names.map((name) => /* @__PURE__ */ jsx4(
        "span",
        {
          className: "absolute font-bold whitespace-nowrap",
          style: {
            top: name.top,
            left: name.left,
            transform: name.transform,
            fontSize: name.fontSize,
            color: "var(--color-beige)",
            opacity: visible ? name.opacity : 0,
            // Control opacity for fade effect
            // Slower transitions for a more graceful effect
            transition: "opacity 1s ease-in-out, top 1.5s ease-out, left 1.5s ease-out"
          },
          children: name.text
        },
        name.id
      ))
    }
  );
};
var FloatingNames_default = FloatingNames;

// App.tsx
import { Fragment, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var config = {
  eventName: "Cumplo 22",
  eventTaglinePrefix: "El evento del a\xF1o que",
  eventTaglineVariations: [
    "todos estaban esperando... (ahre)",
    "va a ser una locura... (ponele)",
    "no te pod\xE9s perder... (o quiz\xE1 s\xED)"
  ],
  eventDate: "2025-07-20T16:00:00-03:00",
  // Target date: July 20, 2024, 16:00 Argentina Time (UTC-3)
  googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbwN9tXO3etFUGUmD_OboZT3Ae74237nzWjZMOK9ep6zjhM2bvolyvyZqLv3jAA038zMyw/exec",
  // Paste the URL from your deployed Google Apps Script
  location: "Calle 64 n\xB0231 (e/ 115 y 116)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.748399583471!2d-57.94521038476204!3d-34.9126931803799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e63c0a5d4dbd%3A0x6b8c9d1a3dc31113!2sC.%2064%20231%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2s!4v1652726359531!5m2!1sen!2s",
  dateText: "Domingo 20 de julio",
  gifUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHVlaWc0aDl4bTFmbDRldmVvMXNyeGI2azZzdmNhdTN6ZGM4cmw2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ApLWt7Eqrz1qcXB5VB/giphy.gif",
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/2eYGxeZq4nvzgNpwF2iIOm?si=102b066235574b68&pt=62a9c4eb80c6197f6b29e0bc1baabe02",
  whatsAppShareMessage: "\xA1Este 20/07 hay festejo! \u{1F389} Mir\xE1 la invitaci\xF3n y confirmame: [URL_DEL_SITIO]",
  faqData: [
    { question: "\xBFPuedo llegar m\xE1s tarde?", answer: "\xA1S\xED, por supuesto! Lleg\xE1 cuando quieras, nom\xE1s te voy a odiar si lleg\xE1s tarde. \u{1F496}" },
    { question: "\xBFQu\xE9 te regalo?", answer: "Tu presencia o algo que supere al regalo del a\xF1o pasado. CHAN. \u{1F62F}" },
    { question: "\xBFQu\xE9 hago si no anda el timbre?", answer: "Nada; no se puede hacer nada. Te voy a hacer esperar en la puerta hasta que me digne a salir. El celu intentar\xE9 NO tenerlo a mano. \u2728" },
    { question: "\xBFPuedo quedarme a mimir?", answer: "\xA1Claro que s\xED! Hay tres camas, dos fiacas, una hamaca paraguaya y mucho lugar en el piso. \u{1F4AB}" }
  ]
};
var App = () => {
  const mainRef = useRef2(null);
  const [formState, setFormState] = useState5({
    name: "",
    attendance: "S\xED" /* YES */,
    schedule: "Todo el d\xEDa" /* ALL_DAY */,
    sleepover: "No" /* NO */,
    contribution: "",
    songSuggestion: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState5(false);
  const [isSubmitted, setIsSubmitted] = useState5(false);
  const [isError, setIsError] = useState5(false);
  const [num1, setNum1] = useState5(0);
  const [num2, setNum2] = useState5(0);
  const [captchaAnswer, setCaptchaAnswer] = useState5("");
  const [captchaError, setCaptchaError] = useState5(false);
  const [guestList, setGuestList] = useState5([]);
  const isNotAttending = formState.attendance === "No" /* NO */;
  useEffect4(() => {
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
  useEffect4(() => {
    const fetchGuests = async () => {
      if (!config.googleSheetsScriptUrl || config.googleSheetsScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_URL")) {
        console.log("Google Sheets URL not configured. Skipping guest fetch.");
        return;
      }
      try {
        const response = await fetch(config.googleSheetsScriptUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch guest list");
        }
        const result = await response.json();
        if (result.result === "success" && Array.isArray(result.data)) {
          const names = result.data.map((item) => item ? String(item).trim() : "").filter((item) => item);
          const uniqueNames = [...new Set(names)];
          setGuestList(uniqueNames);
        } else {
          throw new Error(result.error || "Malformed data from guest list fetch");
        }
      } catch (error) {
        console.error("Could not fetch guest list:", error);
      }
    };
    fetchGuests();
  }, []);
  useEffect4(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);
  useEffect4(() => {
    if (isNotAttending) {
      setFormState((prevState) => ({
        ...prevState,
        schedule: "Todo el d\xEDa" /* ALL_DAY */,
        sleepover: "No" /* NO */,
        contribution: ""
      }));
    }
  }, [isNotAttending]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaAnswer, 10) !== num1 + num2) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    if (config.googleSheetsScriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_URL") || !config.googleSheetsScriptUrl) {
      alert("Error: La URL de Google Apps Script no est\xE1 configurada.");
      return;
    }
    setIsSubmitting(true);
    setIsError(false);
    const formData = new FormData(e.target);
    try {
      const response = await fetch(config.googleSheetsScriptUrl, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Network error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.result === "success") {
        setIsSubmitted(true);
        if (formState.name && formState.attendance !== "No" /* NO */) {
          setGuestList((prevGuests) => [.../* @__PURE__ */ new Set([...prevGuests, formState.name.trim()])]);
        }
      } else {
        throw new Error(result.error || "An unknown error occurred in the script.");
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
    /* @__PURE__ */ jsx5(FloatingNames_default, { guests: guestList }),
    /* @__PURE__ */ jsxs3("main", { ref: mainRef, className: "container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center relative z-10", children: [
      /* @__PURE__ */ jsxs3("header", { className: "grid md:grid-cols-2 gap-8 items-center mb-16", children: [
        /* @__PURE__ */ jsxs3("div", { className: "text-center md:text-left", children: [
          /* @__PURE__ */ jsxs3("h1", { className: "header-title text-6xl md:text-6xl font-black text-[var(--color-white)] drop-shadow-lg", children: [
            /* @__PURE__ */ jsx5("span", { className: "inline-block animate-bounce", children: "\u{1F97A}" }),
            " ",
            config.eventName
          ] }),
          /* @__PURE__ */ jsx5("div", { className: "header-subtitle text-xl md:text-2xl text-[var(--color-beige)] mt-4 font-semibold min-h-[5rem] md:min-h-[2.5rem] flex justify-center md:justify-start items-center", children: /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsxs3("span", { children: [
              config.eventTaglinePrefix,
              "\xA0"
            ] }),
            /* @__PURE__ */ jsx5(
              Typewriter,
              {
                options: {
                  strings: config.eventTaglineVariations,
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40,
                  wrapperClassName: "inline-block text-[var(--color-mustard)] font-bold",
                  cursorClassName: "text-[var(--color-sky)]"
                }
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx5("div", { className: "logo-container flex justify-center items-center", children: /* @__PURE__ */ jsx5("div", { className: "w-full mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl animated-border", children: /* @__PURE__ */ jsx5("img", { src: config.gifUrl, alt: "Juacofest Logo GIF", className: "w-full h-full object-cover" }) }) })
      ] }),
      /* @__PURE__ */ jsx5(Countdown_default, { targetDate: config.eventDate }),
      /* @__PURE__ */ jsxs3("section", { id: "details", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl font-bold text-[var(--color-red)] mb-6", children: "Le\xE9 la info" }),
        /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-lg text-white", children: [
            "\u{1F4C5} Fecha: ",
            /* @__PURE__ */ jsx5("span", { className: "font-normal text-[var(--color-blue-pastel)]", children: config.dateText })
          ] }),
          /* @__PURE__ */ jsxs3("p", { className: "font-bold text-lg text-white", children: [
            "\u{1F4CD} Lugar: ",
            /* @__PURE__ */ jsx5("span", { className: "font-normal text-[var(--color-blue-pastel)]", children: config.location })
          ] }),
          /* @__PURE__ */ jsx5(
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
            /* @__PURE__ */ jsx5("p", { className: "font-bold text-lg text-white", children: "\u23F0 Horarios:" }),
            /* @__PURE__ */ jsxs3("div", { className: "mt-2 text-[var(--color-blue-pastel)] space-y-1", children: [
              /* @__PURE__ */ jsxs3("p", { children: [
                /* @__PURE__ */ jsx5("span", { className: "font-semibold text-white", children: "Merienda" }),
                " (16 a 19hs)"
              ] }),
              /* @__PURE__ */ jsxs3("p", { children: [
                /* @__PURE__ */ jsx5("span", { className: "font-semibold text-white", children: "Cena" }),
                " (19hs en adelante)"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx5("div", { className: "mt-6 p-4 bg-[var(--color-red)]/80 rounded-lg text-white font-bold text-xl animate-pulse", children: "\u{1F6A8} EL TIMBRE NO FUNCA. \u{1F6A8}" })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "playlist", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl font-bold text-[var(--color-mustard)] mb-4", children: "Sum\xE1 tu canci\xF3n" }),
        /* @__PURE__ */ jsx5("p", { className: "text-[var(--color-beige)] mb-6", children: "La m\xFAsica este a\xF1o la hacemos entre varios. Agreg\xE1 esos temas que no pueden faltar." }),
        /* @__PURE__ */ jsx5("a", { href: config.spotifyPlaylistUrl, target: "_blank", rel: "noopener noreferrer", title: "Abrir playlist en una nueva pesta\xF1a", className: "inline-block bg-[var(--color-sky)] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-[var(--color-violet)] transition-all duration-300 transform hover:scale-105", children: "Ir a la Playlist" })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "rsvp", className: "section-card my-16", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl font-bold text-[var(--color-violet)] mb-6", children: "Confirm\xE1 tu asistencia" }),
        isSubmitted ? /* @__PURE__ */ jsxs3("div", { className: "text-center p-8 bg-green-500/20 border border-green-500 rounded-lg", children: [
          /* @__PURE__ */ jsx5("h3", { className: "text-2xl font-bold text-white", children: "\xA1Gracias por confirmar! \u{1F604}" }),
          /* @__PURE__ */ jsx5("p", { className: "text-green-300 mt-2", children: "\xA1Tus datos fueron enviados! Te espero para festejar." })
        ] }) : /* @__PURE__ */ jsxs3("form", { onSubmit: handleSubmit, className: "space-y-6 text-left", children: [
          /* @__PURE__ */ jsxs3("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("label", { htmlFor: "name", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Tu nombre:" }),
              /* @__PURE__ */ jsx5("input", { type: "text", id: "name", name: "name", value: formState.name, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", required: true })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("label", { htmlFor: "attendance", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFVas a venir?" }),
              /* @__PURE__ */ jsx5("select", { id: "attendance", name: "attendance", value: formState.attendance, onChange: handleInputChange, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]", children: Object.values(Attendance).map((val) => /* @__PURE__ */ jsx5("option", { value: val, children: val }, val)) })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("label", { htmlFor: "schedule", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFEn qu\xE9 horario ven\xEDs?" }),
              /* @__PURE__ */ jsx5("select", { id: "schedule", name: "schedule", value: formState.schedule, onChange: handleInputChange, disabled: isNotAttending, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed", children: Object.values(Schedule).map((val) => /* @__PURE__ */ jsx5("option", { value: val, children: val }, val)) })
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("label", { htmlFor: "sleepover", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFTe qued\xE1s a dormir?" }),
              /* @__PURE__ */ jsx5("select", { id: "sleepover", name: "sleepover", value: formState.sleepover, onChange: handleInputChange, disabled: isNotAttending, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed", children: Object.values(Sleepover).map((val) => /* @__PURE__ */ jsx5("option", { value: val, children: val }, val)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx5("label", { htmlFor: "contribution", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "\xBFTra\xE9s algo para compartir? (Opcional)" }),
            /* @__PURE__ */ jsx5("input", { type: "text", id: "contribution", name: "contribution", value: formState.contribution, onChange: handleInputChange, placeholder: "Ej: Una cunnington, unas papas, tu presencia", disabled: isNotAttending, className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx5("label", { htmlFor: "songSuggestion", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Suger\xED una canci\xF3n para la playlist:" }),
            /* @__PURE__ */ jsx5("input", { type: "text", id: "songSuggestion", name: "songSuggestion", value: formState.songSuggestion, onChange: handleInputChange, placeholder: "Nombre del tema o link de Spotify", className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsx5("label", { htmlFor: "message", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: "Dejale un mensaje a Joaco:" }),
            /* @__PURE__ */ jsx5("textarea", { id: "message", name: "message", rows: 3, value: formState.message, onChange: handleInputChange, placeholder: "\xA1Feliz cumple!", className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsxs3("label", { htmlFor: "captcha", className: "block text-sm font-bold text-[var(--color-beige)] mb-2", children: [
              "Verificaci\xF3n anti-bot: \xBFCu\xE1nto es ",
              num1,
              " + ",
              num2,
              "?"
            ] }),
            /* @__PURE__ */ jsx5(
              "input",
              {
                type: "number",
                id: "captcha",
                name: "captcha",
                value: captchaAnswer,
                onChange: (e) => {
                  setCaptchaAnswer(e.target.value);
                  setCaptchaError(false);
                },
                className: "w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]",
                required: true,
                "aria-describedby": "captcha-error"
              }
            ),
            captchaError && /* @__PURE__ */ jsx5("p", { id: "captcha-error", className: "mt-2 text-red-500 font-bold text-sm", children: "Respuesta incorrecta. \xA1Intenta de nuevo!" })
          ] }),
          isError && /* @__PURE__ */ jsx5("p", { className: "text-center text-red-400 font-bold", children: "Hubo un error al enviar. Por favor, intent\xE1 de nuevo." }),
          /* @__PURE__ */ jsx5("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsx5("button", { type: "submit", disabled: isSubmitting, className: "bg-[var(--color-pink)] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-[var(--color-red)] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--color-pink)] disabled:bg-gray-500 disabled:cursor-not-allowed", children: isSubmitting ? "Enviando..." : "Enviar Confirmaci\xF3n" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "extras", className: "section-card my-16 text-left", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl font-bold text-[var(--color-orange)] mb-6 text-center", children: "Ten\xE9 en cuenta" }),
        /* @__PURE__ */ jsxs3("ul", { className: "space-y-4 text-[var(--color-beige)]", children: [
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx5("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F379}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("span", { className: "font-bold text-white", children: "Bebidas:" }),
              " Pod\xE9s traer algo en especial si quer\xE9s (habr\xE1 gaseosa, agua, t\xE9, mate, pero nada de alcohol)."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx5("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F355}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("span", { className: "font-bold text-white", children: "Comida:" }),
              " Comida extra siempre es bienvenida. Lo que no se come, se freeza."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx5("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F552}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("span", { className: "font-bold text-white", children: "Horarios:" }),
              " Se puede llegar a cualquier hora, s\xF3lo procur\xE1 cumplir con lo que pongas en el form."
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx5("span", { className: "text-[var(--color-pink)] mr-3 text-xl", children: "\u{1F4A4}" }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx5("span", { className: "font-bold text-white", children: "Si te qued\xE1s a dormir:" }),
              " Paciencia el lunes, se me funde la bater\xEDa social."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("section", { id: "faq", className: "my-16 text-left", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-3xl font-bold text-[var(--color-sky)] mb-6 text-center", children: "Preguntas que mejor no hacer" }),
        /* @__PURE__ */ jsx5("div", { className: "section-card", children: config.faqData.map((item, index) => /* @__PURE__ */ jsx5(FaqItem_default, { question: item.question, answer: item.answer }, index)) })
      ] }),
      /* @__PURE__ */ jsxs3("footer", { className: "mt-16 py-8 border-t border-gray-700", children: [
        /* @__PURE__ */ jsx5("p", { className: "text-gray-400 mb-4", children: "\xA1Compart\xED la invitaci\xF3n con los colgados!" }),
        /* @__PURE__ */ jsx5("button", { onClick: shareOnWhatsApp, className: "bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105", children: "Compartir por WhatsApp" }),
        /* @__PURE__ */ jsx5("p", { className: "text-lg text-gray-600 mt-12 font-bold", children: /* @__PURE__ */ jsx5("span", { className: "rainbow-text-animated", children: "Te espero \u{1F49B} Joaquito" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx5(BackToTopButton_default, {})
  ] });
};
var App_default = App;

// index.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx6(React6.StrictMode, { children: /* @__PURE__ */ jsx6(App_default, {}) })
);
