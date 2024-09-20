// Added By : bhautik
// Created At: 26-5-2024
// Description:axios default setting
// Ticket ID: 001
import axios from "axios";
import { isEmpty, isString } from "lodash";

const AxiosDefaultSetting = async ({
  method = "GET",
  data,
  url,
  contentType,
  customHeaders,
  responseType,
}) => {
  const AxiosDefault = axios.create({
    baseURL: process.env.REACT_APP_API_ROUTE,
    timeout: 10000,
    headers: {
      "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
      Accept: "application/json",
      ...customHeaders,
    },
    responseType: responseType || "json",
  });

  AxiosDefault.interceptors.request.use(
    async (config) => {
      try {
        const userData = localStorage.getItem("token");
        if (isString(userData) && !isEmpty(userData)) {
          config.headers["Authorization"] = `Bearer ${userData}`;
        }
      } catch (error) {
        // Handle error
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AxiosDefault.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error?.response && error?.response?.status === 401) {
        try {
          localStorage.removeItem("token");
          localStorage.clear();
          window.location.href = `/`;
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

  return await AxiosDefault({
    method,
    data,
    url,
    headers: {
      "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
      Accept: "application/json",
      ...customHeaders,
    },
    responseType: responseType || "json",
  });
};

export default AxiosDefaultSetting;
