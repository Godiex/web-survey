import { useState } from "react";
import { useDispatch } from "react-redux";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";
// Material Dashboard 2 PRO React context
import Switch from "@mui/material/Switch";
import AlertConfirm from "../../../components/AlertConfirm";
import { changeStatusCredentials } from "../../../store/paymentCredentials/actions";
import DialogEditCredentialMercadoPago from "./DialogsTransaction/DialogEditCredentialMercadoPago";

function CardPaymentGateway({ paymentsGateway, credential, callback }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditName, setIsOpenEditName] = useState(false);
  const [credentialToEdit, setcredentialToEdit] = useState(false);

  const filterByCode = (code) =>
    paymentsGateway.find((paymentGateway) => paymentGateway.code === code);

  const handleOpenEditName = (newCredential) => {
    setcredentialToEdit(newCredential);
    setIsOpenEditName(true);
  };
  const handleCloseEditName = () => {
    setcredentialToEdit(null);
    setIsOpenEditName(false);
  };

  const handleChangeStatusCredentials = async (id) => {
    await dispatch(changeStatusCredentials(id));
    setIsOpen(!isOpen);
    callback();
  };

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Nombre:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {credential.accountName}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              TIpo de pasarela:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {filterByCode(credential.paymentGatewayCode)?.name}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Estado:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {credential.status ? "Activo" : "Inactivo"}
                <Switch checked={credential.status} onChange={() => setIsOpen(!isOpen)} />
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox lineHeight={0} display="flex" justifyContent="end">
            <MDButton onClick={() => handleOpenEditName(credential)} display="flex">
              Editar Nombre
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <DialogEditCredentialMercadoPago
        credential={credentialToEdit}
        open={isOpenEditName}
        onClose={handleCloseEditName}
      />
      <AlertConfirm
        open={isOpen}
        title="! Atención ¡"
        context={`¿Seguro de que desea ${
          credential.status ? "desactivar" : "activar"
        } esta cliente?`}
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() => handleChangeStatusCredentials(credential.id)}
      />
    </>
  );
}
CardPaymentGateway.defaultProps = {
  callback: () => {},
};

CardPaymentGateway.propTypes = {
  callback: PropTypes.func,
  paymentsGateway: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  credential: PropTypes.shape({
    id: PropTypes.string,
    accountName: PropTypes.string,
    applicationId: PropTypes.string,
    publicAccessTokenTest: PropTypes.string,
    publicKeyTest: PropTypes.string,
    publicAccessToken: PropTypes.string,
    publicKey: PropTypes.string,
    paymentGatewayCode: PropTypes.string,
    status: PropTypes.bool,
  }).isRequired,
};

export default CardPaymentGateway;
