import React from "react";
import DayListItem from "./DayListItem";



// function daySelect (day, selectedDay){
//   if(day === selectedDay){
//     return true;
//   }
//   return false;
// }

export default function DayList(props) {
  
  //const {days} = props;

  //console.log(days[1].id)

  // const outPut = days.map(dayItems => <DayListItem key={dayItems.id} id={dayItems.id} name={dayItems.name} spots={dayItems.spots} selected={daySelect(dayItems.name, props.day)} setDay={props.setDay}/>)

  const outPut = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={()=>props.setDay(day.name)}
      />
    )
  })
  
   return (
     <ul>
       {outPut}
     </ul>
  ); 
 }