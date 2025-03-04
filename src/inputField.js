import React from "react";

const InputField = ({ label, inputType, options, value, onChange }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log(`Input changed: ${inputValue}`); // Debugging

    if (inputType === "boolean") {
      onChange(inputValue === "true"); // Convert to boolean
    } else {
      onChange(inputValue); // Pass the value directly
    }
  };

  const handleCheckboxChange = (e) => {
    onChange(e.target.checked);
  };

  const renderInput = () => {
    switch (inputType) {
      case "boolean":
        return (
          <select value={value} onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "enum":
        return (
          <select value={value} onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "text":
        return <textarea value={value} onChange={handleChange} />;
      case "integer":
        return (
          <input
            type="text" // Use text input to handle numeric values
            value={value}
            onChange={handleChange}
            inputMode="numeric" // Show numeric keyboard on mobile devices
            pattern="[0-9]*" // Allow only numbers
          />
        );
      case "string":
      default:
        return <input type="text" value={value} onChange={handleChange} />;
    }
  };

  return (
    <div>
      <label>{label}</label>
      {renderInput()}
    </div>
  );
};

export default InputField;
