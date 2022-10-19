import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

import "./PatientHome.css";
import TeleLogo from "../../asset/tele_consult.png";
import HomeDocLogo from "../../asset/home_doctor.png";
import MedDelivery from "../../asset/med_delivery.png";
import HomeCare from "../../asset/home_care.png";
import Footer from "./Footer";

const Data = [
  {
    title: "Tele-Consult A Doctor",
    subtitle:
      "Choose your doctor from thousands of specialist, general, and trusted hospitals",
    image: TeleLogo,
    link: "/teleDoctor",
  },
  {
    title: "Home Doctor",
    subtitle:
      "Consult our trusted doctors in the comfort fo your home and get the best recomendations",
    image: HomeDocLogo,
    link: "/homeDoctor",
  },
  {
    title: "Medicine Delivery",
    subtitle:
      "Buy your medicines with our mobile application with a simple delivery system",
    image: MedDelivery,
    link: "/pmed",
  },
  {
    title: "Symptoms Checker",
    subtitle: "Get list of suggested specialisations for calculated diseases",
    image: HomeCare,
    link: "/symptoms-checker",
  },
];
const PatientHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="headerWrapper">
        <div className="headerContainer">
          <div className="headerLeft">
            <h1>
              Medical Care Now <br /> Simplified for Everyone
            </h1>
            <p>
              ElderCare engages with various healthcar partners to bring you{" "}
              <br />
              the best possible healthcare for kids of all ages and adults of
              all conditions.
            </p>
            <button
              className="headerBtn"
              onClick={() => navigate("/patient/appointment")}
            >
              View Your Appointments
            </button>
          </div>
          <div className="headerRight"></div>
          <div className="headerBanner">
            <div className="innerBanner">
              <div className="innerContainer">
                <h1>900+</h1>
                <p>Verified Specialists</p>
              </div>
              <div className="innerContainer innerContainerBorder">
                <h1>2000+</h1>
                <p>Patients Recovered</p>
              </div>
              <div className="innerContainer innerContainerBorder">
                <h1>99.7%</h1>
                <p>Positive Feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bookContainer">
        <div className="bookContent">
          <div className="bookHeader">
            <h1>Book a Service</h1>
            <p>
              We provide to you the best choiches for you. Adjust it to your
              health needs and make sure you undergo treatment with our highly
              qualified doctors. <br />
              Consult with us which type of service is suitable for your health
            </p>
          </div>
          <div className="bookTilesContainer">
            {Data.map((item, index) => (
              <Link to={item.link}>
                <div className="bookTiles" key={index}>
                  <div className="bookTilesLogo">
                    <img src={item.image} alt="Tele Logo" />
                  </div>
                  <div className="bookTilesTitle">{item.title}</div>
                  <div className="bookTilesSubtitle">{item.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="buttonWrapper">
            <button className="headerBtn">Learn More</button>
          </div>
        </div>
      </div>
      <div className="planContainer">
        <div className="planWrapper">
          <div className="planLeft">
            <h2>Plan for all your medical expenses</h2>
            <p>
              ElderCare provides a detailed breakdown of the potential care
              provided and its respective costs. An estimated pricing cost will
              be provided, so that you can plan ahead for all your medical
              expenses.
            </p>
            <button className="headerBtn">GO TO WALLET</button>
          </div>
          <div className="planRight"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientHome;
