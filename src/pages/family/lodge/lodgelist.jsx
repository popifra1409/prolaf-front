import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import LodgeDatatable from "../../../components/datatable/family/LodgeDatatable";
import React from 'react'

const ListLodges = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <LodgeDatatable />
      </div>
    </div>
  )
}

export default ListLodges