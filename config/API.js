import axios from "axios";
import { config } from "./config";

const windowObject = typeof window !== 'undefined' && window
const subDomain = windowObject ? windowObject.location.host.split(".")[0] : null;

const defaultOptions = {
  baseURL: config.appUrl,
  headers: {
    storename: subDomain===("localhost:3000") ? 'kbcollections' : subDomain,
  },
  
};

// Create instance
let instance = axios.create(defaultOptions);

export const API = instance;
