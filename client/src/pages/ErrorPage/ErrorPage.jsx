import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/404/404_img.svg";
import { useTheme } from "../../providers/ThemeProvider";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  const { theme } = useTheme(); // for using light and dark themes

  return (
    <section
      className={`h-screen p-16 ${
        theme?.mode === "dark" ? "text-gray-100" : " text-gray-700"
      }`}
    >
      <div className="container md:flex items-center justify-center px-5 mx-auto my-8 gap-10">
        <div className="max-w-md text-center mx-auto">
          <h2 className="mb-8 font-extrabold text-9xl ">
            <span className="sr-only">Error</span>
            {status || 404}
          </h2>
          <p className="text-2xl font-bold md:text-3xl mb-8">
            {error?.message}
          </p>
          <Link to="/" className="btn btn-sm px-5 rounded-3xl btn-color my-4">
            Back to homepage
          </Link>
        </div>
        <div>
          <img className="w-full lg:w-[650px]" src={img} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
