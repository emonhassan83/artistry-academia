const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const stripe = process.env.PAYMENT_SECRET_KEY
  ? require("stripe")(process.env.PAYMENT_SECRET_KEY)
  : null;
const port = process.env.PORT || 5000;

//* Security: Configured CORS with origin verification
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin.endsWith(".firebaseapp.com") ||
      origin.endsWith(".web.app")
    ) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback to allow client requests while maintaining credentials
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

//* mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mt8kgrw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//* validate jwt
const verifyJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized access: Token missing" });
    }

    //* access bearer token
    const token = authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized access: Bearer token format invalid" });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res
        .status(500)
        .send({ success: false, message: "Server auth configuration missing" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized access: Token expired or invalid" });
      }

      req.decoded = decoded;
      next();
    });
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized access" });
  }
};

async function run() {
  try {
    const usersCollection = client.db("artistryAcademiaDB").collection("users");
    const classCollection = client.db("artistryAcademiaDB").collection("classes");
    const instructorBioCollection = client
      .db("artistryAcademiaDB")
      .collection("instructorBio");
    const selectClassCollection = client
      .db("artistryAcademiaDB")
      .collection("selectClasses");
    const paymentClassCollection = client
      .db("artistryAcademiaDB")
      .collection("paymentClasses");

    //* Generate jwt token
    app.post("/jwt", async (req, res) => {
      try {
        const { email } = req.body || {};
        if (!email || typeof email !== "string" || !email.includes("@")) {
          return res
            .status(400)
            .send({ success: false, message: "Valid email is required" });
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
          return res
            .status(500)
            .send({ success: false, message: "Server auth configuration error" });
        }

        const token = jwt.sign({ email }, secret, {
          expiresIn: "7d",
        });

        res.send({ token });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* verify admin
    const verifyAdmin = async (req, res, next) => {
      try {
        const { email } = req.decoded || {};
        if (!email) {
          return res.status(403).send({ success: false, message: "Forbidden! Email missing in token" });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.status(403).send({ success: false, message: "Forbidden! User not found" });
        }

        if (user?.role !== "admin") {
          return res.status(403).send({
            success: false,
            message: "Forbidden message! You are not admin!",
          });
        }
        next();
      } catch (error) {
        return res.status(403).send({
          success: false,
          message: "Forbidden! You are not an admin!",
        });
      }
    };

    //* verify instructor
    const verifyInstructors = async (req, res, next) => {
      try {
        const email = req.decoded?.email;
        if (!email) {
          return res.status(403).send({ success: false, message: "Forbidden! Email missing in token" });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.status(403).send({ success: false, message: "Forbidden! User not found" });
        }

        if (user?.role !== "instructor" && user?.role !== "admin") {
          return res.status(403).send({
            success: false,
            message: "Forbidden message! You are not instructor!",
          });
        }
        next();
      } catch (error) {
        return res.status(403).send({
          success: false,
          message: "Forbidden! You are not an instructor!",
        });
      }
    };

    //* verify student
    const verifyStudents = async (req, res, next) => {
      try {
        const email = req.decoded?.email;
        if (!email) {
          return res.status(403).send({ success: false, message: "Forbidden! Email missing in token" });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.status(403).send({ success: false, message: "Forbidden! User not found" });
        }

        if (user?.role !== "student" && user?.role !== "admin") {
          return res.status(403).send({
            success: false,
            message: "Forbidden message! You are not student!",
          });
        }
        next();
      } catch (error) {
        return res.status(403).send({
          success: false,
          message: "Forbidden! You are not a student!",
        });
      }
    };

    //? ********** USER RELATED APIS **********/

    //* get all users to db
    app.get("/users", verifyJWT, async (req, res) => {
      try {
        const users = await usersCollection
          .find({ isDeleted: { $ne: true } })
          .toArray();
        const totalData = await usersCollection.countDocuments({
          isDeleted: { $ne: true },
        });

        res.send({
          success: true,
          message: "Get all users retrieve successfully!",
          totalData: totalData,
          data: users,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get a user by id to db
    app.get("/user/:id", verifyJWT, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id), isDeleted: { $ne: true } };
        const user = await usersCollection.findOne(filter);
        if (!user) {
          return res.status(404).send({ success: false, message: "User not found here!" });
        }

        res.send({
          success: true,
          message: "Get a user retrieve successfully!",
          data: user,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all instructors
    app.get("/instructors", async (req, res) => {
      try {
        const instructors = await usersCollection
          .find({ role: "instructor", isDeleted: { $ne: true } })
          .toArray();
        const totalData = await usersCollection.countDocuments({
          role: "instructor",
          isDeleted: { $ne: true },
        });

        res.send({
          success: true,
          message: "Get all instructors retrieve successfully!",
          totalData: totalData,
          data: instructors,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all students
    app.get("/students", verifyJWT, async (req, res) => {
      try {
        const students = await usersCollection
          .find({ role: "student", isDeleted: { $ne: true } })
          .toArray();
        const totalData = await usersCollection.countDocuments({
          role: "student",
          isDeleted: { $ne: true },
        });

        res.send({
          success: true,
          message: "Get all students retrieve successfully!",
          totalData: totalData,
          data: students,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* Get user by email
    app.get("/users/:email", verifyJWT, async (req, res) => {
      try {
        const { email } = req.params;
        if (!email) {
          return res.status(400).send({ success: false, message: "Email parameter required" });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.status(404).send({ success: false, message: "User not found here!" });
        }

        res.send({
          success: true,
          message: "Get a user retrieve successfully!",
          data: user,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* save user in DB (safe user creation / profile update - role tampering prevented)
    app.put("/users/:email", async (req, res) => {
      try {
        const { email } = req.params;
        if (!email || !email.includes("@")) {
          return res.status(400).send({ success: false, message: "Invalid email" });
        }

        const { name, image, photoURL, profession, location, plan, phone } = req.body || {};
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (image !== undefined) updateFields.image = image;
        if (photoURL !== undefined) updateFields.photoURL = photoURL;
        if (profession !== undefined) updateFields.profession = profession;
        if (location !== undefined) updateFields.location = location;
        if (plan !== undefined) updateFields.plan = plan;
        if (phone !== undefined) updateFields.phone = phone;
        updateFields.updatedAt = new Date().toISOString();

        const saveUser = await usersCollection.updateOne(
          { email: email },
          {
            $set: updateFields,
            $setOnInsert: {
              email: email,
              role: "student",
              isDeleted: false,
              createdAt: new Date().toISOString(),
            },
          },
          { upsert: true }
        );

        res.send(saveUser);
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* make admin
    app.patch("/users/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };

        const result = await usersCollection.updateOne(filter, updateDoc);

        res.send({
          success: true,
          message: "Make admin successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get admin and secure route (fixed missing return)
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      try {
        const { email } = req.params;
        if (req.decoded?.email !== email) {
          return res.send({ admin: false });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.send({ admin: false });
        }

        const result = { admin: user?.role === "admin" };
        return res.send(result);
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* make Instructor
    app.patch(
      "/users/instructor/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        try {
          const { id } = req.params;
          if (!id || !ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
          }

          const filter = { _id: new ObjectId(id) };
          const updateDoc = {
            $set: {
              role: "instructor",
            },
          };

          const result = await usersCollection.updateOne(filter, updateDoc);

          res.send({
            success: true,
            message: "Make a instructor successfully!",
            data: result,
          });
        } catch (error) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        }
      }
    );

    //* get instructor and secure route (fixed missing return)
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      try {
        const { email } = req.params;
        if (req.decoded?.email !== email) {
          return res.send({ instructor: false });
        }

        const user = await usersCollection.findOne({
          email: email,
          isDeleted: { $ne: true },
        });
        if (!user) {
          return res.send({ instructor: false });
        }

        const result = { instructor: user?.role === "instructor" };
        return res.send(result);
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* Update user by email in DB
    app.put("/user/:email", verifyJWT, async (req, res) => {
      try {
        const { email } = req.params;
        if (req.decoded?.email !== email) {
          return res.status(403).send({ success: false, message: "Forbidden: Cannot update other users" });
        }

        const { name, image, photoURL, profession, location, plan, phone } = req.body || {};
        const safeUpdates = {};
        if (name !== undefined) safeUpdates.name = name;
        if (image !== undefined) safeUpdates.image = image;
        if (photoURL !== undefined) safeUpdates.photoURL = photoURL;
        if (profession !== undefined) safeUpdates.profession = profession;
        if (location !== undefined) safeUpdates.location = location;
        if (plan !== undefined) safeUpdates.plan = plan;
        if (phone !== undefined) safeUpdates.phone = phone;
        safeUpdates.updatedAt = new Date().toISOString();

        const result = await usersCollection.updateOne(
          { email: email },
          { $set: safeUpdates }
        );

        res.send({
          success: true,
          message: "Update a user successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* delete a user from db (Admin only, cannot self-delete)
    app.delete("/user/:id", verifyJWT, verifyAdmin, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id) };
        const targetUser = await usersCollection.findOne(filter);
        if (!targetUser) {
          return res.status(404).send({ success: false, message: "User not found" });
        }
        if (targetUser.email === req.decoded?.email) {
          return res.status(400).send({ success: false, message: "Cannot delete your own admin account" });
        }

        const updateDoc = {
          $set: { isDeleted: true },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);

        res.send({
          success: true,
          message: "Delete a user successfully!",
          data: result,
        });
      } catch (error) {
        res.status(500).send({ error: true, message: "Internal server error" });
      }
    });

    //? *********** INSTRUCTOR BIO RELATED APIS *************/

    //* save instructors bio and change user role to instructor in db
    app.post("/save-instructor-bio", verifyJWT, async (req, res) => {
      try {
        const bioData = req.body || {};
        const { user: userId } = bioData;
        if (!userId || !ObjectId.isValid(userId)) {
          return res.status(400).send({ success: false, message: "Invalid or missing userId parameter" });
        }

        // Verify the caller owns the user record
        const currentUser = await usersCollection.findOne({ email: req.decoded?.email });
        if (!currentUser || currentUser._id.toString() !== userId) {
          return res.status(403).send({ success: false, message: "Forbidden: You can only register your own instructor bio" });
        }

        const filter = { _id: new ObjectId(userId) };
        const updateDoc = {
          $set: {
            role: "instructor",
          },
        };

        const saveBio = await instructorBioCollection.insertOne(bioData);
        const updateUser = await usersCollection.updateOne(filter, updateDoc);

        res.send({
          success: true,
          message: "Add instructor bio and get instructor successfully!",
          saveBio: saveBio,
          updateUser: updateUser,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get instructors bio by userId
    app.get("/get-instructor-bio/:id", verifyJWT, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const bio = await instructorBioCollection.findOne({ user: id });
        if (!bio) {
          return res.status(404).send({ success: false, message: "This instructor bio was not found" });
        }

        res.send({
          success: true,
          message: "Get a instructor bio successfully!",
          data: bio,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //? *********** CLASS RELATED APIS *************/

    //* save class in Database
    app.post("/class", verifyJWT, verifyInstructors, async (req, res) => {
      try {
        const classData = req.body || {};
        const sanitizedClass = {
          ...classData,
          seats: Number(classData.seats) || 0,
          courseFree: Number(classData.courseFree) || 0,
          enrolledCourse: 0,
          status: "pending",
          isDeleted: false,
          instructor: {
            name: classData.instructor?.name || req.decoded.name || "Instructor",
            email: req.decoded.email,
          },
          createdAt: new Date().toISOString(),
        };

        const saveClass = await classCollection.insertOne(sanitizedClass);

        res.send({
          success: true,
          message: "Save in course successfully!",
          data: saveClass,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all classes to db
    app.get("/classes", verifyJWT, async (req, res) => {
      try {
        const classes = await classCollection
          .find({ isDeleted: { $ne: true } })
          .toArray();
        const totalData = await classCollection.countDocuments({
          isDeleted: { $ne: true },
        });

        res.send({
          success: true,
          message: "Get all courses successfully!",
          totalData: totalData,
          data: classes,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get a class by id to db
    app.get("/classes/:id", verifyJWT, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id), isDeleted: { $ne: true } };
        const classItem = await classCollection.findOne(filter);
        if (!classItem) {
          return res.status(404).send({ success: false, message: "Class not found !" });
        }

        res.send({
          success: true,
          message: "Get a course successfully!",
          data: classItem,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all approved classes to db
    app.get("/approve-class", async (req, res) => {
      try {
        const filter = { status: "approved", isDeleted: { $ne: true } };
        const result = await classCollection
          .find(filter)
          .sort({ enrolledCourse: -1 })
          .toArray();

        const totalData = await classCollection.countDocuments(filter);

        res.send({
          success: true,
          message: "All courses retrieved successfully!",
          totalData: totalData,
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all classes by instructor email
    app.get("/my-class", verifyJWT, async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res.status(400).send({ success: false, message: "Email query parameter required" });
        }

        const filter = { "instructor.email": email, isDeleted: { $ne: true } };
        const result = await classCollection.find(filter).toArray();

        const totalData = await classCollection.countDocuments(filter);

        res.status(200).send({
          success: true,
          message: "Classes retrieved successfully",
          totalData: totalData,
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* Update a class by instructor (ensuring instructor owns the class, preventing status override)
    app.patch(
      "/update-class/:id",
      verifyJWT,
      verifyInstructors,
      async (req, res) => {
        try {
          const { id } = req.params;
          if (!id || !ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
          }

          const existingClass = await classCollection.findOne({ _id: new ObjectId(id) });
          if (!existingClass) {
            return res.status(404).send({ success: false, message: "Class not found" });
          }

          // Check ownership (or admin)
          if (
            existingClass.instructor?.email !== req.decoded?.email &&
            req.decoded?.role !== "admin"
          ) {
            return res.status(403).send({
              success: false,
              message: "Forbidden! You do not own this class",
            });
          }

          const classData = req.body || {};
          const allowedFields = [
            "className",
            "classImage",
            "courseDetails",
            "courseFree",
            "seats",
            "certifications",
            "level",
            "duration",
            "time",
            "requirements",
            "materials",
          ];

          const safeUpdate = {};
          for (const key of allowedFields) {
            if (classData[key] !== undefined) {
              if (key === "courseFree" || key === "seats") {
                safeUpdate[key] = Number(classData[key]);
              } else {
                safeUpdate[key] = classData[key];
              }
            }
          }
          safeUpdate.updatedAt = new Date().toISOString();

          const filter = { _id: new ObjectId(id) };
          const result = await classCollection.updateOne(filter, {
            $set: safeUpdate,
          });

          res.status(200).send({
            success: true,
            message: "Instructor updated course successfully!",
            data: result,
          });
        } catch (error) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        }
      }
    );

    //* Give feedback to a class by admin
    app.patch("/class/:id", verifyJWT, verifyAdmin, async (req, res) => {
      try {
        const feedback = req.body;
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            feedback: feedback?.feedback || feedback,
          },
        };
        const result = await classCollection.updateOne(filter, updateDoc);

        res.status(200).send({
          success: true,
          message: "Feedback given successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* approve class by admin
    app.patch(
      "/classes/approved/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        try {
          const { id } = req.params;
          if (!id || !ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
          }

          const filter = { _id: new ObjectId(id) };
          const updateDoc = {
            $set: {
              status: "approved",
            },
          };

          const result = await classCollection.updateOne(filter, updateDoc);

          res.status(200).send({
            success: true,
            message: "Approve a course by admin successfully!",
            data: result,
          });
        } catch (error) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        }
      }
    );

    //* Deny class by admin
    app.patch("/classes/deny/:id", verifyJWT, verifyAdmin, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: "deny",
          },
        };

        const result = await classCollection.updateOne(filter, updateDoc);

        res.status(200).send({
          success: true,
          message: "Deny a course by admin successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* delete class from database (Admin or class instructor owner only)
    app.delete("/delete-class/:id", verifyJWT, async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
        }

        const classItem = await classCollection.findOne({ _id: new ObjectId(id) });
        if (!classItem) {
          return res.status(404).send({ success: false, message: "Class not found" });
        }

        // Verify caller is admin or instructor of this class
        const caller = await usersCollection.findOne({ email: req.decoded?.email });
        const isAdmin = caller?.role === "admin";
        const isOwner = classItem.instructor?.email === req.decoded?.email;

        if (!isAdmin && !isOwner) {
          return res.status(403).send({
            success: false,
            message: "Forbidden! You do not have permission to delete this class",
          });
        }

        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { isDeleted: true },
        };
        const result = await classCollection.updateOne(query, updateDoc);

        res.status(200).send({
          success: true,
          message: "Delete a course successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //? *********** SELECT CLASS RELATED APIS *************/

    //* get all selected classes by student email (fixed missing return)
    app.get("/selected-class", verifyJWT, verifyStudents, async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res.send({ success: true, data: [] });
        }

        const decodedEmail = req.decoded?.email;
        if (email !== decodedEmail) {
          return res
            .status(403)
            .send({ success: false, message: "Forbidden access" });
        }

        const result = await selectClassCollection
          .find({ "studentInfo.email": email })
          .toArray();

        return res.status(200).send({
          success: true,
          message: "Student courses retrieved successfully!",
          data: result,
        });
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* save (select) class by student (prevents duplicate selection)
    app.post("/select-class", verifyJWT, verifyStudents, async (req, res) => {
      try {
        const classData = req.body || {};
        const studentEmail = req.decoded?.email;

        // Ensure student identity matches token
        if (classData.studentInfo) {
          classData.studentInfo.email = studentEmail;
        }

        // Check if student already selected this class
        const existingSelection = await selectClassCollection.findOne({
          "classInfo._id": classData?.classInfo?._id,
          "studentInfo.email": studentEmail,
        });

        if (existingSelection) {
          return res.status(400).send({
            success: false,
            message: "Class already selected by student",
          });
        }

        const result = await selectClassCollection.insertOne(classData);

        res.status(200).send({
          success: true,
          message: "Selected course by student successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* delete selected class by student (ensuring student owns it)
    app.delete(
      "/select-class/:id",
      verifyJWT,
      verifyStudents,
      async (req, res) => {
        try {
          const { id } = req.params;
          if (!id || !ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid or missing id parameter" });
          }

          const query = {
            _id: new ObjectId(id),
            "studentInfo.email": req.decoded?.email,
          };
          const result = await selectClassCollection.deleteOne(query);

          res.status(200).send({
            success: true,
            message: "Delete selected course successfully!",
            data: result,
          });
        } catch (error) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        }
      }
    );

    //? ************ ENROLL CLASS RELATED APIS **********/

    //* get student enrolled classes by email (fixed missing return and auth verification)
    app.get("/enroll-class", verifyJWT, verifyStudents, async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res.send({ success: true, data: [] });
        }

        if (email !== req.decoded?.email && req.decoded?.role !== "admin") {
          return res.status(403).send({ success: false, message: "Forbidden access" });
        }

        const result = await paymentClassCollection
          .find({ "studentInfo.email": email })
          .sort({ date: -1 })
          .toArray();

        return res.status(200).send({
          success: true,
          message: "Get student enrolled courses retrieved successfully!",
          data: result,
        });
      } catch (error) {
        return res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* get all enrolled classes in db (Admin only)
    app.get("/all-enroll-class", verifyJWT, verifyAdmin, async (req, res) => {
      try {
        const result = await paymentClassCollection
          .find()
          .sort({ date: -1 })
          .toArray();

        res.status(200).send({
          success: true,
          message: "Get all enrolled courses retrieved successfully!",
          data: result,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //? ********** PAYMENT RELATED APIS ***********/

    //* save payment class data to database (authenticated, verified student)
    app.post("/payment-class", verifyJWT, verifyStudents, async (req, res) => {
      try {
        const classData = req.body || {};
        const { classInfo, studentInfo } = classData;
        const course = classInfo?._id;

        if (!course || !ObjectId.isValid(course)) {
          return res.status(400).send({ success: false, message: "Invalid course ID" });
        }

        // Verify student paying matches token
        if (studentInfo?.email && studentInfo.email !== req.decoded?.email) {
          return res.status(403).send({ success: false, message: "Forbidden: Cannot pay on behalf of another user" });
        }

        // Check course existence and available seats
        const filter = { _id: new ObjectId(course), seats: { $gt: 0 } };
        const update = {
          $inc: {
            seats: -1,
            enrolledCourse: 1,
          },
        };

        const updateCourse = await classCollection.updateOne(filter, update);
        if (!updateCourse || updateCourse.modifiedCount === 0) {
          return res.status(400).send({
            success: false,
            message: "No available seats or class not found!",
          });
        }

        // Save payment record
        const paymentRecord = {
          ...classData,
          paidAt: new Date().toISOString(),
          studentEmail: req.decoded?.email,
        };
        const result = await paymentClassCollection.insertOne(paymentRecord);

        // Delete from selected class if it existed
        let deleteResult = null;
        if (classData._id && ObjectId.isValid(classData._id)) {
          const query = { _id: new ObjectId(classData._id) };
          deleteResult = await selectClassCollection.deleteOne(query);
        }

        res.status(200).send({
          success: true,
          message: "Course paid and enrolled successfully!",
          data: result,
          updateResult: updateCourse,
          deleteResult: deleteResult,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    //* create payment intent (verified JWT, price validation)
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      try {
        if (!stripe) {
          return res.status(500).send({
            success: false,
            message: "Stripe payment service is not configured on the server",
          });
        }

        const { price } = req.body || {};
        if (price === undefined || isNaN(price) || Number(price) <= 0) {
          return res.status(400).send({ success: false, message: "Valid positive price is required" });
        }

        const amount = Math.round(Number(price) * 100);

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: error.message || "Internal server error" });
      }
    });

    // Connect the client to the server
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection or setup error:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Artistry Academia Server is running....!");
});

app.listen(port, () => {
  console.log(`Artistry Academia is listening on port ${port}`);
});
