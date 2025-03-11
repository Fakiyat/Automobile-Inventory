import React, { useState } from "react";
import Navbar from "../Navbar-Inventory/Navbar";
import Tabs from "../VehicelPage/Tabs";
import VehicleTable from "../VehicelPage/VehicleTable";
import Logout from "../Logout/Logout";
import Data from "../VehicelPage/Data";

function InventoryPage() {
  const [activeTab, setActiveTab] = useState("All"); // putting All there will by default have pressed the All ta button
  const [vehicles, setVehicles] = useState(Data);
  return (
    <div>
      <nav className="navbar">
        <Navbar />
        <Logout />
      </nav>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* activeTab - Tells Tabs which tab is currently selected (so Tabs can highlight the active tab).*/}
      {/*setActiveTab - Allows the Tabs component to change the active tab when you click a button.*/}
      {/* Pass vehicles and setVehicles to VehicleTable */}
      <VehicleTable
        activeTab={activeTab}
        vehicles={vehicles}
        setVehicles={setVehicles}
      />
      {/*VehicleTable only shows vehicles that match activeTab.*/}
      <footer className="footer-home">
        <p>© 2025 Auto Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default InventoryPage;
