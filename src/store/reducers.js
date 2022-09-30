import { combineReducers } from "redux";
import { auth } from "./auth/reducer";
import { profile } from "./profile/reducer";
// eslint-disable-next-line import/named
import { company } from "./tenant/reducer";
import { identificationTypes } from "./identificationTypes/reducer";
import { economicActivities } from "./economicActivities/reducer";
import { solicitud } from "./solicitudes/reducer";
import { service } from "./generateService/reducer";
// eslint-disable-next-line import/named
import { serviceStrategy } from "./costServiceStrategy/reducer";
import { map } from "./map/reducer";
import { user } from "./user/reducer";
import { customer } from "./customer/reducer";
import { survey } from "./survey/reducer";
import { order } from "./order/reducer";
import { paymentGateway } from "./paymentGateway/reducer";
import { paymentCredentials } from "./paymentCredentials/reducer";
import { viewCustomer } from "./viewCustomer/reducer";
import { certificate } from "./certificate/reducer";
import { notifications } from "./notifications/reducer";
import { role } from "./role/reducer";
import { paymentGenerated } from "./paymentsGenerated/reducer";

const combinedStore = combineReducers({
  auth,
  profile,
  company,
  identificationTypes,
  economicActivities,
  solicitud,
  service,
  serviceStrategy,
  map,
  user,
  customer,
  survey,
  order,
  paymentGateway,
  paymentCredentials,
  viewCustomer,
  certificate,
  notifications,
  role,
  paymentGenerated,
});

export default combinedStore;
