// eslint-disable-next-line import/named
import {
  costOfServiceStrategy,
  // eslint-disable-next-line import/named
  costOfServiceStrategyByCode,
} from "../../services/CostServiceStrategy/CostServiceStrategy";
import { SET_DATA_SERVICE_STRATEGY_CODE_TYPES, SET_DATA_SERVICE_STRATEGY_TYPES } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getCostServiceStrategy = () => async (dispatch) => {
  const data = await costOfServiceStrategy();
  dispatch({ type: SET_DATA_SERVICE_STRATEGY_TYPES, payload: data });
};

export const getCostServiceStrategyByCode = (code) => async (dispatch) => {
  const data = await costOfServiceStrategyByCode(code);
  dispatch({ type: SET_DATA_SERVICE_STRATEGY_CODE_TYPES, payload: data });
};
