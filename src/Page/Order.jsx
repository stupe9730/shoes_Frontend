import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddOrderMutation, useLazyGetCartQuery } from "../redux/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Order = () => {
  const [addOrder] = useAddOrderMutation();
  const [CartData, { data }] = useLazyGetCartQuery();
  const { auth } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};

  // Fetch cart data
  useEffect(() => {
    if (auth?._id) {
      CartData({ logerId: auth._id });
    }
  }, [auth, CartData]);

  // Calculate subtotal in paise
  const subtotalRupees =
    Array.isArray(data) &&
    data.reduce((sum, item) => {
      const total = Number(item.price) * Number(item.qut);
      return sum + total;
    }, 0);

  const subtotal = subtotalRupees * 100; // Razorpay expects paise

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const handlePayment = () => {
      const apiKey = import.meta.env.VITE_RAZORPAY_API_KEY;

      const options = {
        key: apiKey || "rzp_test_2DjeWoTh0kuBp7",
        amount: subtotal,
        currency: "INR",
        name: auth?.name || "Test User",
        description: "Test Transaction",
        handler: (response) => {
          console.log("Payment successful:", response);

          // Save order
          addOrder(data || []);

          // Show success
          toast.success("Payment Successful");

          // Navigate to history page
          navigate("/histroy");
        },
        prefill: {
          contact: "7498187088",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };

    loadRazorpayScript().then(() => {
      if (subtotal > 0) handlePayment();
      else toast.error("Invalid subtotal value");
    });
  }, [subtotal, data, auth, addOrder, navigate]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <a
              href="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
