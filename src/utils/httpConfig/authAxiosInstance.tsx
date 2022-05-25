import axios from "axios";
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  successRequestInterceptor,
  successResponseInterceptor,
} from "./interceptors";
import { isPlatform } from "@ionic/react";

const authAxiosIntance = axios.create({
  baseURL: `https://synagro7token-dev.synagro.com.ar`,
  // baseURL: `http://${isPlatform("android") ? "10.0.2.2" : "localhost"}:5010`,
});

authAxiosIntance.interceptors.request.use(
  successRequestInterceptor,
  errorRequestInterceptor
);

authAxiosIntance.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
);

export default authAxiosIntance;
