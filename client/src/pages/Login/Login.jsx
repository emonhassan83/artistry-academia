import Lottie from "react-lottie";
import animation from "../../assets/animation_login.json";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/Shared/SocialLogin/SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import DemoCredentialsButton from "../../components/UI/ModalCredentials/DemoCredentialsButton";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="md:flex justify-center items-center md:h-[100vh] bg-[#caf0f8]">
      <Helmet>
        <title>Artistry Academia | Login</title>
      </Helmet>
      <Toaster />
      <div className="mt-6 bg-gray-100 login-card mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
          Login Please
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign in to access your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xs sm:text-sm">Email address</label>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            required
          />
          {errors.email && (
            <p className="text-sky-500 text-xs -mt-5">
              <small>Email field is required</small>
            </p>
          )}

          <label className="text-xs sm:text-sm">Password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
            })}
            required
          />
          <p className="-mt-4 cursor-pointer" onClick={() => setShow(!show)}>
            <small>
              {" "}
              {show ? <span>Hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
          {errors.password?.type === "required" && (
            <p className="text-sky-500 text-xs -mt-5">
              <small>Password is required</small>
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-sky-500 text-xs -mt-5">
              <small>Password must be 6 character</small>
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-sky-500 text-xs -mt-5 ">
              <small>
                Password must have one Uppercase one lower case, one number and
                one special character
              </small>
            </p>
          )}

          <input
            type="submit"
            value="Login"
            className="btn btn-color border-none btn-block mt-4"
          />
          <p className="px-3 text-sm dark:text-gray-400 text-center mt-2">
            Login with social accounts
          </p>
          <SocialLogin />
        </form>
        <div className="divider divider-neutral">OR</div>
        <DemoCredentialsButton />
        <p className="text-center mt-3">
          <small>
            New to Artistry Academia Please{" "}
            <Link to="/signUp" className="text-color font-bold underline">
              SignUp
            </Link>
          </small>
        </p>
      </div>

      <div className="md:w-1/2">
        <Lottie options={defaultOptions} height={475} width={370} />
      </div>
    </div>
  );
};

export default Login;
