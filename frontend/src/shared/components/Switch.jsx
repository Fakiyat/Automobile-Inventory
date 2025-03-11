import * as React from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Size switch demo" } };

export default function Switches() {
  return (
    <div>
      <Switch {...label} defaultChecked />
    </div>
  );
}
