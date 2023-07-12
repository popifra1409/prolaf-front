import "../../../pages/list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import AgentDatatable from "../../../components/datatable/hrm/AgentDatatable";
import React from 'react'

const ListAgents = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <AgentDatatable />
      </div>
    </div>
  )
}

export default ListAgents