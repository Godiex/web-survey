import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const generateMetricsReport = async () => {
  try {
    const { data } = await httpRequest.post("report");
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateServiceOrderReport = async (id) => {
  try {
    const { data } = await httpRequest.post(`report/${id}`);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateHistoryPaymentsReport = async () => {
  try {
    const { data } = await httpRequest.post("report/general");
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateServiceOrderExcelReport = async (datar) => {
  try {
    const data = await httpRequest.post("report/general/excelserviceorder", datar, {
      responseType: "blob",
    });
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateServiceOrderPdfReport = async (datar) => {
  try {
    const data = await httpRequest.post("report/general/pdfserviceorder", datar, {
      responseType: "blob",
    });
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateHistoryPaymentsExcelReport = async () => {
  try {
    const data = await httpRequest.post(
      "report/general/excelpayments",
      {},
      {
        responseType: "blob",
      }
    );
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateHistoryPaymentsPdfReport = async () => {
  try {
    const data = await httpRequest.post(
      "report/general/pdfpayments",
      {},
      {
        responseType: "blob",
      }
    );
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateMetricsExcelReport = async () => {
  try {
    const data = await httpRequest.post("report/general/excel", null, {
      responseType: "blob",
    });
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateMetricsPdfReport = async () => {
  try {
    const data = await httpRequest.post("report/general/pdf", null, {
      responseType: "blob",
    });
    return data.data;
  } catch (error) {
    return JSON.parse(error);
  }
};
