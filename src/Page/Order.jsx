import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddOrderMutation, useLazyGetCartQuery } from "../redux/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { TbFaceIdError } from "react-icons/tb";

const Order = () => {
  const [addOrder] = useAddOrderMutation();
  const [CartData, { data: cartItems, isLoading }] = useLazyGetCartQuery();
  const { auth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [razorLoading, setRazorLoading] = useState(false);
  const [paymentDismissed, setPaymentDismissed] = useState(false); // <-- new state

  // Fetch cart
  useEffect(() => {
    if (auth?._id) {
      CartData({ logerId: auth._id });
    }
  }, [auth, CartData]);

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject("Failed to load Razorpay SDK");
      document.body.appendChild(script);
    });
  };

  // Calculate subtotal (in paise)
  const subtotal =
    Array.isArray(cartItems) &&
    cartItems.reduce((sum, item) => sum + item.price * item.qut, 0) * 100;

  useEffect(() => {
    if (!auth?._id || !cartItems || cartItems.length === 0) return;

    const startPayment = async () => {
      try {
        setRazorLoading(true);
        const loaded = await loadRazorpayScript();
        if (!loaded) throw new Error("Razorpay SDK load failed");

        const rzp = new window.Razorpay({
          key:
            import.meta.env.VITE_RAZORPAY_API_KEY || "rzp_test_2DjeWoTh0kuBp7",
          amount: subtotal,
          currency: "INR",
          name: auth.name || "Test User",
          description: "Product Purchase",
          handler: async (response) => {
            console.log("Payment success:", response);
            await addOrder(cartItems);
            toast.success("Payment Successful");
            navigate("/histroy");
          },
          prefill: {
            name: auth.name,
            contact: "7498187088",
          },
          theme: {
            color: "#6366f1",
          },
          modal: {
            ondismiss: () => {
              console.log("Payment popup closed by user");
              toast.info("Payment cancelled");
              setPaymentDismissed(true); // Show return button
            },
          },
        });

        rzp.open();
      } catch (err) {
        console.error("Payment error:", err);
        toast.error("Payment initialization failed");
      } finally {
        setRazorLoading(false);
      }
    };

    if (subtotal > 0) {
      startPayment();
    } else {
      toast.error("Invalid subtotal");
    }
  }, [subtotal, cartItems, auth, addOrder, navigate]);

  return (
    <>
      {(isLoading || razorLoading) && <Loader />}
      {paymentDismissed && (
        <div className="bg-gray-100 h-screen">
          <div className="flex justify-center bg-white">
            <TbFaceIdError className="text-center " size={100} />
          </div>
          <div className="bg-white p-6 md:mx-auto">
            <div className="text-center w-full">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Cancelled
              </h3>
              <p className="text-gray-600 my-2">
                You exited the payment. Please try again.
              </p>
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
      )}
    </>
  );
};

export default Order;
