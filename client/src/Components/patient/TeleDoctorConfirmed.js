import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./MedConfirmed.css";

const TeleDoctorConfirmed = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="headerWrapper">
        <div className="headerContainer">
          <div className="headerLeft">
            <h1>
              Tele-Consultation <br />
              Session with a Doctor
            </h1>
            <p>
              Skip the queue and get the advice you need from the comfort of
              your own home.
              <br /> Schedule an appointment at your convenience.
            </p>
            <button className="headerBtn">BOOK AN APPOINTMENT</button>
          </div>
          <div className="headerRight headerMed"></div>
          <div className="headerBanner">
            <div className="innerBanner">
              <div className="innerContainer innerMed">
                <h1>Consult a GP</h1>
                <p>$20 / consult</p>
              </div>
              <div className="innerContainer innerContainerBorder innerMed">
                <h1>Consult a Specialist</h1>
                <p>from $50 / consult</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmedContainer">
        <div className="confirmedWrapper">
          <div className="confirmedBanner">
            <div className="leftConfirmed">
              <BsFillCheckCircleFill color={"green"} size={100} />
            </div>
            <div className="rightConfirmed">
              <h2>Booking Confirmed</h2>
              <p>
                We have booked your consultation for the selected date. Please click on the zoom link
                during the allocated consultation time to
                speak to your doctor.{" "}
              </p>
            </div>
          </div>
          <div className="backHomeContainer">
            <button className="headerBtn" onClick={() => navigate("/phome")}>
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeleDoctorConfirmed;
