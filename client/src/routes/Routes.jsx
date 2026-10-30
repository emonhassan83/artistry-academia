import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import SelectedClass from "../pages/Dashboard/SelectedClass";
import EnrolledClass from "../pages/Dashboard/EnrolledClass";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import ManageClass from "../pages/Dashboard/ManageClass";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import Instructor from "../pages/Instructor/Instructor";
import AllClass from "../pages/AllClass/AllClass";
import Payment from "../pages/Dashboard/Payment/Payment";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import InstructorClass from "../pages/InstructorClass/InstructorClass";
import BecomeInstructor from "../pages/BecomeInstructor/BecomeInstructor";
import ClassDetails from "../pages/ClassDetails/ClassDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: (
          <PrivateRoute>
            <Instructor />
          </PrivateRoute>
        ),
      },
      {
        path: "/instructors/classes/:email",
        element: (
          <PrivateRoute>
            <InstructorClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-classes",
        element: (
          <PrivateRoute>
            <AllClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/classes/class-details/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/become-instructor",
        element: <BecomeInstructor />,
      },
      {
        path: "/user-profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //* student roues
      {
        path: "selected-class",
        element: <SelectedClass />,
      },
      {
        path: "enrolled-class",
        element: <EnrolledClass />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      //* Instructor roues
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "my-class",
        element: (
          <InstructorRoute>
            <MyClass />
          </InstructorRoute>
        ),
      },
      //* Admin roues
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-class",
        element: (
          <AdminRoute>
            <ManageClass />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
