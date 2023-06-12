import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ExternalDatatable from "../../../components/datatable/hrm/ExternalDatatable";
import React from 'react'

const ListExternals = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ExternalDatatable />
      </div>
    </div>
  )
}

export default ListExternals