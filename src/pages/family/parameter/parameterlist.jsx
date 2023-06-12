import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ParameterDatatable from "../../../components/datatable/family/ParameterDatatable";
import React from 'react'

const ListParameters = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ParameterDatatable />
      </div>
    </div>
  )
}

export default ListParameters