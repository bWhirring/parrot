import axios from "axios";

axios.interceptors.response.use(
  response => response,
  (error) => {
    const isLocal = window.location.href.includes("localhost");
    if (error.toString().includes("Network Error") && !isLocal) {
      const url = JSON.parse(localStorage.getItem("common")).logoutUrl;
      window.location.href = url;
    }
    if (error.toString().includes("400") && !isLocal) {
      window.location.href = "/#/index/dashboard";
    }
  },
);

const server = window.__data ? window.__data.JAVASERVER : "http://192.168.100.217:14475";
// const server = "";

/**
 * @param {String} method: post or get
 * @param {String} url : api
 * @param {Object} params: post参数
 */
export async function http(url, method = "get", params) {
  const { data } = await axios({
    method,
    url: `${server}${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: params,
  });
  return data;
}
