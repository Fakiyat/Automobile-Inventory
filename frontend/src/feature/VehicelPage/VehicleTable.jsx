import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Style/VehicleTable.css";
import DropDown from "@/shared/components/dropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Switch } from "@mui/material";

const VehicleTable = ({ activeTab, vehicles, setVehicles }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Search filterings ,  Stores what the user types in the search box.
  const [selectedRows, setSelectedRows] = useState([]); // it helps to track the selected rows, it stores the ids of the vehicles that are selected
  const [selectAll, setSelectAll] = useState(false); //it helps to track "Select All" checkboxes
  const [showAddForm, setShowAddForm] = useState(false); // this is for the form when we click to add vehicle, its is set to be false so it will now be showing form all the time
  const [editingVehicle, setEditingVehicle] = useState(null); //To track Editing
  const [displayedVehicles, setDisplayedVehicles] = useState([]); // ,Stores the vehicles currently shown in the table.
  const [page, setPage] = useState(0); // Tracks Pagination for lazy loading,,Tracks which page of records we are on (used for lazy loading).
  const [loading, setLoading] = useState(true); // prevents duplicate fetching of data  (avoids multiple API calls).
  const [errorMessage, setErrorMessage] = useState(""); // this error messae is for the purpose if the data is not fetchted it will show the error
  const itemsPerPage = 20; // Number of items to load per page

  const [searchParams] = useSearchParams(); // Reads sorting parameters from URL
  const sortBy = searchParams.get("sort") || "id"; // Determines which column to sort by (default is "id").
  const sortOrder = searchParams.get("order") || "ascending"; //Determines sorting order (asc or desc).
};

// ------------------------------------Getting data from api using Fetch-----------------///---------------------------------------------//

const fetchVehicles = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/inventory/master-inventory/",
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json(); // this is for the data(results) to be in json format

    // Important fix - check if data is an array or has results property
    if (Array.isArray(data)) {
      setVehicle(data);
    } else if (data.results && Array.isArray(data.results)) {
      setVehicle(data.results);
    } else {
      console.error("Unexpected Api response format", data);
      setErrorMessage("Unexpected data format from api");
    }

    setLoading(false);
  } catch (error) {
    console.error("Error fetching vehicles", error.message);
    setErrorMessage(error.message);
    setLoading(false);
  }
};

//-------------------------------------Fetch Vehicles whem the component loads-----------------///---------------------------------------------//
useEffect(() => {
  fetchVehicles();
}, []); /// dependency is an array []

///------------------------------------Load more vehicles (lazy loading)------------------------------------

const loadMoreVehicles = () => {
  if (!fetchVehicles.length) return; // Prevent running if no data is loaded yet

  setLoading(true);

  setTimeout(() => {
    const nextPage = page + 1;
    const endIndex = nextPage * itemsPerPage;

    // Load more items from the vehicles array
    setDisplayedVehicles(vehicles.slice(0, endIndex));

    setPage(nextPage);

    setLoading(false);
  }, 400); // simulate delay
};

//---------------------------// Initialize displayed vehicles when vehicles data is loaded------------------------------------
useEffect(() => {
  if (vehicles.length > 0) {
    // Initially display first page of vehicles
    setDisplayedVehicles(vehicles.slice(0, itemsPerPage));
    setPage(1);
  }
}, [vehicles]);

//////////////-----------------------------------------// Detect scroll to load more records------------------------------------------
useEffect(() => {
  const handleScroll = () => {
    // Check if we're near the bottom of the page
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      displayedVehicles.length < vehicles.length // Only load more if there are more to load
    ) {
      loadMoreVehicles();
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Cleanup - remove event listener
  return () => window.removeEventListener("scroll", handleScroll);
}, [loading, displayedVehicles, vehicles]);

//---------------------------------Load Initial Data on component Mount--------------------------------------------------------------//

useEffect(() => {
  if (vehicles.length > 0 && displayedVehicles.length === 0) {
    loadMoreVehicles();
  }
}, [vehicles]);

//-------------------------------------------------New Vehicel useState---------------------------

const [newVehicle, setNewVehicle] = useState({
  brand: "",
  model: "",
  price: "",
  transmission: "",
  fuel_type: "",
  year: "",
  status: "In Stock",
  images: "",
  imgFile: null,
});

// Handle Select All checkbox-----------------------------------------------------------------------------------------

function handleSelecAll() {
  if (selectAll) {
    setSelectedRows([]);
  } else {
    const allVehicleIds = filteredVehicles.map((vehicle) => vehicle.id);
    setSelectedRows(allVehicleIds);
  }
  setSelectAll(!selectAll); // toggle the select all state(true to false, false to true).
}

// Handle Individual checkbox clicks---------------------------------------------------------------------------

export default VehicleTable;
