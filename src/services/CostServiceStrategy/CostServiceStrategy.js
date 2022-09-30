import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const costOfServiceStrategy = async () => {
  try {
    return await httpRequest.getEntries("costofservicestrategy");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const costOfServiceStrategyByCode = async (code) => {
  try {
    return await httpRequest.getEntry("costofservicestrategy", code);
  } catch (error) {
    return JSON.parse(error);
  }
};
