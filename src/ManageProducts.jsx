// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {Details} from "./Details";

// const ManageProducts = () => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [bicycles, setBicycles] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && type) {
//       setName("");
//       setType("");
//     }
//     fetch("http://localhost:4000/api/bicycles", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, type }),
//     })
//       .then((response) => response?.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/bicycles")
//       .then((response) => setBicycles(response.data))
//       .catch((error) => console.error("Error fetching bicycles:", error));
//   }, []);

//   return (
//     <div>
//       {/* TODO - Duplicated from Home */}
//       <Details />
//       <h2>List of Bicycles</h2>
//       <ul>
//         {bicycles.map((bike) => (
//           <li key={bike.id}>
//             <h3>{bike.name}</h3>
//             <p>Frame Options: {bike.frameType.join(", ")}</p>
//             <p>Wheels: {bike.wheels.join(", ")}</p>
//             <p>Rims: {bike.rims.join(", ")}</p>
//           </li>
//         ))}
//       </ul>

//       <h2>Add a New Bicycle</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Name:
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Frame Type:
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Frame Finish:
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Wheels:
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Rims:
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Chain:
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Stock:
//             <input
//               type="checkbox"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <button type="submit">Add Bicycle</button>
//       </form>
//     </div>
//   );
// };

// export default ManageProducts;
