import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  useAddOrderMutation,
  useLazyGetCartQuery,
  useLazyRemovecartQuery,
} from "../redux/userApi";
import Order from "./Order";
import { toast } from "react-toastify";

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
    <div className="px-5 dark:bg-gray-900 dark:text-white">
      <div className="py-4">
        <Link className="text-blue-500 mx-1 " to="/">
          Home /
        </Link>
        <Link className=" mx-1">Checkout</Link>
        <Link>.....</Link>
      </div>
      {true ? (
        <div className=" md:flex    ">
          <form onSubmit={formik.handleSubmit} className="md:w-1/2 p-4">
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
                    <div className="text-red-500">{formik.errors.fullName}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="">
                    Telephone <span className="text-red-600 font-bold">*</span>
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
                    <div className="text-red-500">{formik.errors.pincode}</div>
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
                    <div className="text-red-500">{formik.errors.postcode}</div>
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
                              <div className="text-md ">Size: {item.size}</div>
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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left w-full mx-auto">
                    <div className="flex justify-center"></div>
                    <div class="flex justify-center   ">
                      <h1 className="text-3xl font-bold text-indigo-600">
                        Payment Option
                      </h1>
                      {/* <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                                            <path fill="currentColor"
                                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                            </path>
                                        </svg> */}
                    </div>
                    <div className="flex justify-between dark:bg-slate-800">
                      <div className="my-6 w-[50%]">
                        <img
                          className="h-32 w-full"
                          src="data:image/png;base64,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"
                          alt=""
                        />
                        <input
                          onChange={(e) => setPayoption(true)}
                          type="radio"
                          id="radio-1"
                          name="radio-1"
                          className="radio radio-primary  "
                        />
                        <label htmlFor="radio-1" className="p-2  text-2xl">
                          RazorPay
                        </label>
                      </div>
                      <div className="my-6 w-[50%]">
                        <img
                          className="h-32 w-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUGUF_c53BOG-qECe5Z3hLDLGM9kQDlLXuYg&s"
                          alt=""
                        />
                        <input
                          onChange={(e) => setPayoption(false)}
                          type="radio"
                          id="radio-2"
                          name="radio-1"
                          className="radio radio-primary "
                        />
                        <label htmlFor="radio-2" className="p-2  text-2xl">
                          Cash On Delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-slate-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="mx-2 mt-3 inline-flex w-full justify-center rounded-md  px-3 bg-red-500 hover:bg-red-600 bg py-2 text-sm font-semibold border-none  shadow-sm ring-1 ring-inset hover:ring-white sm:mt-0 sm:w-auto"
                  onClick={(e) => setSubmitdata(false)}
                >
                  Close
                </button>
                {/* <button type="button" class="mx-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={e => navigate("/order")}>{payoption ? "Pay" : "Order"}</button> */}
                <div className="">
                  {!payoption ? (
                    <button
                      type="button"
                      className="mx-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 hover:ring-white ring-1 sm:w-auto"
                      onClick={() => addOrder(data && data)} // Navigate and send totalPrice
                    >
                      Order
                    </button>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="mx-2 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 hover:ring-white ring-1 sm:w-auto"
                        onClick={() =>
                          navigate("/order", { state: { orderData } })
                        } // Navigate and send totalPrice
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
