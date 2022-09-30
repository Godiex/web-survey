import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";

function CardHistory({ historyData }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {historyData.typeAttempt === "MANUAL_PAYMENT" ? (
          <>
            <Typography sx={{ mb: 1 }}>
              <strong>Tipo de pago:</strong> Manual
            </Typography>
            <Typography variant="body2">
              <strong>Usuario:</strong> {historyData.paymentInformation.UserName}
            </Typography>
            <Typography variant="body2">
              <strong>Correo del usuario:</strong> {historyData.paymentInformation.UserEmail}
            </Typography>
            <Typography variant="body2">
              <strong>Correo del usuario:</strong> {historyData.paymentInformation.UserEmail}
            </Typography>
            <Typography variant="body2">
              <strong>Fecha de pago:</strong>{" "}
              {moment(historyData.paymentInformation.Date).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 1 }}>
              <strong>Tipo de pago:</strong> Pasarela de pago
            </Typography>
            <Typography variant="body2">
              <strong>Nombre:</strong>{" "}
              {historyData.paymentInformation.Payer.FirstName !== null
                ? historyData.paymentInformation.Payer.FirstName
                : "No registra"}{" "}
              {historyData.paymentInformation.Payer.LastName}
            </Typography>
            <Typography variant="body2">
              <strong>{historyData.paymentInformation.Payer.Identification.Type}</strong>{" "}
              {historyData.paymentInformation.Payer.Identification.Number}
            </Typography>
            <Typography variant="body2">
              <strong>Correo:</strong> {historyData.paymentInformation.Payer.Email}
            </Typography>
            <Typography variant="body2">
              <strong>Fecha de pago:</strong>{" "}
              {moment(historyData.paymentInformation.DateCreated).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

CardHistory.defaultProps = {
  historyData: {},
};

CardHistory.propTypes = {
  historyData: PropTypes.objectOf(),
};

export default CardHistory;
