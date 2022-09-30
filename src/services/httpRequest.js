import axios from "axios";

export const ENDPOINT = process.env.REACT_APP_ENPOINT;
export const ENDPOINT_WITHOUT_API_WORD = process.env.REACT_APP_ENPOINT_WITHOUT_API_WORD;

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

let refreshIsRunning = false;

const getRefreshToken = async () => {
  try {
    refreshIsRunning = true;
    const currentToken = localStorage.getItem("token");
    const currentTrefreshToken = localStorage.getItem("refresh");
    const tenant = localStorage.getItem("idTenant");
    const { data } = await axios.post(
      `${ENDPOINT}/tokens/refresh`,
      { token: currentToken, refreshToken: currentTrefreshToken },
      { headers: { tenant, "Content-Type": "application/json", Accept: "application/json" } }
    );
    if (data.refreshToken) {
      localStorage.setItem("refresh", data.refreshToken);
      localStorage.setItem("token", data.token);
      window.location.reload();
    }
  } catch (error) {
    window.location.replace("/landing-page?session-expired=true");
  }
};

const urlIsValidToRefresh = (url) => {
  switch (url) {
    case `${ENDPOINT}/tokens/refresh`:
      return false;
    case `${ENDPOINT}/tokens`:
      return false;
    default:
      return true;
  }
};

// Agregar token si existe
// const token = localStorage.getItem("token");
// HEADERS = !token ? HEADERS : { ...HEADERS, Authorization: `Bearer ${token}` };

export const http = axios.create({
  baseURL: ENDPOINT,
  timeout: 50000,
  headers: HEADERS,
  validateStatus: (status) => status <= 500,
});
export const httpToDownload = axios.create({
  baseURL: ENDPOINT,
  timeout: 50000,
  headers: HEADERS,
  validateStatus: (status) => status <= 500,
});

http.interceptors.request.use((request) => {
  const isToken = localStorage.getItem("token");
  if (isToken && isToken !== "") {
    request.headers.common.Authorization = `Bearer ${isToken}`;
  }
  return request;
});

http.interceptors.response.use((anyResponse) => {
  if (anyResponse?.status === 401) {
    if (urlIsValidToRefresh(anyResponse.request.responseURL) && !refreshIsRunning) {
      getRefreshToken();
    }
  }
  // if (anyResponse?.status > 200 || anyResponse?.status >= 300) console.log(anyResponse);
  return anyResponse;
});

// Encabezados de la peticiones
// Metodos generales para utilizar

export const httpClient = {
  getEntries: async (path) => {
    const res = await http.get(`${ENDPOINT}/${path}`);
    return res.data;
  },
  getEntry: async (path, id) => {
    const res = await http.get(`${ENDPOINT}/${path}/${id}`);
    return res.data;
  },
  create: async (path, data) => {
    const res = await http.post(`${ENDPOINT}/${path}`, data);
    return res.data;
  },
  update: async (path, id, data) => {
    const res = await http.put(`${ENDPOINT}/${path}/${id}`, data);
    return res.data;
  },
  put: async (path, data) => {
    const res = await http.put(`${ENDPOINT}/${path}`, data);
    return res.data;
  },
  remove: async (path, id) => {
    const res = await http.delete(`${ENDPOINT}/${path}/${id}`);
    return res.data;
  },
  removeWithoutId: async (path) => {
    const res = await http.delete(`${ENDPOINT}/${path}`);
    return res.data;
  },
  get: async (path, config) => {
    const params = [`${ENDPOINT}/${path}`];
    if (config) params.push(config);
    const res = await http.get(...params);
    if (res.status >= 400) throw res;
    return res.data;
  },
  getByOtherBaseUrl: async (path, config) => {
    const params = [`${path}`];
    if (config) params.push(config);
    const res = await httpToDownload.get(...params);
    if (res.status >= 400) throw res;
    return res.data;
  },
  post: async (path, data, config) => {
    const params = [`${ENDPOINT}/${path}`, data];
    if (config) params.push(config);

    const result = await http.post(...params);
    if (result.status >= 400) throw result;
    return result;
  },
  postWihoutApiWord: async (path, data, config) => {
    const params = [`${ENDPOINT_WITHOUT_API_WORD}/${path}`, data];
    if (config) params.push(config);

    const result = await http.post(...params);
    if (result.status >= 400) throw result;
    return result;
  },
  patch: async (path, data, config) => {
    const params = [`${ENDPOINT}/${path}`, data];
    if (config) params.push(config);

    const result = await http.patch(...params);
    if (result.status >= 400) throw result;
    return result;
  },
  getTenants: () => {
    axios.get(`${ENDPOINT}/tenants/basictenantinfo`);
  },
  tokenRefresh: async (token, refreshToken, tenantId) => {
    const res = await http.post(
      "tokens/refresh",
      { token, refreshToken },
      { headers: { tenantId } }
    );
    return res.data;
  },
};

export default httpClient;
