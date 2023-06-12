import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import FowlDatatable from "../../../components/datatable/family/FowlDatatable";
import React from 'react'

const ListFowls = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <FowlDatatable />
      </div>
    </div>
  )
}

export default ListFowls