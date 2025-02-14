"use client";
import { makePostRequest } from "@/lib/apiRequest";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";
import { ChevronLeft, CircleChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSummaryForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart);
  // const subTotal = cartItems.reduce((total, currentItem) => {
  //   return total + currentItem.salePrice * currentItem.qty;
  // }, 0);
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const handlePrevious = () => {
    // update the currentStep
    dispatch(setCurrentStep(currentStep - 1));
  };

  const router = useRouter();

  const submitData = async (e) => {
    e.preventDefault();
    //  orderItems = cartItems;
    const data = {
      orderItems: cartItems,
      checkoutFormData,
    };
    console.log(data.orderItems);
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json()
      if (response.ok) {
        toast.success(`New Order Created Successfully`);
        setLoading(false);
        router.push(`/order-confirmation/${responseData.id}`);

      } else {
        toast.error("Something Went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className=" text-xl font-semibold mb-4">Order Summary</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-left  text-black dark:text-gray-300 border-gray-400 dark:border-slate-700">
              <th>Title</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((cartItem, i) => (
              <tr
                key={i}
                className=" hover:bg-gray-200 dark:hover:bg-gray-700 duration-200 border-b border-gray-400 dark:border-slate-700 py-3 my-4 font-semibold text-sm "
              >
                <td className="flex items-center">
                  <Image
                    src={cartItem.imageUrl}
                    width={100}
                    height={100}
                    alt="123"
                    className="rounded-xl w-20 h-20"
                  />
                  <div className="ml-2 sm:ml-6">
                    <h2 className="font-bold">{cartItem.title}</h2>
                  </div>
                </td>

                <td className="">
                  <p className="">{cartItem.qty}</p>
                </td>

                <td className="">
                  <h4>{cartItem.salePrice.toLocaleString()} ฿</h4>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center w-full ">
        <button onClick={handlePrevious} type="button" className="btn">
          <ChevronLeft />
          <span className=" uppercase">Previous</span>
        </button>

        {loading ? (
          <button type="button" disabled className="btn btn-active   ">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>{" "}
            Processing Please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            type="button"
            className="btn btn-active uppercase  "
          >
            Proceed to Payment
            <CircleChevronDown className="text-yellow-300" />
          </button>
        )}
      </div>
    </div>
  );
}
