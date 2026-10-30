# Artistry Academia - Authentication & Authorization Architecture

This document specifies the authentication mechanics, token lifecycle, role-based access control (RBAC), and security middleware implemented in **Artistry Academia**.

---

## 1. Authentication Overview

Artistry Academia employs a hybrid architecture:
- **Client Identity**: Handled by **Firebase Authentication** (Email/Password registration and Google OAuth popup).
- **Backend API Authorization**: Handled by **JSON Web Tokens (JWT)** generated on `/jwt` and validated via Express middleware.
- **Role Hierarchy**:
  - `admin`: Superuser authority. Access to user governance, role elevation, class approval/denial, and system-wide enrollment data.
  - `instructor`: Course authoring authority. Access to create classes, update self-authored classes, and manage instructor bios.
  - `student`: Standard client authority. Access to select courses, execute Stripe payments, and view enrolled course records.

---

## 2. Token Lifecycle

### Token Issuance (`POST /jwt`)
When a user authenticates on the frontend (either via Firebase Email/Password or Google Sign-In), the client requests a signed token:

```javascript
// AuthProvider.jsx
api.post("/jwt", { email: currentUser.email })
   .then((res) => {
     localStorage.setItem("access-token", res.data.token);
   });
```

The server validates the email payload and issues a signed JWT token valid for 7 days:

```javascript
// server/index.js
const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: "7d",
});
res.send({ token });
```

### Token Injection (`axiosInstance`)
Every outgoing HTTP request automatically includes the token in the `Authorization` header:

```javascript
// client/src/api/axiosInstance.js
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 3. Server Authorization Middleware

### `verifyJWT`
Validates the presence and cryptographic signature of the Bearer token. Decodes claims and attaches them to `req.decoded`.

```javascript
const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ success: false, message: "Unauthorized access: Token missing" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ success: false, message: "Unauthorized access: Invalid format" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized access: Token expired or invalid" });
    }
    req.decoded = decoded;
    next();
  });
};
```

### `verifyAdmin`
Verifies that the user identified by `req.decoded.email` exists in the database and holds the `admin` role:

```javascript
const verifyAdmin = async (req, res, next) => {
  const { email } = req.decoded || {};
  const user = await usersCollection.findOne({ email, isDeleted: { $ne: true } });
  if (!user || user.role !== "admin") {
    return res.status(403).send({ success: false, message: "Forbidden: Admin access required" });
  }
  next();
};
```

### `verifyInstructors`
Verifies that the user holds the `instructor` role (or `admin` override):

```javascript
const verifyInstructors = async (req, res, next) => {
  const { email } = req.decoded || {};
  const user = await usersCollection.findOne({ email, isDeleted: { $ne: true } });
  if (!user || (user.role !== "instructor" && user.role !== "admin")) {
    return res.status(403).send({ success: false, message: "Forbidden: Instructor access required" });
  }
  next();
};
```

### `verifyStudents`
Verifies that the user holds the `student` role (or `admin` override):

```javascript
const verifyStudents = async (req, res, next) => {
  const { email } = req.decoded || {};
  const user = await usersCollection.findOne({ email, isDeleted: { $ne: true } });
  if (!user || (user.role !== "student" && user.role !== "admin")) {
    return res.status(403).send({ success: false, message: "Forbidden: Student access required" });
  }
  next();
};
```

---

## 4. Frontend Route Guards

Client routes are protected via higher-order route components in [`client/src/routes/`](../client/src/routes/):

| Guard | Path | Condition | Fallback Action |
| :--- | :--- | :--- | :--- |
| **`PrivateRoute`** | `/all-classes`, `/instructors`, `/dashboard/*` | User authenticated in Firebase | Redirect to `/login` |
| **`AdminRoute`** | `/dashboard/manage-users`, `/dashboard/manage-class` | `useAdmin()` hook returns `isAdmin === true` | Redirect to `/` |
| **`InstructorRoute`**| `/dashboard/add-class`, `/dashboard/my-class` | `useInstructor()` hook returns `isInstructor === true` | Redirect to `/` |

---

## 5. Security & Privilege Escalation Defenses

1. **Self-Service Role Tampering Prevention**:
   - `PUT /users/:email` only allows updating profile details (`name`, `image`, `photoURL`, `profession`, `location`, `plan`, `phone`).
   - The user's role is set strictly upon initial insertion via `$setOnInsert: { role: 'student' }`.
   - Role updates are restricted to the admin endpoint `PATCH /users/admin/:id` or `PATCH /users/instructor/:id`.
2. **Account Deletion Safety**:
   - Admins cannot delete their own account (`req.decoded.email !== targetUser.email`).
3. **Session Invalidation**:
   - Logging out in the frontend removes `access-token` from `localStorage` and resets the Firebase session.
   - Any `401` or `403` HTTP response automatically triggers `logOut()` through `useAxiosSecure`.
