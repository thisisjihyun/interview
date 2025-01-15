import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bike } = location.state || {};

  const [updatedData, setUpdatedData] = useState(bike || {});

  useEffect(() => {
    if (bike) {
      setUpdatedData(bike);
    }
  }, [bike]);

  const handleInputChange = (partName, option, field, value) => {
    setUpdatedData((prev) => {
      const updatedParts = prev.parts.map((part) => {
        if (part.partName === partName) {
          const updatedOptions = part.options.map((opt) => {
            if (opt.option === option) {
              return { ...opt, [field]: value };
            }
            return opt;
          });
          return { ...part, options: updatedOptions };
        }
        return part;
      });

      return { ...prev, parts: updatedParts };
    });
  };

  const handleNameChange = (e, field) => {
    setUpdatedData({ ...updatedData, [field]: e.target.value });
  };

  const handleSave = async () => {
    if (!updatedData.id) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/bicycles/${updatedData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      navigate("/products");
    } catch (error) {
      console.error("Error updating bicycle:", error);
    }
  };

  if (!updatedData.name) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Update Bicycle Options</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={updatedData.name}
          onChange={(e) => handleNameChange(e, "name")}
        />
        <label>Description:</label>
        <input
          type="text"
          value={updatedData.description}
          onChange={(e) => handleNameChange(e, "description")}
        />
        <label>Price:</label>
        <input
          type="number"
          value={updatedData.price}
          onChange={(e) => handleNameChange(e, "price")}
        />

        {updatedData?.parts?.map((part) => (
          <div key={part.partName}>
            <h3>{part.partName}</h3>
            {part.options.map((option) => (
              <div key={option.option}>
                <div>
                  <label>Option Name:</label>
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) =>
                      handleInputChange(
                        part.partName,
                        option.option,
                        "option",
                        e.target.value
                      )
                    }
                    placeholder="Option Name"
                  />
                </div>
                <div>
                  <label>Stock:</label>
                  <input
                    type="number"
                    value={option.stock}
                    onChange={(e) =>
                      handleInputChange(
                        part.partName,
                        option.option,
                        "stock",
                        e.target.value
                      )
                    }
                    placeholder="Stock"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default UpdateProduct;
