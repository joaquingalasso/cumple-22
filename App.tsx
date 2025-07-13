import React, { useState, useEffect, useRef } from 'react';
import { RsvpData, FaqItem, Attendance, Schedule, Sleepover } from './types';
import Countdown from './components/Countdown';
import FaqItemComponent from './components/FaqItem';
import BackToTopButton from './components/BackToTopButton';

// For using GSAP with CDN
declare const gsap: any;
declare const ScrollTrigger: any;


// --- CONFIGURATION ---
// All user-editable content is here for easy modification.
const config = {
    eventName: "Juacofest 22",
    eventTagline: "“Cumplo 22 y lo celebro el Día del Amigo como se debe”",
    eventDate: "2024-07-20T16:00:00-03:00", // Target date: July 20, 2024, 16:00 Argentina Time (UTC-3)
    googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbwN9tXO3etFUGUmD_OboZT3Ae74237nzWjZMOK9ep6zjhM2bvolyvyZqLv3jAA038zMyw/exec", // Paste the URL from your deployed Google Apps Script
    location: "Calle 64 n°231 (e/ 115 y 116), La Plata",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.748399583471!2d-57.94521038476204!3d-34.9126931803799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e63c0a5d4dbd%3A0x6b8c9d1a3dc31113!2sC.%2064%20231%2C%20B1904%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2s!4v1652726359531!5m2!1sen!2s",
    dateText: "Domingo 20 de julio",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY0Y2ZjanF6ajZyZWRsMDRzbXRwYjZ4NHB4cmhibmNrbzhvZndpZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s2qXK8s2qHTO/giphy.gif",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/YOUR_PLAYLIST_ID?si=SHARE_TOKEN",
    whatsAppShareMessage: "¡Nos vemos en el Juacofest 22 este 20/07! 🎉 Mirá la invitación y confirmame: [URL_DEL_SITIO]",
    faqData: [
        { question: "¿Puedo llegar más tarde?", answer: "¡Sí, por supuesto! Llegá cuando quieras/puedas, la puerta está abierta toda la jornada." },
        { question: "¿Qué llevo?", answer: "Nada es obligatorio. Habrá comida y bebida, pero si querés traer algo para compartir (esa birra artesanal que te gusta, unas papitas, etc.), ¡suma un montón!" },
        { question: "¿Dónde toco si no anda el timbre?", answer: "¡Buena pregunta! Chiflame, golpeá la ventana del living (la que da a la calle) o mandame un WhatsApp. El celu lo voy a tener a mano." },
        { question: "¿Puedo quedarme a dormir?", answer: "¡Claro que sí! Hay lugar en el piso, sillones... traé bolsa de dormir si tenés. Dormimos como podamos, pero con buena onda." }
    ]
};
// --- END CONFIGURATION ---


