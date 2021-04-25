import * as terms from "./terms";

export const BreakButtons = {
  decrement: {
    id: "break-decrement",
    value: terms.DECREMENT,
    displayText: terms.DECREMENT,
    dataType: terms.BREAK
  },
  increment: {
    id: "break-increment",
    value: terms.INCREMENT,
    displayText: terms.INCREMENT,
    dataType: terms.BREAK
  }
};

export const SessionButtons = {
  decrement: {
    id: "session-decrement",
    value: terms.DECREMENT,
    displayText: terms.DECREMENT,
    dataType: terms.SESSION
  },
  increment: {
    id: "session-increment",
    value: terms.INCREMENT,
    displayText: terms.INCREMENT,
    dataType: terms.SESSION
  }
};

export const StartButton = {
  id: "start_stop",
  value: "start_stop",
  displayText: "start / stop"
};

export const ResetButton = {
  id: "reset",
  value: "reset",
  displayText: "reset"
};
