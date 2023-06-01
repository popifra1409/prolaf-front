import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PatientDatatable from "../../../components/datatable/identification/patientDatatable";
import React from 'react'

const ListPatients = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PatientDatatable />
      </div>
    </div>
  )
}

export default ListPatients