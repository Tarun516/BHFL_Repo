import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:3000/bfhl", parsedInput);
      setResponse(res.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response) {
        // Server error
        setError("An error occurred on the server.");
      } else if (error.request) {
        // Network error
        setError("Network error. Please try again.");
      } else if (error instanceof SyntaxError) {
        // JSON parse error
        setError("Invalid JSON input. Please enter a valid JSON.");
      } else {
        // General error
        setError("An error occurred while processing the request.");
      }
      console.error("Error:", error);
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setFilter((prev) => {
      const newFilter = checked
        ? [...prev, value]
        : prev.filter((item) => item !== value);
      console.log("Updated filter:", newFilter);
      return newFilter;
    });
  };

  const renderResponse = () => {
    if (!response) return null;

    // Ensure response is processed and filtered only after submission
    let filteredResponse = {};

    if (filter.includes("Alphabets")) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (filter.includes("Numbers")) {
      filteredResponse.numbers = response.numbers;
    }
    if (filter.includes("Highest Alphabet")) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    if (filter.length === 0) {
      filteredResponse = {
        alphabets: response.alphabets,
        numbers: response.numbers,
        highest_alphabet: response.highest_alphabet,
      };
    }

    return (
      <div>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>
            <ul>
              {Array.isArray(value) ? (
                value.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>{value}</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Input</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON input"
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        <input
          type="checkbox"
          value="Alphabets"
          onChange={handleFilterChange}
        />
        Alphabets
      </label>
      <label>
        <input type="checkbox" value="Numbers" onChange={handleFilterChange} />
        Numbers
      </label>
      <label>
        <input
          type="checkbox"
          value="Highest Alphabet"
          onChange={handleFilterChange}
        />
        Highest Alphabet
      </label>
      <div>{renderResponse()}</div>
    </div>
  );
}

export default App;
