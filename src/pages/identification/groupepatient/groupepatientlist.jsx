import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import GroupePatientDatatable from "../../../components/datatable/identification/groupePatientDatatable";
import React from 'react'

const ListGroupesPatients = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <GroupePatientDatatable />
      </div>
    </div>
  )
}

export default ListGroupesPatients