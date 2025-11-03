import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.37:3333", // 👈 mesmo endereço do json-server
});
