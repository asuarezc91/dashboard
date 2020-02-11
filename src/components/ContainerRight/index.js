import React, { useState } from "react";
import { MainMenu, DataDashboard, TextData, Content } from "./styles";
import Query from "esri/tasks/support/Query";
import QueryTask from "esri/tasks/QueryTask";


export const ContainerRight = () => {
  const [list, setCount] = useState([
    {
      title: "React",
      url: "https://facebook.github.io/react/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: "man",
      url: "https://facebook.github.io/react/",
      author: "man Walke",
      num_comments: 6,
      points: 8,
      objectID: 10
    }
  ]);

  async function calculate() {
    const dataArray = [];
    let testArray = [];

    const municipalities = ["'Riba-roja de Túria'", "'Almussafes'", "'Sagunto/Sagunt'"];
    for (let i = 0; i < municipalities.length; i++) {
      //Se van a crear tantos objetos como municipios haya
      let objetData = {
        "Superficie Polígonos": "",
        "Superficie Activos": "",
        "Precio medio de venta": "",
        "Precio medio de alquiler": ""
      }
      const query = new Query();
      query.returnGeometry = false;
      query.where = "NAMEUNIT = " + municipalities[i];
      var wildCard = [
        "suelo_ind_spatial_50km/FeatureServer/0",
        "actives/FeatureServer/0"];
      for (let i = 0; i < wildCard.length; i++) {
        const urlQuery =
          "https://services8.arcgis.com/o9xiVBMM7LVPq4Xx/arcgis/rest/services/" + wildCard[i];
        const queryTask = new QueryTask({
          url: urlQuery
        });
        if (urlQuery.includes("suelo_ind_spatial_50km")) {
          //POLYGONS
          let superficiesPol = [];
          query.outFields = ["superficie"]
          await queryTask.execute(query).then(function (results) {
            const result = results.features;
            for (const [index] of result.entries()) {
              let superficie = result[index].attributes.superficie;
              superficiesPol.push(superficie.toFixed(1));
            }
            let sumP = 0;
            for (let i = 0; i < superficiesPol.length; i++) {
              const element = Number(superficiesPol[i]);
              sumP += element;
            }
            console.log("la superficie de todos los polígonos es es:" + " " + sumP);
            objetData["Superficie Polígonos"] = sumP;

          });
        }
        else {
          //ACTIVES
          let superficiesAct = [];
          let preciosMedios = [];
          let preciosMedioAlq = [];
          query.outFields = ["superficie,pre_med,pred_med_a"]
          await queryTask.execute(query).then(function (results) {
            const result = results.features;
            for (const [index] of result.entries()) {
              let superficie = result[index].attributes.superficie
              let precioMedio = result[index].attributes.pre_med;
              let precioMedioAlq = result[index].attributes.pred_med_a;
              superficiesAct.push(superficie.toFixed(2));
              preciosMedios.push(precioMedio);
              preciosMedioAlq.push(precioMedioAlq);
            }
            let sumA = 0;
            for (let i = 0; i < superficiesAct.length; i++) {
              const element = Number(superficiesAct[i]);
              sumA += element;
            }
            console.log("la superficie de todos los activos es:" + " " + sumA);
            console.log("el precio medio de venta es:" + " " + preciosMedios[0]);
            console.log("el precio medio de alquier es:" + " " + preciosMedioAlq[0]);
            objetData["Superficie Activos"] = sumA;
            objetData["Precio medio de venta"] = preciosMedios[0];
            objetData["Precio medio de alquiler"] = preciosMedioAlq[0];
            testArray.push(sumA);
            console.log(testArray);

          });

          fusion(objetData);

          function fusion(objetData) {
            dataArray.push(objetData);
            console.log(dataArray);
          }

        }

 



      }



    }




  };
  calculate();


  return (
    <MainMenu>
      {list.map(item => (
        <Content>
          <DataDashboard><TextData>{item.title}</TextData> </DataDashboard>
          <DataDashboard><TextData>{item.points}</TextData> </DataDashboard>
        </Content>
      ))}
    </MainMenu>
  );
};






