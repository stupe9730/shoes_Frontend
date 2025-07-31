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
        <div className=" h-90 dark:bg-black bg-black  items-center">
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
            className=" w-screen  items-center justify-self-center  hidden md:block "
          >
            <div className="absolute top-40 left-10 lg:w-[50%] md:w-[80%]">
              <h2 className="md:text-6xl text-4xl text-white font-bold  md:mx-16  ">
                Discount <span className="text-yellow-200">20%</span> For All
                Order Over ₹2000
              </h2>
              <div>
                <p className="md:mx-16 text-2xl text-white mx-3 mt-2">
                  Use coupon code{" "}
                  <span className="bg-orange-100 text-black">DISCOUNT 20%</span>
                </p>
                <p className="md:mx-16 text-2xl text-white mx-3">
                  Use coupon DISCOUNT 20%
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-[30%] mx-3 sm:w-[50%] md:hidden">
            <h2 className="lg:text-6xl text-5xl text-white font-bold  md:mx-16  ">
              Discount <span className="text-yellow-200">20%</span> For All
              Order Over ₹2000
            </h2>
            <div>
              <p className="md:mx-16 text-2xl block text-white  mt-2">
                <span className="block my-2 text-4xl"> Use coupon code</span>
                <span className="bg-orange-100  text-2xl text-black">
                  DISCOUNT 20%
                </span>
              </p>
              <p className="md:mx-16 text-2xl text-white ">
                Use coupon DISCOUNT 20%
              </p>
            </div>
          </div>
        </div>
      </motion>
      <motion.div initial="hidden" animate="visible" variants={Animation}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 dark:bg-black">
          {/* MEN */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-64 object-cover"
              src="https://i.pinimg.com/474x/fe/60/69/fe6069c4ceb711f0825c5f1f2d1ea876.jpg"
              alt="Men Shoes"
            />
            <div className="p-5">
              <h1 className="text-xl font-semibold mb-2 dark:text-white">
                MEN SHOES COLLECTION
              </h1>
              <p className="text-sm mb-4 dark:text-white">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={() => navigate("/Men")}
              >
                Shop Men
              </button>
            </div>
          </div>

          {/* WOMEN */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1535928069047-389a87df1b02?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3"
              alt="Women Shoes"
            />
            <div className="p-5">
              <h1 className="text-xl font-semibold mb-2 dark:text-white">
                WOMEN SHOES COLLECTION
              </h1>
              <p className="text-sm mb-4 dark:text-white">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={() => navigate("/Women")}
              >
                Shop Women
              </button>
            </div>
          </div>

          {/* KID */}
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1574946943172-4800feadfab7?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3"
              alt="Kid Shoes"
            />
            <div className="p-5">
              <h1 className="text-xl font-semibold mb-2 dark:text-white">
                KID SHOES COLLECTION
              </h1>
              <p className="text-sm mb-4 dark:text-white">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>
              <button
                className="btn btn-success"
                onClick={() => navigate("/Kid")}
              >
                Shop Kid
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
