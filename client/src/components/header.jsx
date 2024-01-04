import React, { useState } from "react";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Additional logic if needed
  };

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <h2>ค้นหาที่เที่ยว</h2>
      <form style={{ textAlign: "center" }}>
        <input
          type="text"
          id="fname"
          name="fname"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="ค้นหาที่เที่ยว,ค้นหาที่เที่ยว,ค้นหาที่เที่ยว,ค้นหาที่เที่ยว,ค้นหาที่เที่ยว"
          style={{ border: "none", width: "90%", textAlign: "center" }}
        />
      </form>
    </div>
  );
}

export default Header;
