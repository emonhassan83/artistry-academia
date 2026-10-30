import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialProfiles from "./SocialProfiles";
import Img from "../../assets/profile-page/profile-page-img.svg";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { updateUser } from "../../api/users/users.api";

const UserProfile = () => {
  const { user, role } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      name: data?.name,
      email: data?.email,
      photoURL: user?.photoURL,
      profession: data?.profession,
      location: data?.location,
      plan: data?.plan,
      phone: data?.phone,
      role,
    };
    
    //update a user
    updateUser(userData);
    toast.success("User updated successfully");
  };

  return (
    <div>
      <Toaster />
      <Helmet>
        <title>Artistry Academia | User Profile</title>
      </Helmet>
      <div className="flex items-center gap-2 md:gap-4 text-[15px] font-semibold ml-4 sm:ml-6 mt-6">
        <Link to="/">
          <p className="cursor-pointer">Home</p>
        </Link>
        <MdKeyboardArrowRight className="text-lg" />
        <p className="cursor-pointer">Profile Page</p>
      </div>
      <div className="lg:flex gap-20 mx-4 sm:mx-10 mt-10">
        <div className="lg:w-[290px]">
          <div className="flex flex-col items-center my-4">
            <div className="btn btn-circle text-white text-5xl font-bold bg-blue-500 hover:text-white hover:bg-blue-600 object-cover w-20 h-20 mx-2 rounded-full">
              {user?.displayName?.slice(0, 1) || "User"}
            </div>
            <p className="py-2 text-xl font-semibold text-[#141141]">
              {user?.displayName || "User"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <>
            <h4 className="text-lg sm:text-xl mt-8 md:mt-0  font-semibold">
              Personal Information
            </h4>
            <hr className="my-2 sm:my-4" />
            <div className="md:flex justify-between gap-6 w-full">
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="block md:flex gap-8">
                    <div className="w-full">
                      <label className="text-[13px] font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-100"
                        defaultValue={user?.displayName}
                        {...register("name", { required: true })}
                        required
                      />
                      {errors.name && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Full Name field is required</small>
                        </p>
                      )}
                      <label className="text-[13px] font-medium">
                        Email Id
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="bg-gray-100"
                        value={user?.email}
                        {...register("email", { required: true })}
                        required
                      />
                      {errors.email && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Email Id field is required</small>
                        </p>
                      )}
                      <label className="text-[13px] font-medium">
                        Profession
                      </label>
                      <input
                        type="text"
                        name="profession"
                        className="bg-gray-100"
                        {...register("profession", { required: true })}
                        required
                      />
                      {errors.profession && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Profession field is required</small>
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="text-[13px] font-medium">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="bg-gray-100"
                        placeholder="Your country"
                        {...register("location", { required: true })}
                        required
                      />
                      {errors.location && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Location field is required</small>
                        </p>
                      )}
                      <label className="text-[13px] font-medium">
                        Current Plan
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name="plan"
                          className="bg-gray-100"
                          value={"Free Plan"}
                          {...register("plan", { required: true })}
                          required
                        />
                        <Link to="/pricing">
                          <button className="bg-sky-600 h-10 px-2 py-1 text-white rounded-md -mt-3 text-sm">
                            Upgrade
                          </button>
                        </Link>
                      </div>
                      {errors.plan && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Current plan field is required</small>
                        </p>
                      )}
                      <label className="text-[13px] font-medium">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="bg-gray-100"
                        placeholder="Your phone number"
                        {...register("phone", { required: true })}
                        required
                      />
                      {errors.phone && (
                        <p className="text-color text-xs font-semibold -mt-5">
                          <small>Phone field is required</small>
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Save Changes"
                    className="btn btn-sm sm:btn-md btn-color w-36 rounded-3xl"
                  />
                </form>
              </div>
              <div>
                <img className="w-[520px]" src={Img} alt="" />
              </div>
            </div>
            {/* Social Profiles */}
            <SocialProfiles />
          </>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
