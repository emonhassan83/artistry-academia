import { useContext } from "react";
import googleLogo from "../../../assets/logo/google.png";
import { AuthContext } from "../../../providers/AuthProvider";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { saveUserBySocial } from "../../../api/users/users.api";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const widthToggle = location.pathname.includes("signUp");

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const logUser = result.user;
        console.log(logUser);

        //* save user in db
        saveUserBySocial(logUser);
        toast.success("user logged in successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
    <Toaster/>
      <div
        onClick={handleGoogleSignIn}
        className={`flex items-center justify-center gap-6 ${widthToggle ? 'social-signUp' : 'social-login'} my-4`}
      >
        <img className="w-6" src={googleLogo} alt="Google Image" />
        <p className="">Continue with Google</p>
      </div>
    </>
  );
};

export default SocialLogin;
