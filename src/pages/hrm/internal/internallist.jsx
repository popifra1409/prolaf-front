import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import InternalDatatable from "../../../components/datatable/hrm/InternalDatatable";
import React from 'react'

const ListInternals = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <InternalDatatable />
      </div>
    </div>
  )
}

export default ListInternals