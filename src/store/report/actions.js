// eslint-disable-next-line import/prefer-default-export
import generateMetricsReport from "../../services/report/ReportService";

// eslint-disable-next-line import/prefer-default-export
export const getReportMetric = () => async (dispatch) => {
    const data = await generateMetricsReport();
    dispatch({ type: SET_DATA_REPORT, payload: data });
  }; 