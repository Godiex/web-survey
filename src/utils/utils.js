import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import * as moment from "moment";
import httpRequest from "../services/httpRequest";

export const paramsRequest = {
  advancedSearch: {
    fields: [],
    keyword: "",
  },
  keyword: "",
  pageNumber: 0,
  pageSize: 0,
  orderBy: [],
};

export const newParams = {
  pageNumber: 0,
  pageSize: 0,
  orderBy: [],
};

export const getTotalCountForCustomer = async (totalCount, path, config) => {
  const request = {
    ...newParams,
    pageSize: totalCount,
  };
  let headers = {};
  if (config) headers = config;
  const { data } = await httpRequest.post(path, request, headers);
  return data.data;
};

export const getTotalCount = async (totalCount, path, config) => {
  const request = {
    ...paramsRequest,
    pageSize: totalCount,
  };
  let headers = {};
  if (config) headers = config;
  const { data } = await httpRequest.post(path, request, headers);
  return data.data;
};

export const URL_MAP =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2my9oiT7J893l33umJHfS0zkhZzl5Qis&v=3.exp&libraries=geometry,drawing,places";

export const keyPressF = (e) => {
  const pattern = new RegExp("^[0-9]$");
  if (!pattern.test(e.key)) {
    return e.preventDefault();
  }
  return false;
};

export const generateId = (prefix) => {
  const numberRandomCreate = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  return `${prefix}${numberRandomCreate}`;
};

export const formatDate = (date, format = "YYYY/MM/DD HH:mm") => moment(date).format(format);

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
