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
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StoreIcon from '@mui/icons-material/Store';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import React, { useState } from 'react';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [showAgentsSubitems, setShowAgentsSubitems] = useState(false);
  const [showContractsSubitems, setShowContractsSubitems] = useState(false);
  const [showMembersSubitems, setshowMembersSubitems] = useState(false);

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
          <p className="title">Home</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Human Resources Management</p>
          <Link to="/hrm/departments" style={{ textDecoration: "none" }}>
            <li>
              < HomeWorkIcon className="icon" />
              <span>Department</span>
            </li>
          </Link>
          <Link to="/hrm/employees" style={{ textDecoration: "none" }}>
            <li>
              <GroupOutlinedIcon className="icon" />
              <span>Employee</span>
            </li>
          </Link>
          <Link to="/hrm/documents" style={{ textDecoration: "none" }}>
            <li>
              <TextSnippetIcon className="icon" />
              <span>Documents</span>
            </li>
          </Link>
          <Link to="/hrm/agents" style={{ textDecoration: "none" }}>
            <li>
            <PersonAddAltIcon className="icon" />
              <span>Agents</span>
            </li>
          </Link>

        <li> 
          <div
            className="sidebar-item"
              onMouseEnter={() => setShowContractsSubitems(true)}
              onMouseLeave={() => setShowContractsSubitems(false)}>       
              <NoteAltIcon className="icon" />
              <span>Contracts</span>  
                {showContractsSubitems && (
                  <div className="subitems">
                    <li><Link to="/hrm/internals" style={{ textDecoration: "none" }}><li><NoteAltIcon className="icon" />Internal Contracts</li></Link></li>
                    <li><Link to="/hrm/externals" style={{ textDecoration: "none" }}><li><NoteAltIcon className="icon" />External Contracts</li></Link></li>
                </div>
            )}
          </div>
        </li>  
      
   
            

        <p className="title">Birth Monitoring</p>
        <Link to="/family/buildings" style={{ textDecoration: "none" }}>
            <li>
              < BusinessIcon className="icon" />
              <span>Buildings</span>
            </li>
          </Link>
          <Link to="/family/families" style={{ textDecoration: "none" }}>
            <li>
              <FamilyRestroomIcon className="icon" />
              <span>Families</span>
            </li>
          </Link>
          <Link to="/family/lodges" style={{ textDecoration: "none" }}>
            <li>
              < StoreIcon className="icon" />
              <span>Lodges</span>
            </li>
          </Link>
          <li> 
          <div
             className="sidebar-item"
              onMouseEnter={() => setshowMembersSubitems(true)}
              onMouseLeave={() => setshowMembersSubitems(false)}>       
              <PersonOutlineIcon className="icon" />
              <span>Members</span>  
               {showMembersSubitems && (
                <div className="subitems">
                    <li><Link to="/family/pigs" style={{ textDecoration: "none" }}><li><PersonOutlineIcon className="icon" /> Pigs</li></Link></li>
                    <li><Link to="/family/fowls" style={{ textDecoration: "none" }}><li><PersonOutlineIcon className="icon" /> Fowls</li></Link></li>
                </div>
            )}
          </div>
        </li>     
          <Link to="/family/parameters" style={{ textDecoration: "none" }}>
            <li>
              <SettingsIcon className="icon" />
              <span>Parameters</span>
            </li>
          </Link>
          <Link to="/family/paramregistrations" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSuggestIcon className="icon" />
              <span>Parameters Registration</span>
            </li>
          </Link>
          <Link to="/family/lodgeRegistrations" style={{ textDecoration: "none" }}>
            <li>
              <AddBusinessIcon className="icon" />
              <span>Lodges Registration</span>
            </li>
          </Link>
          
          <p className="title">Configurations</p>
          <li>
            <LocalHospitalOutlinedIcon className="icon" />
            <span>Structure</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">Users</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
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
