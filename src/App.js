import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListDepartments from "./pages/hrm/department/departmentlist";
import ListEmployees from "./pages/hrm/employee/employeelist";
import ListDocuments from "./pages/hrm/document/documentlist";
import ListAgents from "./pages/hrm/agent/agentlist";
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
import SingleEmployee from "./pages/hrm/employee/singleEmployee";
import SingleDocument from "./pages/hrm/document/singleDocument";
import SingleAgent from "./pages/hrm/agent/SingleAgent";
import SingleInternal from "./pages/hrm/internal/singleInternal";
import SingleExternal from "./pages/hrm/external/singleExternal";
import SingleBuilding from "./pages/family/building/singleBuilding";
import SingleLodge from "./pages/family/lodge/singleLodge";
import SingleFamily from "./pages/family/family/singleFamily";
import SinglePig from "./pages/family/pig/singlePig";
import SingleFowl from "./pages/family/fowl/singleFowl";
import SingleParameter from "./pages/family/parameter/singleParameter";
import SingleParamRegistration from "./pages/family/paramRegistration/singleParamRegistration";
import SingleLodgeRegistration from "./pages/family/lodgeRegistration/singleLodgeRegistration";
import NewDepartment from "./pages/hrm/department/newdepartment";
import NewEmployee from "./pages/hrm/employee/newemployee";
import NewDocument from "./pages/hrm/document/newdocument";
import NewAgent from "./pages/hrm/agent/newagent";
import NewInternal from "./pages/hrm/internal/newinternal";
import NewExternal from "./pages/hrm/external/newexternal";
import NewBuilding from "./pages/family/building/newbuilding";
import NewFamily from "./pages/family/family/newfamily";
import NewLodge from "./pages/family/lodge/newlodge";
import NewPig from "./pages/family/pig/newpig";
import NewFowl from "./pages/family/fowl/newfowl";
import NewParameter from "./pages/family/parameter/newparameter";
import NewParamRegistration from "./pages/family/paramRegistration/newparamregistration";
import NewLodgeRegistration from "./pages/family/lodgeRegistration/newlodgeregistration";
import UpdateDepartment from "./pages/hrm/department/updatedepartment";


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
              <Route path="newdepartment" element={<NewDepartment title="New Department" />}/>
              <Route path="update/:departmentid" element={<UpdateDepartment title="Update Department" />}/>
           
              </Route>

            {/* Employees */}
            <Route path="employees">
              <Route index element={<ListEmployees />} />
              <Route path=":employeeid" element={<SingleEmployee />} />
              <Route path="newemployee" element={<NewEmployee title="New Employee" />}/>
              
            </Route>

            {/* Documents */}
            <Route path="documents">
              <Route index element={<ListDocuments />} />
              <Route path=":documentid" element={<SingleDocument />} />
              <Route path="newdocument" element={<NewDocument title="New Document" />}/>
              
            </Route>

           {/* Agents */}
            <Route path="agents">
              <Route index element={<ListAgents />} />
              <Route path=":agentid" element={<SingleAgent />} />
              <Route path="newagent" element={<NewAgent title="New Agent" />}/>
              
            </Route>

            {/* Internal Contracts */}
            <Route path="internals">
              <Route index element={<ListInternals />} />
              <Route path=":contractid" element={<SingleInternal />} />
              <Route path="newinternal" element={<NewInternal title="New Internal" />}/>
              
            </Route>

            {/* External Contracts */}
            <Route path="externals">
              <Route index element={<ListExternals />} />
              <Route path=":contractid" element={<SingleExternal />} />
              <Route path="newexternal" element={<NewExternal title="New External" />}/>
              
            </Route> 

            </Route>   

            <Route path="family">
            {/* Birth Monitoring */}

            {/* Buildings */}
            <Route path="buildings">
              <Route index element={<ListBuildings />} />
              <Route path=":buildingid" element={<SingleBuilding />} />
              <Route path="newbuilding" element={<NewBuilding title="New Building" />}/>
              
            </Route> 

            {/* Lodges */}
            <Route path="lodges">
              <Route index element={<ListLodges />} />
              <Route path=":lodgeid" element={<SingleLodge />} />
              <Route path="newlodge" element={<NewLodge title="New Lodge" />}/>
              
            </Route>

            {/* Families */}
            <Route path="families">
              <Route index element={<ListFamilies />} />
              <Route path=":familyid" element={<SingleFamily />} />
              <Route path="newfamily" element={<NewFamily title="New Family" />}/>
	
              
            </Route> 

            {/* Pigs */}
            <Route path="pigs">
              <Route index element={<ListPigs />} />
              <Route path=":memberid" element={<SinglePig />} />
              <Route path="newpig" element={<NewPig title="New Pig" />}/>
              
            </Route> 

            {/* Fowls */}
            <Route path="fowls">
              <Route index element={<ListFowls />} />
              R<Route path=":memberid" element={<SingleFowl />} />
              <Route path="newfowl" element={<NewFowl title="New Fowl" />}/>
              
            </Route>

             {/* Parameters */}
             <Route path="parameters">
              <Route index element={<ListParameters />} />
              <Route path=":parameterid" element={<SingleParameter />} />
              <Route path="newparameter" element={<NewParameter title="New Parameter" />}/>
              
            </Route> 

            {/* Parameter Registration */}
            <Route path="paramRegistrations">
              <Route index element={<ListParamRegistrations />} />
              <Route path=":paramRegistrationid" element={<SingleParamRegistration />} />
              <Route path="newparamRegistration" element={<NewParamRegistration title="New ParamRegistration" />}/>
              
            </Route> 

            {/* Lodge Registration */}
            <Route path="lodgeRegistrations">
              <Route index element={<ListLodgeRegistrations />} />
              <Route path=":lodgeRegistrationid" element={<SingleLodgeRegistration />} />
              <Route path="newlodgeRegistration" element={<NewLodgeRegistration title="New LodgeRegistration" />}/>
              
            </Route> 

          </Route>
     
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
