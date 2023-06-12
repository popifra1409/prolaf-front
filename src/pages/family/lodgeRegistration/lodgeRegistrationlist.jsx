import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import LodgeRegistrationDatatable from "../../../components/datatable/family/LodgeRegistrationDatatable";
import React from 'react'

const ListLodgeRegistrations = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <LodgeRegistrationDatatable />
      </div>
    </div>
  )
}

export default ListLodgeRegistrations