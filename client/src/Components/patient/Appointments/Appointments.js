import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

import "../Helper Components/Modal.css";
import "./Appointment.css";
import "../PatientHome.css";

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    axios.get(`/api/appt/all`).then((response) => {
      const tempAppointment = response.data;
      const newArray = tempAppointment.map((event) => {
        if (event["year"] == null) {
          event["start"] = null;
          event["end"] = null;
        } else {
          event["start"] = new Date(
            event["year"],
            event["month"] - 1,
            event["day"],
            event["hour"],
            event["min"]
          );
          console.log(event["start"]);
          event["end"] = new Date(
            event["year"],
            event["month"] - 1,
            event["day"],
            event["end_hour"],
            event["min"]
          );
        }
        return event;
      });
      setMyEvents(newArray);
      console.log(newArray);
    });
  }, []);

  const [modalState, setModalState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [selectedEventDesc, setSelectedEventDesc] = useState("");
  const [confirmChange, setConfirmChange] = useState(false);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setSelectedEventDesc(event.desc);
    setEventType(event.title);
    setModalState(!modalState);
  };

  const onChangeAppointment = () => {
    if (confirmChange == false) {
      setSelectedEventDesc(
        "Changing your appointment would delete your current one. Proceed?"
      );
      setConfirmChange(true);
    } else {
      onConfirmedChangeAppointment();
    }
  };

  const onConfirmedChangeAppointment = () => {
    if (eventType == "TeleDoctor Appointment") {
      //navigate({ pathname: "/teleDoctor", search: createSearchParams(title: )});
      //delete api
      navigate("/teleDoctor");
    } else if (eventType == "Home Doctor Appointment") {
      navigate("/homeDoctor");
    } else if (eventType == "Medication Delivery") {
      navigate("/pmed");
    }
  };

  const onClose = () => {
    setConfirmChange(false);
    setModalState(false);
  };

  const Modal = () => {
    return (
      <div className={`modal-${modalState == true ? "show" : "hide"}`}>
        <div className="overlay"></div>
        <div className="modal-content">
          <div className="words-container">
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEventDesc}</p>
          </div>
          <div className="button-container">
            <button className="headerBtn" onClick={onChangeAppointment}>
              Change Appointment
            </button>
          </div>
          <button className="close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="AppointmentCalendar">
        {selectedEvent && <Modal />}
        <Calendar
          selectable
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={(myEvents) => {
            var backgroundColor = "blue";
            if (myEvents.title == "Medication Delivery") {
              backgroundColor = "#388E3C";
            } else if (myEvents.title == "Home Doctor Appointment") {
              backgroundColor = "#9575CD";
            } else if (myEvents.title == "TeleDoctor Appointment") {
              backgroundColor = "#0288D1";
            }
            return { style: { backgroundColor } };
          }}
          onSelectEvent={(e) => handleSelectedEvent(e)}
        ></Calendar>
      </div>
      <Footer />
    </>
  );
};

export default Appointments;
