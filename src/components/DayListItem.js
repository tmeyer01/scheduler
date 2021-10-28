import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";




export default function DayListItem(props) {
  

  function formatSpots (spots) {
    if(spots === 0){
      return "no spots remaining"
    }
    if(spots === 1){
      return "1 spot remaining"
    }
    if(spots >= 2 ){
      return `${spots} spots remaining`
    }
  }

  const dayClass = classNames("day-list__item", props.selected && "day-list__item--selected", props.spots === 0 && "day-list__item--full");

  //console.log("daylist ", dayClass)
 
 //console.log("kasjdhflsjkdhfgksdjlhf",props);

  return (
    <li onClick={() => props.setDay(props.name)}  className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">
        
        {formatSpots(props.spots)}</h3>
    </li>
  );
}