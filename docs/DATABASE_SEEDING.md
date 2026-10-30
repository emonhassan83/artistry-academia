# Artistry Academia - Database Schema & Data Models

This document details the MongoDB Atlas database structure, collection models, indexing recommendations, and default seed credentials for **Artistry Academia**.

---

## 1. Database Architecture

- **Database Engine**: MongoDB Atlas (MongoDB Server v6+)
- **Database Name**: `artistryAcademiaDB`
- **Driver**: Official MongoDB Node.js Driver (`mongodb` v5.8+)
- **Primary Key**: BSON `ObjectId` (`_id`)

---

## 2. Collections & Document Schemas

### 1. `users` Collection
Stores registered user accounts and their assigned role.

```json
{
  "_id": { "$oid": "648a1234abcd567890ef1234" },
  "name": "Emily Smith",
  "email": "emilysmith@example.com",
  "image": "https://i.ibb.co/sample/avatar.jpg",
  "photoURL": "https://i.ibb.co/sample/avatar.jpg",
  "role": "admin", // "admin" | "instructor" | "student"
  "profession": "Fine Arts Director",
  "location": "New York, USA",
  "plan": "Free Plan",
  "phone": "+1-555-0199",
  "isDeleted": false,
  "createdAt": "2024-01-15T08:00:00.000Z",
  "updatedAt": "2024-06-10T12:00:00.000Z"
}
```

**Recommended Indexes**:
- `{ email: 1 }` (Unique)
- `{ role: 1, isDeleted: 1 }`

---

### 2. `classes` Collection
Stores courses offered by instructors, seat availability, and review statuses.

```json
{
  "_id": { "$oid": "648b2345bcde678901fa2345" },
  "className": "Oil Painting & Canvas Aesthetics",
  "classImage": "https://imagizer.imageshack.com/img923/8382/85OalJ.png",
  "courseDetails": "Master blending techniques, lighting, and palette knife control.",
  "courseFree": 95,
  "seats": 12,
  "enrolledCourse": 3,
  "status": "approved", // "pending" | "approved" | "deny"
  "feedback": "Approved with commendable syllabus structure.",
  "certifications": "Official Academy Certificate of Mastery",
  "level": "Intermediate",
  "duration": "8 Weeks",
  "time": "Evening (06:00 PM - 08:00 PM)",
  "requirements": ["Basic color theory understanding", "Own easel"],
  "materials": ["Linen Canvas", "Linseed Oil", "Professional Paint Set"],
  "instructor": {
    "name": "Michael Johnson",
    "email": "michaeljohnson@example.com"
  },
  "isDeleted": false,
  "createdAt": "2024-02-01T10:30:00.000Z",
  "updatedAt": "2024-02-05T14:15:00.000Z"
}
```

**Recommended Indexes**:
- `{ status: 1, isDeleted: 1, enrolledCourse: -1 }`
- `{ "instructor.email": 1, isDeleted: 1 }`

---

### 3. `selectClasses` Collection
Represents a student's reserved class cart prior to completing payment.

```json
{
  "_id": { "$oid": "648c3456cdef789012ab3456" },
  "classInfo": {
    "_id": "648b2345bcde678901fa2345",
    "className": "Oil Painting & Canvas Aesthetics",
    "classImage": "https://imagizer.imageshack.com/img923/8382/85OalJ.png",
    "courseFree": 95,
    "seats": 12,
    "instructor": {
      "name": "Michael Johnson",
      "email": "michaeljohnson@example.com"
    }
  },
  "studentInfo": {
    "name": "Jack Johnson",
    "email": "jackjohnson@example.com"
  },
  "createdAt": "2024-03-10T09:20:00.000Z"
}
```

**Recommended Indexes**:
- `{ "classInfo._id": 1, "studentInfo.email": 1 }` (Unique compound to prevent duplicates)
- `{ "studentInfo.email": 1 }`

---

### 4. `paymentClasses` Collection
Stores finalized paid enrollments and transaction proofs.

```json
{
  "_id": { "$oid": "648d4567defa890123bc4567" },
  "classInfo": {
    "_id": "648b2345bcde678901fa2345",
    "className": "Oil Painting & Canvas Aesthetics",
    "courseFree": 95
  },
  "studentInfo": {
    "name": "Jack Johnson",
    "email": "jackjohnson@example.com"
  },
  "transactionId": "pi_3NExxxxxxx_secret_xxxxxxx",
  "isPayed": true,
  "payment_date": "2024-03-10T09:25:00.000Z",
  "studentEmail": "jackjohnson@example.com",
  "date": "2024-03-10T09:25:00.000Z"
}
```

**Recommended Indexes**:
- `{ "studentInfo.email": 1, date: -1 }`
- `{ transactionId: 1 }`

---

### 5. `instructorBio` Collection
Stores detailed credentials and qualifications for instructors.

```json
{
  "_id": { "$oid": "648e5678efab901234cd5678" },
  "user": "648a1234abcd567890ef9999",
  "name": "Sarah Brown",
  "email": "sarahbrown@example.com",
  "biography": "Master in Fine Arts with 12 years of gallery exhibitions.",
  "education": "Royal College of Art, London",
  "experience": "Senior Lecturer & Resident Artist",
  "teachingPhilosophy": "Nurturing creative instincts through hands-on practice.",
  "specialization": "Watercolor Landscapes & Portraiture",
  "achievements": "National Watercolor Award Winner 2021",
  "createdAt": "2024-01-20T11:00:00.000Z"
}
```

---

## 3. Demo Credentials

For testing and development workflows, the following accounts are pre-configured:

| Role | Username | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | Emily Smith | `emilysmith@example.com` | `!Aa123` |
| **Instructor** | Michael Johnson | `michaeljohnson@example.com` | `!Aa123` |
| **Instructor** | Sarah Brown | `sarahbrown@example.com` | `!Aa123` |
| **Student** | Jack Johnson | `jackjohnson@example.com` | `!Aa123` |
| **Student** | Olivia Brown | `oliviabrown@example.com` | `!Aa123` |
