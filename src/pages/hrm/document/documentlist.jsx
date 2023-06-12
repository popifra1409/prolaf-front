import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DocumentDatatable from "../../../components/datatable/hrm/DocumentDatatable";
import React from 'react'

const ListDocuments = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DocumentDatatable />
      </div>
    </div>
  )
}

export default ListDocuments