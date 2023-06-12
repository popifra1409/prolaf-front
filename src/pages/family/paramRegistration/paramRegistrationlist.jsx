import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ParamRegistrationDatatable from "../../../components/datatable/family/ParamRegistrationDatatable";
import React from 'react'

const ListParamRegistrations = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ParamRegistrationDatatable />
      </div>
    </div>
  )
}

export default ListParamRegistrations