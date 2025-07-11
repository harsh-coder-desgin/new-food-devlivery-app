"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const [bills, setBills] = useState([]);
  const [demo, setDemo] = useState('');
  const [charge, setCharge] = useState('');
  const [user, setUser] = useState('');
  const [removecartdata, setremoveCartData] = useState(false)

  useEffect(() => {
    const jsonString = localStorage.getItem("cart");
    const userData = JSON.parse(jsonString);
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

  useEffect(() => {
    const jsonString = localStorage.getItem("user");
    const userDetail = JSON.parse(jsonString);
    setUser(userDetail)
  }, []);

  const handlebill = (price) => {
    if (price) {
      setDemo(price[0])
    }
  }

  const handleplace = async () => {
    let user_Id = JSON.parse(localStorage.getItem('user'))._id;
    let city = JSON.parse(localStorage.getItem('user')).city;
    let cart = JSON.parse(localStorage.getItem('cart'));
    let foodItemIds = cart.map((item) => item._id).toString();
    let deliveryboyResponse = await fetch("/api/deliverypartners/" + city);
    deliveryboyResponse = await deliveryboyResponse.json();
    let deliveryBoysIds = deliveryboyResponse.result.map((item) => item._id);
    let deliveryboy_id = deliveryBoysIds[Math.floor(Math.random() * deliveryBoysIds.length)]
    if (!deliveryboy_id) {
      alert("Delivery Partner Not available")
      return false;
    }
    let rest_id = cart[0].rest_id;
    let collection = {
      user_Id,
      foodItemIds,
      rest_id,
      deliveryboy_id,
      status: 'pending',
      amount: charge,
    }
    let response = await fetch("api/order", {
      method: "POST",
      body: JSON.stringify(collection)
    });
    response = await response.json();
    if (response.success) {
      setremoveCartData(true);
      alert("ORDER DONE");
      router.push('/myprofile')
    } else {
      alert("FAILED");
    }
  }

  return (
    <>
      <CustomerHeader removecartdata={removecartdata} />

      <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-2xl shadow-xl sm:p-8">
  {/* User Details */}
  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">User Details</h2>
    <p className="text-sm text-gray-700 mb-1">👤 Name: <span className="font-medium">{user.name}</span></p>
    <p className="text-sm text-gray-700 mb-1">📞 Phone: <span className="font-medium">{user.moblie}</span></p>
    <p className="text-sm text-gray-700">📍 Address: <span className="font-medium">{user.address}</span></p>
  </div>

  {/* Bill Items */}
  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-800 mb-3">Your Items</h3>
    {bills && bills.map((bill, index) => (
      <div
        key={index}
        className="flex justify-between items-center py-2 px-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <span className="text-sm text-gray-700">{bill.food}</span>
        <span
          className="text-sm text-gray-900 font-medium cursor-pointer"
          onClick={() => handlebill(bill.price)}
        >
          ₹{bill.price}
        </span>
      </div>
    ))}
  </div>

  {/* Bill Summary */}
  <div className="border-t border-gray-300 pt-4 mb-4 space-y-3 text-sm text-gray-800 font-medium">
    <div className="flex justify-between">
      <span>🍽️ Food Charge</span>
      <span>₹{demo}</span>
    </div>
    <div className="flex justify-between">
      <span>🧾 Tax</span>
      <span className="text-teal-600">5%</span>
    </div>
    <div className="flex justify-between">
      <span>🚚 Delivery Charge</span>
      <span className="text-teal-600">₹100</span>
    </div>
  </div>

  {/* Total Amount */}
  <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-6">
    <span>💰 Total Amount</span>
    <span className="text-teal-700 text-base">₹{charge}</span>
  </div>

  {/* Payment Method */}
  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
    <h2 className="text-md font-semibold text-gray-800 mb-2">Payment Method</h2>
    <span className="inline-block px-4 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
      Cash on Delivery
    </span>
  </div>

  {/* Thank You Message */}
  <div className="text-center text-xs text-gray-500 mb-6">
    🙏 Thank you for dining with us!
  </div>

  {/* Order Button */}
  <div className="text-center">
    <button
      className="w-full py-3 px-5 bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      onClick={handleplace}
    >
      Place Your Order Now
    </button>
  </div>
</div>

      <Footer />
    </>
  );
};

export default Page;



