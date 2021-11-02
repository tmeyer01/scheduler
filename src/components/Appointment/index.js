import React from 'react'
import "./styles.scss";
import Header from './Header';
import Status from './Status'
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode"

//import getInterviewersForDay from "helpers/selectors"

export default function Appointment(props) {
  
  const {id, bookInterview, cancelInterview} = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    bookInterview(id, interview) 
    .then(()=>{
      transition(SHOW);

    })
  }


  const deleteInterview = () => {
    
    transition(DELETING);
    cancelInterview(id) 
    .then(()=>{
      transition(EMPTY);

    })
  }



    
  return (
    <article className="appointment">
      < Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRMING)}/>
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=> back()} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleteing"/>}
      {mode === CONFIRMING && <Confirm onConfirm={deleteInterview} onCancel={back}/>}
    </article>
  )
}
    
