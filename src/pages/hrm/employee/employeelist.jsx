import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import EmployeeDatatable from "../../../components/datatable/hrm/EmployeeDatatable";
import React from 'react'

const ListEmployees = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <EmployeeDatatable />
      </div>
    </div>
  )
}

export default ListEmployees