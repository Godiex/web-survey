import Avatar from "@mui/material/Avatar";
import { Chip, IconButton, Stack, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Edit, LocationOn } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useMaterialUIController } from "../../../context";
import MDBox from "../../../components/MDBox";

const NewCard = ({ onUpdate, company, checked, onChangeCheck }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const handleSetVisible = () => {
    // eslint-disable-next-line react/prop-types
    onChangeCheck(company.id, checked);
  };

  const handleClick = () => {
    onUpdate(company);
  };
  return (
    <Card bgColor={darkMode ? "transparent" : "grey-100"}>
      <MDBox sx={{ p: 2, display: "flex" }}>
        <Avatar>H</Avatar>
        <Stack spacing={0.5}>
          {/* eslint-disable-next-line react/prop-types */}
          <Typography fontWeight={500}>{company.name}</Typography>
          <Typography variant="body2" color="secondary">
            <LocationOn sx={{ color: grey[500] }} /> Scranton, PA
          </Typography>
        </Stack>
        <IconButton style={{ marginLeft: "10px" }} onClick={() => handleClick()}>
          <Edit sx={{ fontSize: 14 }} />
        </IconButton>
      </MDBox>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1 }}
      >
        <Chip
          label={checked ? "Active account" : "Inactive account"}
          color={checked && "success"}
          size="small"
        />
        <Switch checked={checked} onChange={handleSetVisible} />
      </Stack>
    </Card>
  );
};

NewCard.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default NewCard;
