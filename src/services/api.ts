"use serve";

import axios from "axios";
import { API_ART_KART } from "./constants";


const api = (token?: string) => {
  if (token) {
    return axios.create({
      baseURL: API_ART_KART,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.create({
    baseURL: API_ART_KART,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export default api;