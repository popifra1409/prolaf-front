import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BatimentService from "../../services/BatimentService";


const Single = () => {
  const { idBatiment} = useParams();
  const [rows, setCategories] = useState({
    idBatiment:idBatiment, 
    description: "",
     libelle: ""
    });
  
  useEffect(() => {
   BatimentService.getBatimentsById(idBatiment).then((res)=>{
      let bat = res.data.data;
      setCategories({
        idBatiment : bat.id,
        description: bat.description,
        libelle: bat.libelle,
      });
      });
  }, []); 





  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link className="editButton" to={`/Single/EditFamille/${idBatiment}`}>Edit</Link>
            <h1 className="title">Détails</h1>
            <div className="item">

              <div className="details">
                <div className="detailItem">

                  <span className="itemKey">ID:</span>
                  <span >{rows.idBatiment}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue"> {rows.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Libelle:</span>
                  <span className="itemValue">
                    <span >{rows.libelle}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
  }

export default Single;
