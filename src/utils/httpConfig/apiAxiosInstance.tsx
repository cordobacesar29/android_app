import axios from "axios";
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  successRequestInterceptor,
  successResponseInterceptor,
} from "./interceptors";
import { isPlatform } from "@ionic/react";

const apiAxiosInstance = axios.create({
  baseURL:`https://synagro7api-dev.synagro.com.ar/api`,
  // baseURL:`http://${isPlatform("android") ? "10.0.2.2" : "localhost"}:5020/api`,
});

apiAxiosInstance.interceptors.request.use(
successRequestInterceptor,
  errorRequestInterceptor
);

apiAxiosInstance.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
);

export default apiAxiosInstance;
