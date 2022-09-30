// eslint-disable-next-line import/named
import {
  getEconomicActivitiesByCode,
  // eslint-disable-next-line import/named
  getEconomicActivitiesService,
} from "../../services/EconomicActivities/EconomicActivities";
import { SET_DATA_ECONOMIC_ACTIVITIES, SET_DATA_ECONOMIC_ACTIVITIES_CODE } from "./types";

export const getEconomicActivities = () => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getEconomicActivitiesService();
    await dispatch({ type: SET_DATA_ECONOMIC_ACTIVITIES, payload: data });
  } catch (error) {
    throw error;
  }
};

export const getEconomicActivitiesCode = (code) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getEconomicActivitiesByCode(code);
    await dispatch({ type: SET_DATA_ECONOMIC_ACTIVITIES_CODE, payload: data });
  } catch (error) {
    throw error;
  }
};
