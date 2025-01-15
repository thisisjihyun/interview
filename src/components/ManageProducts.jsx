import React, { useState, useEffect } from "react";

const App = () => {
  const [bicycles, setBicycles] = useState([]);
  // TODO - can it be combined?
  const [newBicycle, setNewBicycle] = useState({
    name: "",
    frameType: [],
    frameFinish: [],
    wheels: [],
    rims: [],
    chain: [],
    stock: false,
  });
  const [selectedBicycle, setSelectedBicycle] = useState(null);

  // TODO - redundant code
  useEffect(() => {
    fetchBicycles();
  }, []);

  const fetchBicycles = async () => {
    const response = await fetch("http://localhost:4000/api/bicycles");
    const data = await response.json();
    setBicycles(data);
  };

  const addBicycle = async () => {
    if (
      !newBicycle.name ||
      !newBicycle.frameType ||
      !newBicycle.frameFinish ||
      !newBicycle.wheels ||
      !newBicycle.rims ||
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

  const deleteBicycle = async (id) => {
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
          placeholder="Frame Type"
          value={newBicycle.frameType}
          onChange={(e) =>
            setNewBicycle({
              ...newBicycle,
              frameType: [...newBicycle.frameType, e.target.value],
            })
          }
        />
        <input
          type="text"
          placeholder="Frame Finish"
          value={newBicycle.frameFinish}
          onChange={(e) =>
            setNewBicycle({
              ...newBicycle,
              frameFinish: [...newBicycle.frameFinish, e.target.value],
            })
          }
        />
        <input
          type="text"
          placeholder="Wheels"
          value={newBicycle.wheels}
          onChange={(e) =>
            setNewBicycle({
              ...newBicycle,
              wheels: [...newBicycle.wheels, e.target.value],
            })
          }
        />
        <input
          type="text"
          placeholder="Rims"
          value={newBicycle.rims}
          onChange={(e) =>
            setNewBicycle({
              ...newBicycle,
              rims: [...newBicycle.rims, e.target.value],
            })
          }
        />
        <input
          type="text"
          placeholder="Chain"
          value={newBicycle.chain}
          onChange={(e) =>
            setNewBicycle({
              ...newBicycle,
              chain: e.target.value,
              chain: [...newBicycle.chain, e.target.value],
            })
          }
        />
        <label>Stock</label>
        <input
          type="checkbox"
          placeholder="Stock"
          value={newBicycle.stock}
          onChange={(e) =>
            setNewBicycle({ ...newBicycle, stock: e.target.value })
          }
        />
        <button onClick={addBicycle}>Add Bicycle</button>
      </div>

      <div>
        <h2>Bicycle List</h2>
        {bicycles.map((bike) => (
          <div key={bike.id}>
            <h3>{bike.name}</h3>
            <button onClick={() => deleteBicycle(bike.id)}>Delete</button>
            {selectedBicycle?.id === bike.id && (
              <div>
                <h4>Configurations</h4>
                <ul>
                  {bike.configurations.map((config, index) => (
                    <li key={index}>
                      {config.characteristic}: {config.options.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
