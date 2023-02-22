import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Department from "./scenes/departement";
import FormDepartement from "./scenes/departement/formDepartment";
/* import Employes from "./scenes/employes";
import Prestataires from "./scenes/prestataires";
import Clients from "./scenes/clients"; */

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* Routes for human resources */}
              <Route path="/hrm" index element={<Dashboard />} />
              <Route path="/hrm/departments" element={<Department />} />
              <Route path="/hrm/formDepartment" element={<FormDepartement />} />
              {/* <Route path="/employees" element={<Employees />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/clients" element={<Clients />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
