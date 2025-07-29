import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight, BsSliders } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useLazyGetUsersQuery } from "../redux/userApi";
import ReactPaginate from "react-paginate";
import { PiWebhooksLogo } from "react-icons/pi";
import Loader from "./Loader";

const Men = () => {
  const [logo, setLogo] = useState(false);
  const [selectedData, setSelectedData] = useState({
    color: "",
    size: "",
    price: 802,
    filter: false,
  });
  console.log(selectedData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Assuming 6 products per page

  const [getProducts, { data, isSuccess, isLoading }] = useLazyGetUsersQuery();

  // Update selectedData state when filters change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log({ ...selectedData, [e.target.name]: e.target.value });
    setSelectedData({
      ...selectedData,
      filter: false,
      [e.target.name]: e.target.value,
    });

    setSelectedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    window.scroll({
      top: 200,
      behavior: "smooth",
    });
    // Fetch the products with all filters applied
    getProducts({
      selecter: "Man",
      color: selectedData.color,
      size: selectedData.size,
      price: selectedData.price,
      [name]: value, // Update the changed filter
      page: currentPage,
      limit: itemsPerPage,
    });
  };

  // Handle the price slider separately to make sure it's formatted correctly
  const handlePriceChange = (e) => {
    let newPrice = 802;
    newPrice = parseInt(e.target.value);
    console.log(newPrice);
    setSelectedData({ ...selectedData, filter: false, price: 802 });
    setSelectedData((prevState) => ({
      ...prevState,
      price: newPrice,
    }));
    if (currentPage > 2) {
      getProducts({
        selecter: "Man",
        ...selectedData,
        price: newPrice,
        page: currentPage,
        limit: itemsPerPage,
      });
    } else {
      getProducts({
        selecter: "Man",
        ...selectedData,
        price: newPrice,
        page: 1,
        limit: itemsPerPage,
      });
    }
  };

  // Load initial data when the component mounts
  useEffect(() => {
    getProducts({ selecter: "Man", page: currentPage, limit: 6 });
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    window.scroll({
      top: 200,
      behavior: "smooth",
    }); // ReactPaginate uses 0-based indexing
  };
  useEffect(() => {
    // fetchData(); // or dispatch to fetch product
  }, [selectedData]); // whenever page or filters change

  return (
    <>
      {isLoading && <Loader />}
      <div className="lg:px-16  px-3   dark:bg-black overflow-hidden ">
        <div className=" dark:text-white sm:my-3 my-2">
          <Link className=" hover:text-blue-700 font-bold " to="/">
            Home
          </Link>{" "}
          / <Link className="hover:text-blue-700 font-bold">Men</Link>
        </div>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="sm:py-16 py-7 bg-stone-500"
        >
          <h1 className="sm:text-4xl text-2xl font-bold  text-white ps-6">
            MEN
          </h1>
        </motion.div>
      </div>
      <AnimatePresence>
        <motion.div
          key="slide-component"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="your-css-classes dark:bg-black grid grid-cols-12  lg:px-10 md:px-10  w-full sm:ps-4 md:ps-12 pt-7 "
        >
          <div
            className={`md:block ${
              logo
                ? "block z-20 gap-8 dark:bg-black md:col-span-3   ms-3 sm:col-span-12 col-span-12 lg:w-72  md:w-52 md:mx-auto sm:w-11/12 sticky top-0"
                : "hidden md:col-span-3 gap-0   lg:w-72  md:w-52"
            }`}
          >
            {/* Filters */}
            <div className="flex  justify-between  ">
              <p className="font-bold  dark:text-white my-3 underline">
                SHOP BY
              </p>
              {/* <p>Clear Filter</p> */}
              <button
                onClick={(e) => {
                  setSelectedData({
                    ...selectedData,
                    filter: true,
                    price: 802,
                    size: "",
                    color: "",
                  }),
                    getProducts({
                      selecter: "Man",
                      page: currentPage,
                      limit: 6,
                    });
                }}
                className="btn me-2 btn-active btn-sm btn-error text-tran capitalize dark:text-white"
              >
                Clear Filter
              </button>
            </div>
            <p className="dark:text-white">PRICE</p>
            <div className={`${logo ? "w-full " : "md:w-full"}`}>
              <input
                type="range"
                id="priceSlider"
                className="me-2  dark:text-white range range-xs range-accent bg-slate-300 w-full"
                min={169}
                max={802}
                // step={1}
                value={selectedData.filter ? 802 : selectedData.price}
                onChange={handlePriceChange}
                name="price"
              />
              <div className="flex justify-between">
                <p className="font-bold dark:text-white">₹169.00</p>
                <p className="font-bold dark:text-white">
                  ₹{selectedData.price}
                </p>
              </div>
            </div>
            {/* Color Filter */}
            <div className="flex justify-between items-center my-3 ">
              <p className=" dark:text-white font-bold font-serif text-2xl">
                COLOR'S
              </p>
              {logo && (
                <button
                  onClick={(e) => setLogo(false)}
                  className="btn btn-success me-2 dark:text-white btn-sm"
                >
                  Save Changes
                </button>
              )}
            </div>
            <hr />
            <div>
              {[
                "White",
                "Black",
                "Grey",
                "Blue",
                "Brown",
                "Green",
                "Pink",
                "Red",
              ].map((color) => (
                <div className="items-center flex" key={color}>
                  <input
                    // value={color}
                    onChange={handleFilterChange}
                    value={selectedData.filter ? color : color}
                    name="color"
                    type="radio"
                    id="color"
                    className="me-2 checkbox-secondary w-6 h-6 my-2 border-2 cursor-pointer"
                    checked={
                      !selectedData.filter && selectedData.color === color
                    }
                    //   disabled={selectedData.filter}
                  />
                  <label
                    htmlFor={color}
                    className="cursor-pointer dark:text-white"
                  >
                    {color}
                  </label>
                </div>
              ))}
            </div>

            {/* Size Filter */}
            <p className="mt-5 dark:text-white font-bold font-serif text-2xl">
              SIZE
            </p>
            <hr />
            <div>
              {["L", "XL", "M", "S", "X"].map((size) => (
                <div className="items-center flex" key={size}>
                  <input
                    value={selectedData.filter ? size : size}
                    onChange={handleFilterChange}
                    name="size"
                    type="radio"
                    id="size"
                    className="me-2 checkbox-secondary w-6 h-6 my-2 border-2 cursor-pointer"
                    checked={!selectedData.filter && selectedData.size === size}
                  />
                  <label
                    htmlFor={size}
                    className="cursor-pointer dark:text-white"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-9  col-span-12">
            {/* Is Loading Code */}
            {isLoading ? (
              // <Loader />
              <div>Temp Loading</div>
            ) : (
              <div className="grid grid-cols-12 gap-2   sm:gap-5 lg:mx-0 md:mx-8 mx-1 ">
                {data && !logo && data.result.length > 0 ? (
                  <AnimatePresence>
                    {data.result.map((item) => (
                      <motion.div
                        key={item._id}
                        className="sm:col-span-4 col-span-6 dark:text-white"
                        initial={{ opacity: 0, x: 0 }} // Initial state: hidden, shifted down
                        animate={{ opacity: 1, x: 0 }} // Animate to visible and in place
                        exit={{ opacity: 0, x: 0 }} // Exit animation
                        transition={{
                          duration: 1.3, // Smooth transition duration
                          ease: "backIn",
                          // ease: "anticipate"
                        }}
                      >
                        <Link to={`/cart/${item._id}`} className="bg-blue-500">
                          <motion.div
                            className="bg-slate-100 rounded-xl dark:bg-slate-700"
                            style={{ perspective: "1000px" }}
                            whileHover={{ scale: 1.03 }}
                          >
                            {console.log(item.img)}
                            <motion.img
                              src={item.img}
                              alt={item.name}
                              style={{
                                transition: "transform 0.4s",
                                transformStyle: "preserve-3d",
                                filter: "brightness(100%)",
                              }}
                              initial={{ rotateY: 0 }}
                              whileHover={{
                                rotateY: 20,
                                filter: "brightness(90%)",
                              }}
                              transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>

                          <h3 className="font-bold hover:underline">
                            {item.name}
                          </h3>
                          <h3 className="font-bold">₹{item.price}</h3>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-end flex justify-center col-span-12 text-3xl dark:text-white">
                    {!logo && <p>No Product Found</p>}
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {data && !logo && data.totalPages > 1 && (
              <ReactPaginate
                previousLabel={<BsChevronLeft />}
                nextLabel={<BsChevronRight />}
                breakLabel={"..."}
                pageCount={data.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={
                  "flex dark:text-white justify-center space-x-2 mt-4"
                }
                pageClassName={
                  "px-3 py-1 border rounded hover:bg-blue-500 hover:text-white"
                }
                activeClassName={"bg-blue-500  text-white"}
                previousClassName={
                  "px-3  py-2 border rounded hover:bg-blue-500 hover:text-white"
                }
                nextClassName={
                  "px-3 py-2 border rounded hover:bg-blue-500 hover:text-white"
                }
                disabledClassName={"opacity-50 cursor-not-allowed"}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Small screen filter button */}
      <div>
        <div className="fixed bottom-12 z-50 right-1">
          <div
            onClick={() => setLogo(!logo)}
            className="px-2 dark:bg-black dark:text-white py-2 cursor-pointer block md:hidden shadow-lg border-2 rounded-full text-2xl bg-slate-50"
          >
            <BsSliders className="text-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Men;
