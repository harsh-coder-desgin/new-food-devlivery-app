"use client"

import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Deliverydashboard = () => {
  const router = useRouter();

  const [myorders, setMyOrders] = useState([]);
  const [status, setstatus] = useState('');


  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const deliverydata = JSON.parse(localStorage.getItem('delivery'))

    if (deliverydata) {
      let result = await fetch("/api/deliverypartners/orders/" + deliverydata._id);
      result = await result.json();

      if (result.success) {
        setMyOrders(result.result);
      }
    }
  }

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'))
    if (!delivery) {
      router.push('/deliverypartner')
    }
  })

  return (
    <>
      <DeliveryHeader />
<h1 className="text-3xl font-bold text-center text-gray-800 p-6">
  Delivery Partner Dashboard
</h1>

<div className="min-h-screen py-8 px-4  flex justify-center">
  <div className="w-full max-w-2xl space-y-6">
    {myorders.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">No delivery tasks assigned.</div>
    ) : (
      myorders.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push('/orderstatus/' + item.id)}
          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl p-5 border border-gray-200 cursor-pointer"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-800">📦 {item.data.name}</h1>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    item.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'On the Way'
                      ? 'bg-blue-100 text-blue-700'
                      : item.status === 'Failed'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
              >
                {item.status}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              💸 <span className="font-medium">Amount:</span>{' '}
              <span className="text-green-600 font-semibold">₹{item.amount}</span>
            </div>

            <div className="text-sm text-gray-700">
              🏠 <span className="font-medium">Deliver To:</span> {item.data.address}
            </div>



            <div className="text-sm text-gray-600">
              🛵 <span className="font-medium">Status:</span>{' '}
              {item.status === 'Delivered'
                ? '✅ Delivered'
                : item.status === 'on the way'
                ? '🚚 On the Way'
                : item.status === 'Failed'
                ? '❌ Failed'
                : '🕒 Pending'}
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </>
  )
}
export default Deliverydashboard;