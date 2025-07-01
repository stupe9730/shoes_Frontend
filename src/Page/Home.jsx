import React from "react";
import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
// import video3d from '../Nav/shoew3d.gif';
import video3d from "../Nav/shoeVideoe.mp4";
import { motion, spring } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 200, transition: { duration: 2 } },
  };
  return (
    <div>
      <motion initial="hidden" animate="visible" variants={video3d}>
        <div className=" h-90 dark:bg-black  items-center">
          <div>
            <video
              src={video3d}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "90vh",
                opacity: 0.7,
                objectFit: "cover",
              }} // Optional styling
            />
          </div>
          <div
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp9Pvj6CutkvopcFcB1hyZc9RytVk7DufuUA&usqp=CAU')",
            }}
            className="bg-yellow-50 w-screen  items-center justify-self-center  hidden md:block "
          >
            <div className="absolute top-40 left-10 lg:w-[50%] md:w-[80%]">
              <h2 className="md:text-6xl text-4xl text-white font-bold  md:mx-16  ">
                Discount20% For All Order Over $2000
              </h2>
              <div>
                <p className="md:mx-16 text-2xl text-white mx-3 mt-2">
                  Use coupon code{" "}
                  <span className="bg-orange-100 text-black">DISCOUNT 20%</span>
                </p>
                <p className="md:mx-16 text-2xl text-white mx-3">
                  Use coupon DISCOUNT20
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-[30%] mx-3 sm:w-[50%] md:hidden">
            <h2 className="lg:text-6xl text-5xl text-white font-bold  md:mx-16  ">
              Discount 20% For All Order Over $2000
            </h2>
            <div>
              <p className="md:mx-16 text-2xl text-white  mt-2">
                Use coupon code{" "}
                <span className="bg-orange-100 text-black">DISCOUNT20%</span>
              </p>
              <p className="md:mx-16 text-2xl text-white ">
                Use coupon DISCOUNT20%
              </p>
            </div>
          </div>
        </div>
      </motion>
      <motion initial="hidden" animate="visible" variants={Animation}>
        <div className="grid pt-12  md:grid-cols-3 dark:bg-black  gap-3">
          <div className="  ">
            <img
              className=" md:mt-0 mt-6 rounded-lg  lg:h-[60vh] md:h-[50vh] md:w-[100%]  lg:w-[90%] w-[90%] mx-auto  object-cover"
              src="https://i.pinimg.com/474x/fe/60/69/fe6069c4ceb711f0825c5f1f2d1ea876.jpg"
              alt=""
            />
            <div className="ms-5">
              <h1 className="text-2xl my-4 dark:text-white ">
                MEN SHOES COLLECTION
              </h1>
              <p className="text-sm my-3 dark:text-white">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={(e) => navigate("/Men")}
              >
                Shop Men
              </button>
            </div>
          </div>
          <div className=" ">
            <img
              className=" md:mt-0 mt-6 rounded-lg  lg:h-[60vh] md:h-[50vh] md:w-[100%]  lg:w-[90%] w-[90%] mx-auto"
              src="https://images.unsplash.com/photo-1535928069047-389a87df1b02?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUzfHx3ZW1lbiUyMHNob2VzfGVufDB8fDB8fHww"
              alt=""
            />
            <div className="ms-5">
              <h1 className="text-2xl dark:text-white my-4 ">
                WOMEN SHOES COLLECTION
              </h1>
              <p className="text-sm dark:text-white my-3">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={(e) => navigate("/Women")}
              >
                Shop Women
              </button>
            </div>
          </div>
          <div className=" ">
            <img
              className="  md:mt-0 mt-6 rounded-lg  lg:h-[60vh] md:h-[50vh] md:w-[100%]  lg:w-[90%] w-[90%] mx-auto   "
              src="https://images.unsplash.com/photo-1574946943172-4800feadfab7?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <div className="ms-5">
              <h1 className="text-2xl dark:text-white my-4 ">
                KID SHOES COLLECTION
              </h1>
              <p className="text-sm dark:text-white my-3">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={(e) => navigate("/Kid")}
              >
                Shop Kid
              </button>
            </div>
          </div>
        </div>
      </motion>
    </div>
  );
};

export default Home;
