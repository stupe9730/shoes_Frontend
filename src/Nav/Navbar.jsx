import React, { useEffect, useRef, useState } from "react";
import {
  BsFillPersonFill,
  BsFilter,
  BsSearch,
  BsXLg,
  BsX,
} from "react-icons/bs";
import { PiWebhooksLogo } from "react-icons/pi";
import { Link, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./logo.png";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/adminSlice";
import { useLazyGetCartQuery } from "../redux/userApi";

const Navbar = ({ toggleDarkMode, dark }) => {
  const dropdownRef = useRef(null);
  const [CartData, { data, isSuccess, error }] = useLazyGetCartQuery();
  const [searchs, setSearchs] = useState(false);
  const toggleSearch = () => {
    setSearchs(!searchs);
  };
  const [smallLinks, setSmallLinks] = useState(false);
  console.log(data);

  const navigate = useNavigate();
  // const username = localStorage.getItem("auth")
  // const authObject = JSON.parse(username)
  const { auth } = useSelector((data) => data.user);
  const authObject = auth && auth.email.split("")[0];
  console.log(authObject);

  // logout
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    // logOuttrigger()
    navigate("/");
    toast.success("LogOut Success");
    console.log("User logged out");
  };
  useEffect(() => {
    if (isSuccess) {
      CartData({ logerId: auth && auth._id });
    }
  }, [isSuccess]);

  useEffect(() => {
    CartData({ logerId: auth && auth._id });
  }, [auth]);
  useEffect(() => {
    if (error && error.data) {
      //   dispatch(logOut());
    }
  }, [error]);

  console.log(error);

  // motion code
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // motion code
  return (
    <div className="sticky top-0 z-40">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        // style={styles.navbar}
      >
        <div
          className={`navbar px-1 sm:px-9 py-0 dark:text-white dark:bg-gray-800 bg-base-100  `}
        >
          <div className="flex-1">
            <Link to="/">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                style={{ display: "inline-block", cursor: "pointer" }}
              >
                <PiWebhooksLogo className="sm:text-3xl text-4xl" />
              </motion.div>
            </Link>

            <div className="m-auto  sm:block hidden ">
              <Link
                to="/men"
                className=" font-bold mx-2 hover:underline cursor-pointer"
              >
                Men
              </Link>
              <Link
                to="/women"
                className=" font-bold mx-2 hover:underline cursor-pointer"
              >
                Women
              </Link>
              <Link
                to="/kid"
                className=" font-bold mx-2 hover:underline cursor-pointer"
              >
                Kid
              </Link>
            </div>
          </div>
          <div className="absolute right-36">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Shoes"
                className={`input dark:first-letter:bg-black input-bordered w-full max-w-xs ${
                  searchs ? "block dark:bg-slate-700 text-white" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end sm:hidden block ">
              <label tabIndex={0} className="">
                <BsFilter
                  onClick={(e) => setSmallLinks(!smallLinks)}
                  className="text-2xl"
                />
              </label>
            </div>
            <div
              className={`${!auth ? "hidden" : "dropdown dropdown-end mr-2 "}`}
            >
              <label
                tabIndex={0}
                onClick={toggleSearch}
                className="btn btn-ghost  btn-circle dark:"
              >
                <div className="indicator hidden sm:block">
                  <BsSearch className="sm:text-2xl text-xl " />
                </div>
              </label>
              {auth && (
                <label
                  tabIndex={0}
                  className=" btn btn-ghost sm:relative top-0 absolute left-1 sm:top-1 sm:me-2 btn-circle"
                >
                  <Link
                    to="shoping"
                    className="indicator flex justify-center items-center    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm w-4 badge-accent dark:text-white  indicator-item">
                      {data ? data.length : 0}
                    </span>
                  </Link>
                </label>
              )}
            </div>

            <div className="dropdown dropdown-end ">
              {auth ? (
                <div className="relative items-center">
                  <div className="flex justify-center">
                    <Link
                      tabIndex={0}
                      className="h-7 w-7 sm:w-10 sm:h-10 flex justify-center  items-center  bg-orange-600 btn-circle   hover:bg-orange-500 "
                      onClick={handleDropdownToggle}
                    >
                      <h1 className="font-bold items-center justify-center py-1 capitalize text-xl text-white">
                        {authObject}
                      </h1>
                    </Link>
                  </div>

                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute me:w-[15vw] dark:bg-gray-700 border-none shadow-xl dark:text-white right-0 mt-2 bg-white border rounded-md "
                    >
                      {/* <div className=' m-2 text-end'>X</div> */}

                      {/* Add additional dropdown menu items here */}
                      <div className="flex justify-between ">
                        <button
                          className="block px-4 py-2 dark:text-white text-gray-800"
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                        >
                          LogOut
                        </button>
                        <button
                          onClick={(e) => setDropdownOpen(false)}
                          className="m-3  text-3xl "
                        >
                          <BsX />
                        </button>
                      </div>
                      <button
                        className="block px-4 py-2 dark:text-white text-gray-800"
                        onClick={(e) => {
                          setDropdownOpen(false), navigate("/histroy");
                        }}
                      >
                        History
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <BsFillPersonFill className="text-2xl" />
                </Link>
              )}
            </div>
          </div>
          {/* sm window links */}
        </div>
        <AnimatePresence>
          {smallLinks && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -60,
                scale: 0.9,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              transition={{ duration: 0.3 }}
              className="sm:hidden  w-full block bg-stone-300 text-black dark:bg-slate-600 dark:text-white h-36 relative"
            >
              <div className="absolute right-0">
                <BsXLg
                  className="m-4 cursor-pointer text-2xl"
                  onClick={() => setSmallLinks(false)}
                />
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Link
                    onClick={() => setSmallLinks(false)}
                    to="/men"
                    className="block mx-3 pt-3 hover:cursor-pointer hover:underline text-lg font-semibold dark:text-white"
                  >
                    Men
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Link
                    onClick={() => setSmallLinks(false)}
                    to="/women"
                    className="block mx-3 pt-3 hover:cursor-pointer hover:underline text-lg font-semibold dark:text-white"
                  >
                    Women
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Link
                    onClick={() => setSmallLinks(false)}
                    to="/kid"
                    className="block mx-3 pt-3 hover:cursor-pointer hover:underline text-lg font-semibold dark:text-white"
                  >
                    Kid
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className=" z-50    bottom-10 fixed right-1 w-full">
        {dark ? (
          <MdOutlineDarkMode
            onClick={toggleDarkMode}
            className="right-0 h-10 w-10 cursor-pointer border-2 shadow-sm  rounded-full dark:bg-black border-white    sm:h-20  text-white absolute z-10"
            size={40}
          />
        ) : (
          <MdOutlineDarkMode
            onClick={toggleDarkMode}
            className="right-0 text-black h-10 w-10 cursor-pointer border-2 rounded-full dark:bg-white  bg-white shadow-md    sm:h-20   absolute z-10"
            size={40}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
