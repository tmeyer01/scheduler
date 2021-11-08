import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Function to book interview and update state w/ new interview 
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const days = spotsRemaining(state, appointments);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  //Function to delete cancel interview and update state w/ empty slot 
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const days = spotsRemaining(state, appointments);
        setState({
          ...state,
          days,
          appointments,
        });
      });
  };

  const setDay = (day) => setState({ ...state, day });

  //API server call, sets state for days, appointments and interviewers 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);



  // Func. that updates the number of spots avalible shown in navigation bar
  const spotsRemaining = (state, appointments) => {
    const previousDays = [...state.days];
    //Find correct day obj inside previous days array 
    const day = previousDays.find((d) => d.name === state.day);

    //Find number of spots for day 
    let spots = 0;

    //Find avaible appointments for the day 
    for (const appointmentId of day.appointments) {
      const appointment = appointments[appointmentId];
      if (!appointment.interview) {
        spots++;
      }
    }

    //Create new found day object 
    const newDay = { ...day, spots };
    
    //Create newDays array
    const newDays = previousDays.map((day) =>
      day.name === state.day ? newDay : day
    );
    return newDays;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
