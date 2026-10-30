# Artistry Academia - Coding Standards & Engineering Rules

This document outlines the coding standards, patterns, and conventions expected across the **Artistry Academia** codebase.

---

## 1. General Principles

1. **Explicit Error Handling**: Always wrap asynchronous route handlers and database queries with `try/catch` blocks. Never let unhandled promise rejections crash the Node.js process.
2. **Defensive Resource Ownership**: In any endpoint modifying or deleting a resource, verify that the caller either owns the resource or has the `admin` role (mitigate Insecure Direct Object References - IDOR).
3. **No Role Tampering**: Client profile update endpoints must never blindly persist user roles. Role changes must be strictly mediated through verified administrative endpoints.
4. **Idempotence & Atomic Operations**: Counter mutations (e.g. seats decrement, enrollment increment) must use atomic MongoDB operators (`$inc`, `$set`) with validation filters (`seats: { $gt: 0 }`).

---

## 2. Backend Conventions (`server/`)

### 1. MongoDB Query Structure
- Always validate `ObjectId` before casting:
  ```javascript
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({ success: false, message: "Invalid ID parameter" });
  }
  const filter = { _id: new ObjectId(id) };
  ```
- Respect soft-delete flags:
  ```javascript
  const users = await usersCollection.find({ isDeleted: { $ne: true } }).toArray();
  ```

### 2. Authorization Chaining
Chain authentication and role validation middlewares sequentially:
```javascript
app.post("/class", verifyJWT, verifyInstructors, async (req, res) => { ... });
app.patch("/classes/approved/:id", verifyJWT, verifyAdmin, async (req, res) => { ... });
app.post("/select-class", verifyJWT, verifyStudents, async (req, res) => { ... });
```

### 3. Early Return Pattern
Avoid `ERR_HTTP_HEADERS_SENT` by returning immediately when sending a response:
```javascript
if (!user) {
  return res.status(404).send({ success: false, message: "User not found" });
}
```

---

## 3. Frontend Conventions (`client/`)

### 1. API Calls via `axiosInstance`
Always use `axiosInstance` for authenticated endpoints so the JWT token is injected automatically:
```javascript
import { axiosInstance } from "../axiosInstance";

export const getSelectedClasses = async (email) => {
  const res = await axiosInstance.get("/selected-class", {
    params: { email },
  });
  return res.data;
};
```

### 2. Server State with TanStack React Query
Use React Query for data fetching, caching, and cache invalidation:
```javascript
const { data: classes = [], refetch, isLoading } = useQuery({
  queryKey: ["classes", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosInstance.get(`/my-class?email=${user?.email}`);
    return res.data?.data;
  },
});
```

### 3. Responsive Styling with Tailwind CSS & DaisyUI
- Use utility classes with responsive prefixes (`sm:`, `md:`, `lg:`).
- Utilize the theme context (`useTheme()`) to support both Dark and Light modes consistently across cards, modals, headers, and tables.
- Use Semantic DaisyUI buttons (`btn btn-sm btn-color`, `btn-circle`).

### 4. User Feedback
- Use `react-hot-toast` or `sweetalert2` for action notifications:
  ```javascript
  toast.success("Course added to selection cart!");
  ```
- Always display loading spinners or skeletons while fetching data to prevent layout shift.
