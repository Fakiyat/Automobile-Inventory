import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function SettingsMenu({ handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // initialize Navigation

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };
  const handleProfileClick = () => {
    handleClose();
    navigate("/profile"); // Navigate to profile
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#007bff",
          color: "white",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
        onClick={handleClick}
      >
        Settings
      </Button>

      <Menu
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={handleProfileClick}
        >
          Account Settings
        </MenuItem>

        <MenuItem
          sx={{
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#f8d7da", color: "red" },
          }}
          onClick={handleLogoutClick}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
