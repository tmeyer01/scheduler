export function getAppointmentsForDay(state, day) {
  const results = [];

  const foundDay = state.days.find(d => d.name === day)
  
  if(!foundDay){
    return [];
  }
  //iterating through foundDay apts and then pushing appointment into results array. 
  for(const id of foundDay.appointments){
    const apoint = state.appointments[id]
    results.push(apoint)
  }

  return results;

}