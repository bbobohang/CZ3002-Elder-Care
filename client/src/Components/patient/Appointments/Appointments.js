import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../Navbar";
import Footer from "../Footer";

import "./Appointment.css";

const localizer = momentLocalizer(moment);

const myEvents = [
  {
    title: "test",
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
    type: "HomeConsult",
    start: new Date(2022, 8, 24, 10, 0),
    end: new Date(2022, 8, 24, 15, 0),
  },
];

const Appointments = () => {
  return (
    <>
      <Navbar />
      <div className="AppointmentCalendar">
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={(myEvents) => {
            var backgroundColor = "blue";
            if (myEvents.type == "HomeConsult") {
              backgroundColor = "purple";
            } else if (myEvents.type == "MedicineDelivery") {
              backgroundColor = "green";
            }
            return { style: { backgroundColor } };
          }}
        ></Calendar>
      </div>
      <Footer />
    </>
  );
};

export default Appointments;
