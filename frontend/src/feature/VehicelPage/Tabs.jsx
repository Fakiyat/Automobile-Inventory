import React from "react";
import "./Style/Tabs.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  const leftTabs = [
    "All",
    "In Stock",
    "To Order",
    "Browse",
    "Pricing",
    "Advertising",
    "Latest",
    "Overage",
  ];

  const rightTabs = ["For Sale", "Reserved"];

  return (
    <div className="tabs-container">
      {/* Left side tabs */}
      <div className="tabs-left">
        {leftTabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* right side tabs */}
      <div className="tabs-right">
        {rightTabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
