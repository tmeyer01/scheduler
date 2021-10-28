import React, { useState } from 'react'
import Button from "components/Button"
import InterviewerList from 'components/InterviewerList'

export default function Form(props) {
 
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
 
 
 console.log("PROPS:", props)

  function rest(){
    setStudent("");
    setInterviewer(null);
  }
  function cancel(){
    rest();
    props.onCancel();
  }
 console.log("props", props)
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event)=> setStudent(event.target.value)}
          
        />
      </form>
      <InterviewerList 
       interviewers={props.interviewers}
       value={interviewer}
       onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel} >Cancel</Button>
        <Button confirm >Save</Button>
      </section>
    </section>
  </main>
  )
}
