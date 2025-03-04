import React from "react";
import PolicyForm from "./PolicyForm";
import sample from "./data/sample.json";

const App = () => {
  const policyData = sample;

  return (
    <div>
      <h1>Policy Settings</h1>
      <PolicyForm policyData={policyData} />
    </div>
  );
};

export default App;
