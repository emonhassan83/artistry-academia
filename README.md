# Artistry Academia - Creative Arts & Summer School Learning Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-3.0.3-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

**Artistry Academia** is a premier educational platform and digital academy crafted for fine arts institutions, creative workshops, and summer camp schools. It provides an intuitive environment connecting three core user personas—**Admins**, **Instructors**, and **Students**—with real-time class booking, multi-tier role authorization, secure Stripe payment processing, and dynamic theme switching.

---

## 🌟 Role-Based Capabilities

### 👑 Admin
- **Class Approval Engine**: Review instructor-submitted classes with actions to **Approve**, **Deny**, or provide **Constructive Feedback**.
- **User Governance**: View all registered users, promote users to **Admin** or **Instructor**, and safely deactivate accounts with soft deletes.
- **Platform Analytics**: Monitor overall platform metrics, total enrolled students, and class inventory.

### 🎨 Instructor
- **Course Authoring**: Create rich course listings with course details, available seats, pricing, schedules, materials, and requirements.
- **Course Management (`My Classes`)**: Monitor student enrollments, edit course parameters, and review administrative feedback on pending/denied courses.
- **Professional Bio**: Submit career achievements, education, specialization, and teaching philosophies to showcase expertise.

### 🎓 Student
- **Course Discovery & Selection**: Browse approved creative arts classes and add desired classes to the personal selection cart.
- **Selected Classes Hub**: Manage reserved classes and proceed to checkout.
- **Secure Stripe Checkout**: Real-time card payment processing with instant seat deduction and enrollment confirmation.
- **Enrolled Classes & Payment History**: Track active courses and full transaction receipts chronologically.

### 🌐 Public / Visitors
- **Interactive Landing Experience**: Showcase of popular classes, top instructors, student testimonials, and blog articles.
- **Seamless Authentication**: Firebase Google One-Tap Social Login and standard Email/Password authentication.
- **Theme Personalization**: Instant Light/Dark mode toggling powered by dynamic theme contexts.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend SPA** | React 18, Vite 8, React Router DOM 7, TanStack React Query v4, Axios |
| **Styling & UI** | Tailwind CSS 3, DaisyUI 3, React Icons, React Awesome Reveal, React Spinners |
| **Authentication** | Firebase Authentication (Client SDK) + Custom JWT Bearer Tokens (Backend Verification) |
| **Backend API** | Node.js, Express.js (RESTful API), CORS, Dotenv |
| **Database** | MongoDB Atlas (Native Node.js Driver v5.8), BSON ObjectId handling |
| **Payments** | Stripe Elements (`@stripe/react-stripe-js`), Stripe PaymentIntents API |
| **Image Hosting** | ImgBB Cloud API integration for user avatars and course media |

---

## 📚 Technical Engineering Documentation

Comprehensive architectural and engineering specifications are organized in the [`docs/`](./docs/) directory:

- 📐 [**System Architecture**](./docs/ARCHITECTURE.md) - Layered system design, authentication flow, and payment state machines.
- 🔐 [**Authentication & RBAC**](./docs/AUTHENTICATION.md) - Dual-tier security (Firebase Auth + Backend JWT), role verification, and IDOR protection.
- 📡 [**API Guidelines**](./docs/API_GUIDELINES.md) - Complete REST route catalog, request schemas, status codes, and error formats.
- 🗄️ [**Database & Seeding**](./docs/DATABASE_SEEDING.md) - MongoDB collections, document models, indexes, and test credentials.
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - Production deployment on Vercel and Firebase Hosting with environment checklists.
- 📁 [**Folder Structure**](./docs/FOLDER_STRUCTURE.md) - Exhaustive monorepo file directory layout and module responsibilities.
- 💻 [**Local Development**](./docs/development.md) - Local developer environment setup, prerequisites, and debugging guide.
- 🧪 [**Testing Workflow**](./docs/TESTING_WORKFLOW.md) - QA procedures, cURL endpoint testing, role matrix, and security auditing.
- 📏 [**Coding Rules**](./docs/CODING_RULES.md) - Frontend and backend coding standards, state conventions, and error handling.
- 🤖 [**AI System Prompt**](./docs/AI_SYSTEM_PROMPT.md) - Contextual instructions for AI coding assistants.

---

## 🚀 Quick Start Guide

### 1. Clone Repository
```bash
git clone https://github.com/emonhassan83/artistry-academia-client.git client
git clone https://github.com/emonhassan83/artistry-academia-server.git server
```

### 2. Configure & Run Backend (`server/`)
```bash
cd server
npm install

# Create environment file (.env)
# Required variables:
# PORT=5000
# DB_USER=your_mongodb_username
# DB_PASS=your_mongodb_password
# ACCESS_TOKEN_SECRET=your_super_secret_jwt_key
# PAYMENT_SECRET_KEY=sk_test_your_stripe_secret_key

# Verify server syntax
npm run build

# Start in development mode (with nodemon)
npm run dev

# Or start in production mode
npm start
```
> Server runs on: `http://localhost:5000`

### 3. Configure & Run Frontend (`client/`)
```bash
cd ../client
npm install

# Create environment file (.env.local)
# Required variables:
# VITE_APIKEY=your_firebase_api_key
# VITE_AUTHDOMAIN=your_firebase_auth_domain
# VITE_PROJECTID=your_firebase_project_id
# VITE_STORAGEBUCKET=your_firebase_storage_bucket
# VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
# VITE_APPID=your_firebase_app_id
# VITE_API_URL=http://localhost:5000
# VITE_IMGBB_KEY=your_imgbb_api_key
# VITE_Payment_Gateway_PK=pk_test_your_stripe_publishable_key

# Build production bundle
npm run build

# Start local development server
npm run dev
```
> Frontend runs on: `http://localhost:5173`

---

## 🛡️ Security Hardening

- **Zero Vulnerabilities**: Both `client` and `server` dependencies audited and locked with **0 vulnerabilities**.
- **Role Tampering Prevention**: `PUT /users/:email` uses safe field-whitelisting (`$set`) and `$setOnInsert` to prevent unauthorized role escalation.
- **IDOR Protection**: Class update, class delete, and student selection routes enforce token ownership validation against targeted resources.
- **Atomic Seat Reservation**: Seat decrementing and enrolled count increments execute with atomic MongoDB conditions (`seats: { $gt: 0 }`).
- **Dynamic CORS Policy**: Whitelisted origin validation supporting local development, Vercel deployments, and Firebase Hosting.

---

## 📄 License & Attribution

- **License**: ISC
- **Author**: Emon Hassan
- **Client Repository**: [artistry-academia-client](https://github.com/emonhassan83/artistry-academia-client)
- **Server Repository**: [artistry-academia-server](https://github.com/emonhassan83/artistry-academia-server)
