import React, { useEffect, useRef } from "react";



import { ContainerRight } from "../ContainerRight";
import { Navbar } from "../Navbar";
import { Carousel } from "../Carousel";
 
export const Mapa = () => {
  const elementRef = useRef();

  useEffect(_ => {
    let cleanup;
    import("../data/logic").then(
      app => (cleanup = app.initialize(elementRef.current))
    );
    return () => cleanup && cleanup();
  }, []);

 
  return <div className="viewDiv" ref={elementRef}>
  <ContainerRight/>
    {/* <Navbar/> */} 
    {/* <Carousel/> */}
    {/* <button type="button">Click Me!</button> */}
     </div>;
};

 