import { API } from "../config";
export let FaqCatagory = {};

FaqCatagory.getAllData = async () => {
  return API({
    url: "/faq/categories/list",
    method: "get",
  });
};

FaqCatagory.singleData = async (faqCatagoryId) => {
    return API({
        url: "/faq/" + faqCatagoryId
    })
}