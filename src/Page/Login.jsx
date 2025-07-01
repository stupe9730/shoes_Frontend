import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLoginMutation,
  useOtpVerfyMutation,
  useResetPassMutation,
  useSetotpMutation,
} from "../redux/authApi";
import { useSelector } from "react-redux";
import { BsX } from "react-icons/bs";

const Login = () => {
  const [
    verifyOtp,
    { data: verified, isSuccess: verifiySuccess, error: verifyError },
  ] = useOtpVerfyMutation();
  console.log(verified);
  console.log(verifiySuccess);
  console.log(verifyError);
  const [login, { isSuccess, error, isError }] = useLoginMutation();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.user);
  // login user
  const [loginUser, setLoginUser] = useState({
    loger: "User",
  });
  const [verifyemail, setVerifyemail] = useState({ otp: 0 });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  // ResetPass
  const [resvalu, setResvalu] = useState("");
  console.log(loginUser);

  const [otpsendSuccess, setOtpsendSuccess] = useState(false);
  const [
    sendotp,
    { data, isSuccess: otpSuccess, isError: otpError, error: otperror },
  ] = useSetotpMutation();
  console.log(otpSuccess, otperror, otperror);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login SuccesFully");

      if (auth.loger && loginUser.loger === "User") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
    // console.log(error && error);

    if (error) {
      //   window.my_modal_4.showModal();
      toast.error(error && error.message);
    }
    if (otpError) {
      //   window.my_modal_4.showModal();
      toast.error(otperror && otperror.message);
    }
    if (otpSuccess) {
      setOtpsendSuccess(true);
      toast.success(data.message);
    }
  }, [isSuccess, error, otperror, otpSuccess]);

  const [verifiy, setVerifiy] = useState();
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status

  // Simulate the send OTP function
  const sendotpmodel = async ({ email }) => {
    try {
      // Trigger the sendotp mutation (API call)
      await sendotp({ email });
      setVerifiy(email);

      // We won't check `otpSuccess` here since it's updated asynchronously
    } catch (error) {
      console.error("Failed to send OTP:", error);
      // Handle error appropriately
    }
  };
  console.log(verifyemail, verifiy);
  if (data && data.updatedData.email) {
    sessionStorage.setItem("email", data.updatedData.email);
  }
  const storedEmail = sessionStorage.getItem("email");

  // Use useEffect to handle modal transitions based on otpSuccess state
  useEffect(() => {
    if (otpSuccess) {
      setOtpSent(true); // Mark OTP as sent
      document.getElementById("my_modal_3").close(); // Close the first modal
      document.getElementById("my_modal_4").showModal(); // Open the second modal
    }
  }, [otpSuccess]);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric and single character
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input if value entered
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  const OtpValu = otp.join("");
  console.log(OtpValu);

  // New Password
  const [ResetPass, { isSuccess: PassChangeSuccess, error: PassError }] =
    useResetPassMutation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passrror, setPassrror] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!strongPasswordRegex.test(password)) {
      setPassrror(
        "❌ Password must include 1 capital letter, 1 number, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    if (password !== confirm) {
      setPassrror("❌ Passwords do not match.");
      return;
    }

    setPassrror("");
    // ✅ Continue with password update (e.g. call API here)
    // console.log({ newPass: password, email: resvalu });

    ResetPass({ newPass: password, email: resvalu });
    // 💖💖💖💖💖 send Email To BackEnd
    document.getElementById("my_modal_7").close();
  };

  useEffect(() => {
    if (verifiySuccess) {
      toast.success("Otp Verify Successfully");
    }
    if (verifyError) {
      window.my_modal_4.showModal();
      toast.error(verifyError.message || "Something Wrong");
    }
  }, [verifiySuccess, verifyError]);
  useEffect(() => {
    if (verified) {
      window.my_modal_7.showModal();
    }
    if (PassChangeSuccess) {
      toast.success("Password Change Success");
    }
  }, [verified, PassChangeSuccess]);

  return (
    <>
      <section section class="bg-gray-50 dark:bg-gray-900 pt-8">
        <div class="flex flex-col items-center    px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-between ">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login in to your account
                </h1>
                <h1>
                  <p className=" px-1 underline text-2xl font-semibold">
                    Loger
                  </p>
                  <select
                    onChange={(e) =>
                      setLoginUser({ ...loginUser, loger: e.target.value })
                    }
                    name="loger"
                    class="form-select box-border my-2 border-2 select-info rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option name="loger" value="User" selected>
                      User
                    </option>
                    <option name="loger" value="Admin">
                      Admin
                    </option>
                  </select>
                </h1>
              </div>
              <div class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleLogin}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Email"
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
                    onChange={handleLogin}
                    type={`${pass ? "text" : "password"}`}
                    name="password"
                    id="password"
                    placeholder="password must be at least 8 characters"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
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
                    <div class="ml-3 text-sm  ">
                      <label
                        for="remember"
                        class="text-gray-500 cursor-pointer  dark:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                  <div
                    class="text-gray-500 cursor-pointer hover:underline hover:text-blue-500  dark:text-gray-300"
                    onClick={() => window.my_modal_3.showModal()}
                  >
                    Reset Password
                  </div>
                </div>
                {
                  <button
                    type="button"
                    onClick={(e) => login(loginUser)}
                    className="btn btn-primary w-full btn-md"
                  >
                    {" "}
                    {"Login"}
                  </button>
                }
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    class="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500"
                    onClick={(e) => navigate("/register")}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Reset Password */}
      <div>
        {/* First Modal: Send OTP */}
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box dark:bg-gray-800">
            <button
              onClick={(e) => window.my_modal_3.close()}
              type="submit"
              className="btn btn-sm btn-circle dark:text-white text-4xl btn-ghost absolute right-2 top-2"
            >
              <BsX />
            </button>
            <main
              id="content"
              role="main"
              className="w-full max-w-lg mx-auto dark:bg-gray-800"
            >
              <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
                <div className="p-4 sm:p-7">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Forgot password?
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Remember your password?
                      <a
                        className="text-blue-600 decoration-2 hover:underline font-medium"
                        href="/login"
                      >
                        Login here
                      </a>
                    </p>
                  </div>

                  <div className="mt-5">
                    <div>
                      <div className="grid gap-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                          >
                            Email address
                          </label>
                          <div className="relative">
                            <input
                              onChange={(e) => setResvalu(e.target.value)}
                              type="email"
                              name="email"
                              id="email"
                              className="bg-gray-50 border my-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter Email"
                              required
                            />
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent form submission
                            sendotp({ email: resvalu });
                            sendotpmodel({ email: resvalu });
                          }}
                          type="button"
                          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          SEND OTP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </form>
        </dialog>

        {/* Second Modal: Verify OTP */}
        {otpSuccess && (
          <dialog id="my_modal_4" className="modal">
            <form
              method="dialog"
              className="modal-box dark:bg-gray-800 overflow-hidden"
            >
              <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                  <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-semibold text-3xl">
                        <p>Email Verification</p>
                      </div>
                      <div className="flex flex-row text-sm font-medium text-gray-400">
                        <p>We have sent a code to your email {storedEmail}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-3 justify-center">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          />
                        ))}
                        <div className="flex flex-col space-y-5"></div>
                      </div>
                      <div className="mt-3">
                        <div>
                          <button
                            onClick={(e) =>
                              verifyOtp({ email: resvalu, otp: OtpValu })
                            }
                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                          >
                            Verify Account
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>Didn't receive code?</p>{" "}
                          <a
                            className="flex flex-row items-center text-blue-600"
                            href="#"
                          >
                            Resend
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </dialog>
        )}
      </div>
      );
      {/* <button className="btn" onClick={()=>window.my_modal_7.showModal()}>open modal</button> */}
      <dialog id="my_modal_7" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_7").close()}
          >
            ✕
          </button>

          <div className="my-6">
            <label className="mx-3 text-xl font-serif">
              Enter New Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Type Password"
                className="input input-bordered w-full my-3 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-5 text-sm text-blue-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            <label className="mx-3 text-xl font-serif">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full my-3 pr-12"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-5 text-sm text-blue-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}
            <div>{passrror}</div>
          </div>
          <button type="submit" className="btn btn-accent text-xl w-full">
            Update Password
          </button>
        </form>
      </dialog>
    </>
  );
};

export default Login;
