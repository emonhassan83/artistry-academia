# Artistry Academia - Local Development Setup Guide

This guide provides step-by-step instructions for configuring and running the **Artistry Academia** full-stack development environment locally.

---

## 1. Prerequisites

Ensure the following tools are installed:
- **Node.js**: v18+ or v20+ (`node -v`)
- **npm**: v9+ (`npm -v`)
- **Git**: (`git --version`)
- A **MongoDB Atlas** database cluster (or local MongoDB server).
- A **Firebase Project** with Authentication enabled (Email/Password & Google Provider).
- A **Stripe Account** (test mode keys).

---

## 2. Clone Repositories

```bash
# Clone both projects or root monorepo
git clone https://github.com/emonhassan83/artistry-academia-server.git server
git clone https://github.com/emonhassan83/artistry-academia-client.git client
```

---

## 3. Server Configuration & Setup (`server/`)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment (`server/.env`)
Create a `.env` file in `server/` with the following variables:

```env
PORT=5000
DB_USER=artistryAcademiaDB
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret_token_at_least_64_characters
PAYMENT_SECRET_KEY=sk_test_your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

### 3. Verify & Start Server
```bash
# Verify syntax
npm run build

# Start development server with Nodemon (auto-reloads on changes)
npm run dev
```
> Server runs at `http://localhost:5000`
> Verify healthcheck in browser or terminal: `curl http://localhost:5000` -> `"Artistry Academia Server is running....!"`

---

## 4. Client Configuration & Setup (`client/`)

### 1. Install Dependencies
```bash
cd ../client
npm install
```

### 2. Configure Environment (`client/.env.local`)
Create a `.env.local` file in `client/` with the following variables:

```env
VITE_APIKEY=AIzaSy...
VITE_AUTHDOMAIN=artistry-academia.firebaseapp.com
VITE_PROJECTID=artistry-academia
VITE_STORAGEBUCKET=artistry-academia.appspot.com
VITE_MESSAGINGSENDERID=338977914212
VITE_APPID=1:338977914212:web:302a86a6e83a1140a4ce71

# Local backend endpoint
VITE_API_URL=http://localhost:5000

# ImgBB API key for image hosting
VITE_IMGBB_KEY=your_imgbb_api_key

# Stripe Publishable Key
VITE_Payment_Gateway_PK=pk_test_your_stripe_publishable_key
```

### 3. Start Development Server
```bash
npm run dev
```
> Client runs at `http://localhost:5173`

---

## 5. Typical Developer Workflows

### Testing Admin Roles
1. Log in with the pre-seeded Admin account:
   - **Email**: `emilysmith@example.com`
   - **Password**: `!Aa123`
2. Navigate to Dashboard -> **Manage Classes** to approve or deny submitted courses.
3. Navigate to Dashboard -> **Manage Users** to promote students to Instructors or Admins.

### Testing Course Creation & Enrollment
1. Log in as an Instructor (`michaeljohnson@example.com` / `!Aa123`).
2. Navigate to **Add Class** and publish a new course.
3. Log in as an Admin and approve the course.
4. Log in as a Student (`jackjohnson@example.com` / `!Aa123`).
5. Select the course from **All Classes**, open **Selected Classes**, and pay with the Stripe test card (`4242 4242 4242 4242`).
6. Confirm the course appears in **Enrolled Classes**.
