import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListDepartments from "./pages/hrm/department/departmentlist";
import ListEmployees from "./pages/hrm/employee/employeelist";
import ListDocuments from "./pages/hrm/document/documentlist";
import ListClients from "./pages/hrm/client/clientlist";
import ListSuppliers from "./pages/hrm/supplier/supplierlist";
import ListInternals from "./pages/hrm/internal/internallist";
import ListExternals from "./pages/hrm/external/externallist";
import ListBuildings from "./pages/family/building/buildinglist";
import ListLodges from "./pages/family/lodge/lodgelist";
import ListFamilies from "./pages/family/family/familylist";
import ListPigs from "./pages/family/pig/piglist";
import ListFowls from "./pages/family/fowl/fowllist";
import ListParameters from "./pages/family/parameter/parameterlist";
import ListParamRegistrations from "./pages/family/paramRegistration/paramRegistrationlist";
import ListLodgeRegistrations from "./pages/family/lodgeRegistration/lodgeRegistrationlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SingleDepartment from "./pages/hrm/department/singleDepartment";
import NewDepartment from "./pages/hrm/department/newdepartment";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          {/* <Route path="users">
            <Route index element={<List />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route> */}
          <Route path="hrm">
            {/* human resource management */}

            {/* Departments */}
            <Route path="departments">
              <Route index element={<ListDepartments />} />
              <Route path=":departmentid" element={<SingleDepartment />} />
           
              </Route>

            {/* Employees */}
            <Route path="employees">
              <Route index element={<ListEmployees />} />
              
            </Route>

            {/* Documents */}
            <Route path="documents">
              <Route index element={<ListDocuments />} />
              
            </Route>

            {/* Clients */}
            <Route path="clients">
              <Route index element={<ListClients />} />
              
            </Route>

             {/* Suppliers */}
             <Route path="suppliers">
              <Route index element={<ListSuppliers />} />
                
            </Route>

            {/* Internal Contracts */}
            <Route path="internals">
              <Route index element={<ListInternals />} />
              
            </Route>

            {/* External Contracts */}
            <Route path="externals">
              <Route index element={<ListExternals />} />
              
            </Route> 
            </Route>   

            <Route path="family">
            {/* Birth Monitoring */}

            {/* Buildings */}
            <Route path="buildings">
              <Route index element={<ListBuildings />} />
              
            </Route> 

            {/* Lodges */}
            <Route path="lodges">
              <Route index element={<ListLodges />} />
              
            </Route>

            {/* Families */}
            <Route path="families">
              <Route index element={<ListFamilies />} />
              
            </Route> 

            {/* Pigs */}
            <Route path="pigs">
              <Route index element={<ListPigs />} />
              
            </Route> 

            {/* Fowls */}
            <Route path="fowls">
              <Route index element={<ListFowls />} />
              
            </Route>

             {/* Parameters */}
             <Route path="parameters">
              <Route index element={<ListParameters />} />
              
            </Route> 

            {/* Parameter Registration */}
            <Route path="paramRegistrations">
              <Route index element={<ListParamRegistrations />} />
              
            </Route> 

            {/* Lodge Registration */}
            <Route path="lodge_Registrations">
              <Route index element={<ListLodgeRegistrations />} />
              
            </Route> 

          </Route>
             
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
