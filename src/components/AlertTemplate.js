import { Alert } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AlertTemplate = ({ style, options, message }) => {
  // eslint-disable-next-line react/prop-types
  const { type } = options;
  return (
    <Alert variant="filled" style={style} severity={type}>
      {message}
    </Alert>
  );
};

export default AlertTemplate;
