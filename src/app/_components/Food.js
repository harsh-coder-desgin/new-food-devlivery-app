
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Food = (props) => {

    const router = useRouter();

    const [names, setNames] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let jsonString = localStorage.getItem("restaurantUser");

        let userData = JSON.parse(jsonString);
        let rest_id;

        if (jsonString) {
            rest_id = userData._id
        }
        let response = await fetch("/api/restaurant/food/" + rest_id);
        let result = await response.json();

        if (result.data) {
            setNames(result.data);
        } else {
            setNames([]);
        }
    };

    const Deletefood = async (_id) => {
        let response = await fetch("/api/restaurant/food/" + _id, {
            method: "delete",
        });
        response = await response.json();
        if (response) {
            fetchData();
        }
    }
    const handleEdit = (_id) => {
        router.push(`/restaurants/dashboard/${_id}`);
    };

    return (
       <div className="overflow-x-auto p-4">
  <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
    <thead>
      <tr className="bg-gray-100 text-gray-700 uppercase text-sm sm:text-base">
        <th className="py-3 px-6 border-b text-left">Image</th>
        <th className="py-3 px-6 border-b text-left">Food Name</th>
        <th className="py-3 px-6 border-b text-left">Price</th>
        <th className="py-3 px-6 border-b text-left hidden sm:table-cell">Description</th>
        <th className="py-3 px-6 border-b text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {names.map(name => (
        <tr
          key={name._id}
          className="border-b hover:bg-blue-50 transition-colors duration-200"
        >
          <td className="py-3 px-6">
            <img
              src={name.image}
              alt={name.food}
              className="w-16 h-16 object-cover rounded-md shadow-sm"
            />
          </td>
          <td className="py-3 px-6 font-medium text-gray-800">{name.food}</td>
          <td className="py-3 px-6 text-gray-700"> ₹{name.price}</td>
          <td className="py-3 px-6 text-gray-600 hidden sm:table-cell max-w-xs truncate" title={name.description}>
            {name.description}
          </td>
          <td className="py-3 px-6 flex space-x-3">
            <button
              onClick={() => handleEdit(name._id)}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400
                         text-white px-3 py-1 rounded-md text-sm sm:text-base transition"
            >
              Edit
            </button>
            <button
              onClick={() => Deletefood(name._id)}
              className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400
                         text-white px-3 py-1 rounded-md text-sm sm:text-base transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    );
}

export default Food;



