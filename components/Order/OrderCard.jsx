import React from "react";
import moment from "moment";
import "moment/locale/th";
moment.locale("th");
import Link from "next/link";
import { generateSlug } from "@/lib/generateSlug";

export default function OrderCard({ order }) {
  const subTotal = order?.orderItems.reduce((total, currentItem) => {
    return total + currentItem.price * currentItem.quantity;
  }, 0);
  return (
    <li className="overflow-hidden dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-md">
      <div className="lg:flex">
        <div className="w-full border-b border-gray-200 dark:border-slate-800 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50 dark:bg-slate-900">
          <div className="px-4 py-6 sm:p-6 lg:p-8">
            {/* grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1 */}
            <div className="grid gap-6 ">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Order Number
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-50 mt-0.5">
                  #{order.orderNumber}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-50 mt-0.5">
                  {moment(order.createdAt).format("L")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Amount
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-50 mt-0.5">
                  {subTotal.toLocaleString()} ฿
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Order Status
                </p>
                <div className="mt-0.5 flex items-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                    <svg
                      className="w-2 h-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-slate-50">
                    {" "}
                    {order.orderStatus}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
          <ul className="space-y-7">
            {order.orderItems.length > 0
              ? order.orderItems.map((item, i) => {
                const slug = generateSlug(item.title)
                  return (
                    <li key={i} className="relative flex pb-10 sm:pb-0">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover rounded-lg w-28 h-28"
                          src={item.imageUrl}
                          alt={item.title}
                        />
                      </div>

                      <div className="flex flex-col justify-between flex-1 ml-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-x-5">
                          <div>
                            <p className="text-base font-bold text-gray-900 dark:text-slate-50">
                              {item.title}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:text-center">
                            <p className="text-sm font-medium text-gray-500">
                              {item.quantity.toLocaleString()}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0">
                            <p className="text-base font-bold text-left text-gray-900 dark:text-slate-50 sm:text-right">
                              {item.price.toLocaleString()} ฿
                            </p>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 sm:relative">
                          <div className="flex space-x-5">
                            <Link
                              href={`/products/${slug}`}
                              title={item.title}
                              className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 dark:hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              View Product{" "}
                            </Link>

                            <span className="text-gray-500 "> | </span>

                            <a
                              href="#"
                              title=""
                              className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 dark:hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              Similar Product{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              : ""}
          </ul>

          <hr className="mt-8 border-gray-200 dark:border-gray-800" />

          <div className="flex items-center mt-8 space-x-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 dark:bg-black dark:text-slate-50 dark:hover:text-slate-50  transition-all bg-white border border-gray-300 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:hover:bg-gray-900  hover:bg-gray-100"
            >
              View Order
            </button>

            <Link
              href={`/dashboard/orders/${order.id}/invoice`}
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900  dark:bg-black dark:text-slate-50 dark:hover:text-slate-50  transition-all bg-white border border-gray-300 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:hover:bg-gray-900  hover:bg-gray-100"
            >
              View Invoice
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
