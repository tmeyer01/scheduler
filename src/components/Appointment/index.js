import React from 'react'
import "./styles.scss";

export default function Appointment(props) {
  
  console.log(props.time)
  
  function appointmentTime (time) {
    if(props.time){
      return `Appointment at ${props.time}`;
    }
    if(!props.time){
      return `No appointments`;
    }
  }
  
  return (
    <article className="appointment">
      
      {appointmentTime(props.time)}
    </article>
  )
}
