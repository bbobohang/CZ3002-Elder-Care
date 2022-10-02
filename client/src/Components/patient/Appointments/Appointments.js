import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "../Helper Components/Modal.css";
import "./Appointment.css";

const localizer = momentLocalizer(moment);

const Appointments = () => {
  const myEvents = [
    {
      title: "Test",
      desc: "Testing longer description",
      type: "HomeConsult",
      start: new Date(2022, 8, 24, 8, 0),
      end: new Date(2022, 8, 24, 15, 0),
    },
    {
      title: "test",
      type: "MedicineDelivery",
      start: new Date(2022, 8, 24, 9, 0),
      end: new Date(2022, 8, 24, 15, 0),
    },
    {
      title: "test",
      type: "TeleDoctor",
      start: new Date(2022, 8, 25, 10, 0),
      end: new Date(2022, 8, 25, 15, 0),
    },
  ];

  const [modalState, setModalState] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(undefined);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setModalState(!modalState);
  };

  const onClose = () => {
    console.log("entered");
    setModalState(false);
  };

  const Modal = () => {
    return (
      <div className={`modal-${modalState == true ? "show" : "hide"}`}>
        <div className="overlay"></div>
        <div className="modal-content">
          <h2>{selectedEvent.title}</h2>
          <p>{selectedEvent.desc}</p>
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
      {selectedEvent && <Modal />}
      <div className="AppointmentCalendar">
        <Calendar
          selectable
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={(myEvents) => {
            var backgroundColor = "blue";
            if (myEvents.type == "HomeConsult") {
              backgroundColor = "#388E3C";
            } else if (myEvents.type == "MedicineDelivery") {
              backgroundColor = "#9575CD";
            } else if (myEvents.type == "TeleDoctor") {
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
