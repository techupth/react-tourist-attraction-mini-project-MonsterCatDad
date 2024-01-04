import "./App.css";
import React, { useState } from "react";
import Header from "./components/header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Header searchQuery={searchQuery} />
    </>
  );
}

export default App;
