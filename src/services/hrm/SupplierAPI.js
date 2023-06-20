import axios from "axios";

const Supplier_API_BASE_URL = "http://localhost:8000/hrm/suppliers/";

class SupplierAPI {
    //list all suppliers
    getSuppliers = async() =>{
        return await axios.get(Supplier_API_BASE_URL);
    };

    //get a single supplier
    getSupplierById = async (agentId) =>{
        return await  axios.get(Supplier_API_BASE_URL + agentId + "/");
    };

    //create a supplier
    addSupplier = async(supplier) =>{
        return await axios.post(Supplier_API_BASE_URL + "save",  supplier);
    };
}

export default new SupplierAPI()