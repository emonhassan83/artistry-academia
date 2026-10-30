# Artistry Academia - Repository & Folder Structure

This document outlines the organization, directory layout, and architectural conventions of the **Artistry Academia** full-stack monorepo.

---

## 1. Monorepo Root Layout

```
artistry-academia/
├── .git/                      # Git version control metadata
├── .gitignore                 # Root ignore rules for monorepo (logs, env, dist, caches)
├── README.md                  # Main project landing, features, stack & documentation index
├── client/                    # React 18 + Vite Frontend Application (SPA)
├── server/                    # Node.js + Express.js + MongoDB API Backend
└── docs/                      # Architectural & technical engineering specifications
    ├── AI_SYSTEM_PROMPT.md    # Instructions and context for AI coding assistants
    ├── API_GUIDELINES.md      # RESTful route specifications, contracts & schemas
    ├── ARCHITECTURE.md        # System blueprint, sequence diagrams & state machines
    ├── AUTHENTICATION.md      # Dual-tier security (Firebase Auth + Backend JWT & RBAC)
    ├── CODING_RULES.md        # Standards for React & Express development
    ├── DATABASE_SEEDING.md    # MongoDB collections, document models & test credentials
    ├── DEPLOYMENT.md          # Vercel & Firebase Hosting production deployment guide
    ├── development.md         # Local developer environment setup & environment variables
    ├── FOLDER_STRUCTURE.md    # Complete monorepo file & directory breakdown
    └── TESTING_WORKFLOW.md    # Quality assurance, cURL tests & security audit checklist
```

---

## 2. Frontend Structure (`client/`)

The client is built using **React 18**, **Vite**, **Tailwind CSS**, **DaisyUI**, **React Router DOM 7**, and **TanStack React Query**:

