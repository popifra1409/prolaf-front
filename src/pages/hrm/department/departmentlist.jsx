import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DepartmentDatatable from "../../../components/datatable/hrm/DepartmentDatatable";
import React from 'react'

const ListDepartments = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DepartmentDatatable />
      </div>
    </div>
  )
}

export default ListDepartments