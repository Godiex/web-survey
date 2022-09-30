import loadingMap2 from "assets/images/loadingMap2.gif";
import Typography from "@mui/material/Typography";

const LoadingMap = () => (
  <div style={{ textAlign: "center" }}>
    <img
      alt="loadingMap"
      style={{ height: `100%`, marginTop: "-20px", opacity: 0.5 }}
      src={loadingMap2}
    />
    <Typography style={{ fontSize: 30 }}>Cargando mapa ...</Typography>
  </div>
);

export default LoadingMap;
