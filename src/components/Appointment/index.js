import React from "react";
import "./styles.scss";
import Header from "./Header";
import Status from "./Status";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

//Function that shows appointments
export default function Appointment(props) {
  const { id, bookInterview, cancelInterview, interviewers, interview, time } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR SAVE";
  const ERROR_DELETE = "ERROR DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Func. saves new interviews
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };
  //Func. deletes interview 
  const deleteInterview = () => {
   
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY, true);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

    console.log("interview ->",interview)
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRMING)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRMING && (
        <Confirm message="Are you sure you want to delete is interview? " onConfirm={deleteInterview} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_DELETE && <Error message="Unable to delete appointment" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="Unable to save appointment" onClose={back} />}
    </article>
  );
}
