import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import FamilyDatatable from "../../../components/datatable/family/FamilyDatatable";
import React from 'react'

const ListFamilies = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <FamilyDatatable />
      </div>
    </div>
  )
}

export default ListFamilies