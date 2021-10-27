import React from "react";
import  InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";


function IntSelect (interviewer, selectedInterviewer){
  if(interviewer === selectedInterviewer){
    return true;
    //return interviewer;
  }
  return false;
}




export default function InterviewerList(props) {
  
  const {interviewers} = props;

  // console.log("THE INTERVIEWLIST PROPS", interviewers)
  // console.log("PROPS", props)

  const outPut = interviewers.map(intItems => <InterviewerListItem key={intItems.id} setInterviewer={props.setInterviewer} name={intItems.name} avatar={intItems.avatar} selected={IntSelect(intItems.id, props.interviewer)} />);

   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{outPut}</ul>
    </section>
  ); 
 }