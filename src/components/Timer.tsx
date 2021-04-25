import * as React from "react";
import * as terms from "../models/terms";

interface CurrPhase {
  currPhase: typeof terms.BREAK | typeof terms.SESSION;
}

interface CurrPhaseText {
  currPhaseText: typeof terms.WORK_TEXT | typeof terms.BREAK_TEXT;
}
interface TimerProps {
  currPhase: CurrPhase;
  remainingTime: string;
}
export default class Timer extends React.Component<any, TimerProps> {
  getSessionString(currPhase: CurrPhase): CurrPhaseText {
    let str: CurrPhaseText;
    switch (currPhase) {
      case terms.BREAK:
        str = terms.BREAK_TEXT;
        break;
      case terms.SESSION:
        str = terms.WORK_TEXT;
        break;
    }
    return str;
  }
  render() {
    let phaseText = this.getSessionString(this.props.currPhase);
    return (
      <div>
        <p>This is the timer section</p>
        <div id={"timer-label"}>Current Phase: {phaseText}</div>
        <div id={"time-left"}>{this.props.remainingTime}</div>
      </div>
    );
  }
}
