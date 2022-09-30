import {
  getCustomersService,
  // eslint-disable-next-line import/named
  getCustomersServiceMap,
} from "../../services/Customer/CustomerService";

// eslint-disable-next-line import/prefer-default-export
export const getCustomers = () => async (dispatch) => {
  const data = await getCustomersService();
  dispatch({ type: "SET_DATA_CUSTOMER", payload: data });
};

export const getCustomersFilterMap = () => async (dispatch) => {
  const data = await getCustomersServiceMap();
  dispatch({ type: "SET_DATA_CUSTOMER_MAP", payload: data });
};
