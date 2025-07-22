# Automotores MDW FrontEnd


Automotores MDW es una plataforma web moderna para la gestión y visualización de vehículos en una agencia de automotores. El proyecto está desarrollado con tecnologías actuales que garantizan rendimiento, escalabilidad y una experiencia de usuario atractiva.

## Características principales

- Catálogo de vehículos nuevos y usados.
- Búsqueda y filtrado por categorías y propietarios.
- Detalle individual de cada auto y cada categoría.
- Formularios con validación robusta y feedback inmediato.
- Navegación fluida y moderna tipo SPA.
- Estilos responsivos y atractivos.
- Autenticación de usuarios y control de acceso.
- Manejo eficiente de errores y mensajes al usuario.

## Estructura del Proyecto

- `/src/pages`  
  Páginas principales del sitio (Home, Autos, Categorías, About, etc.).

- `/src/components`  
  Componentes reutilizables como Card, Header, Footer, Spinner, Modal, etc.

- `/src/slices`  
  Slices de Redux para manejar el estado de autos, categorías, usuarios y formularios.

- `/src/types`  
  Definiciones de interfaces y tipos para TypeScript.

- `/src/assets`  
  Imágenes y recursos estáticos.

- `/src/pages/Pages.module.css`  
  Estilos globales para las páginas.

## Instalación y ejecución

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/MDW-Autos-Front.git
   cd MDW-Autos-Front
   ```
2. **Instala dependencias**
   ```bash
   npm install
   ```
3. **Configura las variables de entorno**
   - Crea un archivo `.env` con tus credenciales de Firebase y MongoDB.

4. **Compila el proyecto**
   ```bash
   npm run build
   ```
5. **Inicia el servidor en desarrollo**
   ```bash
   npm run dev
   ```
6. Abre tu navegador y visita 'http://localhost:5173'.

## Endpoints principales
La aplicación se comunica con un backend RESTful. Algunos endpoints principales son:

- **GET /cars**
Obtiene el listado de autos.

- **GET /cars/:id**
Obtiene el detalle de un auto por ID.

- **POST /cars**
Agrega un nuevo auto.

- **PUT /cars/:id**
Edita un auto existente.

- **GET /categories**
Obtiene todas las categorías.

- **GET /categories/:id**
Obtiene el detalle de una categoría por ID.

- **POST /auth/login**
Autenticación de usuario. 

- **POST /auth/register**
Registro de usuario.

- **POST /auth/logout**
Cierre de sesión.

- **GET /cars/:id**
Obtiene el detalle de un auto por ID.

- **POST /cars**
**Agrega un nuevo auto.

- **PUT /cars/:id**
Edita un auto existente.

- **GET /categories**
Obtiene todas las categorías.

- **GET /categories/:id**
Obtiene el detalle de una categoría por ID.

- **POST /auth/login**
Autenticación de usuario.

## Autenticación
La autenticación se realiza mediante JWT.
El token se almacena en el frontend y se envía en el header Authorization en cada petición protegida.
El backend valida el token y permite el acceso a rutas privadas.

## Tecnologías utilizadas

* React
Biblioteca principal para la construcción de interfaces de usuario interactivas y reactivas.

* TypeScript
Superset de JavaScript que añade tipado estático, facilitando el desarrollo seguro y mantenible.

* Vite
Herramienta de desarrollo rápida que permite recarga instantánea (HMR) y una configuración sencilla para proyectos modernos.

* Redux Toolkit
Solución para el manejo de estado global, simplificando la lógica de negocio y la comunicación entre componentes.

* React Router
Librería para la navegación entre páginas, permitiendo rutas dinámicas y una experiencia SPA fluida.

* Axios
Cliente HTTP para la comunicación con el backend, utilizado en los slices para obtener y enviar datos.

* React Hook Form
Manejo eficiente de formularios y validaciones, integrando fácilmente con librerías como Joi.

* Joi
Validación de datos en el frontend, asegurando que los formularios reciban información correcta antes de enviarla al backend.

* CSS Modules
Permite estilos encapsulados y reutilizables, evitando conflictos y facilitando el mantenimiento.

* TailwindCSS (opcional)
Framework de utilidades CSS para estilos rápidos y responsivos en algunos componentes.

## Seguridad
- Validación de datos en frontend y backend.
- Autenticación JWT para rutas protegidas.
- Manejo centralizado de errores y mensajes.
- Protección contra peticiones no autorizadas.
- Uso de HTTPS recomendado en producción.

## Despliegue

El frontend está desplegado en Vercel y disponible en:

[https://mdw-autos-front.vercel.app/]

## Notas

- Para probar las rutas protegidas, primero obtén las credenciales de usuario autenticando en Firebase.
- Las imágenes de autos se almacenan como URLs.
---

## Alumno

Desarrollado por Luis Alejandro Massad, alumno UAI para la materia METODOLOGÍAS Y DESARROLLOS WEB.
