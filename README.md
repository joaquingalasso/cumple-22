# Juacofest 22 - Landing Page

Esta es la landing page de invitación para el Juacofest 22. Es una aplicación web estática construida con React (usando `esbuild` para el empaquetado) y estilizada con TailwindCSS.

## ✨ Características

- **Diseño Festivo y Animado**: Usa una paleta de colores vibrante y animaciones con GSAP para una experiencia de usuario divertida.
- **Componentes Reutilizables**: Estructura modular con componentes de React para el contador, formulario, y FAQs.
- **Fácil de Actualizar**: Todo el contenido principal (textos, fechas, links) se gestiona desde un único objeto de configuración.
- **Confirmación de Asistencia**: Un formulario que permite a los invitados confirmar y cuyos datos se pueden descargar como un archivo `.csv`.
- **100% Estático**: No requiere un servidor complejo. Se puede alojar en cualquier servicio de hosting de sitios estáticos como Don Web, Netlify, Vercel, o GitHub Pages.

## 🚀 Cómo Modificar el Contenido

La principal ventaja de esta estructura es que no necesitás tocar el código HTML o la lógica compleja para cambiar la información del evento.

**1. Abrí el archivo `App.tsx`**.

**2. Buscá la sección `// --- CONFIGURATION ---`** al principio del archivo.

**3. Editá los valores dentro del objeto `config`**.

```javascript
const config = {
    eventName: "Juacofest 22",
    eventTagline: "“Cumplo 22 y lo celebro el Día del Amigo como se debe”",
    eventDate: "2024-07-20T16:00:00-03:00", // Formato: AÑO-MES-DÍA T HORA:MINUTO:SEGUNDO-ZONA_HORARIA
    location: "Calle 64 n°231 (e/ 115 y 116), La Plata",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=...", // URL de Google Maps para embeber
    dateText: "Domingo 20 de julio",
    gifUrl: "https://.../tu_gif.gif", // URL del GIF del logo
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/TU_ID_DE_PLAYLIST", // Link a la playlist colaborativa
    whatsAppShareMessage: "¡Nos vemos en el Juacofest 22 este 20/07! 🎉 Mirá la invitación y confirmame: [URL_DEL_SITIO]",
    faqData: [
        { question: "¿Puedo llegar más tarde?", answer: "Sí, claro..." },
        // ... más preguntas
    ]
};
```

- **`eventDate`**: ¡Es muy importante mantener el formato `AAAA-MM-DDTHH:MM:SS-HH:MM` para que el contador regresivo funcione correctamente! El `-03:00` corresponde a la zona horaria de Argentina.
- **`googleMapsEmbedUrl`**: Para obtener este link: 1) Buscá la dirección en Google Maps. 2) Hacé clic en "Compartir" (Share). 3) Seleccioná "Insertar un mapa" (Embed a map). 4) Copiá **solamente la URL que está dentro del atributo `src="..."`** y pegala aquí.
- **`spotifyPlaylistUrl`**: Reemplazá `YOUR_PLAYLIST_ID?si=SHARE_TOKEN` con el link real de tu playlist de Spotify.
- **`gifUrl`**: Podés subir tu GIF a un servicio como Giphy o Imgur y pegar el link directo aquí.

**4. Guardá el archivo y los cambios se reflejarán automáticamente.**

## 🔧 Despliegue en Don Web (o similar)

Como el sitio es estático, el despliegue es muy sencillo.

1.  **Obtené los Archivos**: Asegurate de tener la carpeta completa del proyecto con todos los archivos (`index.html`, `index.tsx`, `components/`, etc.).

2.  **Accedé al cPanel de Don Web**: Ingresá a tu panel de control de hosting.

3.  **Andá al "Administrador de Archivos"**: Buscá esta opción en el cPanel.

4.  **Subí los Archivos**:
    *   Navegá a la carpeta `public_html` (o el directorio raíz de tu dominio).
    *   Usá el botón "Cargar" o "Upload" para subir **todos los archivos y carpetas** de tu proyecto. Asegurate de mantener la estructura de carpetas (por ejemplo, la carpeta `components` debe estar dentro de la raíz, al mismo nivel que `index.html`).

5.  **¡Listo!** Una vez que todos los archivos estén subidos, tu sitio web debería estar visible en tu dominio.

No se necesita ningún paso de "compilación" o "build" en el servidor, ya que el navegador interpreta los archivos `HTML`, `CSS` y `TypeScript/JSX` directamente gracias a la configuración de `esbuild` y `importmap`.