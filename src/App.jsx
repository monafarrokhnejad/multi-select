import React from "react";
import MultiSelect from "./components/MultiSelect";
import { defaultOptions } from "./components/data";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <MultiSelect
        defaultOptions={defaultOptions}
        placeholder="Choose or add options"
        position="bottom"
      />
    </div>
  );
};

export default App;
