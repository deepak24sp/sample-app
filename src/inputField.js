import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  FormControlLabel,
} from "@mui/material";

const InputField = ({ label, inputType, options, value, onChange }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // For boolean dropdown, convert string value back to boolean
    if (inputType === "boolean") {
      onChange(inputValue === "true");
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={handleChange} label={label}>
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "enum":
        return (
          <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={handleChange} label={label}>
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "text":
        return (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
          />
        );
      case "integer":
        return (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={handleChange}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            variant="outlined"
          />
        );
      case "string":
      default:
        return (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={handleChange}
            variant="outlined"
          />
        );
    }
  };

  return <div style={{ marginBottom: "16px" }}>{renderInput()}</div>;
};

export default InputField;
