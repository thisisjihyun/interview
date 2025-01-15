import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ManageProducts = () => {
  const navigate = useNavigate();
  const [bicycles, setBicycles] = useState([]);
  const [newBicycle, setNewBicycle] = useState({
    name: "",
    description: "",
    price: "",
    parts: [
      {
        partName: "frameType",
        options: [],
      },
      {
        partName: "frameFinish",
        options: [],
      },
      {
        partName: "wheels",
        options: [],
      },
      {
        partName: "rimColor",
        options: [],
      },
      {
        partName: "chain",
        options: [],
      },
    ],
  });

  // TODO - redundant code
  useEffect(() => {
    fetchBicycles();
  }, [bicycles]);

  const fetchBicycles = async () => {
    const response = await fetch("http://localhost:4000/api/bicycles");
    const data = await response.json();
    setBicycles(data);
  };

  const handleCreate = async () => {
    if (
      !newBicycle.name ||
      !newBicycle.description ||
      !newBicycle.price ||
      !newBicycle.frameType ||
      !newBicycle.frameFinish ||
      !newBicycle.wheels ||
      !newBicycle.rimColor ||
      !newBicycle.chain
    )
      return alert("Please fill in all fields");

    const response = await fetch("http://localhost:4000/api/bicycles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBicycle),
    });
    const data = await response.json();
    setBicycles([...bicycles, data]);
  };

  const handleEdit = (bike) => {
    navigate(`/updateProduct`, { state: { bike, isAdmin: true } });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/bicycles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setBicycles(data);
    } catch (error) {
      console.error("Error deleting bicycle:", error);
    }
  };
  const handlePartChange = (partName, option) => {
    setNewBicycle((prev) => ({
      ...prev,
      parts: prev.parts.map((part) =>
        part.partName === partName
          ? { ...part, options: [{ option, stock: 1 }] }
          : part
      ),
    }));
  };

  return (
    <div>
      <h1>Bicycle Management</h1>
      <div>
        <h2>Add New Bicycle</h2>
        <input
          type="text"
          placeholder="Name"
          value={newBicycle.name}
          onChange={(e) =>
            setNewBicycle({ ...newBicycle, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newBicycle.description}
          onChange={(e) =>
            setNewBicycle({ ...newBicycle, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newBicycle.price}
          onChange={(e) =>
            setNewBicycle({ ...newBicycle, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Frame Type"
          value={newBicycle.frameType}
          onBlur={(e) => handlePartChange("frameType", e.target.value)}
        />
        <input
          type="text"
          placeholder="Frame Finish"
          value={newBicycle.frameFinish}
          onBlur={(e) => handlePartChange("frameFinish", e.target.value)}
        />
        <input
          type="text"
          placeholder="Wheels"
          value={newBicycle.wheels}
          onBlur={(e) => handlePartChange("wheels", e.target.value)}
        />
        <input
          type="text"
          placeholder="Rim Color"
          value={newBicycle.rimColor}
          onBlur={(e) => handlePartChange("rimColor", e.target.value)}
        />
        <input
          type="text"
          placeholder="Chain"
          value={newBicycle.chain}
          onBlur={(e) => handlePartChange("chain", e.target.value)}
        />
        <button onClick={handleCreate}>Add Bicycle</button>
      </div>

      <div>
        <h2>Bicycle List</h2>
        {bicycles?.map((bike) => (
          <div key={bike.id}>
            <h3>{bike.name}</h3>
            <p>{bike.description}</p>
            <p>Price: ${bike.price}</p>
            <div>
              {bike?.parts?.map((part, partIndex) => (
                <div key={partIndex}>
                  <h4>{part.partName}</h4>
                  <ul>
                    {part.options?.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        {option.option} - Stock: {option.stock}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={() => handleEdit(bike)}>Edit</button>
            <button onClick={() => handleDelete(bike.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
