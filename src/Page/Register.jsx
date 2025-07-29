import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/authApi";
import Loader from "./Loader";

const Register = () => {
  const [registr, { isSuccess, error, isError, isLoading }] =
    useRegisterMutation();
  console.log(isError, error);
  const [pass, setPass] = useState();

  const [Register, setRegister] = useState({
    loger: "User",
  });
  const handleRegister = (e) => {
    console.log(e.target.value);

    const { value, name, loger } = e.target;
    setRegister({ ...Register, [name]: value });
  };
  console.log(Register);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Register SuccesFully");
      navigate("/login");
    }
    if (error) {
      toast.error(error.data && error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading && <Loader />}
      {
        <section section class="bg-gray-50 pt-8 dark:bg-gray-900">
          <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex justify-between ">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create account
                  </h1>
                  <div className="flex flex-col justify-between ">
                    <span className="font-bold mx-2 my-2 inline dark:text-white">
                      Loger:
                    </span>
                    <select
                      onChange={(e) =>
                        setRegister({ ...Register, loger: e.target.value })
                      }
                      name="loger"
                      class="form-select box-border border-2 select-info rounded-md dark:bg-gray-700 dark:text-white"
                    >
                      <option name="loger" selected value="User">
                        User
                      </option>
                      <option name="loger" value="Admin">
                        Admin
                      </option>
                    </select>
                  </div>
                </div>
                <div class="space-y-4 md:space-y-6">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
                    Name
                    <input
                      onChange={handleRegister}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={handleRegister}
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleRegister}
                      type={`${pass ? "text" : "password"}`}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <p className="  alert-warning dark:text-white my-1 text-xs sm:text-sm">
                      🔐 Use 8+ characters, 1 capital, and 1 special symbol.
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          onChange={(e) => setPass(e.target.checked)}
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="remember"
                          class="text-gray-500 cursor-pointer dark:text-gray-300"
                        >
                          Show Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start"></div>
                  <button
                    onClick={(e) => registr(Register)}
                    className="btn btn-info dark:text-white w-full btn-md"
                  >{`${isLoading ? <Loader /> : "Register"}`}</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      class="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500"
                      onClick={(e) => navigate("/login")}
                    >
                      Login here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Register;
