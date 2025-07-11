"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const [fooditems, setFooditems] = useState([]);
  const [bills, setBills] = useState([]);
  const [demo, setDemo] = useState('');
  const [charge, setCharge] = useState('');

  useEffect(() => {
    const jsonString = localStorage.getItem("cart");
    const userData = JSON.parse(jsonString);
    setFooditems(userData);
    setBills(userData);
    if (!userData) {
      router.push('/')
    } else {

      let totalPrice = userData.reduce((acc, item) => acc + item.price, 0);

      if (totalPrice) {
        setDemo(totalPrice);
        const Tax = 0.05;
        const taxAmount = totalPrice * Tax;
        const final = totalPrice + taxAmount
        const delivery = 100
        const payment = final + delivery
        setCharge(payment);
      }
    }
  }, []); 

  const handlebill = (price) => {
    if (price) {
      setDemo(price[0])
    }
  }

  const handleorder = () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      router.push('/order')
    } else {
      router.push('/user-auth?order=true')
    }
  }

  return (
    <>
      <CustomerHeader />
     <div className="max-w-6xl mx-auto px-4 py-8">
  {/* Food Items */}
  <div className="grid gap-8 md:grid-cols-2">
    {fooditems && fooditems.map((item) => (
      <div
        key={item._id}
        className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-4 border-b-4 border-orange-500"
      >
        <img
          className="w-full sm:w-32 h-32 object-cover rounded-md shadow"
          src={item.image}
          alt={item.food}
        />
        <div className="sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-800">{item.food}</h2>
          <p className="text-lg text-green-600 font-bold mt-1">₹{item.price}</p>
          <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Billing Card */}
  <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
    {bills && bills.map((bill, index) => (
      <div key={index} className="flex justify-between mb-4 text-sm">
        <span className="text-gray-600">{bill.food}</span>
        <span
          className="text-gray-800 cursor-pointer hover:text-teal-600 transition"
          onClick={() => handlebill(bill.price)}
        >
          ₹{bill.price}
        </span>
      </div>
    ))}

    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>Food Charge</span>
        <span>₹{demo}</span>
      </div>
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>Tax</span>
        <span className="text-teal-600">5%</span>
      </div>
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>Delivery</span>
        <span className="text-teal-600">₹100</span>
      </div>
    </div>

    <div className="flex justify-between mb-4 text-sm font-semibold text-gray-800 border-t pt-4">
      <span>Total Amount</span>
      <span className="text-teal-600">₹{charge}</span>
    </div>

    <p className="text-center text-xs text-gray-500 mt-4">
      Thank you for dining with us!
    </p>

    <div className="mt-6">
      <button
        className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
        onClick={handleorder}
      >
        Place Order
      </button>
    </div>
  </div>
</div>

      <Footer />
    </>
  );
};

export default Page;



