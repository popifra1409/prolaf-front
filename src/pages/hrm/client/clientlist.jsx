import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ClientDatatable from "../../../components/datatable/hrm/ClientDatatable";
import React from 'react'

const ListClients = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ClientDatatable />
      </div>
    </div>
  )
}

export default ListClients