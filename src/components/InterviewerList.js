import React from "react";
import  InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";


// function IntSelect (interviewer, selectedInterviewer){
//   if(interviewer === selectedInterviewer){
//     return true;
//     //return interviewer;
//   }
//   return false;
// }




export default function InterviewerList(props) {
  
  // const {interviewers} = props;


  // const outPut = interviewers.map(intItems => (
  // <InterviewerListItem 
  //   key={intItems.id} 
  //   setInterviewer={props.setInterviewer} 
  //   name={intItems.name} 
  //   avatar={intItems.avatar} 
  //   selected={IntSelect(intItems.id, props.interviewer)} 
  //   />
  // ));

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });




   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  ); 








 }