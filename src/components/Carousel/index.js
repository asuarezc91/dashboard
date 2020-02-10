import React, {
  useState,
  useEffect
} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Slider from "react-slick";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import FeatureLayer from "esri/layers/FeatureLayer";
import Map from "esri/Map";
import Query from "esri/tasks/support/Query";
import QueryTask from "esri/tasks/QueryTask";
import { Select } from "./styles";
import { ContainerSelection } from "./styles";
import { ParrafoProvincia } from "./styles";

export const Carousel = () => {
  const [suggestions, setSuggestions] = useState([])


  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => {
    //   setSuggestions(data);
    //   console.log(data); 
    // })
    const municipiosLayerUrl =
      "https://services8.arcgis.com/o9xiVBMM7LVPq4Xx/ArcGIS/rest/services/spatial_selection_50km/FeatureServer/0";
    const queryTask = new QueryTask({
      url: municipiosLayerUrl
    });
    const query = new Query();
    query.returnGeometry = true;
    // query.outFields = ["ID", "DIFICULTAD", "TIPO", "LONGITUD"];
    // query.where = "Texto = '" + id + "'";
    query.where = "Texto = 'Murcia'";
    query.orderByFields = ["NAMEUNIT ASC"];

    const items = [];
    queryTask.execute(query).then(function (results) {
      const stats2 = results.features;
      for (const [index, value] of stats2.entries()) {
        const elements = stats2[index].attributes;
        items.push(elements);
      }
      setSuggestions(items);
    });









  });



  let settings = {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
  }

  function filterPath() {
    alert("change");
  }


  return (

    <div className="container">
      <ContainerSelection>
        <ParrafoProvincia>Seleccione una provincia: </ParrafoProvincia>
        <Select
          onChange={() => filterPath()}
        >
          <option value="value1" selected > Murcia </option>
          <option value="value2" >Value 2</option>
          <option value="value3">Value 3</option>
        </Select>
      </ContainerSelection>
      {/* <h6 className="text-muted">Friend Suggestions</h6> */}
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>

      ) : (
          <Slider {...settings}>
            {suggestions.map(current => (
              <div className="out" key={current.id}>
                <div className="card">
                  {/* <img className="rounded-circle" alt={"users here"} src={`https://source.unsplash.com/random/${current.id}`} height={56} width={56} /> */}
                  <div className="card-body">
                    <h5 className="card-title">{current.NAMEUNIT}</h5>
                    <small className="card-text text-sm-center text-muted">PDF</small>
                    <br />
                    <button className="btn btn-sm follow btn-primary">Zoom</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
    </div>
  );
}

