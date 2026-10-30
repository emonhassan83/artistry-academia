# Artistry Academia - API Design Guidelines & Route Specification

This document specifies the RESTful API standards, request/response contracts, HTTP status codes, and complete route catalog for the **Artistry Academia** server.

---

## 1. General API Conventions

- **Base URL**: `http://localhost:5000` (Local) / `https://artistry-academia-server.vercel.app` (Production)
- **Data Format**: `application/json` for both request payloads and responses.
- **Authentication**: Bearer Token in `Authorization: Bearer <token>` header for secured endpoints.
- **Success Responses**: Return HTTP `200` or `201` with consistent JSON envelopes:
  ```json
  {
    "success": true,
    "message": "Resource retrieved successfully",
    "data": [...]
  }
  ```
- **Error Responses**: Return HTTP `400`, `401`, `403`, `404`, or `500` with descriptive error objects:
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```

---

## 2. Authentication Endpoint

### `POST /jwt`
Generates a signed JWT session token for an authenticated user.
- **Auth**: Public (called post-Firebase login)
- **Request Body**:
  ```json
  { "email": "student@example.com" }
  ```
- **Response `200 OK`**:
  ```json
  { "token": "eyJhbGciOiJIUzI1NiIsIn..." }
  ```

---

## 3. User Endpoints

### `GET /users`
Retrieves all active registered users.
- **Auth**: `verifyJWT`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "totalData": 25,
    "data": [{ "_id": "...", "name": "...", "email": "...", "role": "student" }]
  }
  ```

### `GET /user/:id`
Retrieves a specific user document by MongoDB `_id`.
- **Auth**: `verifyJWT`
- **Params**: `id` (Hex string ObjectId)

### `GET /instructors`
Retrieves all users holding the `instructor` role.
- **Auth**: Public

### `GET /students`
Retrieves all users holding the `student` role.
- **Auth**: `verifyJWT`

### `GET /users/:email`
Fetches a user profile by email address.
- **Auth**: `verifyJWT`

### `PUT /users/:email`
Upserts a user profile on login/sign-up. Safely sets profile fields without modifying `role`.
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "image": "https://...",
    "profession": "Illustrator",
    "location": "Canada",
    "phone": "+123456789"
  }
  ```

### `PUT /user/:email`
Updates self profile information (enforces `req.decoded.email === email`).
- **Auth**: `verifyJWT`

### `PATCH /users/admin/:id`
Promotes a user to the `admin` role.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `GET /users/admin/:email`
Checks whether a given email holds the `admin` role.
- **Auth**: `verifyJWT`
- **Response `200 OK`**: `{ "admin": true }` or `{ "admin": false }`

### `PATCH /users/instructor/:id`
Promotes a user to the `instructor` role.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `GET /users/instructor/:email`
Checks whether a given email holds the `instructor` role.
- **Auth**: `verifyJWT`
- **Response `200 OK`**: `{ "instructor": true }` or `{ "instructor": false }`

### `DELETE /user/:id`
Soft-deletes a user account (`isDeleted: true`). Prevents admin self-deletion.
- **Auth**: `verifyJWT`, `verifyAdmin`

---

## 4. Class Endpoints

### `POST /class`
Creates a new course listing (status initialized to `pending`).
- **Auth**: `verifyJWT`, `verifyInstructors`
- **Request Body**:
  ```json
  {
    "className": "Oil Painting Fundamentals",
    "classImage": "https://...",
    "courseDetails": "Comprehensive introduction...",
    "courseFree": 120,
    "seats": 15,
    "certifications": "Course Completion Certificate",
    "level": "Beginner",
    "duration": "6 Weeks",
    "time": "Morning (10:00 AM - 12:00 PM)",
    "requirements": ["Patience", "Basic Sketching"],
    "materials": ["Oil Paints", "Canvas", "Brushes"]
  }
  ```

### `GET /classes`
Retrieves all non-deleted courses.
- **Auth**: `verifyJWT`

### `GET /classes/:id`
Retrieves specific course details by ID.
- **Auth**: `verifyJWT`

### `GET /approve-class`
Retrieves all approved classes sorted by popularity (`enrolledCourse: -1`).
- **Auth**: Public

### `GET /my-class?email=<email>`
Retrieves all courses authored by a specific instructor.
- **Auth**: `verifyJWT`

### `PATCH /update-class/:id`
Updates course parameters. Verifies that the caller owns the class.
- **Auth**: `verifyJWT`, `verifyInstructors`

### `PATCH /class/:id`
Saves administrative feedback message for a class.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `PATCH /classes/approved/:id`
Updates course status to `approved`.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `PATCH /classes/deny/:id`
Updates course status to `deny`.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `DELETE /delete-class/:id`
Soft-deletes a course (`isDeleted: true`). Caller must be the class author or an admin.
- **Auth**: `verifyJWT`

---

## 5. Student Selection Endpoints

### `GET /selected-class?email=<email>`
Retrieves courses saved in a student's selection cart.
- **Auth**: `verifyJWT`, `verifyStudents` (Enforces `email === req.decoded.email`)

### `POST /select-class`
Adds a course to a student's selection cart (prevents duplicate selection).
- **Auth**: `verifyJWT`, `verifyStudents`

### `DELETE /select-class/:id`
Removes a course from a student's selection cart.
- **Auth**: `verifyJWT`, `verifyStudents`

---

## 6. Enrollment & Payment Endpoints

### `GET /enroll-class?email=<email>`
Retrieves enrolled courses for a student.
- **Auth**: `verifyJWT`, `verifyStudents`

### `GET /all-enroll-class`
Retrieves platform-wide enrollment and transaction history.
- **Auth**: `verifyJWT`, `verifyAdmin`

### `POST /create-payment-intent`
Initializes a Stripe PaymentIntent for course enrollment.
- **Auth**: `verifyJWT`
- **Request Body**: `{ "price": 120 }`
- **Response `200 OK`**: `{ "clientSecret": "pi_..._secret_..." }`

### `POST /payment-class`
Finalizes course payment, atomically decrements available seats, increments enrolled count, saves payment record, and removes course from selections.
- **Auth**: `verifyJWT`, `verifyStudents`

---

## 7. Instructor Bio Endpoints

### `POST /save-instructor-bio`
Saves professional biography and updates user role to `instructor`.
- **Auth**: `verifyJWT`

### `GET /get-instructor-bio/:id`
Retrieves an instructor's biography by user `_id`.
- **Auth**: `verifyJWT`
