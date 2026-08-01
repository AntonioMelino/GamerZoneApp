# Gamer Zone App

¡Bienvenido a **Gamer Zone App**! Una tienda en línea especializada en productos gamer, construida con **React 19**, **Vite**, **Firebase** y **Material-UI (MUI)**. Los usuarios pueden explorar el catálogo, filtrar y buscar productos, gestionar un carrito de compras, autenticarse (email/contraseña o Google) y llevar un historial completo de sus órdenes.

## Demostración

![GamerZoneApp-gif](https://github.com/user-attachments/assets/7df7decd-21a4-438f-a9e7-e39790348b58)

**Demo en vivo:** [gamer-zone-app.vercel.app](https://gamer-zone-app.vercel.app)

## Características principales

- **Catálogo de productos**: listado de productos gamer (notebooks, componentes, periféricos, etc.) almacenados en Firestore.
- **Filtrado por categoría**: navegación por categoría vía rutas dedicadas (`/category/:name`).
- **Búsqueda y ordenamiento**: buscador integrado y ordenamiento por precio (ascendente/descendente).
- **Paginación**: control de productos por página con navegación de páginas.
- **Carrito de compras**: agregar productos, ajustar cantidades y ver el total antes de comprar.
- **Checkout**: formulario de compra con generación de orden.
- **Autenticación de usuarios**: registro e inicio de sesión con email/contraseña e inicio de sesión con **Google** (Firebase Authentication).
- **Perfil de usuario**: edición de datos personales (nombre, teléfono, dirección).
- **Historial de órdenes**: listado y detalle de compras anteriores, con confirmación de orden luego del checkout.
- **Modo claro/oscuro**: preferencia de tema persistida en `localStorage`.
- **Recomendaciones de productos**: sugerencias relacionadas en el detalle de cada producto.
- **Carrusel de imágenes**: banner de imágenes en la página principal.
- **Estados de carga (skeletons)**: feedback visual mientras se cargan los productos.
- **Notificaciones**: alertas y confirmaciones con SweetAlert2.
- **Página 404**: manejo de rutas no encontradas.
- **Diseño responsive**: adaptado a dispositivos móviles, tablets y desktop.

## Tecnologías utilizadas

- **[React 19](https://react.dev/)** — biblioteca para construir la interfaz de usuario.
- **[Vite](https://vite.dev/)** — servidor de desarrollo y build tool.
- **[React Router](https://reactrouter.com/)** — enrutamiento entre páginas.
- **[Firebase](https://firebase.google.com/)** (Firestore + Authentication) — base de datos de productos/órdenes y autenticación de usuarios.
- **[Material-UI (MUI)](https://mui.com/)** — componentes de interfaz y theming.
- **[SweetAlert2](https://sweetalert2.github.io/)** — alertas y confirmaciones.
- **[ESLint](https://eslint.org/)** — linting de código.
- **[Vercel](https://vercel.com/)** — plataforma de despliegue.

## Estructura del proyecto

```
src/
├── components/
│   ├── auth/          # Guard de rutas y componente de "ya autenticado"
│   ├── common/        # Componentes reutilizables (cards, carrusel, buscador, skeletons, etc.)
│   ├── layouts/        # Navbar y footer
│   └── pages/          # Páginas: catálogo, carrito, checkout, login, perfil, órdenes, 404
├── context/            # Contextos de Auth, Carrito y Theme
├── utils/              # Utilidades (formateo de fechas, etc.)
├── firebaseConfig.js    # Inicialización de Firebase
└── products.js          # Datos de ejemplo para seed de Firestore
```

## Requisitos previos

- Node.js 18 o superior
- Una cuenta y proyecto de [Firebase](https://firebase.google.com/) con **Firestore** y **Authentication** (Email/Password y Google) habilitados

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/AntonioMelino/GamerZoneApp.git
   cd GamerZoneApp
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto de Firebase:

   ```env
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROYECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Scripts disponibles

| Script            | Descripción                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Inicia el servidor de desarrollo con Vite.       |
| `npm run build`   | Genera el build de producción.                   |
| `npm run preview` | Previsualiza el build de producción localmente.  |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto.                 |

## Despliegue

La aplicación está desplegada en **Vercel** y puede ser accedida en el siguiente enlace: [**Gamer Zone App en Vercel**](https://gamer-zone-app.vercel.app)

## Licencia

Este proyecto está bajo la licencia **MIT**. Podés usar, modificar y distribuir el código libremente, siempre y cuando se incluya el aviso de copyright y la licencia en las copias. Para más detalles, consultá el archivo [LICENSE](LICENSE).

---

¡Gracias por visitar **Gamer Zone App**! Si tenés alguna pregunta o sugerencia, no dudes en contactarme.
