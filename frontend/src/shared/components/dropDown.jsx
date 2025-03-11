import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function DropDown() {
  return (
    <Box sx={{ maxWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-native"
        ></InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: "name",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Yes</option>
          <option value={20}>No</option>
          <option value={30}>Profile Only</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
