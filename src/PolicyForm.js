import React, { useState } from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import InputField from './inputField';

const PolicyForm = ({ policyData }) => {
  // State to store form data
  const [formData, setFormData] = useState({});

  // Helper function to get options for enum types
  const getEnumOptions = (enumType, enumData) => {
    const enumDefinition = enumData.find((e) => e.name === enumType);
    if (!enumDefinition) return [];
    return enumDefinition.value.map((val) => ({
      label: val.name,
      value: val.number.toString(),
    }));
  };

  // Helper function to get options for boolean fields
  const getBooleanOptions = (fieldDescriptions, fieldName) => {
    const fieldDescription = fieldDescriptions.find(
      (desc) => desc.field === fieldName
    );

    if (!fieldDescription || !fieldDescription.knownValueDescriptions) {
      return [
        { label: 'True', value: 'true' },
        { label: 'False', value: 'false' },
      ];
    }

    return fieldDescription.knownValueDescriptions.map((desc) => ({
      label: desc.description,
      value: desc.value,
    }));
  };

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    console.log(`Updating ${fieldName} to:`, value); // Debugging
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Handle form submission for a specific policy
  const handlePolicySubmit = (policy, e) => {
    e.preventDefault();
    console.log('Policy Data Submitted:', policy.name, formData);
    // You can add your submission logic here (e.g., API call)
  };

  // Render the form based on the policy data
  const renderForm = () => {
    if (!policyData || !policyData.length) return null;

    return policyData
      .filter((policy) => policy.definition) // Filter out items without a definition
      .map((policy, index) => {
        const { messageType, enumType } = policy.definition;

        // Defensive check: Ensure messageType exists
        if (!messageType) {
          console.warn(`Policy at index ${index} has no messageType.`);
          return null;
        }

        const { fieldDescriptions } = policy;

        return (
          <Paper key={policy.name} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h5" gutterBottom>
              {policy.name}
            </Typography>
            <form onSubmit={(e) => handlePolicySubmit(policy, e)}>
              {messageType.map((message) => {
                return message.field.map((field) => {
                  const fieldDescription = fieldDescriptions.find(
                    (desc) => desc.field === field.name
                  );

                  let inputType;
                  let options = [];

                  switch (field.type) {
                    case 'TYPE_BOOL':
                      inputType = 'boolean';
                      options = getBooleanOptions(fieldDescriptions, field.name);
                      break;
                    case 'TYPE_ENUM':
                      inputType = 'enum';
                      options = getEnumOptions(field.typeName, enumType);
                      break;
                    case 'TYPE_INT64':
                      inputType = 'integer'; // Use the new integer type
                      break;
                    default:
                      inputType = 'string';
                      break;
                  }

                  // Set default value for integer fields
                  if (inputType === 'integer' && formData[field.name] === undefined) {
                    formData[field.name] = '0'; // Default value for integer fields
                  }

                  return (
                    <Box key={`${field.name}-${index}`} mb={2}>
                      <InputField
                        label={fieldDescription?.name || field.name}
                        inputType={inputType}
                        options={options}
                        value={formData[field.name] || ''} // Default to empty string if undefined
                        onChange={(value) => handleInputChange(field.name, value)}
                      />
                    </Box>
                  );
                });
              })}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Paper>
        );
      });
  };

  return <div>{renderForm()}</div>;
};

export default PolicyForm;