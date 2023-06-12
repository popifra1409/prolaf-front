import axios from "axios";

const Document_API_BASE_URL = "http://localhost:8000/hrm/documents/";

class DocumentAPI {
    //list all documents
    getDocuments = async() =>{
        return await axios.get(Document_API_BASE_URL);
    };

    //get a single document
    getDocumentById = async (documentId) =>{
        return await  axios.get(Document_API_BASE_URL + documentId);
    };

    //create a document
    addDocument = async(document) =>{
        return await axios.post(Document_API_BASE_URL + "save",  document);
    };
}

export default new DocumentAPI()