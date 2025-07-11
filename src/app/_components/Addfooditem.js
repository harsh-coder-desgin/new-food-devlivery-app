"use client"

import React, { useState } from 'react'

const Addfooditem = (props) => {
  
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

      let jsonString = localStorage.getItem("restaurantUser");
      let userData = JSON.parse(jsonString);
      let rest_id;

      if (jsonString) {
        rest_id = userData._id

      }
      let response = await fetch("/api/restaurant/food", {
        method: "POST",
        body: JSON.stringify({ food, price, image, description, rest_id })
      })
      response = await response.json()

      if (response.success) {
        props.addasboard(true)
      } else {
        alert("some Erorr")
      }

    }
  }
  return (
    <>
    <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-8 space-y-8
                 sm:p-8">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
    Add Food Item
  </h2>

  {/* Food Name */}
  <div>
    <label htmlFor="food-name" className="block text-gray-700 font-semibold  text-lg sm:text-base">
      Food Name
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
    <label htmlFor="food-price" className="block text-gray-700 font-semibold  text-lg sm:text-base">
      Food Price
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
    <label htmlFor="image-path" className="block text-gray-700 font-semibold  text-lg sm:text-base">
      Image Path
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
    <label htmlFor="description" className="block text-gray-700 font-semibold text-lg sm:text-base">
      Description
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
    />
    {error && !description && (
      <p className="mt-1 text-sm text-red-600">Please fill out this field</p>
    )}
  </div>

  {/* Submit Button */}
  <button
    onClick={handleclick}
    type="submit"
    className="w-full bg-blue-600 text-white py-4 rounded-md font-semibold
               hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
  >
    Add Food
  </button>
</form>

    </>
  )
}



export default Addfooditem;
