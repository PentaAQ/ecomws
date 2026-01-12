# ECOMWS – Catálogo y Gestión de Productos

Aplicación web minimalista y profesional para la gestión y visualización de un catálogo de productos (ej. zapatillas). Consta de una vista pública de catálogo y carrito, y un panel administrativo para CRUD de productos.

---

## 🚀 Stack Tecnológico

- **Frontend**: React 19 + Vite 7
- **Routing**: React Router DOM
- **Estilos**: Tailwind CSS v4 + @tailwindcss/vite
- **Tipografías**: Open Sans Variable + Anton (Fontsource)
- **Estado global**: Zustand (persist para carrito)
- **Servidor de datos**: Supabase (PostgreSQL + Auth + Storage)
- **Queries y Mutaciones**: TanStack Query (React Query)
- **Formularios**: React Hook Form
- **Notificaciones**: Sonner (toast)
- **Iconos**: Iconify React + Lucide React
- **Build**: ESLint + Vite

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # UI reutilizables
│   ├── HeaderHome.jsx
│   ├── HeroHome.jsx
│   ├── ProductosHome.jsx
│   ├── BuscadorProductos.jsx
│   ├── CarritonNavbar.jsx
│   ├── HeaderAdmin.jsx
│   ├── ProductsCardsAdmin.jsx
│   ├── FiltrosAdmin.jsx
│   ├── FormProducts.jsx
│   └── ModalEliminar.jsx
├── pages/               # Rutas principales
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── AdminPage.jsx
├── routers/
│   └── routes.jsx       # Definición de rutas + protección
├── stores/              # Zustand (estado global)
│   ├── AuthStore.jsx
│   ├── CarritoStore.jsx
│   ├── ProductosStore.jsx
│   └── ModalStore.jsx
├── stacks/              # TanStack Query (API)
│   ├── ProductosStack.jsx
│   └── LoginStack.jsx
├── hooks/               # Lógica de formulario y utilidades
│   ├── useFormProducts.jsx
│   ├── useCantidadCarrito.jsx
│   ├── useCalcularTotal.jsx
│   └── RouteProtecter.jsx
├── supabase/
│   └── supabase.config.jsx
├── index.css            # Tailwind + variables CSS
├── main.jsx
└── App.jsx
```

---

## 🛠️ Instalación y Ejecución

### Requisitos
- Node.js 18+
- pnpm (recomendado) o npm

### Pasos

```bash
# Clonar repositorio
git clone <repo-url>
cd ecomws

# Instalar dependencias
pnpm install

# Variables de entorno (crear .env.local)
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<key>

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build
pnpm preview
```

---

## 🌐 Flujo de la Aplicación

### Rutas y Acceso
- **`/`** – Catálogo público con buscador, paginación y carrito lateral.
- **`/login`** – Acceso administrativo (email/contraseña). Usa Supabase Auth.
- **`/admin`** – Panel protegido: listado de productos, filtros, CRUD, modales.

### Protección de Rutas
- `RouteProtecter` (hook) redirige según estado de sesión:
  - Si no autenticado → `/login`
  - Si ya autenticado → `/admin`

---

## 🧩 Componentes Clave

### Catálogo Público (`/`)
- **HeaderHome**: Logo + botón carrito (con badge de cantidad).
- **HeroHome**: Sección editorial con CTA y scroll a productos.
- **ProductosHome**: Grid de productos, paginación y buscador.
- **CarritonNavbar**: Sidebar con carrito, controles de cantidad y checkout por WhatsApp.

### Panel Admin (`/admin`)
- **HeaderAdmin**: Topbar sticky con acciones “Añadir” y “Cerrar sesión”.
- **ProductsCardsAdmin**: Cards con imagen, datos y botones Editar/Eliminar.
- **FiltrosAdmin**: Buscador sticky.
- **FormProducts**: Modal para crear/editar (incluye upload de imagen a Supabase Storage).
- **ModalEliminar**: Confirmación de eliminación.

---

## 🗃️ Gestión de Estado

### Zustand
- **AuthStore**: Login/logout, sesión persistente con Supabase.
- **CarritoStore**: Carrito persistido en localStorage, con operaciones add/remove/qty.
- **ProductosStore**: Selección de producto, modo edición, búsqueda.
- **ModalStore**: Estado de modales (formulario y eliminar).

### TanStack Query
- **ProductosStack**: Queries y mutations para productos (CRUD), invalidación automática.
- **LoginStack**: Mutación de login con mapeo de errores y toast.

---

## 🗄️ Base de Datos (Supabase)

- **Tabla `productos`**: id, nombre, precio_unidad, descripcion, imagen, id_categoria.
- **Tabla `categorias`**: id, nombre.
- **Storage `imagenes`**: Upload de imágenes públicas para productos.
- **Auth**: Usuarios administrativos.

---

## 🎨 Estilos y Tema

- **Paleta**: `neutral` (grises suaves) para look minimalista/profesional.
- **Bordes**: `rounded-xl / rounded-3xl` y sombras suaves (`shadow-sm`).
- **Focus**: `ring-4 ring-neutral-900/10` para inputs y botones.
- **Tipografías**: Open Sans Variable para texto, Anton para titulares.
- **Responsive**: Mobile-first con breakpoints `sm/md/lg`.

---

## 📦 Build y Deploy

```bash
pnpm build          # Genera dist/
pnpm preview        # Servir estáticamente
```

- Compatible con Vercel, Netlify, etc.
- Las variables de entorno deben configurarse en la plataforma de hosting.

---

## 🧪 Testing y Linting

```bash
pnpm lint            # ESLint
```

- Sin tests unitarios por ahora (futuro: Vitest + Testing Library).

---

## 🤝 Contribución

1. Fork
2. Crear rama `feature/...`
3. Commit con mensajes claros
4. Push y Pull Request

---

## 📜 Licencia

MIT

---

## 📞 Contacto / Soporte

- Issues en el repositorio.
- Soporte técnico: [email/ticket interno]

---

*Hecho con ❤️ usando React + Supabase + Tailwind CSS*