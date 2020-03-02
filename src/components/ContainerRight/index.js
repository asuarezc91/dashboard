import React, { useState } from "react";
import { MainMenu, DataDashboard, TextData, Content, TextTittle, Scroll } from "./styles";
import Query from "esri/tasks/support/Query";
import QueryTask from "esri/tasks/QueryTask";


export const ContainerRight = () => {
  const [list, setCount] = useState([]);

  async function obtainMunicipalities() {
    //   const urlQuery =
    //     "https://services8.arcgis.com/o9xiVBMM7LVPq4Xx/arcgis/rest/services/spatial_selection_50km_symbol/FeatureServer/0"
    //   const queryTask = new QueryTask({
    //     url: urlQuery
    //   });

    //   let namesMun = [];
    //   const query = new Query();
    //   query.where = "type_area = 'metropolitan'";
    //   query.outFields = ["NAMEUNIT"]
    //   await queryTask.execute(query).then(function (results) {
    //     const result = results.features;
    //     for (const [index] of result.entries()) {
    //       let municipioName = result[index].attributes.NAMEUNIT;
    //       if (municipioName === "Atzeneta d'Albaida") {
    //         municipioName = "Atzeneta d" + '"' + "Albaida";
    //       }
    //       namesMun.push("'" + municipioName + "'");
    //     }
    //   });

    //   let municipalities = [...new Set(namesMun)];
    //   console.log(municipalities);


    const urlQuery =
      "https://services8.arcgis.com/o9xiVBMM7LVPq4Xx/arcgis/rest/services/actives/FeatureServer/0"
    const queryTask = new QueryTask({
      url: urlQuery
    });

    let namesMun = [];
    const query = new Query();
    query.where = "1=1";
    query.outFields = "NAMEUNIT";
    await queryTask.execute(query).then(function (results) {
      const result = results.features;
      for (const [index] of result.entries()) {
        let municipioName = result[index].attributes.NAMEUNIT;
        if (municipioName === "Atzeneta d'Albaida") {
          municipioName = "Atzeneta d" + '"' + "Albaida";
        }
        namesMun.push("'" + municipioName + "'");
      }
    });

    let municipalities = [...new Set(namesMun)];
    console.log(municipalities);

    //necesitamos saber cual es la longitud de este array para ver si realmente está soltando los 259 o se queda en los 50
    calculate(municipalities);

  }



  const dataArray = [];
  async function calculate(municipalities) {
    // const municipalities2 = ["'Sagunto/Sagunt'", "'Náquera'", "'Bétera'", "'Riba-roja de Túria'", "'Almussafes'", "'Puçol'", "'el Puig de Santa Maria'", "'Rafelbunyol'",
    //   "'Museros'", "'Moncada'", "'Massamagrell'", "'la Pobla de Farnals'", "'San Antonio de Benagéber'", "'Agullent'"];
    for (let i = 0; i < municipalities.length; i++) {
      //Create new objets to each new municipalitie
      let objetData = {
        "Municipio": "",
        "Superficie Polígonos": "",
        "Superficie Activos": "",
        "Precio medio de venta": "",
        "Precio medio de alquiler": "",
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
          let municipalitiesTittle = [];
          query.outFields = ["superficie,NAMEUNIT"]
          await queryTask.execute(query).then(function (results) {
            const result = results.features;
            for (const [index] of result.entries()) {
              let superficie = result[index].attributes.superficie;
              let municipio = result[index].attributes.NAMEUNIT;
              superficiesPol.push(superficie);
              municipalitiesTittle.push(municipio);
            }
            let sumP = 0;
            for (let i = 0; i < superficiesPol.length; i++) {
              const element = Number(superficiesPol[i]);
              sumP += element;
            }
            const fixed = sumP.toFixed(2)
            console.log("la superficie de todos los polígonos es es:" + " " + fixed);
            objetData["Superficie Polígonos"] = fixed;
            objetData["Municipio"] = municipalitiesTittle[0];
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
          });
          fill(objetData);
          function fill(objetData) {
            dataArray.push(objetData);
            console.log(dataArray);
            const isNotId = item => item !== "a";
            const updatedList = list.filter(isNotId);
            const newList = dataArray;
            setCount(updatedList);
            setCount(newList);
          }
        }
      }
    }
  };

  window.onload = function () {
    obtainMunicipalities();
  };

  return (
    <MainMenu>
      <Content> <DataDashboard><TextTittle>Municipio</TextTittle> </DataDashboard>
        <DataDashboard><TextTittle>Superficie disponible</TextTittle> </DataDashboard>
        <DataDashboard><TextTittle>Superficie polígonos</TextTittle> </DataDashboard>
        <DataDashboard><TextTittle>Precio medio venta</TextTittle> </DataDashboard>
        <DataDashboard><TextTittle>Precio medio alquiler</TextTittle> </DataDashboard>
      </Content>
      <Scroll>
        {list.map(item => (
          <Content>
            <DataDashboard><TextData>{item["Municipio"]}</TextData> </DataDashboard>
            <DataDashboard><TextData>{item["Superficie Activos"]} m²</TextData> </DataDashboard>
            <DataDashboard><TextData>{item["Superficie Polígonos"]} m²</TextData> </DataDashboard>
            <DataDashboard><TextData>{item["Precio medio de venta"]} € m² </TextData> </DataDashboard>
            <DataDashboard><TextData>{item["Precio medio de alquiler"]} € m² </TextData> </DataDashboard>
          </Content>
        ))}
      </Scroll>
    </MainMenu>
  );
};






