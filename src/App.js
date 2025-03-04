import React from "react";
import { Container, Typography } from "@mui/material"; // Add Typography import
import PolicyForm from "./PolicyForm";
import sample from "./data/sample.json";

const App = () => {
  const policyData = sample;

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Policy Settings
      </Typography>
      <PolicyForm policyData={policyData} />
    </Container>
  );
};

export default App;