```
client/
├── .env.local                 # Local environment variables (Firebase, Stripe, API URL)
├── .eslintrc.cjs              # ESLint configuration for React & JSX
├── .firebaserc                # Firebase project targeting metadata
├── .gitignore                 # Client-specific ignore patterns
├── firebase.json              # Firebase Hosting configuration & rewrites
├── index.html                 # Single Page Application HTML entrypoint
├── package.json               # Frontend dependencies & build scripts
├── package-lock.json          # Deterministic dependency lockfile
├── postcss.config.js          # PostCSS configuration (Tailwind & Autoprefixer)
├── tailwind.config.js         # Tailwind theme & DaisyUI plugin configuration
├── vite.config.js             # Vite build & plugin configuration
│
├── public/                    # Static assets served at root
└── src/
    ├── main.jsx               # Application bootstrap (Providers, Router, Root render)
    ├── index.css              # Global styles & Tailwind base directives
    │
    ├── api/                   # API interaction layer (Axios wrappers)
    │   ├── axiosInstance.js   # Configured Axios instance with dynamic JWT interceptor
    │   ├── baseApi.js         # Base Axios instance for unauthenticated endpoints
    │   ├── utils.js           # Utilities (ImgBB image upload, user role fetcher)
    │   ├── classes/           # Class-related API calls
    │   │   ├── admin.api.js       # Admin actions (approve, deny, feedback, delete class)
    │   │   ├── classes.api.js     # Public & shared class fetching
    │   │   ├── enrolledClass.api.js # Enrolled courses API
    │   │   ├── instructors.api.js # Instructor course creation & updating
    │   │   ├── paymentClass.api.js  # Payment persistence helper
    │   │   └── student.api.js     # Student class selection & payments
    │   ├── instructorsBio/    # Instructor professional biography API calls
    │   │   └── instructorBio.js
    │   └── users/             # User management API calls
    │       ├── admin.api.js       # Admin user promotion & deletion
    │       ├── instructors.api.js # Instructor user queries
    │       ├── student.api.js     # Student user queries
    │       └── users.api.js       # User profile persistence & queries
    │
    ├── assets/                # Local images, banners, logos & SVG illustrations
    │   ├── 404/               # Not found illustrations
    │   ├── about/             # About page illustrations
    │   ├── art-class/         # Sample class and artwork imagery
    │   ├── banner/            # Homepage carousel banners
    │   ├── blog/              # Blog article images
    │   ├── logo/              # Brand logos & social icons
    │   └── profile-page/      # User profile artwork
    │
    ├── components/            # Reusable UI components
    │   ├── Card/              # ClassCard, PopularInstructorCard, etc.
    │   ├── Dashboard/         # Sidebar, ManageClassRow, SelectedClassRow, etc.
    │   ├── Form/              # ReusableForm, ReusableInput, ReusableSelect, etc.
    │   ├── Shared/            # Header, Footer, Navbar, SocialLogin, Container
    │   └── UI/                # Modals (ClassModalData, PaymentModal, UserModal)
    │
    ├── firebase/              # Firebase client SDK initialization
    │   └── firebase.config.js # Firebase app initialization using Vite env keys
    │
    ├── hooks/                 # Custom React hooks
    │   ├── useAdmin.jsx       # Queries backend to verify if current user is admin
    │   ├── useAuth.jsx        # Consumes AuthContext (user state, login, logout)
    │   ├── useAxiosSecure.jsx # Axios interceptor hook for 401/403 auto-logout
    │   ├── useClass.jsx       # Queries classes, approved classes, enrolled classes
    │   ├── useFetchUsers.jsx  # Queries user directory with TanStack Query
    │   └── useInstructor.jsx  # Queries backend to verify if current user is instructor
    │
    ├── layouts/               # Master page layouts
    │   ├── DashboardLayout.jsx # Authenticated dashboard sidebar & nested outlet
    │   └── MainLayout.jsx     # Public layout (Header, Navbar, Footer, Outlet)
    │
    ├── pages/                 # Route page components
    │   ├── AllClass/          # Catalog of approved classes
    │   ├── BecomeInstructor/  # Form for students to apply as instructors
    │   ├── ClassDetails/      # Single class view with syllabus, seats & select
    │   ├── Dashboard/         # Dashboard pages:
    │   │   ├── AddClass.jsx       # Instructor course creation form
    │   │   ├── MyClass.jsx        # Instructor owned courses & update modal
    │   │   ├── ManageClass.jsx    # Admin class approval & feedback hub
    │   │   ├── ManageUsers.jsx    # Admin user role assignment & deletion
    │   │   ├── SelectedClass.jsx  # Student class selection cart & checkout launch
    │   │   ├── EnrolledClass.jsx  # Student active enrolled courses
    │   │   └── Payment/           # Stripe CheckoutForm, PaymentModal & PaymentHistory
    │   ├── ErrorPage/         # 404 error page
    │   ├── Home/              # Homepage sections (Banner, PopularClasses, Instructors, WhatsNew)
    │   ├── Instructor/        # Instructor directory
    │   ├── InstructorClass/   # Specific instructor's classes view
    │   ├── Login/             # Email/password & Google popup login
    │   ├── ProfilePage/       # User profile details and updater
    │   └── SignUp/            # User registration form
    │
    ├── providers/             # React Context Providers
    │   ├── AuthProvider.jsx   # Manages Firebase auth state & requests JWT token
    │   └── ThemeProvider.jsx  # Manages Light/Dark theme mode state
    │
    └── routes/                # Client routing configuration
        ├── AdminRoute.jsx     # Protected route wrapper requiring Admin role
        ├── InstructorRoute.jsx# Protected route wrapper requiring Instructor role
        ├── PrivateRoute.jsx   # Protected route wrapper requiring authentication
        └── Routes.jsx         # createBrowserRouter definitions
```

---

## 3. Backend Structure (`server/`)

The backend is a Node.js + Express.js REST API interacting with MongoDB Atlas and Stripe:

```
server/
├── .env                       # Environment secrets (PORT, DB_USER, DB_PASS, JWT, Stripe)
├── .gitignore                 # Server ignore rules (.env, node_modules, vercel)
├── index.js                   # Primary Express application, routes, middlewares & DB connection
├── package.json               # Backend dependencies, scripts (start, dev, build)
├── package-lock.json          # Dependency lockfile
├── vercel.json                # Vercel Serverless deployment routing configuration
└── README.md                  # Backend overview
```

---

## 4. Key Architectural Patterns

- **Dynamic Token Injection**: [`client/src/api/axiosInstance.js`](../client/src/api/axiosInstance.js) injects the current `access-token` on every outgoing HTTP request.
- **Route Guards**: Client routes are gated through `PrivateRoute`, `AdminRoute`, and `InstructorRoute` wrappers.
- **Server Authorization**: Server routes are protected by chaining `verifyJWT` with role validators (`verifyAdmin`, `verifyInstructors`, `verifyStudents`).
- **Resource Protection**: Endpoints ensure students only manage their own selections, instructors only update their own classes, and admins cannot self-delete.
