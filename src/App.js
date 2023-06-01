import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ListPatients from "./pages/identification/patient/patientlist";
import ListGroupesPatients from "./pages/identification/groupepatient/groupepatientlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SinglePatient from "./pages/identification/patient/singlePatient";
import NewPatient from "./pages/identification/patient/newpatient";

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
            <Route path="departments">
              <Route index element={<ListPatients />} />
              <Route path=":patientid" element={<SinglePatient />} />
              <Route
                path="newpatient"
                element={<NewPatient title="Nouveau Patient" />}
              />
              {/* <Route
                path="update/:patientid"
                element={<UpdatePatient title="Update Patient" />}
              /> */}
            </Route>
            <Route path="employees">
              <Route index element={<ListGroupesPatients />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
