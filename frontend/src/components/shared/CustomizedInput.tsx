import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      name={props.name}
      type={props.type}
      label={props.label}
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          color: "white",
          fontSize: 20,
        },
      }}
    />
  );
};

export default CustomizedInput;
