import React, { useState, useRef } from "react";
import Navbar from "../../Components/patient/Navbar";
import Footer from "../../Components/patient/Footer";
import CalendarComponent from "./CalendarContainer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import "./MedDelivery.css";
import "./PatientHome.css";
import "./CalendarDiv.css";
import "./HomeDoctor.css";

const DoctorType = [
  {
    name: "GP",
  },
  {
    name: "Digestive Specialist",
  },
  {
    name: "Joint/Bone Specialist",
  },
  {
    name: "Pediatrician",
  },
];

const ConsultTime = [
  {
    time: "09:00",
  },
  {
    time: "10:00",
  },
  {
    time: "11:00",
  },
  {
    time: "12:00",
  },
  {
    time: "13:00",
  },
  {
    time: "14:00",
  },
  {
    time: "15:00",
  },
  {
    time: "16:00",
  },
  {
    time: "17:00",
  },
  {
    time: "18:00",
  },
  {
    time: "19:00",
  },
  {
    time: "20:00",
  },
];

const HomeDoctor = () => {
  const [date, setDate] = useState("");
  const [timeState, setTime] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [homeConsultSuccess,setHomeConsultSuccess] = useState(false);
  const address = useRef();

  const navigate = useNavigate();

  const dataChangeHandler = (date) => {
    setDate(date);
  };

  //Submit button
	const handleClick = () => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let postData = {
			time: timeState,
			doctorType: doctorType,
			date: String(date).slice(0, 15),
      address: address.current.value
		};

		axios.post(`/api/homedoc/create`, postData, axiosConfig).then((response) => {
			setHomeConsultSuccess(true);
			console.log(response);
		});

		navigate('/homeDoctor/preconfirm', {
			state: {
				homeConsultDetails: postData,
			},
		});
		console.log(date);
	};
  
  return (
    <div>
      <Navbar />
      <div className="headerWrapper">
        <div className="headerContainer">
          <div className="headerLeft">
            <h1>
              Home-Consultation <br />
              Session with a Doctor
            </h1>
            <p>
              Skip the queue and get the consulting services you need from the comfort
              <br /> of your own home. Schedule an appointment at your convenience.
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
      <div className="medContainer">
        <div className="homeDocWrapper">
          <div className="medType">
            <div className="Title">
              <h2>Select A Doctor </h2>
              <div className="medTypeContainer">
                {DoctorType.map((item, index) => (
                  <div
                    className={
                      "homeDocTypeCard" +
                      (doctorType === `${item.name}` ? "selectedType" : "")
                    }
                    key={index}
                    id={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setDoctorType(e.target.id);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="medQuatity">
            <div className="Title">
              <h2>Enter An Address</h2>
              <form>
                <input ref = {address} className="quantityInput" placeholder="Eg: Blk 585B, Sengkang East Way, #5-760, S123456" />
              </form>
            </div>
          </div>
          <div className="Title">
            <h2>Select An Appointment Date</h2>
            <CalendarComponent changeDate={dataChangeHandler} date={date} />
          </div>
          <div>
            <div className="Title">
              <h2>Select An Appointment Time</h2>
              <div className="timeWrapper">
                {ConsultTime.map((item, index) => (
                  <div
                    className={
                      "timeCard" +
                      (timeState === `${item.time}` ? "selectedTime" : "")
                    }
                    key={index}
                    id={item.time}
                    onClick={(e) => {
                      e.preventDefault();

                      setTime(e.target.id);
                      console.log(e.target.id);
                    }}
                  >
                    {item.time}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="submitContainer">
            <button className="headerBtn" onClick={handleClick}>Book Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeDoctor;
