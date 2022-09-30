import httpRequest from "../httpRequest";
import { getTotalCount, paramsRequest } from "../../utils/utils";

// eslint-disable-next-line import/prefer-default-export
export const getSurveysService = async () => {
  try {
    const { data } = await httpRequest.post("surveys/search", paramsRequest);
    return getTotalCount(data.totalCount, "surveys/search");
  } catch (error) {
    return JSON.parse(error);
  }
};
