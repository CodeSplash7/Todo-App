import axios from "axios";
import config from "./config.json";

const instance = axios.create({
  baseURL: config.apiEndpoint,
  timeout: 10000,
  headers: {}
});

export default {
  get: instance.get,
  post: instance.post,
  patch: instance.patch,
  delete: instance.delete,
  put: instance.put
};
