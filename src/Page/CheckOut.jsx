import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { TbTruckDelivery } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useAddOrderMutation,
  useLazyGetCartQuery,
  useLazyRemovecartQuery,
} from "../redux/userApi";
import Order from "./Order";
import { toast } from "react-toastify";
import Loader from "./Loader";

const CheckOut = () => {
  const [addOrder, { isSuccess, isLoading }] = useAddOrderMutation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState();
  const [payoption, setPayoption] = useState(false);
  const [submitdata, setSubmitdata] = useState();
  const { auth } = useSelector((state) => state.user);
  const [CartData, { data }] = useLazyGetCartQuery();
  const subtotal =
    data &&
    data.reduce((sum, item) => {
      const total = item.price * item.qut;
      return sum + total;
    }, 0);
  const totalPrice = subtotal && subtotal;
  console.log(data);

  const formik = useFormik({
    initialValues: {
      // email: '',
      fullName: "",
      telephone: "",
      address: "",
      city: "",
      country: "",
      pincode: "",
      postcode: "",
    },
    validationSchema: Yup.object({
      // Define validation rules using Yup
      // Example:
      // email: Yup.string().required('Required'),
      fullName: Yup.string().required("Required"),
      telephone: Yup.string()
        .required("Mobile number is required")
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      pincode: Yup.string()
        .required("Required")
        .min(6, "must be 6 Characters")
        .max(6),
      postcode: Yup.string()
        .required("Required")
        .min(6, "must be 6 Characters")
        .max(6),
    }),
    onSubmit: (values) => {
      // Handle form submission
      setSubmitdata(true);
      console.log([values, data]);
      setOrderData([values, { data }]);
    },
  });
  useEffect(() => {
    // if (isSuccess) {
    //     toast.success("Product Remove Success")
    //     CartData({ logerId: auth._id })
    // }
    CartData({ logerId: auth._id });
  }, []);

  // formik code
  // console.log(data);
  const FilterPrice = data && data.map((item) => item);
  const totalQuantity =
    FilterPrice &&
    FilterPrice.reduce((total, item) => {
      return total + +item.qut;
    }, 0);
  // const totalPrice = FilterPrice && FilterPrice.reduce((total, item) => {
  //     return total + +item.price;
  // }, 0);
  // const subtotal = data && data.reduce((sum, item) => {
  //     const total = item.price * item.proqut.qut;
  //     return sum + total;
  // }, 0);
  // console.log(FilterPrice)

  console.log(payoption);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Your Order is Success");
      navigate("/histroy");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="px-2 dark:bg-gray-900 dark:text-white">
        <div className="py-4">
          <Link className="text-blue-500 mx-1 " to="/">
            Home /
          </Link>
          <Link className=" mx-1">Checkout</Link>
          <Link>.....</Link>
        </div>
        {true ? (
          <div className=" md:flex    ">
            <form
              onSubmit={formik.handleSubmit}
              className="md:w-1/2 sm:p-4 p-1"
            >
              <div className=" ">
                <p>Contact information/ Shipment</p>
                <h4 className="text-2xl font-bold mt-3">Contact information</h4>

                <p className="my-5 text-2xl">Shipping Address</p>
                <div className="flex gap-3 my-3">
                  <div>
                    <label htmlFor="">
                      FullName <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      name="fullName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                      type="text"
                      placeholder="Full Name"
                      className="  dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <div className="text-red-500">
                        {formik.errors.fullName}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">
                      Telephone{" "}
                      <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      name="telephone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.telephone}
                      type="number"
                      placeholder="Enter Telephone Number"
                      className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                    />
                    {formik.touched.telephone && formik.errors.telephone ? (
                      <div className="text-red-500">
                        {formik.errors.telephone}
                      </div>
                    ) : null}
                  </div>
                </div>
                <label htmlFor="">
                  Address <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  type="text"
                  placeholder="Enter Your Address"
                  className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500">{formik.errors.address}</div>
                ) : null}
                <label htmlFor="">
                  City <span className="text-red-600 font-bold mt-3">*</span>
                </label>
                <input
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  type="text"
                  placeholder="Enter Your City"
                  className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-500">{formik.errors.city}</div>
                ) : null}
                <label htmlFor="">
                  Country <span className="text-red-600 font-bold mt-3">*</span>
                </label>
                <input
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  type="text"
                  placeholder="Enter Your Country"
                  className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                />
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-red-500">{formik.errors.country}</div>
                ) : null}
                <div className="flex gap-3 my-3">
                  <div>
                    <label htmlFor="">
                      PinCode{" "}
                      <span className="text-red-600 font-bold mt-3">*</span>
                    </label>
                    <input
                      name="pincode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pincode}
                      type="number"
                      placeholder="Enter Your PinCode"
                      className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                    />
                    {formik.touched.pincode && formik.errors.pincode ? (
                      <div className="text-red-500">
                        {formik.errors.pincode}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="">
                      PostCode{" "}
                      <span className="text-red-600 font-bold mt-3">*</span>
                    </label>
                    <input
                      name="postcode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.postcode}
                      type="number"
                      placeholder="Enter Your PostCode"
                      className=" dark:bg-slate-500 mt-2 input input-bordered w-full ps-3 h-12 hover:border-blue-700 border-black border"
                    />
                    {formik.touched.postcode && formik.errors.postcode ? (
                      <div className="text-red-500">
                        {formik.errors.postcode}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="text-end my-7">
                  <button
                    type="submit"
                    className="btn btn-primary bg-slate-800 px-7 text-white py-3"
                  >
                    Bye Product
                  </button>
                </div>
              </div>
            </form>
            <div className="w-1/2 p-4 hidden md:block">
              <table className="table md:w-full w-full  ">
                {/* head */}
                <thead>
                  <tr className="text-left  border dark:border-black border-b-8 px-6">
                    <th className=" font-normal "></th>
                    <th className=" font-normal "></th>
                    <th className=" font-normal "></th>
                    {/* <th className=' font-normal text-center'>Categiry</th> */}
                    <th className=" font-normal "></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data &&
                    data.map((item) => (
                      <>
                        <tr className="border dark:border-black border-b-8 px-6  text-xs">
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask  w-24 h-1w-24 relative">
                                  <img
                                    src={`${item.img}`}
                                    className="border dark:bg-gray-700 dark:border-black"
                                  />
                                  <div className="w-5 absolute top-0 right-0">
                                    <div className="text-center text-xs bg-slate-400 rounded-lg text-white">
                                      {" "}
                                      {item.qut}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                                <div className="text-md ">
                                  Color: {item.color}
                                </div>
                                <div className="text-md ">
                                  Size: {item.size}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">₹{item.price}</div>
                          </td>

                          <th>
                            <p className=" btn-xs">
                              ₹{(item.qut * +item.price).toFixed(2)}
                            </p>
                          </th>
                        </tr>
                      </>
                    ))}
                </tbody>
                <tr className="border border-black     text-xs  w-full      ">
                  <div className="flex justify-between my-3 w-full ms-12">
                    <div className="text-center">Sub Total</div>
                    <div className="text-center">{totalQuantity} items</div>
                    <div className="text-center">
                      ₹{subtotal && subtotal.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between my-3 w-full ms-12">
                    <div className="text-center">Tax</div>
                    <div className="text-center">₹0.00</div>
                  </div>
                  <div className="flex justify-between my-3 w-full ms-12">
                    <div className="text-center">Discount</div>
                    <div className="text-center">₹0.00</div>
                  </div>
                  <nphr />
                  <div className="flex justify-between my-3 w-full ms-12">
                    <div className="text-center font-bold text-xl">Total</div>
                    <div className="text-center font-bold text-xl">
                      ₹{subtotal && subtotal.toFixed(2)}
                    </div>
                  </div>
                  <hr />
                </tr>
                <hr />
                <footer></footer>
                {/* foot */}
              </table>
            </div>
          </div>
        ) : (
          <>
            <h1>
              {" "}
              <div class="flex space-x-2 justify-center mx-auto items-center bg-white h-screen dark:invert">
                <span class="sr-only">Loading...</span>
                <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
              </div>
            </h1>
          </>
        )}
        {/* modal */}
        {/* <button id="openModalButton" onClick={e => setSubmitdata(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Open Modal
        </button> */}
        <div
          class={`z-10 ${!submitdata ? "hidden" : "relative"}`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 transition-transform transform scale-100 max-h-screen overflow-y-auto">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6">
                  Choose Payment Option
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4">
                {/* RazorPay Option */}
                <label
                  htmlFor="radio-1"
                  className={`cursor-pointer w-full  sm:w-1/2 border-2 border-indigo-500 rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col items-center ${
                    payoption && "bg-blue-700 border-blue-900"
                  }`}
                >
                  <BsCashCoin size={100} className="dark:text-white" />
                  <input
                    onChange={() => setPayoption(true)}
                    type="radio"
                    id="radio-1"
                    name="payment-option"
                    className="hidden"
                  />
                  <span className="text-lg font-semibold dark:text-white pt-2 text-indigo-600">
                    RazorPay
                  </span>
                </label>

                {/* COD Option */}
                <label
                  htmlFor="radio-2"
                  className={`cursor-pointer w-full  sm:w-1/2 border-2 border-indigo-500 rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col items-center ${
                    !payoption && "bg-blue-700 border-blue-900"
                  }`}
                >
                  <TbTruckDelivery size={100} className="dark:text-white" />
                  <input
                    onChange={() => setPayoption(false)}
                    type="radio"
                    id="radio-2"
                    name="payment-option"
                    className="hidden"
                  />
                  <span className="text-lg font-semibold dark:text-white pt-2 text-indigo-600">
                    Cash On Delivery
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSubmitdata(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md shadow-md transition duration-300"
                >
                  Close
                </button>

                {payoption ? (
                  <button
                    type="button"
                    onClick={() => navigate("/order", { state: { orderData } })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition duration-300"
                  >
                    Pay
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addOrder(data)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition duration-300"
                  >
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
