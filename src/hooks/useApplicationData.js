import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApplicationData () {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (id, interview) =>{
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}) 
    .then((res) => {
      const days = spotsRemaining(state, appointments)
        setState({
        ...state,
        days,
        appointments
      });
    })
  }

  const cancelInterview = (id, interview) =>{
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview}) 
      .then((res) => {
        const days = spotsRemaining(state, appointments)
        setState({
        ...state,
        days,
        appointments
      });
    })
  }

  const setDay = (day) => setState({ ...state, day });

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


  const spotsRemaining = (state, appointments) =>{
    const previousDays = [...state.days];
    const day = previousDays.find(d=> d.name === state.day);
 
    let spots = 0;

    for(const appointmentId of day.appointments){
      const appointment = appointments[appointmentId];
      if(!appointment.interview){
        spots ++;
      }
    }
    
    const newDay = {...day, spots};
    const newDays = previousDays.map(day=> day.name === state.day ? newDay : day);
    return newDays;
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}