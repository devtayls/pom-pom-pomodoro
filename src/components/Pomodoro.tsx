import * as React from "react";
import * as terms from "../models/terms";
import { BreakButtons, SessionButtons } from "../models/Buttons";
import Tunable from "./Tunable";
import Timer from "./Timer";
import Controls from "./Controls";

interface PomodoroState {
  remainingTime: number;
  breakLen: string | number;
  sessionLen: string | number;
  currPhase: Phase;
  paused: true | false;
}

const initialState: PomodoroState = {
  remainingTime: 1500,
  breakLen: terms.DEFAULT_BREAK_LENGTH,
  sessionLen: terms.DEFAULT_SESSION_LENGTH,
  currPhase: terms.SESSION,
  paused: true
};

export type Phase = typeof terms.BREAK | typeof terms.SESSION;
type audioRequest = typeof terms.PLAY | typeof terms.RESET | typeof terms.PAUSE;

function formatTime(timeLeft) {
  //console.log("timeleft: " + timeLeft);
  if (timeLeft === 3600) {
    return "60:00";
  }

  let seconds = timeLeft % 60;
  console.log(seconds);
  //console.log("seconds: " + seconds);
  if (seconds <= 9) {
    seconds = seconds.toString().padStart(2, "0");
    //console.log("padded seconds: " + seconds);
  }
  let minutes = parseInt(timeLeft / 60) % 60;
  console.log(minutes);
  //console.log("minutes: " + minutes);
  if (minutes <= 9) {
    // pad
    minutes = minutes.toString().padStart(2, "0");
    //console.log("pad minutes: " + minutes);
  }
  return `${minutes}:${seconds}`;
}

function isValidTime(time: number): true | false {
  let flag = true;
  if (time < terms.TIMER_FLOOR) {
    flag = false;
  }
  if (time > terms.TIMER_MAX) {
    flag = false;
  }
  return flag;
}

function minToSecs(min) {
  return min * 60;
}

function secsToMin(secs) {
  return secs / 60;
}

export default class Pomodoro extends React.Component<any, PomodoroState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.changePhase = this.changePhase.bind(this);
    this.handleTunableChange = this.handleTunableChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleSound = this.handleSound.bind(this);
  }

  handleSound(request: audioRequest) {
    let ele: HTMLAudioElement = document.getElementById("beep");
    switch (request) {
      case terms.RESET:
        ele.currentTime = 0;
        break;
      case terms.PLAY:
        ele.play();
        break;
      case terms.PAUSE:
        ele.pause();
    }
  }

  getNextPhase() {
    let currPhase = this.state.currPhase;
    let nextPhase: Phase;
    if (currPhase === terms.SESSION) {
      nextPhase = terms.BREAK;
    } else if (currPhase === terms.BREAK) {
      nextPhase = terms.SESSION;
    }
    return nextPhase;
  }

  getTimeByPhase(phase: Phase) {
    let time: number;
    if (phase === terms.SESSION) {
      time = this.state.sessionLen;
    } else if (phase === terms.BREAK) {
      time = this.state.breakLen;
    }
    return time;
  }

  changePhase() {
    let currPhase: Phase = this.state.currPhase;
    let newPhase: Phase;
    if (currPhase === terms.SESSION) {
      newPhase = terms.BREAK;
    } else if (currPhase === terms.BREAK) {
      newPhase = terms.SESSION;
    }
    // console.log(`the phase was: ${currPhase}, it is now ${newPhase}`);
    this.setState({
      currPhase: newPhase
    });
  }

  handleStartStop(e) {
    // console.log("start/stop pressed");
    let paused = this.state.paused;
    if (paused) {
      //start the timer
      this.startTimer();
    } else if (!paused) {
      //stop the timer;
      this.stopTimer();
    }
    this.setState({
      paused: !paused
    });
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      // this.decrementTimer();
      let timeRemaining = this.state.remainingTime;
      timeRemaining -= 1;

      if (timeRemaining < 0) {
        let newPhase = this.getNextPhase();
        let newTime = this.getTimeByPhase(newPhase);
        this.handleSound(terms.PLAY);
        this.setState({
          remainingTime: newTime,
          currPhase: newPhase
        });
      } else {
        this.setState({
          remainingTime: timeRemaining
        });
      }
    }, 1000);
  }

  handleReset(e) {
    this.stopTimer();
    this.handleSound(terms.PAUSE);
    this.handleSound(terms.RESET);
    this.setState(initialState);
  }

  handleTunableChange(event: React.FormEvent<HTMLInputElement>) {
    let currLen: number;
    let newState: object = {};

    let phase = event.target.dataset.type; // break or session
    let direction = event.target.value; // decrement or increment

    switch (phase) {
      case terms.BREAK:
        currLen = this.state.breakLen;
        break;
      case terms.SESSION:
        currLen = this.state.sessionLen;
        break;
    }

    switch (direction) {
      case terms.DECREMENT:
        currLen -= terms.BASE_VALUE;
        break;
      case terms.INCREMENT:
        currLen += terms.BASE_VALUE;
        break;
    }

    switch (phase) {
      case terms.BREAK:
        newState.breakLen = currLen;
        break;
      case terms.SESSION:
        newState.sessionLen = currLen;
        break;
    }

    if (phase === this.state.currPhase) {
      newState.remainingTime = currLen;
    }

    if (isValidTime(currLen)) {
      this.setState(newState);
    }
  }

  render() {
    console.log(this.state);
    let remainingTime = formatTime(this.state.remainingTime);
    let breakLen = secsToMin(this.state.breakLen);
    let sessionLen = secsToMin(this.state.sessionLen);
    return (
      <div>
        <h2>p-o-m p-o-m</h2>
        <h1>pomodoro</h1>
        <audio
          id="beep"
          /* Audio link curtesy Peter Weinburg 
          source: https://codepen.io/freeCodeCamp/pen/XpKrrW
          */
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <div></div>
        <div className="button-row">
          <Tunable
            buttons={[BreakButtons.decrement, BreakButtons.increment]}
            text={"Break"}
            labelId={"break-label"}
            timerId={"break-length"}
            value={"Break Length"}
            length={breakLen}
            onClick={this.handleTunableChange}
          />
        </div>
        <div className="button-row">
          <Tunable
            buttons={[SessionButtons.decrement, SessionButtons.increment]}
            text={"Session"}
            labelId={"session-label"}
            timerId={"session-length"}
            value={"Session Length"}
            length={sessionLen}
            onClick={this.handleTunableChange}
          />
        </div>
        <div>
          <Timer
            currPhase={this.state.currPhase}
            remainingTime={remainingTime}
          />
        </div>
        <div>
          <Controls
            handleReset={this.handleReset}
            handleStartStop={this.handleStartStop}
          />
        </div>
      </div>
    );
  }
}
