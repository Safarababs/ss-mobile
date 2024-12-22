import React, { useState } from "react";
import RealmeModels from "./models/Realme/RealmeModels";
import VivoModels from "./models/Vivo/VivoModels";
import OppoModels from "./models/Oppo/OppoModels";
import iPhoneModels from "./models/iPhone/iPhoneModels";

const TemperedGlass = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const inventory = [
    ...RealmeModels,
    ...VivoModels,
    ...OppoModels,
    ...iPhoneModels,
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const foundItem = inventory.find(
      (item) => item.model.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundItem) {
      setResult(foundItem);
      setSuggestion("");
    } else {
      const compatibleModels = inventory.filter((item) =>
        item.compatibleModels.includes(searchTerm)
      );

      if (compatibleModels.length > 0) {
        const realme5 = compatibleModels.find(
          (item) => item.model === "Realme 5"
        );
        if (realme5) {
          setSuggestion(`You can apply the Realme 5 model.`);
        }
        setResult({ compatibleModels });
      } else {
        setResult(null);
        setSuggestion("");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter model name"
        />
        <button type="submit">Search</button>
      </form>
      {result && (
        <div>
          {result.location ? (
            <div>
              <p>Location: {result.location}</p>
              <p>Quantity: {result.quantity}</p>
              <p>Sale Price: ${result.salePrice}</p>
            </div>
          ) : (
            <div>
              <p>Compatible Models:</p>
              <ul>
                {result.compatibleModels.map((model) => (
                  <li key={model.code}>{model.model}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {suggestion && <p>{suggestion}</p>}
    </div>
  );
};

export default TemperedGlass;
