import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";

const options = ["1", "2", "3", "4", "5", "6", "7"];

function MDSelect() {
  return (
    <Autocomplete
      defaultValue="hola"
      options={options}
      renderInput={(params) => (
        <FormField {...params} label="hola" InputLabelProps={{ shrink: true }} />
      )}
    />
  );
}

export default MDSelect;
