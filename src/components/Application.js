import React from "react";
//import axios from "axios";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";


import DayList from "components/DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviews = getInterviewersForDay(state, state.day)

  const mappedApts = dailyAppointments.map((apt) => {
    const interview = getInterview(state, apt.interview)
    return (
      <Appointment
        key={apt.id}
        id={apt.id}
        time={apt.time}
        interview={interview}
        interviewers={dailyInterviews}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
       
        />
    );
  });
        

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedApts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
