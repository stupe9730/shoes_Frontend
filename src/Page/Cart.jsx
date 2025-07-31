import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import {
  useAddToCartMutation,
  useLazyGetCartQuery,
  useLazyGetUserCartQuery,
} from "../redux/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
// import { useSelector } from 'react-redux';

const Cart = () => {
  const { _id } = useParams();
  const [handleColor, setHandleColor] = useState();
  const [auther, { error: authError }] = useLazyGetCartQuery();
  const [getCartPro, { data, isSuccess, isError, error, isLoading }] =
    useLazyGetUserCartQuery();
  const [
    addToCart,
    {
      isSuccess: isCartSuccess,
      isError: isCartError,
      isLoading: isCartLoading,
      error: cartError,
    },
  ] = useAddToCartMutation();
  const { auth } = useSelector((state) => state.user);

  // const { gender, auth } = useSelector(state => state.gender);
  // console.log(gender);

  const [handlequt, setHandlequt] = useState(1);

  const [butonauth, setButonauth] = useState(true);

  // const handlesubmit = () => {
  //     console.warn(handlequt);
  //     if (handleColor && handlequt && handlequt.qut >= 1) {
  //         { addUserProduct({ ...cart[0], proqut: handlequt, prosize: handleColor, uid: auth.uid }) }
  //         setAllert("printe");
  //         setButonauth(true);
  //     } else {
  //         setButonauth(false);
  //     }
  // }
  console.log(handlequt);

  const [allert, setAllert] = useState("hidden");
  const navigate = useNavigate();
  // const [login, { data: loginData }] = useLazyLoginQuery();
  // console.log(loginData);

  useEffect(() => {
    auther();
    getCartPro({ _id });
  }, [_id]);
  console.log(authError);
  //    const [handlequt, setHandlequt] = useState(3); // default value

  // Input Edit
  const handleIncrement = () => {
    if (handlequt < 10) setHandlequt((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (handlequt > 1) setHandlequt((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 10) {
      setHandlequt(val);
    }
  };

  // effects

  useEffect(() => {
    if (isCartSuccess) {
      toast.success("Add To Cart Success");
      navigate("/shoping");
    }
  }, [isCartSuccess, isCartLoading, isCartError]);

  return (
    data && (
      <>
        {(isLoading || isCartLoading) && <Loader />}
        <div className="md:px-20 px-3  sm:px-6 dark:bg-black dark:text-white">
          <div className="py-4">
            <Link className="text-blue-700 dark:text-white ">Home / </Link>
            <Link to={`/Men`} className="text-blue-700 dark:text-white ">
              Men /
            </Link>
            <span> {data.name}</span>
          </div>
          <div className="grid  grid-cols-12 gap-6   mt-2 sm:mt-5 pb-5">
            <div className="md:col-span-6 p-0 col-span-12">
              {data && (
                <motion.img
                  className=" rounded-2xl sm:h-[90%] sm:w-[90%] h-[100%]  w-[100%] dark:bg-slate-700 bg-slate-100"
                  src={`${data.img}`}
                  alt={data.name}
                  initial={{ scale: 1, opacity: 0 }} // Initial state
                  animate={{ scale: 1, opacity: 1 }} // Animate to full scale and opacity
                  transition={{
                    duration: 0.8, // Smooth transition duration
                    ease: "easeInOut", // Smooth easing effect
                  }}
                />
              )}
            </div>

            <motion.div
              className="md:col-span-6 col-span-12"
              initial={{ x: 200, opacity: 0 }} // Start off-screen to the right
              animate={{ x: 0, opacity: 1 }} // Animate into view
              transition={{
                duration: 0.8, // Smooth transition duration
                ease: "easeInOut", // Smooth easing effect
              }}
            >
              <h1 className="text-4xl my-2  font-bold">{data.name}</h1>
              <div className="flex gap-10 items-center">
                <span className="text-2xl font-bold">
                  Color : <span className="underline">{data.color}</span>
                </span>
                <span className="text-2xl font-bold">
                  <p className="text-2xl  my-3 font-bold">
                    Price : <span className="underline">₹{data.price}</span>
                  </p>
                </span>
              </div>
              <div className="flex  ">
                <form className="max-w-xs my-5 mx-0">
                  <label
                    htmlFor="bedrooms-input"
                    className="block mb-2  font-medium text-gray-900 dark:text-white text-2xl"
                  >
                    Quantity:
                  </label>
                  <div className="relative flex items-center max-w-[11rem]">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="2"
                      value={handlequt}
                      onChange={handleChange}
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-2xl focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Min qut is 1 and Max qut is 10
                  </p>
                </form>
                <span className="text-2xl font-bold mt-4 ">
                  Size : <span className="underline ">{data.size}</span>
                </span>
              </div>
              <div className="flex"></div>
              {auth && !authError ? (
                <div>
                  <button
                    onClick={(e) =>
                      addToCart({
                        ProId: data && data._id,
                        logerId: auth._id,
                        qut: handlequt && handlequt,
                      })
                    }
                    className="btn btn-secondary me-4 my-4 w-full text-white"
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-success mb-4 hover:bg-emerald-500 text-white text-xl font-mono w-full mt-2"
                >
                  Please login
                </button>
              )}
              {!butonauth && (
                <p className="text-red-500 w-full my-2">
                  Please select variant options
                </p>
              )}
              <div>
                <p>{data.desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
        {data && (
          <div
            className={`pb-4 rounded-lg bg-success-100 md:w-80 w-72 fixed top-20 right-5 bg-slate-100 border border-black px-6 py-5 text-base text-success-700 animate__animated animate__slideInRight animate__duration-0.4 ${
              allert === "printe"
                ? "md:block hidden animate__slideInRight"
                : "hidden"
            }`}
            role="alert"
          >
            <div className="flex justify-between">
              <h4 className="mb-2 font-medium leading-tight">
                JUST ADDED TO YOUR CART
              </h4>
              <BsXLg
                className="cursor-pointer"
                onClick={() => setAllert("ok")}
              />
            </div>
            <hr className="border border-black" />
            <p className="md:mb-4 mb-1">
              <div className="flex justify-between my-2">
                <div>
                  <img className="w-20 me-4" src={data.img} alt="" />
                  <strong>₹{data.price}</strong>
                </div>
                <strong className="me-5">{data.name}</strong>
                <div>qut:{data.qut}</div>
              </div>
            </p>
            <hr className="border-success-600 opacity-30" />
            <p className="mb-0 md:mt-4 mt-2">
              <button
                className="btn btn-outline hover:btn-info w-full border border-black md:py-3 py-1"
                onClick={() => navigate("/shopping")}
              >
                VIEW CART(1){" "}
              </button>
            </p>
            {/* <Link className='flex justify-center mt-3 underline' onClick={() => setAllert("ok")}> Continue Shopping</Link> */}
          </div>
        )}
      </>
    )
  );
};

export default Cart;
