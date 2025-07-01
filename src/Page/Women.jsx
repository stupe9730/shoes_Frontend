import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight, BsSliders } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useLazyGetUsersQuery } from "../redux/userApi";
import ReactPaginate from "react-paginate";
import { PiWebhooksLogo } from "react-icons/pi";

const Women = () => {
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
    setSelectedData({
      ...selectedData,
      filter: false,
      [e.target.name]: e.target.value,
    });

    console.log(value);

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
      selecter: "Women",
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
        selecter: "Women",
        ...selectedData,
        price: newPrice,
        page: currentPage,
        limit: itemsPerPage,
      });
    } else {
      getProducts({
        selecter: "Women",
        ...selectedData,
        price: newPrice,
        page: 1,
        limit: itemsPerPage,
      });
    }
  };

  // Load initial data when the component mounts
  useEffect(() => {
    getProducts({ selecter: "Women", page: currentPage, limit: 6 });
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // ReactPaginate uses 0-based indexing
  };
  useEffect(() => {
    // fetchData(); // or dispatch to fetch product
  }, [selectedData]); // whenever page or filters change

  return (
    <>
      <div className="lg:px-24 px-8 dark:bg-black overflow-hidden ">
        <div className="py-3 dark:text-white">
          <Link className=" hover:text-blue-700 font-bold " to="/">
            Home
          </Link>{" "}
          / <Link className="hover:text-blue-700 font-bold">Women</Link>
        </div>
        <motion.div
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="py-16 bg-stone-500"
        >
          <h1 className="text-4xl font-bold text-white ps-6">Women</h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ x: "-19px", opacity: 0, overflow: "hidden" }}
        animate={{ x: "-30px", opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="dark:bg-black overflow-hidden   grid grid-cols-12 lg:px-24 md:px-10 p-0 sm:ps-4 md:ps-12 pt-7 w-[100vw] relative"
      >
        <div
          className={`md:block ${
            logo
              ? "block z-20 gap-8 dark:bg-black md:col-span-3 ms-12  sm:col-span-12 col-span-12 lg:w-72 md:w-52 md:mx-auto sm:w-11/12 bg-white sticky top-0"
              : "hidden md:col-span-3 gap-0 lg:w-72  md:w-52"
          }`}
        >
          {/* Filters */}
          <div className="flex justify-between">
            <p className="font-bold dark:text-white my-3 underline">SHOP BY</p>
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
                    selecter: "Women",
                    page: currentPage,
                    limit: 6,
                  });
              }}
              className="btn btn-active btn-sm btn-error text-tran capitalize text-white"
            >
              Clear Filter
            </button>
          </div>
          <p className="dark:text-white">PRICE</p>
          <div className={`${logo ? "w-96 md:w-52" : "md:w-52"}`}>
            <input
              type="range"
              id="priceSlider"
              className="me-2 dark:text-white checkbox-secondary w-full"
              min={169}
              max={802}
              // step={1}
              value={selectedData.filter ? 802 : selectedData.price}
              onChange={handlePriceChange}
              name="price"
            />
            <div className="flex justify-between">
              <p className="font-bold dark:text-white">₹169.00</p>
              <p className="font-bold dark:text-white">₹{selectedData.price}</p>
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
                className="btn btn-neutral btn-sm"
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
                  id={color}
                  className="me-2 checkbox-secondary w-6 h-6 my-2 border-2 cursor-pointer"
                  checked={!selectedData.filter && selectedData.color === color}
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
                  value={selectedData.filter ? "" : size}
                  onChange={handleFilterChange}
                  name="size"
                  type="radio"
                  id={size}
                  className="me-2 checkbox-secondary w-6 h-6 my-2 border-2 cursor-pointer"
                  checked={
                    selectedData.filter ? "" : selectedData.size === size
                  }
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

        <div className="md:col-span-9 col-span-12">
          {/* Is Loading Code */}
          {isLoading ? (
            <h1>
              <div class="flex  space-x-2 justify-center flex-col items-center bg-white h-screen dark:invert">
                <motion.div
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                >
                  <PiWebhooksLogo className="text-8xl text-blue-600" />
                </motion.div>
                <div className="flex space-x-2 justify-center items-center my-5 ">
                  <span class="sr-only">Loading...</span>
                  <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
                </div>
              </div>
            </h1>
          ) : (
            <div className="grid grid-cols-12  gap-5  lg:mx-0 md:mx-8 me-5">
              {data && !logo && data.result.length > 0 ? (
                <AnimatePresence>
                  {data.result.map((item) => (
                    <motion.div
                      key={item._id}
                      className="sm:col-span-4 col-span-6 dark:text-white"
                      initial={{ opacity: 0, x: -10 }} // Initial state: hidden, shifted down
                      animate={{ opacity: 1, x: 50 }} // Animate to visible and in place
                      exit={{ opacity: 0, x: 0 }} // Exit animation
                      transition={{
                        duration: 1.3, // Smooth transition duration
                        ease: "backIn",
                        // ease: "anticipate"
                      }}
                    >
                      <Link to={`/cart/${item._id}`} className="bg-blue-500">
                        <motion.div
                          className="bg-slate-100 dark:bg-slate-700"
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

      {/* Small screen filter button */}
      <div>
        <div className="fixed bottom-2 z-50 left-7">
          <div
            onClick={() => setLogo(!logo)}
            className="px-2 py-2 cursor-pointer block md:hidden shadow-lg border-2 rounded-full text-2xl bg-slate-50"
          >
            <BsSliders />
          </div>
        </div>
      </div>
    </>
  );
};

export default Women;
