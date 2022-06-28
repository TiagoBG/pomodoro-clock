export default function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { ...state, isRunning: false, minutes: 25, seconds: 0 };
    case "tick":
      if(state.seconds <= 0){
          return { ...state, isRunning: true, seconds: 59,  minutes: state.minutes - 1};
      }
      return { ...state, isRunning: true, seconds: state.seconds - 1};
    case "set":
      return action.value.count ? 
      { ...state, isRunning: false, minutes: action.value.time, pomodorosCount: action.value.count} :
      { ...state, isRunning: false, minutes: action.value.time}
    default:
      throw new Error();
  }
}
