import { clientApi } from "./configs/apiConfigs";
import { defineCancelApiObject } from "./configs/apiUtils";

export const DepartmentAPI = {
  get: async function(id, cancel = false) {
    const response = await clientApi.request({
      url: "/department/:id",
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel
        ? cancelApiObject[this.get.name].handleRequestCancellation().signal
        : undefined,
    });

    // returning the department returned by the API
    return response.data.department;
  },

  getAll: async function(cancel = false) {
    const response = await clientApi.request({
      url: "departments/",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data.departements;
  },

  search: async function(name, cancel = false) {
    const response = await clientApi.request({
      url: "departments/key",
      method: "GET",
      params: {
        name: name,
      },
      signal: cancel
        ? cancelApiObject[this.search.name].handleRequestCancellation().signal
        : undefined,
    });

    return response.data.departments;
  },

  create: async function(department, cancel = false) {
    await clientApi.request({
      url: "/departments",
      method: "POST",
      data: department,
      signal: cancel
        ? cancelApiObject[this.create.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// defining the cancel API object for DepartmentAPI
const cancelApiObject = defineCancelApiObject(DepartmentAPI);
