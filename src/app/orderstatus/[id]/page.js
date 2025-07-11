"use client"

import { use, useEffect, useState } from "react"; 

const Orderstatus = (props) => {
    const [status, setstatus] = useState('')
    const params = use(props.params);
    let name = params.id; 

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
        let response = await fetch("/api/deliverypartners/status/" + name);
        let result = await response.json();
        if (response) {
            setstatus(result.result.status)
        }
    }

    const updatedata1 = async () => {
        const newStatus = "on the way"; 
        setstatus(newStatus); 

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }), 
        });

        let result = await response.json();
    };

    const updatedata2 = async () => {
        const newStatus = "Failed";
        setstatus(newStatus);

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        let result = await response.json();
    };

    const updatedata3 = async () => {
        const newStatus = "Delivered";
        setstatus(newStatus);

        let response = await fetch(`/api/deliverypartners/status/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        let result = await response.json();
    };


    return (
        <>
          <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
  <div className="w-full max-w-xl space-y-6">

    {/* Title and Status */}
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
        🚚 Current Order Status
      </h1>
      <span
        className={`text-lg font-semibold text-white px-4 py-2 rounded-lg shadow-md text-center
          ${
            status === "on the way"
              ? "bg-blue-500"
              : status === "Failed"
              ? "bg-red-500"
              : status === "Delivered"
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
      >
        {status || "Loading..."}
      </span>
    </div>

    {/* Buttons */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={updatedata1}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          🚚 On the Way
        </button>

        <button
          onClick={updatedata2}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
        >
          ❌ Failed
        </button>

        <button
          onClick={updatedata3}
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
        >
          ✅ Delivered
        </button>
      </div>
    </div>

  </div>
</div>

        </>
    )
}
export default Orderstatus;