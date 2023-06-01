import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MedicationIcon from '@mui/icons-material/Medication';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PROLAF</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MENU PRINCIPAL</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Tableau de bord</span>
            </li>
          </Link>
          <p className="title">Accueil</p>
          <Link to="/identification/patients" style={{ textDecoration: "none" }}>
            <li>
              < PersonOutlineIcon className="icon" />
              <span>Patient</span>
            </li>
          </Link>
          <Link to="/identification/groupePatients" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Groupe patient</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <MedicalServicesIcon className="icon" />
              <span>Unités fonctionnelles</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <TextSnippetIcon className="icon" />
              <span>Documents</span>
            </li>
          </Link>

          <p className="title">Admission</p>
          <Link to="/identification/patients" style={{ textDecoration: "none" }}>
            <li>
              < LocalHotelIcon className="icon" />
              <span>Hospitalisation</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              < LocalHospitalIcon className="icon" />
              <span>Urgence</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <AirlineSeatFlatIcon className="icon" />
              <span>Morgue</span>
            </li>
          </Link>

          <p className="title">Pharmacie</p>
          <Link to="/identification/patients" style={{ textDecoration: "none" }}>
            <li>
              < MedicationIcon className="icon" />
              <span>Produit</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <SettingsIcon className="icon" />
              <span>Paramétrage</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <SyncAltIcon className="icon" />
              <span>Mouvement interne</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <KeyboardBackspaceIcon className="icon" />
              <span>Mouvement externe</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <AddBusinessIcon className="icon" />
              <span>Mouvement stock</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Inventaire</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <AddAlertIcon className="icon" />
              <span>Alerte</span>
            </li>
          </Link>

          <p className="title">Paramétrage</p>
          <li>
            <LocalHospitalOutlinedIcon className="icon" />
            <span>Etablissement</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">Utilisateurs</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
