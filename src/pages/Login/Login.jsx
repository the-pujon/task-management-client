import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import login1 from "../../assets/login.gif";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const { signInWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  //for react-hook-form
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    signInWithEmail(email, password)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <>
        <div className="hero min-h-screen bg-none">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={login1} alt="" className="w-1/2" />

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-transparent ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body bg-transparent"
              >
                <div
                  className="text-3xl text-center  font-semibold"
                  style={{ color: "#263238" }}
                >
                  Please Login
                </div>
                <div className="form-control relative my-6">
                  <input
                    {...register("email")}
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full   bg-transparent text-black focus:outline-none focus:borer-rose-600"
                    placeholder="email"
                    style={{ borderBottom: "2px solid #a8adaf" }}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
                <div className="form-control relative ">
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full   bg-transparent text-black focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    style={{ borderBottom: "2px solid #a8adaf" }}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-200 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="text-xs text-black">
                  Don't have an account?{" "}
                  <Link to="/register" className="hover:text-gray-400">
                    Register
                  </Link>
                </div>
                {/*{error && (
                  <div className="text-xs text-warning">There is an error</div>
                )}*/}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn text-white "
                    style={{ background: "#263238" }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
