# Juacofest 22 - Landing Page

Esta es la landing page de invitación para el Juacofest 22. Es una aplicación web estática construida con React (usando `esbuild` para el empaquetado) y estilizada con TailwindCSS. La principal mejora es que ahora el formulario de confirmación **se conecta a una hoja de cálculo de Google Sheets**, guardando las respuestas de forma automática y segura.

## ✨ Características

- **Diseño Festivo y Animado**: Usa una paleta de colores vibrante y animaciones con GSAP.
- **Backend con Google Sheets**: Las confirmaciones de asistencia se guardan automáticamente en una Google Sheet privada. ¡No más descargas manuales ni riesgo de perder datos!
- **Fácil de Actualizar**: Todo el contenido se gestiona desde un único objeto de configuración.
- **100% Estático**: Se puede alojar en cualquier servicio de hosting de sitios estáticos como Don Web, Netlify, Vercel, o GitHub Pages.

---

## 🔧 Configuración e Instalación (¡Importante!)

Antes de subir el sitio, necesitás conectar el formulario a tu propia Google Sheet. ¡No te preocupes! Solo tenés que seguir estos pasos una vez.

### Parte 1: Configurar Google Sheets como Base de Datos

Esto permitirá que las respuestas del formulario lleguen directamente a una hoja de cálculo tuya.

**Paso 1: Crear la Hoja de Cálculo (Spreadsheet)**
1.  Andá a [sheets.new](https://sheets.new) para crear una nueva hoja de cálculo en tu cuenta de Google.
2.  Ponele un nombre, por ejemplo, "Respuestas Juacofest 22".
3.  En la primera fila, **agregá exactamente estos encabezados**, uno en cada celda de la A a la H:
    `Timestamp` | `Nombre` | `Asistencia` | `Horario` | `SeQuedaADormir` | `TraeAlgo` | `Cancion` | `Mensaje`

**Paso 2: Crear el Google Apps Script**
1.  En tu nueva hoja de cálculo, andá a `Extensiones > Apps Script`.
2.  Se abrirá una nueva pestaña con un editor de código. Borrá todo el contenido que aparece por defecto.
3.  **Copiá y pegá el siguiente código completo** en el editor:

```javascript
// Este código se ejecuta cada vez que el formulario de la web se envía.
function doPost(e) {
  try {
    // Parsea los datos JSON que llegan desde el formulario.
    var data = JSON.parse(e.postData.contents);
    
    // Obtiene la hoja de cálculo activa y la primera hoja.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Asegurate que el nombre de la hoja sea "Sheet1" o cambialo acá.
    
    // Añade una nueva fila con los datos recibidos.
    sheet.appendRow([
      new Date(), // Timestamp de cuándo se recibió la respuesta
      data.name,
      data.attendance,
      data.schedule,
      data.sleepover,
      data.contribution,
      data.songSuggestion,
      data.message
    ]);
    
    // Devuelve una respuesta de éxito a la web.
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Si hay un error, lo registra en los logs de Apps Script.
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4.  Guardá el proyecto del script (el ícono del disquete). Ponele un nombre como "Formulario Cumple".

**Paso 3: Desplegar como Aplicación Web**
1.  En el editor de Apps Script, hacé clic en el botón azul **`Implementar`** (Deploy) y seleccioná **`Nueva implementación`** (New deployment).
2.  Hacé clic en el ícono del engranaje (⚙️) al lado de "Seleccionar tipo" y elegí **`Aplicación web`** (Web app).
3.  En la configuración, establecé lo siguiente:
    *   **Descripción**: `API para formulario de cumple` (o lo que quieras).
    *   **Ejecutar como**: `Yo` (tu cuenta de Google).
    *   **Quién tiene acceso**: **`Cualquier persona`** (Anyone). **¡Este paso es crucial!** Si no, el formulario no podrá enviar los datos.
4.  Hacé clic en **`Implementar`**.
5.  **Autorizá los permisos**: Google te pedirá que autorices al script a acceder a tus hojas de cálculo. Hacé clic en "Autorizar acceso", seleccioná tu cuenta, y si te aparece una advertencia de "Google no ha verificado esta aplicación", hacé clic en "Configuración avanzada" y luego en "Ir a [nombre de tu script] (no seguro)". Es seguro porque es tu propio código.

**Paso 4: Copiar la URL y Configurar la App**
1.  Después de implementar, se te mostrará un cuadro con la **URL de la aplicación web**. ¡Esa es la URL que necesitamos! Copiala.
2.  Volvé al código de tu proyecto (el archivo `App.tsx`).
3.  Buscá la sección `// --- CONFIGURATION ---` y pegá la URL que copiaste en el campo `googleSheetsScriptUrl`.

```javascript
const config = {
    // ... otros campos
    googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfy.../exec", // <-- ACÁ VA TU URL
    // ...
};
```

¡Y listo! Tu formulario ahora está conectado. Cada envío aparecerá como una nueva fila en tu Google Sheet.

### Parte 2: Cómo Modificar el Contenido de la Web

Ya con la URL configurada, podés cambiar el resto de la información del evento fácilmente.

**1. Abrí el archivo `App.tsx`**.
**2. Buscá la sección `// --- CONFIGURATION ---`** y editá los valores que necesites.
- **`eventDate`**: ¡Es muy importante mantener el formato `AAAA-MM-DDTHH:MM:SS-HH:MM` para que el contador regresivo funcione!
- **`googleMapsEmbedUrl`**: Para obtener este link: 1) Buscá la dirección en Google Maps. 2) Clic en "Compartir". 3) "Insertar un mapa". 4) Copiá **solamente la URL que está dentro del atributo `src="..."`**.

### Parte 3: Despliegue en Don Web (o similar)

1.  **Accedé al "Administrador de Archivos"** en tu cPanel.
2.  Navegá a la carpeta `public_html` (o donde quieras alojar el sitio).
3.  Subí **todos los archivos y carpetas** del proyecto, manteniendo la estructura.
4.  ¡Listo! Tu sitio web estará online y conectado a tu Google Sheet.
