'use client'

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();
  const [myorders, setMyOrders] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const userstorage = JSON.parse(localStorage.getItem('user'))
    let result = await fetch("/api/order?id=" + userstorage._id);
    result = await result.json();

    if (result.success) {
      setMyOrders(result.result);
    }
  }

  return (
    <>
      <CustomerHeader />
      <div className="min-h-screen py-8 px-4  flex justify-center">
  <div className="w-full max-w-2xl space-y-6">
    {myorders.map((item, index) => (
      <div
        key={index}
        className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl p-5 border border-gray-200"
      >
        <div className="space-y-2">
          <h1 className="text-lg font-bold text-gray-800">{item.data.name}</h1>

          <div className="text-sm text-gray-700">
            💰 <span className="font-medium">Amount:</span>{' '}
            <span className="text-green-600 font-semibold">₹{item.amount}</span>
          </div>

          <div className="text-sm text-gray-600">
            🏠 <span className="font-medium">Address:</span> {item.data.address}
          </div>

          <div className="text-sm">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === 'Delivered'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </>
  );
}
export default Page;
