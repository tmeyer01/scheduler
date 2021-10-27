import React from "react";
//import  InterviewerList from "./InterviewerList";



// function daySelect (day, selectedDay){
//   if(day === selectedDay){
//     return true;
//   }
//   return false;
// }

export default function InterviewerList(props) {
  
  // const {days} = props;

  // console.log(days[1].id)

  // const outPut = days.map(dayItems => <DayListItem key={dayItems.id} id={dayItems.id} name={dayItems.name} 
  // spots={dayItems.spots} selected={daySelect(dayItems.name, props.day)} setDay={props.setDay}/>)
  
   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  ); 
 }