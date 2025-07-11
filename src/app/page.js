"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [locations, setLocations] = useState([]);
  const [selectLocation, setSelectLocation] = useState([]);
  const [show, setShow] = useState(false);
  const [displays, setDisplays] = useState([])

  useEffect(() => {
    fetchData();
    restaurantload();
  }, []);

  const fetchData = async () => {
    let response = await fetch("api/customer/locations");
    let result = await response.json();
    setLocations(result.result);
  }

  const restaurantload = async () => {
    let response = await fetch("api/customer");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    setDisplays(result.result)
  }
  const handleListitem = async (item) => {
    setSelectLocation(item);
    let response = await fetch(`/api/customer?location=${item}`);
    let result = await response.json();
    setDisplays(result.result)
    setShow(false);
  }

  const handleInputChange = (event) => {
    setSelectLocation(event.target.value);
  };

  const handleFood = async () => {
    // let response = await fetch("http://localhost:3000/api/customer?restaurant=kfc");
    // let result = await response.json();
    // console.log(result);
    // setDisplays(result.result)
  }

  const handlewrite = async (e) => {
    let response = await fetch(`/api/customer?restaurant=${event.target.value}`);
    let result = await response.json();
    setDisplays(result.result)
  }

  
  return (
    <>
      <CustomerHeader />
      <div>
  {/* Banner Section */}
  <div
    className="w-full h-96 bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=scseGeDCjSghwD2RELSaaT2Pn2NQz0gflEQ4BuiTSjs=')",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold">Welcome to My Restaurant</h1>

        {/* Form Container */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Place Input */}
          <div className="relative w-full md:w-56">
            <input
              type="text"
              value={selectLocation}
              onChange={handleInputChange}
              onClick={() => setShow(true)}
              placeholder="Select Place"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none shadow"
            />
            {show && (
              <ul className="absolute z-10 mt-2 bg-white rounded-lg shadow-md w-full">
                {locations.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleListitem(item)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-black transition-all duration-200 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Food or Restaurant Input */}
          <div className="w-full md:w-80">
            <input
              onChange={handlewrite}
              onClick={handleFood}
              type="text"
              placeholder="Enter Food or Restaurant"
              className="w-full px-4 py-2 rounded-lg text-black focus:outline-none shadow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Restaurant List Section */}
  <div className="max-w-7xl mx-auto p-4 sm:p-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Restaurant List</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displays.map((display, index) => (
        <div
          key={index}
          onClick={() => router.push('explore/' + display.name + "?id=" + display._id)}
          className="cursor-pointer border rounded-xl p-5 bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lg">{display.name}</div>
            <div className="text-sm">Contact:     {display.contact}</div>
          </div>
          <div className="space-y-1 text-sm">
            <div>{display.city}</div>
            <div>{display.address}</div>
            <div>Email :{display.email}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      <Footer />
    </>
  );
}
