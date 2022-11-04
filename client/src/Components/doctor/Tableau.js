import React, { useEffect, useRef } from "react";
import Navbar from "../patient/Navbar";

import "./TableauContainer.css";

const { tableau } = window;
const Tableau = () => {
  const ref = useRef(null);
  function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
      url =
        "https://public.tableau.com/views/PatientManagementDashboardforDoctors/PatientBaseOverview?:language=en-GB&:display_count=n&:origin=viz_share_link";
    var viz = new tableau.Viz(containerDiv, url);
    //new tableau.Viz(ref.current, url);
  }
  return (
    <>
      <Navbar role={"doctor"} />
      <div className="dashboardContainer">{initViz()}</div>
    </>
  );
};

export default Tableau;
