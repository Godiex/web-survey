import { getSurveysService } from "../../services/Surveys/SurveysService";
import { SET_DATA_SURVEY } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getSurveys = () => async (dispatch) => {
  const data = await getSurveysService();
  dispatch({ type: SET_DATA_SURVEY, payload: data });
};