const App: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<RsvpData>({
        name: '',
        attendance: Attendance.YES,
        schedule: Schedule.ALL_DAY,
        sleepover: Sleepover.NO,
        contribution: '',
        songSuggestion: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".header-title", { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
            gsap.from(".header-subtitle", { opacity: 0, y: -30, duration: 1, delay: 0.2, ease: 'power3.out' });
            gsap.from(".logo-container", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.4, ease: 'elastic.out(1, 0.75)' });

            const sections = gsap.utils.toArray('section');
            sections.forEach((section: any) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        }, mainRef);
        
        return () => ctx.revert();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (config.googleSheetsScriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
            alert("Error: La URL de Google Apps Script no está configurada.");
            return;
        }
        setIsSubmitting(true);
        setIsError(false);
        try {
            const response = await fetch(config.googleSheetsScriptUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
            });
             if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const shareOnWhatsApp = () => {
        const url = window.location.href.replace(/#.*$/, ''); // Clean URL
        const message = encodeURIComponent(config.whatsAppShareMessage.replace('[URL_DEL_SITIO]', url));
        window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    };

    return (
        <>
            <main ref={mainRef} className="container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center">
                
                {/* Header */}
                <header className="grid md:grid-cols-2 gap-8 items-center mb-16">
                    <div className="text-center md:text-left">
                        <h1 className="header-title text-6xl md:text-8xl font-black text-[var(--color-white)] drop-shadow-lg">
                            {config.eventName} <span className="inline-block animate-bounce">🎈</span>
                        </h1>
                        <p className="header-subtitle text-xl md:text-2xl text-[var(--color-beige)] mt-4 font-semibold">
                            {config.eventTagline}
                        </p>
                    </div>
                    <div className="logo-container flex justify-center items-center">
                        <div className="w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl animated-border">
                            <img src={config.gifUrl} alt="Juacofest Logo GIF" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </header>
                
                <Countdown targetDate={config.eventDate} />

                <section id="details" className="section-card my-16">
                    <h2 className="text-3xl font-bold text-[var(--color-pink)] mb-6">Info Clave</h2>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="font-bold text-lg text-white">📅 Fecha: <span className="font-normal text-[var(--color-blue-pastel)]">{config.dateText}</span></p>
                        
                        <p className="font-bold text-lg text-white">📍 Lugar: <span className="font-normal text-[var(--color-blue-pastel)]">{config.location}</span></p>
                        
                        <iframe
                            src={config.googleMapsEmbedUrl}
                            className="w-full max-w-lg h-64 mt-2 rounded-xl border-2 border-[var(--color-dark)]"
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación del evento en Google Maps"
                        ></iframe>

                        <div className="mt-2">
                             <p className="font-bold text-lg text-white">⏰ Horarios:</p>
                             <div className="mt-2 text-[var(--color-blue-pastel)] space-y-1">
                                <p><span className="font-semibold text-white">Merienda (16 a 19hs):</span> Torta, galletitas, dulzuras varias 🍪🎂</p>
                                <p><span className="font-semibold text-white">Cena y Fiesta (19hs en adelante):</span> Hamburguesas y más 🎉🍔</p>
                            </div>
                        </div>
                    </div>
                     <div className="mt-6 p-4 bg-[var(--color-red)]/80 rounded-lg text-white font-bold text-xl animate-pulse">
                        🚨 ¡ATENCIÓN! EL TIMBRE NO FUNCA 🚨
                    </div>
                </section>
                
                <section id="playlist" className="section-card my-16">
                    <h2 className="text-3xl font-bold text-[var(--color-mustard)] mb-4">Sumá tu canción</h2>
                    <p className="text-[var(--color-beige)] mb-6">La música la hacemos entre todxs. Agregá esos temas que no pueden faltar.</p>
                    <a href={config.spotifyPlaylistUrl} target="_blank" rel="noopener noreferrer" title="Abrir playlist en una nueva pestaña" className="inline-block bg-[var(--color-sky)] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-[var(--color-violet)] transition-all duration-300 transform hover:scale-105">
                        Ir a la Playlist
                    </a>
                </section>

                <section id="rsvp" className="section-card my-16">
                     <h2 className="text-3xl font-bold text-[var(--color-violet)] mb-6">Confirmá tu asistencia</h2>
                    {isSubmitted ? (
                        <div className="text-center p-8 bg-green-500/20 border border-green-500 rounded-lg">
                            <h3 className="text-2xl font-bold text-white">¡Gracias por confirmar! 😄</h3>
                            <p className="text-green-300 mt-2">¡Tus datos fueron enviados! Te espero para festejar.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-[var(--color-beige)] mb-2">Tu Nombre:</label>
                                    <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" required />
                                </div>
                                <div>
                                    <label htmlFor="attendance" className="block text-sm font-bold text-[var(--color-beige)] mb-2">¿Vas a venir?</label>
                                    <select id="attendance" name="attendance" value={formState.attendance} onChange={handleInputChange} className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]">
                                        {Object.values(Attendance).map(val => <option key={val} value={val}>{val}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="schedule" className="block text-sm font-bold text-[var(--color-beige)] mb-2">¿En qué horario venís?</label>
                                    <select id="schedule" name="schedule" value={formState.schedule} onChange={handleInputChange} className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]">
                                        {Object.values(Schedule).map(val => <option key={val} value={val}>{val}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="sleepover" className="block text-sm font-bold text-[var(--color-beige)] mb-2">¿Te quedás a dormir?</label>
                                    <select id="sleepover" name="sleepover" value={formState.sleepover} onChange={handleInputChange} className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]">
                                       {Object.values(Sleepover).map(val => <option key={val} value={val}>{val}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contribution" className="block text-sm font-bold text-[var(--color-beige)] mb-2">¿Traés algo para compartir? (Opcional)</label>
                                <input type="text" id="contribution" name="contribution" value={formState.contribution} onChange={handleInputChange} placeholder="Ej: Una birra, unas papitas, tu presencia" className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" />
                            </div>
                             <div>
                                <label htmlFor="songSuggestion" className="block text-sm font-bold text-[var(--color-beige)] mb-2">Sugerí una canción para la playlist:</label>
                                <input type="text" id="songSuggestion" name="songSuggestion" value={formState.songSuggestion} onChange={handleInputChange} placeholder="Nombre del tema o link de Spotify" className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-[var(--color-beige)] mb-2">Dejale un mensaje a Joaco:</label>
                                <textarea id="message" name="message" rows={3} value={formState.message} onChange={handleInputChange} placeholder="¡Feliz cumple!" className="w-full bg-[var(--color-dark)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]"></textarea>
                            </div>
                             {isError && <p className="text-center text-red-400 font-bold">Hubo un error al enviar. Por favor, intentá de nuevo.</p>}
                            <div className="text-center pt-4">
                                <button type="submit" disabled={isSubmitting} className="bg-[var(--color-pink)] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:bg-[var(--color-red)] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[var(--color-pink)] disabled:bg-gray-500 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Enviando...' : 'Enviar Confirmación'}
                                </button>
                            </div>
                        </form>
                    )}
                </section>
                
                <section id="extras" className="section-card my-16 text-left">
                     <h2 className="text-3xl font-bold text-[var(--color-orange)] mb-6 text-center">Extras a tener en cuenta</h2>
                     <ul className="space-y-4 text-[var(--color-beige)]">
                        <li className="flex items-start"><span className="text-[var(--color-pink)] mr-3 text-xl">🍹</span><div><span className="font-bold text-white">Bebidas:</span> Se puede traer algo especial si quieren (habrá gaseosa, agua, té, mate, cerveza, fernet).</div></li>
                        <li className="flex items-start"><span className="text-[var(--color-pink)] mr-3 text-xl">🍕</span><div><span className="font-bold text-white">Comida:</span> Comida extra siempre es bienvenida, nunca está de más.</div></li>
                        <li className="flex items-start"><span className="text-[var(--color-pink)] mr-3 text-xl">🕒</span><div><span className="font-bold text-white">Horarios:</span> Se puede llegar a cualquier hora, la idea es que vengan cómodxs.</div></li>
                        <li className="flex items-start"><span className="text-[var(--color-pink)] mr-3 text-xl">🫠</span><div><span className="font-bold text-white">Para valientes que se quedan a dormir:</span> Paciencia el lunes, se me funde la batería social.</div></li>
                     </ul>
                </section>
                
                <section id="faq" className="my-16 text-left">
                     <h2 className="text-3xl font-bold text-[var(--color-sky)] mb-6 text-center">Preguntas Frecuentes</h2>
                     <div className="section-card">
                        {config.faqData.map((item, index) => <FaqItemComponent key={index} question={item.question} answer={item.answer} />)}
                     </div>
                </section>
                
                <footer className="mt-16 py-8 border-t border-gray-700">
                    <p className="text-gray-400 mb-4">¡Compartí la invitación con lxs colgadxs!</p>
                    <button onClick={shareOnWhatsApp} className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
                        Compartir por WhatsApp
                    </button>
                    <p className="text-lg text-gray-600 mt-12 font-bold">
                        <span className="rainbow-text-animated">Made with 💛 por Joaco</span>
                    </p>
                </footer>
            </main>
            <BackToTopButton />
        </>
    );
};

export default App;
