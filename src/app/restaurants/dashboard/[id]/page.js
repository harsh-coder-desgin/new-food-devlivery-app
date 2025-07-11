"use client"
import React, { use, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Updatefooditem = (props) => {

  const params = use(props.params);
  const router = useRouter();
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const handleclick = async (e) => {
    e.preventDefault(); 
    if (!food || !price || !image || !description) {
      setError(true)
    } else {
      setError(false)
      let result = await fetch("/api/restaurant/food/edit/" + params.id, {
        method: "PUT",
        body: JSON.stringify({ food, price, image, description })
      });
      result = await result.json();
      if (result) {
        router.push("/restaurants/dashboard");

      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("/api/restaurant/food/edit/" + params.id)
    response = await response.json()
    setFood(response.data.food)
    setPrice(response.data.price)
    setImage(response.data.image)
    setDescription(response.data.description)
  }

  const handleclick2 = () => {
    router.push("/restaurants/dashboard");
  }

  return (
    <>
    <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10 space-y-8
                 sm:p-8 sm:space-y-6">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
    Update Food Item
  </h2>

  {/* Food Name */}
  <div>
    <label htmlFor="food-name" className="block text-gray-700 font-semibold mb-2 text-base sm:text-sm">
      Update Food Name
    </label>
    <input
      id="food-name"
      type="text"
      placeholder="Enter food name"
      value={food}
      onChange={(e) => setFood(e.target.value)}
      className="w-full p-4 sm:p-3 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 text-gray-900 text-lg sm:text-base"
      required
    />
    {error && !food && (
      <p className="mt-1 text-sm text-red-600">Please fill out this field</p>
    )}
  </div>

  {/* Food Price */}
  <div>
    <label htmlFor="food-price" className="block text-gray-700 font-semibold mb-2 text-base sm:text-sm">
      Update Food Price
    </label>
    <input
      id="food-price"
      type="number"
      placeholder="Enter price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full p-4 sm:p-3 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 text-gray-900 text-lg sm:text-base"
      required
    />
    {error && !price && (
      <p className="mt-1 text-sm text-red-600">Please fill out this field</p>
    )}
  </div>

  {/* Image Path */}
  <div>
    <label htmlFor="image-path" className="block text-gray-700 font-semibold mb-2 text-base sm:text-sm">
      Update Image Path
    </label>
    <input
      id="image-path"
      type="text"
      placeholder="Enter image URL"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="w-full p-4 sm:p-3 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 text-gray-900 text-lg sm:text-base"
      required
    />
    {error && !image && (
      <p className="mt-1 text-sm text-red-600">Please fill out this field</p>
    )}
  </div>

  {/* Description */}
  <div>
    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2 text-base sm:text-sm">
      Update Description
    </label>
    <textarea
      id="description"
      placeholder="Enter description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={5}
      className="w-full p-4 sm:p-3 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 text-gray-900 text-lg sm:text-base resize-none"
      required
    ></textarea>
    {error && !description && (
      <p className="mt-1 text-sm text-red-600">Please fill out this field</p>
    )}
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
    <button
      onClick={handleclick}
      type="submit"
      className="w-full  bg-blue-600 text-white py-4 rounded-md font-semibold
                 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
    >
      Update Food
    </button>
    <button
      onClick={handleclick2}
      type="button"
      className="w-full  border border-blue-600 text-blue-600 py-4 rounded-md font-semibold
                 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
    >
      Back to Fooditem List
    </button>
  </div>
</form>

    </>
  )
}



export default Updatefooditem;
