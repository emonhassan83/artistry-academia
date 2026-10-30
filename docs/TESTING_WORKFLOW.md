# Artistry Academia - Testing Workflow & Quality Assurance

This document details the testing procedures, cURL endpoint test scripts, role verification matrix, and security auditing practices for **Artistry Academia**.

---

## 1. Quality Assurance Strategy

The platform undergoes multi-layer testing:
1. **Static Analysis & Syntax Verification**:
   - Client: `npm run lint` and `npm run build` (Vite production bundle verification).
   - Server: `node --check index.js` (validates Node.js syntax and dependency loading).
2. **Dependency Security Auditing**:
   - `npm audit` on both `/client` and `/server` ensuring 0 high/critical vulnerabilities.
3. **API & Route Security Testing**:
   - Validating JWT signature checks, role barriers, and IDOR protections.
4. **End-to-End User Journeys**:
   - Validating Class Submission -> Admin Approval -> Student Selection -> Stripe Payment -> Enrollment.

---

## 2. Dependency & Build Verification

Run the following checks before committing code:

```bash
# 1. Verify Server
cd server
npm audit
npm run build

# 2. Verify Client
cd ../client
npm audit
npm run build
```

---

## 3. Manual API Testing with cURL

### 1. Test Server Health
```bash
curl -X GET http://localhost:5000/
# Expected: "Artistry Academia Server is running....!"
```

### 2. Obtain JWT Token
```bash
curl -X POST http://localhost:5000/jwt \
  -H "Content-Type: application/json" \
  -d '{"email":"emilysmith@example.com"}'
# Expected: {"token":"eyJhbGciOiJIUzI1NiIsIn..."}
```

### 3. Test Unauthorized Access (Should Fail with 401)
```bash
curl -X GET http://localhost:5000/users
# Expected: {"success":false,"message":"Unauthorized access: Token missing"}
```

### 4. Test Authenticated User Fetch (With Token)
```bash
curl -X GET http://localhost:5000/users \
  -H "Authorization: Bearer <YOUR_TOKEN>"
# Expected: 200 OK with list of users
```

### 5. Test Role Verification (Admin Check)
```bash
curl -X GET http://localhost:5000/users/admin/emilysmith@example.com \
  -H "Authorization: Bearer <YOUR_TOKEN>"
# Expected: {"admin":true}
```

### 6. Test Class Creation as Instructor
```bash
curl -X POST http://localhost:5000/class \
  -H "Authorization: Bearer <INSTRUCTOR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "className": "Digital Concept Art",
    "classImage": "https://imagizer.imageshack.com/img923/8382/85OalJ.png",
    "courseDetails": "Concept design and digital speed painting.",
    "courseFree": 110,
    "seats": 20,
    "level": "Intermediate",
    "duration": "4 Weeks",
    "time": "Evening"
  }'
# Expected: 200 OK {"success":true,"message":"Save in course successfully!"}
```

### 7. Test Admin Class Approval
```bash
curl -X PATCH http://localhost:5000/classes/approved/<CLASS_ID> \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
# Expected: 200 OK {"success":true,"message":"Approve a course by admin successfully!"}
```

### 8. Test Stripe PaymentIntent Creation
```bash
curl -X POST http://localhost:5000/create-payment-intent \
  -H "Authorization: Bearer <STUDENT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"price": 110}'
# Expected: {"clientSecret":"pi_..._secret_..."}
```

---

## 4. Role Authorization Matrix

| Endpoint | Method | Public | Student | Instructor | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `/jwt` | POST | ✅ | ✅ | ✅ | ✅ |
| `/approve-class` | GET | ✅ | ✅ | ✅ | ✅ |
| `/instructors` | GET | ✅ | ✅ | ✅ | ✅ |
| `/users` | GET | ❌ | ✅ | ✅ | ✅ |
| `/classes` | GET | ❌ | ✅ | ✅ | ✅ |
| `/class` | POST | ❌ | ❌ | ✅ | ✅ |
| `/update-class/:id` | PATCH | ❌ | ❌ | ✅ (Owned) | ✅ |
| `/classes/approved/:id` | PATCH | ❌ | ❌ | ❌ | ✅ |
| `/classes/deny/:id` | PATCH | ❌ | ❌ | ❌ | ✅ |
| `/users/admin/:id` | PATCH | ❌ | ❌ | ❌ | ✅ |
| `/selected-class` | GET | ❌ | ✅ (Self) | ❌ | ✅ |
| `/select-class` | POST | ❌ | ✅ | ❌ | ✅ |
| `/payment-class` | POST | ❌ | ✅ (Self) | ❌ | ✅ |
| `/all-enroll-class` | GET | ❌ | ❌ | ❌ | ✅ |
| `/user/:id` | DELETE | ❌ | ❌ | ❌ | ✅ (Except self) |
| `/delete-class/:id` | DELETE | ❌ | ❌ | ✅ (Owned) | ✅ |
