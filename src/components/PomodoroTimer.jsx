import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { START, STOP, RESET, TICK } from '../actions/pomodoro-actions';
import reducer from '../reducers/pomodoro-reducer';
import '../styles/pomodoro-timer.css';
import worktimeChime from '../assets/sounds/worktime-chime.wav';

const PomodoroTimer = () => {
    const workTimeRef = useRef(25);
    const shortBreakTimeRef = useRef(5);
    const longBreakTimeRef = useRef(15);
    const pomodorosPerLongBreakRef = useRef(4);

    const initialState = {
        isRunning: false,
        minutes: 0,
        seconds: 10,
        activity: 'work',
        pomodorosCount: 0
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const secondsRef = useRef(state.seconds);

    const worktimeBell = new Audio(worktimeChime);


    useEffect(() => {
        if (!state.isRunning) {
            return;
        }

        if(state.minutes === 0 && state.seconds === 0){
            worktimeBell.play();
            console.log(pomodorosPerLongBreakRef.current.value);
            if(state.pomodorosCount < 4){
                console.log('I want to break freeee');
                dispatch({ type: 'set', value: {time: shortBreakTimeRef.current.value, count: 1} })
                dispatch(START)
            }else{
                console.log('I want to break loooooong');
                dispatch({ type: 'set', value: longBreakTimeRef.current.value })
            }
        }else{
            secondsRef.current = setInterval(() => dispatch(TICK), 1000);
        }

        return () => {
            clearInterval(secondsRef.current);
            secondsRef.current = 0;
        };
    }, [state.isRunning, state.minutes, state.seconds, state.pomodorosCount]);

    return (
        <div>
            <div className="pomodoro-settings">
                <div style={{marginLeft: '2%'}}>
                    <label htmlFor="work-time-input">Work time</label>
                    <input type="number" ref={workTimeRef} name='work-time-input' />
                </div>
                <div style={{marginLeft: '2%'}}>
                    <label htmlFor="short-break-time-input" >Short Break Time</label>
                    <input type="number" ref={shortBreakTimeRef} name='short-break-time-input' />
                </div>
                <div style={{marginLeft: '2%'}}>
                    <label htmlFor="long-break-time-input">Long Break Time</label>
                    <input type="number" ref={longBreakTimeRef} name='long-break-time-input' />
                </div>
                <div style={{marginLeft: '2%'}}>
                    <label htmlFor="pomodoros-perLongBreak-input">Pomodoros per long break </label>
                    <input type="number" ref={pomodorosPerLongBreakRef} name='pomodoros-perLongBreak-input' />
                </div>
                <button onClick={() => dispatch({ type: 'set', value: {time: workTimeRef.current.value}})}>SET</button>
            </div>
            <div className="clock-view">
                {state.minutes < 10 ? <h1>0{state.minutes}</h1> : <h1>{state.minutes}</h1>}
                <h1>:</h1>
                {state.seconds < 10 ? <h1>0{state.seconds}</h1> : <h1>{state.seconds}</h1>}
            </div>
            <div className="action-buttons">
                {state.isRunning ?
                    <div>
                        <button onClick={() => dispatch(STOP)}>Stop</button>
                        <button onClick={() => dispatch(RESET)}>Reset</button>
                    </div>
                    : <button onClick={() => dispatch(START)}>Start</button>}
            </div>
        </div>
    );
};


PomodoroTimer.propTypes = {

};


export default PomodoroTimer;
