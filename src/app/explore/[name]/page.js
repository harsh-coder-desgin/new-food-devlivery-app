"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { use } from "react";

const Page = (props) => {

  const params = use(props.params);
  const searchParams = use(props.searchParams);
  let name = params.name;
  let mainid = searchParams.id;

  const [details, setDetails] = useState("");
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState();
  const [cartStorage, setCartStorage] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [cartIds, setCartIds] = useState(() => cartStorage ? cartStorage.map(item => item._id) : []);
  const [removecart, setremoveCart] = useState()

  useEffect(() => {
    loadDetails();
  }, []);


  const loadDetails = async () => {
    let response = await fetch("/api/customer/" + mainid);
    let result = await response.json(); 
    setDetails(result.detail);
    setFoods(result.fooditems);
  };

  const handlecart = (item) => {
    setCart(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setremoveCart();
  };

  const removeFromcart = (id) => {
    setremoveCart(id);
    var localIds = cartIds.filter(item => item != id);
    setCart();
    setCartIds(localIds)
  }
  
  return (
    <>
      <CustomerHeader cart={cart} removecart={removecart} />
     {/* Banner with Overlay */}
<div
  className="relative w-full bg-cover bg-center h-96"
  style={{
    backgroundImage:
      "url('https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=scseGeDCjSghwD2RELSaaT2Pn2NQz0gflEQ4BuiTSjs=')",
  }}
>
  <div className="absolute inset-0 bg-black opacity-60"></div>

  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl md:text-5xl font-bold text-center">{decodeURI(name)}</h1>
  </div>
</div>

{/* Restaurant Info Bar */}
<div className="flex flex-col md:flex-row flex-wrap bg-orange-500 text-white p-4 gap-4 md:gap-8 justify-around">
  <div className="flex items-center space-x-2">
    <span className="font-semibold">Contact:</span>
    <span>{details.contact}</span>
  </div>
  <div className="flex items-center space-x-2">
    <span className="font-semibold">City:</span>
    <span>{details.city}</span>
  </div>
  <div className="flex items-center space-x-2">
    <span className="font-semibold">Address:</span>
    <span>{details.address}</span>
  </div>
  <div className="flex items-center space-x-2">
    <span className="font-semibold">Email:</span>
    <span>{details.email}</span>
  </div>
</div>

{/* Food Items List */}
<div className="max-w-6xl mx-auto px-4 py-8">
  {foods.length > 0 ? (
    foods.map((item) => (
      <div
        key={item._id}
        className="flex flex-col md:flex-row items-center gap-6 border-b border-orange-400 pb-6 mb-6"
      >
        <img
          className="w-full md:w-40 h-40 object-cover rounded-md shadow"
          src={item.image}
          alt={item.food}
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{item.food}</h2>
          <p className="text-xl text-green-600 font-semibold mt-1">₹{item.price}</p>
          <p className="text-gray-600 mt-2">{item.description}</p>

          {cartIds.includes(item._id) ? (
            <button
              className="mt-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              onClick={() => removeFromcart(item._id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition"
              onClick={() => handlecart(item)}
            >
              Order Now
            </button>
          )}
        </div>
      </div>
    ))
  ) : (
    <h1 className="text-center text-2xl font-semibold text-gray-700">No Food Added</h1>
  )}
</div>

    </>
  );
};

export default Page;
