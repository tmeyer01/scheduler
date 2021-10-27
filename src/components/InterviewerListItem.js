import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";




export default function InterviewListItem(props) {
  

  const interViewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true  
    
  });
        
  function handleClick () {
    if(props.setInterviewer){
      props.setInterviewer(props.id)
    }
  }
    

  return (
    <li className={interViewClass} onClick={handleClick}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
}
    