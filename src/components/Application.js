import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    // axios.get('/api/days').then(response => {
    //   setState(prev => ({...prev, days: response.data}));
    // })
    // .then(() => {
    //   //setState(prev => ({ ...prev, days }));
    // });

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log("days: ", all[0].data);
      console.log("appointments: ", all[1].data);
      console.log("interviewers: ", all[2].data);

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const mappedApts = dailyAppointments.map((apt) => {
    const interview = getInterview(state, apt.interview)
    
    return (
      <Appointment
        key={apt.id}
        id={apt.id}
        time={apt.time}
        interview={apt.interview}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {mappedApts}
        {/* <Appointment key={mappedApts.id} {...mappedApts} /> */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
