import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import BuildingDatatable from "../../../components/datatable/family/BuildingDatatable";
import React from 'react'

const ListBuildings = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <BuildingDatatable />
      </div>
    </div>
  )
}

export default ListBuildings