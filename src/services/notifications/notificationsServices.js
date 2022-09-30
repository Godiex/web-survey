import { HubConnectionBuilder } from "@microsoft/signalr";
import httpRequest from "../httpRequest";

const ENDPOINT = process.env.REACT_APP_ENPOINT_WITHOUT_API_WORD;

// eslint-disable-next-line import/prefer-default-export
export const connectionBuilder = () => {
  const isToken = localStorage.getItem("token");
  const connection = new HubConnectionBuilder()
    .withUrl(`${ENDPOINT}/notifications`, { accessTokenFactory: () => isToken })
    .withAutomaticReconnect()
    .build();
  return connection;
};

export const getAllNotificationsByUser = async (filters) => {
  try {
    return await httpRequest.post("notification/search/user", filters);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getAllNotificationsBytenant = async (filters) => {
  try {
    return await httpRequest.post("notification/search/tenant", filters);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const switchStateNotification = async (data) => {
  try {
    return await httpRequest.patch("notification/user", data);
  } catch (error) {
    return JSON.parse(error);
  }
};
export const switchStateNotificationByTenant = async (data) => {
  try {
    return await httpRequest.post("notification/tenant", data);
  } catch (error) {
    return JSON.parse(error);
  }
};
