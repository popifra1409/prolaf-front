import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import SupplierDatatable from "../../../components/datatable/hrm/SupplierDatatable";
import React from 'react'

const ListSuppliers = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <SupplierDatatable />
      </div>
    </div>
  )
}

export default ListSuppliers