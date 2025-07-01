import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDeleteProductMutation, useGetProductQuery } from '../redux/Productapi'
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import {
  useLazyGetCartQuery,
  useLazyGetUserCartQuery,
  useLazyRemovecartQuery,
} from "../redux/userApi";
import { useSelector } from "react-redux";

const ShopingCart = () => {
  const { auth } = useSelector((state) => state.user);
  const [CartData, { data, isSuccess: datagetSuccess }] = useLazyGetCartQuery();
  console.log(data);
  const [removecart, { isSuccess }] = useLazyRemovecartQuery();
  const subtotal =
    data &&
    data.reduce((sum, item) => {
      const total = item.price * item.qut;
      return sum + total;
    }, 0);
  console.log(subtotal);

  const navigate = useNavigate();

  const [getCartPro, { data: UserData, isError, error }] =
    useLazyGetUserCartQuery();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Remove Success");
      CartData({ logerId: auth._id });
    }
    CartData({ logerId: auth._id });
  }, [isSuccess]);

  return (
    <div className="dark:bg-black h-screen md:h-full">
      <div className="lg:px-24 mx-8  ">
        <div className="py-3">
          <Link to="/" className="text-blue-700 ">
            Home
          </Link>
          <Link className="text-neutral    cursor-text dark:text-gray-400 ">
            {" "}
            / Shopping cart{" "}
          </Link>
        </div>
      </div>

      {auth ? (
        data && data.length != 0 ? (
          <div className="h-[50vh]">
            <div className="flex md:flex-row flex-col dark:bg-black">
              <div class="  relative  dark:bg-gray-500 overflow-x-auto md:w-[65%] md:ms-16 shadow-md sm:rounded-lg">
                <table className="w-full h-80 dark:text-white  text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      {/* Show QUANTITY and Total columns only on medium and larger screens */}
                      <th className="hidden md:table-cell px-6 py-3">
                        QUANTITY
                      </th>
                      <th className="hidden md:table-cell px-6 py-3">Total</th>
                      {/* <th scope="col" className="px-6 py-3">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          key={item.id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-2 text-gray-900 font-normal whitespace-nowrap "
                          >
                            <div className="flex dark:text-white gap-3">
                              <img
                                src={`  ${item.img}`}
                                className="w-44 h-44 dark:bg-slate-700 bg-slate-100"
                                alt=""
                              />
                              <div>
                                <p className="my-1  font-bold text-[15px]">
                                  {item.name}
                                </p>
                                <p className="my-1">Color : {item.color}</p>
                                <p className="my-1">Size : {item.size}</p>
                                <p className="my-1">Cat : {item.category}</p>
                                <button
                                  className="my-1 underline italic text-[15px]"
                                  onClick={(e) => removecart(item.ProId)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </th>
                          <td className="px-6 py-4">₹{item.price}</td>
                          {/* Show QUANTITY and Total columns only on medium and larger screens */}
                          <td className="hidden md:table-cell px-6 py-4">
                            {item.qut}
                          </td>
                          <td className="hidden md:table-cell px-6 py-4">
                            ₹{(item.price * item.qut).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="ms-4  md:w-[25%] dark:bg-slate-800  ">
                <div className="border-1 dark:text-white p-2">
                  <h2 className="text-xl dark:text-slate-200 font-bold mb-3">
                    Order summary
                  </h2>
                  <div className="flex justify-between ">
                    <p>Sub Total</p>
                    <p>₹{subtotal && subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="font-bold"> Total</p>
                    <p>₹{subtotal && subtotal.toFixed(2)}</p>
                  </div>
                  <div className="mb-3 italic font-sans">
                    &#40;Inclusive of tax ₹0.00&#41;
                  </div>
                  <button
                    className="btn bg-slate-800 text-white hover:bg-green-900"
                    onClick={(e) => navigate("/checkout")}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="dark:text-white text-4xl md:text-7xl text-center">
              No Product found
            </p>
            <Link type="button" class="btn w-30 mt-9 btn-primary" to="/">
              Back Home
            </Link>
          </div>
        )
      ) : (
        <div className="flex  justify-center my-24">
          <div className="text-center dark:text-white">
            <h1 className="text-3xl font-bold ">Shopping cart</h1>
            <p className="text-1xl my-6">Your cart is empty!</p>
            <button
              className="text-2xl sm:btn-md btn btn-success btn-md text-white"
              onClick={(e) => navigate("/Men")}
            >
              CONTINUE SHOPPING <BsArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopingCart;
