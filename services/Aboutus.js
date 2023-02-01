import { API } from "../config";

export let AboutUs = {};
AboutUs.getdata = async () => {
  return API({
    url: "/pages/about-us",
    method: "get",
  });
};
