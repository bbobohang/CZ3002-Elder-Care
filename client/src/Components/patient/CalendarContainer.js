import Calendar from 'react-calendar';
import styled from 'styled-components';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from 'react';

const CalendarComponent = (props) =>{
    return(
        <CalendarContainer>
            <Calendar onChange={props.changeDate} value={props.date} className = "react-calendar"/>
        </CalendarContainer>
    )
}
const CalendarContainer = styled.div`
  /* ~ container styles ~ */
  max-width: 1024px;
  margin: auto;
  margin-top: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  justify-content: center;
  /* ~ navigation styles ~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~ label styles ~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~ button styles ~ */
  button {
    margin: 10px;
    background-color: var(--primary-gray);
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;

    &:hover {
        box-shadow: var(--box_shadow);
    }

    &:active {
      background-color: var(--primary-green);
    }
  }
  /* ~ container styles ~ */
  /* ~ navigation styles ~ */
  /* ~ label styles ~ */
  /* ~ button styles ~ */
  /* ... */

  /* ~ day grid styles ~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
  /* ~ neighboring month & weekend styles ~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  /* ~ active day styles ~ */
  .react-calendar__tile--range {
      background: var(--primary-green);
      color: white;
  }
  /* ~ other view styles ~ */
  .react-calendar__year-view__months, 
  .react-calendar__decade-view__years, 
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`
;


export default CalendarComponent;