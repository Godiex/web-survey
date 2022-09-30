// eslint-disable-next-line import/named
import {
  searchCertificates,
  searchCertificatesByCustomer,
  getBlobCertificate,
  searchGeneratedCertificates,
  sendNotifiToCustomerOfCertificate,
} from "../../services/Certificate/CertificateServices";
import {
  SET_DATA_CERTIFICATES,
  GET_DATA_CERTIFICATES_BY_CUSTOMER,
  GET_CERTIFICATE_PDF,
  GET_GENERATED_CERTIFICATES,
  SEND_NOTIFY_CERTIFICATE,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getCertificates = (filters) => async (dispatch) => {
  const data = await searchCertificates(filters);
  dispatch({ type: SET_DATA_CERTIFICATES, payload: data });
};
export const getCertificatesByCustomer = (filters) => async (dispatch) => {
  const payload = await searchCertificatesByCustomer(filters);
  dispatch({ type: GET_DATA_CERTIFICATES_BY_CUSTOMER });
  return payload;
};
export const getGeneratedCertificates = (filters) => async (dispatch) => {
  const payload = await searchGeneratedCertificates(filters);
  dispatch({ type: GET_GENERATED_CERTIFICATES });
  return payload;
};
export const getCertificatePdf = (url) => async (dispatch) => {
  const payload = await getBlobCertificate(url);
  dispatch({ type: GET_CERTIFICATE_PDF });
  return payload;
};
export const sendNotifYCustomer = (data) => async (dispatch) => {
  const payload = await sendNotifiToCustomerOfCertificate(data);
  dispatch({ type: SEND_NOTIFY_CERTIFICATE });
  return payload;
};
