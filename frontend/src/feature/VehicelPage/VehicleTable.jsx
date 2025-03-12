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
  //   const itemsPerPage = 30; // Number of items to load per page

  const [searchParams] = useSearchParams(); // Reads sorting parameters from URL
  const sortBy = searchParams.get("sort") || "id"; // Determines which column to sort by (default is "id").
  const sortOrder = searchParams.get("order") || "ascending"; //Determines sorting order (asc or desc).

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
        setVehicles(data);
      } else if (data.results && Array.isArray(data.results)) {
        setVehicles(data.results);
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
    if (!vehicles.length) return; // Prevent running if no data is loaded yet
    setLoading(true);
    setTimeout(() => {
      setDisplayedVehicles(vehicles.slice(0, page * 6));
      setPage(page + 1); // Increase page count
      setLoading(false);
    }, 300); // simulate delay
  };

  //---------------------------// Initialize displayed vehicles when vehicles data is loaded------------------------------------
  //   useEffect(() => {
  //     if (vehicles.length > 0) {
  //       // Initially display first page of vehicles
  //       setDisplayedVehicles(vehicles.slice(0, itemsPerPage));
  //       setPage(1);
  //     }
  //   }, [vehicles]);

  //////////////-----------------------------------------// Detect scroll to load more records------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
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

  function handleSelectAll() {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allVehicleIds = filteredVehicles.map((vehicle) => vehicle.id);
      setSelectedRows(allVehicleIds);
    }
    setSelectAll(!selectAll); // toggle the select all state(true to false, false to true).
  }

  // Handle Individual checkbox clicks---------------------------------------------------------------------------

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) => {
      let updatedRows;
      //.includes(id) checks if the vehicle’s id is already in the selectedRows array.
      if (prevSelectedRows.includes(id)) {
        //unselect (remove from array)
        updatedRows = prevSelectedRows.filter((rowid) => rowid !== id);
      } else {
        // select (add to array)
        updatedRows = [...prevSelectedRows, id]; //[...prevSelectedRows, id] creates a new array with all previously selected rows + the new id.
      }
      if (updatedRows.length === filteredVehicles.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return updatedRows;
    });
  };

  // Handle Form input change---------------------------------------------------------

  function handleFormChange(event) {
    const { name, value } = event.target;
    setNewVehicle({ ...newVehicle, [name]: value }); // setNewVehicle() updates the newVehicle state.//Updates the corresponding field (name, model, price, etc.) in newVehicle.
  }

  //Adding neew Vehicle to the List// And Editing popup-------------------------------------------------------------------------

  const handleSaveVehicle = async () => {
    if (editingVehicle) {
      // Update existing vehicle (edit case)

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/inventory/master-inventory/${editingVehicle.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newVehicle),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update Vehicles");
        }

        setVehicles(
          vehicles.map((vehicle) =>
            vehicle.id === editingVehicle.id
              ? { ...newVehicle, id: editingVehicle.id }
              : vehicle
          )
        );
        // console.log(editingVehicle);

        setEditingVehicle(null); // Exit edit mode

        setShowAddForm(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      //Add new vehicle(Add Case)

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/inventory/master-inventory/`,

          {
            method: "POST",
            headers: {
              "Content-Type": " application/json",
            },
            body: JSON.stringify(newVehicle),
          }
        );

        if (!response.ok) {
          throw new Error("failed to add Vehicel");
        }

        const savedVehicle = await response.json();

        setVehicles([...vehicles, savedVehicle]);

        setShowAddForm(false);
      } catch (error) {
        setErrorMessage(error.message);
      }

      ResetForm();
    }
    // console.log(newVehicle);
  };

  //--------------------------------------Resets the form after every submission-------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------

  const ResetForm = () => {
    setNewVehicle({
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
  };

  //--------------------------------------Handle Editing Row-------------------------------------------------------------------------------------//-------------------------------------------------------------------------------------
  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle({ ...vehicle }); // pre-filles form with existing data
    setShowAddForm(true); // Shows the form for editing
  };

  ///// --------------------------- For editing form-------------------------------------------------------------

  useEffect(() => {
    if (editingVehicle) {
      setNewVehicle(editingVehicle);
    } else {
      ResetForm();
    }
  }, [editingVehicle]);

  // Handle Delete Vehicle=-----------------------------------------------------------------------------------------

  const handleDeleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicel"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/inventory/master-inventory/ ${id}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Delete Vehicle");
      }

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle Image Change------------------------------------------------------------------------------------------------

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewVehicle({
        ...newVehicle,
        imgFile: file,
        images: URL.createObjectURL(file),
      });
    }
  }

  //---------------------------------------/ Filter vehicles by status and search-----------------------------------------------//---------------------------------------------------------------

  const filteredVehicles = displayedVehicles.filter((vehicle) => {
    const matchesStatus = activeTab === "All" || vehicle.status === activeTab; // const matchsStatus= This checks if the vehicle’s status (like "In Stock" or "For Sale") matches the currently selected tab.
    // activeTab === "All" means if "All" is selected, we want to show all vehicles. vehicle.status === activeTab means only show vehicles that match the selected tab.
    const matchesSearch = vehicle.brand // search filter name search-----Both the vehicle name and the search term are changed to lowercase so the search is case-insensitive
      ? vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });
  //   console.log(filteredVehicles); it return the data of vehicles in an array

  //---------------------------------------------------------------This filter is on model year brand -----------------------------------------------//---------------------------------------------------------------

  //   const filteredVehicles = displayedVehicles.filter((vehicle) => {
  //     const searchText = searchTerm.toLowerCase();
  //     return (
  //       vehicle.brand.toLowerCase().includes(searchText) ||
  //       vehicle.model.toLowerCase().includes(searchText) ||
  //       vehicle.year.toLowerCase().includes(searchText) ||
  //       vehicle.transmission.toLowerCase().includes(searchText)
  //     );
  //   });

  //----------------------------------------------Apply Sorting-----------Sorting with numbers like price the below function runs fine------------------------------------------------------------------
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (!a[sortBy] || !b[sortBy]) return 0;

    if (typeof a[sortBy] === "string") {
      return sortOrder === "ascending"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    } else {
      return sortOrder === "ascending"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    }
  });
  return (
    <div className="vehicle-table">
      {/* Search Bar */}
      <div className="body-nav">
        <input
          className="search_bar"
          type="text"
          placeholder="Search by vehicle name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="add-vehicle-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Vehicle
        </button>
      </div>

      {/* Add vehicle form */}
      {showAddForm && (
        <div className="add-vehicle-modal-overlay">
          <div className="add-vehicle-form">
            <CloseRoundedIcon
              className="close-btn"
              aria-label="close"
              onClick={() => {
                setShowAddForm(false);
                setEditingVehicle(null);
                ResetForm();
              }}
            />
            <h2 style={{ color: "#007bff" }}>
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>
            <hr />
            <input
              type="text"
              placeholder="Brand"
              name="brand"
              value={newVehicle.brand}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={newVehicle.model}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Transmission"
              name="transmission"
              value={newVehicle.transmission}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Fuel Type"
              name="fuel_type"
              value={newVehicle.fuel_type}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newVehicle.price}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              placeholder="Year"
              name="year"
              value={newVehicle.year}
              onChange={handleFormChange}
              required
            />

            <select
              name="status"
              value={newVehicle.status}
              onChange={handleFormChange}
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {/* Image Upload */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {newVehicle.images && (
              <img
                src={newVehicle.images}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}

            <button className="btn-save" onClick={handleSaveVehicle}>
              {editingVehicle ? "Update Vehicle" : "Save Vehicle"}
            </button>
          </div>
        </div>
      )}

      {/* Vehicle Table */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Summary</th>

            <th>Transmission</th>
            <th>Fuel Type</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedVehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(vehicle.id)}
                  onChange={() => handleRowSelect(vehicle.id)}
                />
              </td>
              <td className="vehicle-info">
                <img
                  src={vehicle.images || "/default-placeholder.png"}
                  alt={vehicle.brand}
                  className="vehicle-img"
                />
                <div>
                  <span className="vehicle-name">{vehicle.brand}</span>
                  <div className="vehicle-model">{vehicle.model}</div>
                  <div className="vehicle-model">{vehicle.year}</div>
                </div>
              </td>
              <td>{vehicle.transmission}</td>
              <td>{vehicle.fuel_type}</td>
              {/* <td>{vehicle.price}</td> */}

              <td>
                <IconButton
                  onClick={() => handleEditVehicle(vehicle)}
                  aria-label="edit"
                  style={{ color: "#007bff" }}
                >
                  <ModeEditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                  aria-label="delete"
                  style={{ color: "#ee4b00" }}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Loading indicator at bottom of table */}
      {loading && displayedVehicles.length > 0 && (
        <div className="loading-more">Loading more vehicles...</div>
      )}

      {/* Error message display */}
      {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}

      {/* Empty state message */}
      {!loading && displayedVehicles.length === 0 && (
        <p>No vehicles found. Try adjusting your filters or adding vehicles.</p>
      )}
    </div>
  );
};

export default VehicleTable;
