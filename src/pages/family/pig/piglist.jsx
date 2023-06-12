import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PigDatatable from "../../../components/datatable/family/PigDatatable";
import React from 'react'

const ListPigs = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <PigDatatable />
      </div>
    </div>
  )
}

export default ListPigs