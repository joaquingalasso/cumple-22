# Juacofest 22 - Landing Page

Esta es la landing page de invitación para el Juacofest 22. Es una aplicación web estática construida con React y estilizada con TailwindCSS. La principal mejora es que ahora el formulario de confirmación **se conecta a una hoja de cálculo de Google Sheets**, guardando las respuestas de forma automática y segura.

## ✨ Características

- **Diseño Festivo y Animado**: Usa una paleta de colores vibrante y animaciones con GSAP.
- **Fondo Dinámico**: ¡Muestra los nombres de los invitados confirmados flotando sutilmente en el fondo de la página!
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
3.  Crea los encabezados en la primera fila. Estos nombres son para tu referencia. Lo que es **crítico es el orden de las columnas**, ya que el script las llenará en la siguiente secuencia:
    `Timestamp`, `name`, `attendance`, `schedule`, `sleepover`, `contribution`, `songSuggestion`, `message`
    *(Nota: El script de Google (`appendRow`) no usa los nombres de los encabezados, solo añade los datos en el orden especificado. Tener los encabezados así te ayuda a identificar los datos correctamente.)*

**Paso 2: Crear el Google Apps Script**
1.  En tu nueva hoja de cálculo, andá a `Extensiones > Apps Script`.
2.  Se abrirá una nueva pestaña con un editor de código. Borrá todo el contenido que aparece por defecto.
3.  **Copiá y pegá el siguiente código completo** en el editor. Este script maneja dos cosas:
    1. `doPost(e)`: Recibe los datos del formulario cuando un invitado confirma.
    2. `doGet(e)`: Envía la lista de nombres de los invitados ya confirmados para mostrarlos en el fondo de la página.

```javascript
// --- CÓDIGO ACTUALIZADO Y ROBUSTO ---
// Este script está diseñado para recibir datos de un formulario (doPost)
// y para devolver la lista de invitados confirmados (doGet).

// ¡IMPORTANTE! Cambia "Hoja 1" por el nombre exacto de la pestaña de tu Google Sheet.
// Si tu Google está en inglés, probablemente sea "Sheet1".
const SHEET_NAME = "Hoja 1"; 

// Esta función se ejecuta cuando el navegador hace una petición GET.
// La usaremos para obtener la lista de nombres de los invitados.
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Verificación: Si la hoja no existe, devuelve un error claro.
    if (!sheet) {
      throw new Error("Sheet '" + SHEET_NAME + "' not found. Please check the SHEET_NAME variable in the script.");
    }
    
    const lastRow = sheet.getLastRow();
    
    // Solo procedemos si hay más filas que la del encabezado.
    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({ "result": "success", "data": [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtenemos los valores de la columna B (nombres), desde la fila 2 hasta el final.
    // Asume que los nombres están en la segunda columna (B).
    const dataRange = sheet.getRange("B2:B" + lastRow); 
    const data = dataRange.getValues();
    
    // Filtramos nombres vacíos y aplanamos el array 2D a 1D.
    const names = data.flat().filter(String);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "data": names }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// Esta función se ejecuta cuando el formulario envía datos (petición POST).
function doPost(e) {
  try {
    const data = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Verificación: Si la hoja no existe, devuelve un error claro.
    if (!sheet) {
      throw new Error("Sheet '" + SHEET_NAME + "' not found. Please check the SHEET_NAME variable in the script.");
    }
    
    // Los nombres (ej. data.name) deben coincidir con los atributos 'name' de tus campos de formulario.
    sheet.appendRow([
      new Date(), // Timestamp
      data.name,
      data.attendance,
      data.schedule,
      data.sleepover,
      data.contribution,
      data.songSuggestion,
      data.message
    ]);
    
    // Devuelve una respuesta JSON de éxito.
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Devuelve una respuesta JSON de error si algo falla.
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
    *   **Quién tiene acceso**: **`Cualquier persona`** (Anyone). **¡Este paso es crucial!**
4.  Hacé clic en **`Implementar`**.
5.  **Autorizá los permisos**: Google te pedirá que autorices al script. Hacé clic en "Autorizar acceso", seleccioná tu cuenta, y si te aparece una advertencia de "Google no ha verificado esta aplicación", hacé clic en "Configuración avanzada" y luego en "Ir a [nombre de tu script] (no seguro)". Es seguro porque es tu propio código.

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
**Paso 5: Actualizar la Implementación (¡SI YA TENÍAS UNA ANTERIOR!)**

Si ya habías desplegado una versión anterior y solo estás actualizando el código, **no es suficiente con guardar**. Debés crear una nueva versión de la implementación para que los cambios se activen:

1.  En el editor de Apps Script, hacé clic en **`Implementar` > `Gestionar implementaciones`**.
2.  Buscá tu implementación activa y hacé clic en el ícono del lápiz (Editar ✏️).
3.  En el menú desplegable "Versión", seleccioná **`Nueva versión`**.
4.  Hacé clic en **`Implementar`**. ¡Listo! La URL no cambiará, pero tu script ya estará actualizado y funcionando.

¡Y eso es todo! Tu formulario ahora está conectado correctamente.

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